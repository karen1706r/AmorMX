import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../services/restaurante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-categorias-platos',
  templateUrl: './categorias-platos.component.html',
  styleUrls: ['./categorias-platos.component.scss']
})
export class CategoriasplatosComponent implements OnInit {
  public categoriasplatos: any[] = [];


  constructor(
    private ps: RestauranteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadCategoriasPlatos();
  }

  private loadCategoriasPlatos(): void {
    this.ps.getcategoriasplatos().subscribe(
      {
        next: (data) => {
          this.categoriasplatos = data;
          console.log(data);
        },
        error: (err) => console.error(err)
      }
    );
  }

  agregarCatplatos(): void {
    console.log('Ejecuta el método agregar');
    this.router.navigate(['dashboard/add-catplato']);
  }

  editarCatplatos(id: string): void {
    console.log('id_categorias-platos:' + id + ' Ejecuta el método editar');
    this.router.navigate(['dashboard/update-catplato/' + id]);
  }

  borrarCatplatos(id: string): void {
    // Usar SweetAlert2 para la confirmación
    Swal.fire({
      title: 'No puedes eliminar una categoría',
      text: 'Pero puedes deshabilitarla. ¿Quieres ir a deshabilitar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Color del botón "Sí"
      cancelButtonColor: '#d33', // Color del botón "No"
      confirmButtonText: 'Sí, ir a deshabilitar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la página de deshabilitar (implementa este método según tu lógica)
        this.irADeshabilitar(id);
      } else {
        console.log('Deshabilitación cancelada');
      }
    });
  }

  irADeshabilitar(id: string): void {
    // Aquí puedes agregar la lógica para redirigir a la página de deshabilitar
    this.router.navigate(['/dashboard/update-catplato', id]);
  }


  verCatplatos(id: string): void {
    console.log('id:' + id + ' Ejecuta el método ver');
    this.router.navigate(['dashboard/show-categorias-platos/' + id]);
  }

  private convertirEstado(valor: any): boolean {
    if (typeof valor === 'string') {
      return valor.toLowerCase() === 'true';
    }
    return !!valor;
  }
}
