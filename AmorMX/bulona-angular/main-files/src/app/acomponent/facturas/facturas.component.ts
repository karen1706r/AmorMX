import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface PedidoDetalle {
  nombre: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  idMesa: number = 0;
  idPedido: number = 0;
  numeroMesa: string = '';
  fecha_hora: Date = new Date();
  pedidos_por_mesa: PedidoDetalle[] = [];
  totalFactura: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  ngOnInit(): void {
    this.idMesa = +this.route.snapshot.paramMap.get('idMesa')!;
    this.cargarNumeroMesa();
    this.cargarDetallesPedido();
  }

  cargarNumeroMesa(): void {
    this.restauranteService.getMesasById(this.idMesa).subscribe(
      (data) => {
        this.numeroMesa = data.numero;
      },
      (error) => {
        console.error('Error al cargar el número de la mesa:', error);
      }
    );
  }

  cargarDetallesPedido(): void {
    // Obtener los pedidos asociados a la mesa
    this.restauranteService.obtenerPedidosPorMesa(this.idMesa.toString()).subscribe(
      (pedidosMesa) => {
        console.log('Datos obtenidos de pedidos por mesa:', pedidosMesa);
  
        // Extraer los IDs de pedidos para buscar en la tabla principal de pedidos
        const pedidosIds = pedidosMesa.map((pedido: any) => pedido.id_pedido);
        this.restauranteService.getPedidos().subscribe(
          (pedidos) => {
            // Filtrar los pedidos activos usando los IDs obtenidos y el estado
            const pedidosActivos = pedidos.filter(
              (pedido: any) => pedidosIds.includes(pedido.id) && pedido.estado_pedido === true
            );
            console.log('Pedidos activos obtenidos:', pedidosActivos);
  
            if (pedidosActivos.length > 0) {
              // Configurar el pedido principal y la fecha
              this.idPedido = pedidosActivos[0].id;
              this.fecha_hora = new Date(pedidosActivos[0].fecha);
  
              // Filtrar los elementos de pedidosMesa que pertenecen al pedido activo
              const pedidoActivoDetalles = pedidosMesa.filter(
                (item: any) => item.id_pedido === this.idPedido
              );
  
              // Mapear cada plato en el pedido activo
              const pedidosObservables = pedidoActivoDetalles.map((item: any) => 
                this.restauranteService.getplatosId(item.id_plato).pipe(
                  map((plato: any) => ({
                    nombre: plato.nombre,
                    cantidad: item.cantidad,
                    precio: plato.precio || 0
                  }))
                )
              );
  
              // Ejecutar todas las peticiones para obtener detalles de cada plato del pedido activo
              forkJoin(pedidosObservables).subscribe(
                (pedidosDetalles) => {
                  console.log('Detalles de los platos obtenidos:', pedidosDetalles);
                  this.pedidos_por_mesa = pedidosDetalles;
                  this.calcularTotalFactura();
                },
                (error) => {
                  console.error('Error al cargar detalles de los platos:', error);
                }
              );
            } else {
              console.log('No hay pedidos activos para esta mesa.');
            }
          },
          (error) => {
            console.error('Error al obtener el estado de los pedidos:', error);
          }
        );
      },
      (error) => {
        console.error('Error al cargar detalles del pedido:', error);
      }
    );
  }
  
  

  calcularTotalFactura(): void {
    this.totalFactura = this.pedidos_por_mesa.reduce((total, detalle) => {
      return total + (detalle.precio * detalle.cantidad);
    }, 0);
  }

  pagarFactura(): void {
    const factura = {
      numero: this.numeroMesa,
      total: this.totalFactura,
      fecha: new Date(),
      id_pedido: this.idPedido
    };

    this.restauranteService.guardarFactura(factura).subscribe(
      (responseFactura) => {
        alert(`La factura con un total de ${this.totalFactura} ha sido pagada y guardada.`);
        console.log("Factura guardada exitosamente, cambiando estado del pedido a falso. ID Pedido:", this.idPedido);

        this.restauranteService.desactivarPedido(this.idPedido).subscribe(
          (responseEstado) => {
            console.log("Estado del pedido actualizado a falso:", responseEstado);
            if (responseEstado.estado_pedido === false) {
              this.router.navigate(['dashboard/show-cajero']);
            } else {
              console.error("El estado del pedido no se actualizó correctamente en la base de datos.");
            }
          },
          (errorEstado) => {
            console.error('Error al actualizar el estado del pedido:', errorEstado);
            alert('Hubo un error al actualizar el estado del pedido.');
          }
        );
      },
      (errorFactura) => {
        console.error('Error al guardar la factura:', errorFactura);
        alert('Hubo un error al intentar guardar la factura.');
      }
    );
  }
}
