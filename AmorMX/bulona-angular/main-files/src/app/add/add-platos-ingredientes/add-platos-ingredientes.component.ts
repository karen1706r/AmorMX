import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestauranteService } from '../../services/restaurante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Importar SweetAlert2

@Component({
  selector: 'app-add-platos-ingredientes',
  templateUrl: './add-platos-ingredientes.component.html',
  styleUrls: ['./add-platos-ingredientes.component.scss']
})
export class AddPlatosIngredientesComponent implements OnInit {
  public platosingredientes: FormGroup;  // Formulario reactivo
  public isSubmitted: boolean = false;  // Bandera para indicar si el formulario ha sido enviado
  public ingredientes: any[] = [];  // Lista de ingredientes
  public platos: any[] = [];  // Lista de platos
  public selectedIngredientes: number[] = []; // Array para ingredientes seleccionados
  public ingredientCounts: { [key: number]: number } = {}; // Objeto para contar ingredientes seleccionados

  constructor(
    private formBuilder: FormBuilder,
    private platosingredientesService: RestauranteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadPlatos();  // Cargar los platos disponibles al inicializar
    this.loadIngredientes();  // Cargar los ingredientes disponibles al inicializar
  }

  private buildForm(): void {
    this.platosingredientes = this.formBuilder.group({
      id_plato: ['', [Validators.required]],  // ID del plato
      id_ingredientes: [this.selectedIngredientes, [Validators.required]],  // ID de los ingredientes seleccionados
      cantidad: [[Validators.required, Validators.pattern('^[0-9]*$')]],  // Cantidad total (si la necesitas)
    });

    this.ingredientes.forEach(ingrediente => {
      this.platosingredientes.addControl('cantidad_' + ingrediente.id, this.formBuilder.control(0, [Validators.required, Validators.min(0)]));
    });
  }


  private loadPlatos(): void {
    this.platosingredientesService.getplatos().subscribe({
      next: (data) => {
        this.platos = data;  // Asignar los platos obtenidos
      },
      error: (err) => console.error(err)  // Manejar errores
    });
  }

  private loadIngredientes(): void {
    this.platosingredientesService.getingredientes().subscribe({
      next: (data) => {
        this.ingredientes = data;  // Asignar los ingredientes obtenidos
        this.addIngredientControls(); // Llama a este método para agregar los controles
      },
      error: (err) => console.error(err)  // Manejar errores
    });
  }

  private addIngredientControls(): void {
    this.ingredientes.forEach(ingrediente => {
      this.platosingredientes.addControl('cantidad_' + ingrediente.id, this.formBuilder.control(0, [Validators.required, Validators.min(0)]));
    });
  }

  onCheckboxChange(event: any): void {
    const id = Number(event.target.value);
    if (event.target.checked) {
      // Agregar ingrediente seleccionado
      this.selectedIngredientes.push(id);
      this.ingredientCounts[id] = 1; // Inicializa la cuenta a 1
      this.platosingredientes.addControl(`cantidad_${id}`, this.formBuilder.control(1, [Validators.required, Validators.pattern('^[0-9]*$')]));
    } else {
      // Remover ingrediente no seleccionado
      const index = this.selectedIngredientes.indexOf(id);
      if (index > -1) {
        this.selectedIngredientes.splice(index, 1);
        delete this.ingredientCounts[id]; // Elimina el contador
        this.platosingredientes.removeControl(`cantidad_${id}`); // Eliminar control del formulario
      }
    }
    // Actualizar el valor del formulario
    this.platosingredientes.get('id_ingredientes')?.setValue(this.selectedIngredientes.length > 0 ? this.selectedIngredientes : null);
  }


  isSelected(id: number): boolean {
    return this.selectedIngredientes.includes(id);
  }

  updateCount(id: number, count: number): void {
    console.log(`ID: ${id}, Count: ${count}`); // Agrega esta línea
    if (count >= 0) {
      this.ingredientCounts[id] = count;
      this.platosingredientes.get(`cantidad_${id}`)?.setValue(count);
    } else {
      this.ingredientCounts[id] = 0;
      this.platosingredientes.get(`cantidad_${id}`)?.setValue(0);
    }
  }

  save(): void {
    if (this.platosingredientes.valid) {
      const selectedIngredients = this.ingredientes
        .filter(ingrediente => this.isSelected(ingrediente.id) && this.ingredientCounts[ingrediente.id] > 0)
        .map(ingrediente => ({
          id_plato: this.platosingredientes.value.id_plato,
          id_ingrediente: ingrediente.id,
          cantidad: this.ingredientCounts[ingrediente.id]
        }));

      if (selectedIngredients.length > 0) {
        this.platosingredientesService.addPlatosIngredientes(selectedIngredients).subscribe(
          () => {
            this.isSubmitted = true;

            // Mostrar SweetAlert2 con opciones
            Swal.fire({
              title: '¡Ingredientes agregados!',
              text: 'Los ingredientes fueron guardados exitosamente.',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Ir a Platos Ingredientes',
              cancelButtonText: 'Seguir registrando',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/dashboard/platos-ingredientes']);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.platosingredientes.reset();
                this.isSubmitted = false; // Restablece el estado de envío
              }
            });
          },
          (error) => {
            console.error('Error al guardar el inventario:', error);
            let errorMessage = 'Ocurrió un error al guardar el inventario.'; // Mensaje de error por defecto
            if (error && error.error && error.error.message) {
              errorMessage = error.error.message; // Mensaje de error específico
            }

            // Mostrar alerta de error
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } else {
        Swal.fire({
          title: 'Atención',
          text: 'Debes seleccionar al menos un ingrediente con cantidad.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      this.platosingredientes.markAllAsTouched(); 
    }
  }

}
