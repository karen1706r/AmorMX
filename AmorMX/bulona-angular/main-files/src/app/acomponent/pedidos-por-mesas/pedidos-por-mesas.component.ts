import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-por-mesas',
  templateUrl: './pedidos-por-mesas.component.html',
  styleUrls: ['./pedidos-por-mesas.component.scss']
})
export class PedidosPorMesasComponent implements OnInit {
  pedidospormesas: FormGroup;
  categorias: any[] = [];
  platos: any[] = [];
  filteredPlatos: any[] = [];
  isSubmitted = false;
  visualizarItems: any[] = [];
  ingredientes: any[] = [];
  ingredientesSeleccionados: any[] = [];
  pedidos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pedidospormesasService: RestauranteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pedidospormesas = this.buildForm();
  }


  ngOnInit(): void {
    this.loadCategorias();
    this.loadPedidos();

    // Capturar `id_mesa` directamente desde snapshot para garantizar que el valor esté disponible
    const idMesa = this.route.snapshot.paramMap.get('id');
    if (idMesa) {
      this.pedidospormesas.get('id_mesa')?.setValue(idMesa); // Establecer el valor en el formulario
      console.log('id_mesa establecido en el formulario:', idMesa);

      // Cargar los pedidos confirmados para esta mesa
      this.cargarPedidosConfirmados(idMesa);
    } else {
      console.warn('No se encontró un id de mesa válido en los parámetros de la ruta.');
    }
  }


  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id_mesa: ['', Validators.required], // Añadir el campo id_mesa aquí
      id_plato: ['', Validators.required],
      id_categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      comentarios: ['', Validators.required],
      fecha_hora: [new Date(), Validators.required],
      id_pedido: ['']  // Eliminamos Validators.required para id_pedido si no es necesario al crear
    });
  }


  private cargarPedidosConfirmados(idMesa: string): void {
    this.pedidospormesasService.obtenerPedidosPorMesa(idMesa).subscribe(
      (pedidos) => {
        // Filtrar los pedidos activos antes de procesarlos
        const pedidosActivos = pedidos.filter(pedido => pedido.estado_pedido);
  
        if (pedidosActivos.length === 0) {
          console.log(`No hay pedidos activos para la mesa ${idMesa}`);
          this.visualizarItems = []; // Limpia cualquier dato anterior
          return;
        }
  
        const itemsConfirmados = pedidosActivos.map(pedido => {
          const plato = pedido.platos_model ? pedido.platos_model : null;
          const categoria = plato && plato.categorias_platos_model ? plato.categorias_platos_model : null;
  
          return {
            id_plato: pedido.id_plato,
            id_categoria: pedido.id_categoria,
            plato: plato ? plato.nombre : 'Sin nombre',
            categoria: categoria ? categoria.nombre_categoria : 'Sin categoría',
            cantidad: pedido.cantidad,
            comentarios: pedido.comentarios,
            ingredientes: JSON.parse(pedido.comentarios || '[]'),
            isConfirmed: true
          };
        });
  
        console.log('Estructura de los items confirmados:', itemsConfirmados);
  
        // Agregar los pedidos confirmados a visualizarItems
        this.visualizarItems = [...itemsConfirmados];
      },
      (error) => {
        console.error('Error al cargar los pedidos confirmados:', error);
      }
    );
  }
  


  loadPedidos(): void {
    this.pedidospormesasService.getPedidosMesa().subscribe(
      (data) => {
        this.pedidos = data; // Guarda los pedidos en la variable
      },
      (error) => {
        console.error('Error al cargar los pedidos:', error);
      }
    );
  }

  private loadCategorias(): void {
    this.pedidospormesasService.getcategoriasplatos().subscribe(
      (data: any) => {
        this.categorias = data.filter(categoria => categoria.estado);
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  loadPlatos(categoriaId: string) {
    this.pedidospormesasService.getPlatosPorCategoria(categoriaId).subscribe(
      (response) => {
        this.platos = response;
      },
      (error) => {
        console.error('Error al cargar los platos:', error);
        Swal.fire('Error', 'No se pudieron cargar los platos para esta categoría.', 'error');
      }
    );
  }

  onCategoriaChange(event: Event) {
    const selectedCategoriaId = (event.target as HTMLSelectElement).value;
    if (selectedCategoriaId) {
      this.loadPlatos(selectedCategoriaId);
      this.pedidospormesas.get('id_plato')?.setValue('');
      this.ingredientes = [];
      this.ingredientesSeleccionados = [];
    } else {
      this.platos = [];
    }
  }

  loadIngredientes(platoId: number) {
    this.pedidospormesasService.getIngredientesPlatoPedidos(platoId).subscribe(
      (response) => {
        this.ingredientes = response.map(ingrediente => ({
          ...ingrediente,
          marcado: true
        }));
      },
      (error) => {
        console.error('Error al cargar los ingredientes:', error);
        Swal.fire('Error', 'No se pudieron cargar los ingredientes para este plato.', 'error');
      }
    );
  }

  onPlatoChange(event: any): void {
    const selectedPlatoId = +event.target.value;
    if (selectedPlatoId) {
      this.loadIngredientes(selectedPlatoId);
      this.ingredientesSeleccionados = [];
    } else {
      this.ingredientes = [];
      this.ingredientesSeleccionados = [];
      this.pedidospormesas.patchValue({ comentarios: '' });
    }
  }

  onIngredientChange(event: Event, ingrediente: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    ingrediente.marcado = isChecked;

    if (isChecked) {
      this.ingredientesSeleccionados = this.ingredientesSeleccionados.filter(id => id !== ingrediente.id);
    } else {
      if (!this.ingredientesSeleccionados.includes(ingrediente.id)) {
        this.ingredientesSeleccionados.push(ingrediente.id);
      }
    }
    this.updateComentarios();
  }

  private updateComentarios(): void {
    const comentariosBase = this.pedidospormesas.value.comentarios || '';
    const ingredientesNombresNoSeleccionados = this.ingredientes
      .filter(ingrediente => !ingrediente.marcado)
      .map(ingrediente => ingrediente.ingredientes_model.nombre);

    const finalComentarios = ingredientesNombresNoSeleccionados.length === 0
      ? 'Ninguno'
      : `Sin: ${ingredientesNombresNoSeleccionados.join(', ')}`;

    const comentariosActuales = comentariosBase.replace(/Ninguno|Sin:.*?(?=\s*$|$)/, '').trim();
    this.pedidospormesas.patchValue({ comentarios: `${comentariosActuales} ${finalComentarios}`.trim() });
  }

  addToVisualizar(): void {
    const selectedPlatoId = +this.pedidospormesas.value.id_plato;
    const selectedCategoriaId = +this.pedidospormesas.value.id_categoria;
    const cantidad = this.pedidospormesas.value.cantidad;
    const comentarios = this.pedidospormesas.value.comentarios;

    const selectedPlato = this.platos.find(plato => plato.id === selectedPlatoId);
    const selectedCategoria = this.categorias.find(categoria => categoria.id === selectedCategoriaId);

    if (selectedPlato && selectedCategoria && cantidad > 0) {
      const item = {
        id_plato: selectedPlatoId,
        id_categoria: selectedCategoriaId,
        plato: selectedPlato.nombre,
        categoria: selectedCategoria.nombre_categoria,
        cantidad,
        comentarios,
        ingredientes: this.ingredientesSeleccionados,
        isConfirmed: false // Agregamos esta propiedad
      };

      console.log('Item agregado a visualizar:', item);

      this.visualizarItems.push(item);
      this.pedidospormesas.patchValue({
        id_plato: '',
        id_categoria: '',
        cantidad: '',
        comentarios: ''
      });
      this.pedidospormesas.markAsPristine();
      this.pedidospormesas.markAsUntouched();
      this.ingredientesSeleccionados = [];
    } else {
      Swal.fire('Error', 'Selecciona todos los campos y asegúrate de que la cantidad sea mayor a 0', 'error');
    }
  }


  save(): void {
    const idMesa = this.pedidospormesas.get('id_mesa')?.value;

    if (!idMesa) {
        Swal.fire('Error', 'No se ha especificado un id de mesa válido.', 'error');
        return;
    }

    console.log('Verificando pedidos activos para la mesa con ID:', idMesa);

    // Verificar si ya existe un pedido activo en la mesa
    this.pedidospormesasService.obtenerPedidosPorMesa(idMesa).subscribe(
        (pedidos) => {
            const pedidoActivo = pedidos.find(pedido => pedido.estado_pedido === true);

            if (pedidoActivo) {
                console.log('Pedido activo encontrado, reutilizando ID:', pedidoActivo.id);
                // Si hay un pedido activo, usamos su id_pedido y evitamos crear uno nuevo
                this.guardarPedidosPorMesa(pedidoActivo.id);
                Swal.fire('Información', 'Pedido actualizado con el pedido existente en estado activo.', 'info');
            } else {
                console.log('No hay pedido activo encontrado para la mesa. Procediendo a crear uno nuevo.');
                // Si no hay pedido activo, creamos uno nuevo
                this.crearNuevoPedido(idMesa);
            }
        },
        (error) => {
            console.error('Error al verificar pedidos activos:', error);
        }
    );
}


private crearNuevoPedido(idMesa: number): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        Swal.fire('Error', 'No se ha encontrado un usuario activo. Inicia sesión de nuevo.', 'error');
        return;
    }

    const nuevoPedido = {
        id_mesa: idMesa,
        id_usuario: parseInt(userId),
        fecha: new Date().toISOString(),
        estado_pedido: true,
        estados_p: true
    };

    this.pedidospormesasService.crearPedido(nuevoPedido).subscribe(
        (pedidoCreado) => {
            this.guardarPedidosPorMesa(pedidoCreado.id);
            Swal.fire('Éxito', 'Pedido registrado correctamente.', 'success');
        },
        (error) => {
            Swal.fire('Error', 'Ocurrió un error al crear el pedido', 'error');
            console.error('Error al crear el pedido:', error);
        }
    );
}

private guardarPedidosPorMesa(idPedido: number): void {
    const itemsToConfirm = this.visualizarItems.filter(item => !item.isConfirmed);
    if (itemsToConfirm.length === 0) {
        Swal.fire('Error', 'No hay elementos nuevos en el pedido para guardar.', 'error');
        return;
    }

    itemsToConfirm.forEach(item => {
        const pedidoPorMesa = {
            id_pedido: idPedido,
            id_plato: item.id_plato,
            cantidad: item.cantidad,
            id_categoria: item.id_categoria,
            comentarios: JSON.stringify(item.comentarios),
            fecha_hora: new Date().toISOString()
        };

        this.pedidospormesasService.addPedidoPorMesa(pedidoPorMesa).subscribe(
            response => {
                item.isConfirmed = true;
                console.log('Item guardado en pedidos_por_mesa:', response);
            },
            error => {
                console.error('Error al guardar item en pedidos_por_mesa:', error);
            }
        );
    });

    this.pedidospormesas.reset({ id_mesa: this.pedidospormesas.get('id_mesa')?.value });
    this.isSubmitted = false;
}



  eliminarItem(index: number): void {
    const item = this.visualizarItems[index];
    if (item.isConfirmed) {
      Swal.fire('Error', 'No se puede eliminar un item de un pedido ya confirmado.', 'error');
    } else {
      this.visualizarItems.splice(index, 1);
      Swal.fire('Éxito', 'El item ha sido eliminado.', 'success');
    }
  }

}