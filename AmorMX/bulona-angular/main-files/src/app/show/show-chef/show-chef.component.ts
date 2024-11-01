import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../services/restaurante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-chef',
  templateUrl: './show-chef.component.html',
  styleUrls: ['./show-chef.component.scss']
})
export class ShowChefComponent implements OnInit {

  public pedidos: any[] = []; // Array para almacenar la lista de pedidos
  public mesas: any = {}; // Objeto para almacenar el número de la mesa por ID

  constructor(
    private restauranteService: RestauranteService, 
    private router: Router,
  ) 
  { }

  ngOnInit(): void {
    this.cargarMesas();
  }

  // Método para cargar las mesas y luego los pedidos
  cargarMesas(): void {
    this.restauranteService.getMesas().subscribe({
      next: (data) => {
        // Crear un mapa con el ID de la mesa como clave y el número de la mesa como valor
        this.mesas = data.reduce((acc: any, mesa: any) => {
          acc[mesa.id] = mesa.numero;
          return acc;
        }, {});
        console.log('Datos completos de las mesas:', this.mesas);
        this.cargarPedidos(); // Una vez cargadas las mesas, cargamos los pedidos
      },
      error: (err) => {
        console.error('Error al obtener las mesas:', err);
        alert('Ocurrió un error al obtener las mesas.');
      }
    });
  }

  verComanda(id: string): void {
    console.log('id:' + id + ' Ejecuta el método ver');
    this.router.navigate(['dashboard/show-comanda/' + id]);
  }
  
  // Método para cargar los pedidos
  cargarPedidos(): void {
    this.restauranteService.getPedidosChef().subscribe({
      next: (data) => {
        // Filtrar los pedidos para incluir solo aquellos con estados_p en true
        this.pedidos = data.filter((pedido: any) => pedido.estados_p);
        console.log('Pedidos filtrados:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
        alert('Ocurrió un error al obtener los pedidos.');
      }
    });
  }
}
