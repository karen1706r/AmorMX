import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-comanda',
  templateUrl: './show-comanda.component.html',
  styleUrls: ['./show-comanda.component.scss']
})
export class ShowComandaComponent implements OnInit {

  public pedidosPorMesa: any[] = []; // Array para almacenar los pedidos
  public loading: boolean = true; // Para mostrar el estado de carga

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute,
    private router2: Router
  ) {}

  ngOnInit(): void {
    // Captura el ID del pedido desde la URL
    const pedidoId = this.route.snapshot.paramMap.get('id');

    if (pedidoId) {
      this.cargarPedidosPorMesa(pedidoId);
    } else {
      console.error('No se encontró el ID del pedido en la URL.');
    }
  }

  // Método para cargar el pedido específico y obtener el nombre del plato
  cargarPedidosPorMesa(pedidoId: string): void {
    this.loading = true; // Iniciar el estado de carga
    this.restauranteService.getPedidosPorMesa().subscribe({
      next: (data) => {
        this.pedidosPorMesa = data.filter(pedido => pedido.id_pedido === +pedidoId);
        console.log('Pedido específico:', this.pedidosPorMesa);

        // Obtener el nombre del plato para el pedido específico
        this.pedidosPorMesa.forEach(pedido => {
          this.restauranteService.getplatosId(pedido.id_plato).subscribe({
            next: (platoData) => {
              pedido.nombre_plato = platoData.nombre; // Agregar nombre del plato al pedido
            },
            error: (err) => {
              console.error('Error al cargar el plato:', err);
              pedido.nombre_plato = 'Plato no encontrado'; // Manejo en caso de error
            }
          });
        });
      },
      error: (err) => {
        console.error('Error al obtener el pedido:', err);
        Swal.fire('Error', 'Ocurrió un error al obtener el pedido.', 'error');
      },
      complete: () => {
        this.loading = false; // Cambiar el estado de carga al completar
        this.verificarPedidosYLimpiar(); // Verificar si hay pedidos
      }
    });
  }

  // Método para imprimir la comanda y limpiar la vista
imprimirComanda(pedidoId: string): void {
  if (!pedidoId) {
      console.error('ID del pedido no definido para imprimir la comanda.');
      Swal.fire('Error', 'No se puede imprimir la comanda sin un ID de pedido válido.', 'error');
      return;
  }

  // Asegúrate de enviar 'false' como un booleano
  this.restauranteService.actualizarEstadoPedidoComanda(+pedidoId, false).subscribe({
      next: () => {
          Swal.fire('Comanda Impresa', 'La comanda ha sido impresa y el pedido se ha actualizado.', 'success').then(() => {
              // Redirige a ShowChef después de cerrar el alert
              this.router2.navigate(['/dashboard/show-chef']); // Ajusta la ruta según tu configuración de rutas
          });
      },
      error: (err) => {
          console.error('Error al actualizar el estado del pedido:', err);
          Swal.fire('Error', 'No se pudo actualizar el estado del pedido.', 'error');
      }
  });
}
  // Método para verificar si hay pedidos
  verificarPedidosYLimpiar(): void {
    if (this.pedidosPorMesa.length === 0) {
      localStorage.setItem('hayComandas', 'false'); // No hay comandos, establecer en localStorage
    } else {
      localStorage.setItem('hayComandas', 'true'); // Hay comandos
    }
  }
}
