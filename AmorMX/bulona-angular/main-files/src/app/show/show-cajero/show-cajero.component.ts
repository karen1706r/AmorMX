import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';

interface Mesa {
  id: number;
  numero: string;
  estado: boolean;
}

interface Pedido {
  id: number;
  id_mesa: number;
  estado_pedido: boolean;
}

@Component({
  selector: 'app-show-cajero',
  templateUrl: './show-cajero.component.html',
  styleUrls: ['./show-cajero.component.scss']
})
export class ShowCajeroComponent implements OnInit {
  mesas: Mesa[] = [];
  pedidos: Pedido[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMesas();
    this.cargarPedidos();
  }

  cargarMesas(): void {
    this.restauranteService.getMesas().subscribe(
      (data) => {
        this.mesas = data;
      },
      (error) => {
        console.error('Error al cargar mesas:', error);
      }
    );
  }

  cargarPedidos(): void {
    this.restauranteService.getpedidos().subscribe(
      (data) => {
        this.pedidos = data;
      },
      (error) => {
        console.error('Error al cargar pedidos:', error);
      }
    );
  }

  tienePedido(idMesa: number): boolean {
    return this.pedidos.some((pedido) => pedido.id_mesa === idMesa && pedido.estado_pedido);
  }

  verFactura(idMesa: number): void {
    if (this.tienePedido(idMesa)) {
      this.router.navigate(['dashboard/factura', idMesa]);
    } else {
      alert(`No hay pedidos activos para la Mesa ${idMesa}`);
    }
  }
}
