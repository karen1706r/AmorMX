import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  constructor(protected http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/platos`;
  private apiUrl2 = `${environment.apiUrl}`;
  private idPedido: string | null = null;
  private apiUrl3 = `${environment.apiUrl}/sesiones_usuarios/`;


  // Métodos para manejar categorías de inventario
  getcategoriasinventarios(): Observable<any> {
    let route = [environment.apiUrl, 'categorias_inventario'].join('/');
    return this.http.get(route);
  }

  addcategoriasinventario(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_inventario'].join('/');
    return this.http.post(ruta, usr);
  }

  getcatinventarioId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_inventario', id].join('/');
    return this.http.get(ruta);
  }

  editcategoriasinventario(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_inventario', id].join('/');
    return this.http.put(ruta, usr);
  }

  deletecategoriasinventario(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_inventario', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar la categoría porque tiene referencias en otras tablas.');
        }
        return throwError('Ocurrió un error al eliminar la categoría.');
      })
    );
  }

  // Métodos para manejar mesas
  getMesas(): Observable<any> {
    let route = [environment.apiUrl, 'mesas'].join('/');
    return this.http.get(route);
  }

  addMesas(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'mesas'].join('/');
    return this.http.post(ruta, usr);
  }

  getMesasById(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'mesas', id].join('/');
    return this.http.get(ruta);
  }


  getMesasByNumero(numero: any): Observable<any> {
    const ruta = `${environment.apiUrl}/mesas/numero/${numero}`; // Asegúrate de que la ruta sea correcta
    return this.http.get(ruta).pipe(
      tap(response => console.log('Respuesta de la API:', response)), // Muestra la respuesta
      map(response => response !== null), // Cambia esto según la estructura
      catchError(() => of(false)) // Retorna false si ocurre un error
    );
  }


  editMesas(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'mesas', id].join('/');
    return this.http.put(ruta, usr).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la actualización de mesa:', error);
        return throwError('Ocurrió un error al actualizar la mesa.');
      })
    );
  }

  deleteMesas(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'mesas', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar la mesa porque tiene referencias en otras tablas.');
        }
        return throwError('Ocurrió un error al eliminar la mesa.');
      })
    );
  }


  // Ingredientes ------------------------------------------------------------------------------------
  getingredientes(): Observable<any> {
    let route = [environment.apiUrl, 'ingredientes'].join('/');
    return this.http.get(route);
  }

  addingredientes(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'ingredientes'].join('/');
    return this.http.post(ruta, usr);
  }

  getingredientesId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'ingredientes', id].join('/');
    return this.http.get(ruta);
  }


  editingredientes(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'ingredientes', id].join('/');
    return this.http.put(ruta, usr).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la actualización de ingrediente:', error);
        return throwError('Ocurrió un error al actualizar el ingrediente.');
      })
    );
  }

  deleteingredientes(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'ingredientes', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar la categoria porque tiene referencias en otras tablas.');
        }
        return throwError('Ocurrió un error al eliminar la categoria.');
      })
    );
  }



  // Catplato ------------------------------------------------------------

  getcategoriasplatos(): Observable<any> {
    let route = [environment.apiUrl, 'categorias_platos'].join('/');
    return this.http.get(route);
  }
  addcategoriasplatos(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_platos'].join('/');
    return this.http.post(ruta, usr);
  }

  getcategoriasplatosId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_platos', id].join('/');
    return this.http.get(ruta);
  }

  editcategoriasplatos(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_platos', id].join('/');
    return this.http.put(ruta, usr);
  }


  deletecategoriasplatos(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias_platos/${id}`);
  }


  //platos
  getplatos(): Observable<any> {
    let route = [environment.apiUrl, 'platos'].join('/');
    return this.http.get(route);
  }
  addplatos(formData: FormData): Observable<any> {
    console.log('URL de la solicitud:', this.apiUrl); // Para verificar que la URL es correcta
    return this.http.post(this.apiUrl, formData);
  }


  getplatosId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'platos', id].join('/');
    return this.http.get(ruta);
  }

  editplatos(formData: FormData, id: string) {
    return this.http.put(`http://localhost:3013/platos/${id}`, formData);
  }

  deleteplatos(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'platos', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar el plato.');
        }
        return throwError('Ocurrió un error al eliminar el plato.');
      })
    );
  }
  getCategoriaPlatoById(categoriaId: string): Observable<any> {
    let ruta = [environment.apiUrl, 'categorias_platos', categoriaId].join('/');
    return this.http.get<any>(ruta).pipe(
      tap(data => console.log('Respuesta de la categoría:', data)) // Agrega esto para depuración
    );
  }

  getPlatosPorCategoria(categoriaId: string): Observable<any> {
    const url = `${this.apiUrl2}/categorias_platos/${categoriaId}/platos`;
    return this.http.get<any>(url);
  }

  //Inventario -------------------------------------------------------------
  getinventario(): Observable<any> {
    let route = [environment.apiUrl, 'inventario'].join('/');
    return this.http.get(route);
  }

  getcategorias(): Observable<any> {
    let route = [environment.apiUrl, 'categorias_inventario'].join('/');
    return this.http.get(route);
  }

  addinventario(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'inventario'].join('/');
    return this.http.post(ruta, usr);
  }

  getinventarioId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'inventario', id].join('/');
    return this.http.get(ruta);
  }

  editinventario(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'inventario', id].join('/');
    return this.http.put(ruta, usr);
  }

  deleteinventario(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'inventario', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar el inventario porque tiene referencias en otras tabels.');
        }
        return throwError('Ocurrió un error al eliminar el inventario.');
      })
    );
  }

  //Tipos de usuario -------------------------------------------------------------------
  gettipodeusuario(): Observable<any> {
    let route = [environment.apiUrl, 'tipos_de_usuario'].join('/');
    return this.http.get(route);
  }
  addtipodeusuario(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'tipos_de_usuario'].join('/');
    return this.http.post(ruta, usr);
  }
  edittipodeusuario(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'tipos_de_usuario', id].join('/');
    return this.http.put(ruta, usr);
  }
  gettipodeusuarioId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'tipos_de_usuario', id].join('/');
    return this.http.get(ruta);
  }
  //
  deletetipodeusuario(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'tipos_de_usuario', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar la categoria porque tiene referencias en otras tablas.');
        }
        return throwError('Ocurrió un error al eliminar la categoria.');
      })
    );
  }


  // Usuarios ---------------------------------------------------------------------------
  getusuarios(): Observable<any> {
    let route = [environment.apiUrl, 'usuarios'].join('/');
    return this.http.get(route);
  }
  addusuarios(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'usuarios'].join('/');
    return this.http.post(ruta, usr);
  }
  editusuarios(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'usuarios', id].join('/');
    return this.http.put(ruta, usr);
  }

  getusuariosId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'usuarios', id].join('/');
    return this.http.get(ruta);
  }
  //
  deleteusuarios(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'usuarios', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar la categoria porque tiene referencias en otras tablas.');
        }
        return throwError('Ocurrió un error al eliminar la categoria.');
      })
    );
  }


  // Platos ingredientes
  getplatosingredientes(): Observable<any> {
    let route = [environment.apiUrl, 'platos_ingredientes/'].join('/');
    return this.http.get(route).pipe(
      catchError(error => {
        console.error('Error al obtener los ingredientes de los platos', error);
        return of([]); // O cualquier valor por defecto
      })
    );
  }



  addPlatosIngredientes(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'platos_ingredientes/multiple'].join('/');
    return this.http.post(ruta, usr);
  }

  getplatosingredientesId(id: number): Observable<any> {
    const ruta = `${environment.apiUrl}/platos_ingredientes/full/${id}`;
    console.log('Llamando a la API en:', ruta); // Verifica la URL
    return this.http.get(ruta);
  }



  editplatosingredientes(usr: any, id: number, ingredientes_a_eliminar: number[]): Observable<any> {
    const ruta = [environment.apiUrl, 'platos_ingredientes', id].join('/');
    console.log('Ruta de la API:', ruta); // Verifica la URL generada

    const body = {
      ingredientes: usr, // Ingredientes que se quieren mantener o actualizar
      ingredientes_a_eliminar // IDs de los ingredientes a eliminar
    };

    console.log("Payload enviado:", body); // Imprimir el payload para depuración

    return this.http.put(ruta, body).pipe(
      catchError((error) => {
        console.error("Error en la actualización:", error);
        return throwError('Error al actualizar el plato ingrediente, intente nuevamente más tarde.');
      })
    );
  }


  deleteplatosingredientes(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'platos_ingredientes', id].join('/');
    return this.http.delete(ruta).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.name === 'SequelizeForeignKeyConstraintError') {
          return throwError('No se puede eliminar el platos_ingredientes porque tiene referencias en otras tabels.');
        }
        return throwError('Ocurrió un error al eliminar el platos_ingredientes.');
      })
    );
  }



  //Comanda---------------------------------------------------------
  getPedidosChef(): Observable<any[]> {
    const ruta = [environment.apiUrl, 'pedidos'].join('/');
    return this.http.get<any[]>(ruta);
  }

  crearPedido(pedido: any): Observable<any> {
    const ruta = `${environment.apiUrl}/pedidos`; // Construir la URL usando environment.apiUrl
    return this.http.post(ruta, pedido);
  }

  addPedidoPorMesa(pedidoPorMesa: any): Observable<any> {
    const ruta = `${environment.apiUrl}/pedidos_por_mesa`; // Asegúrate de que esta sea la ruta correcta en tu API
    return this.http.post(ruta, pedidoPorMesa);
  }

  obtenerPedidosPorMesa(idMesa: string): Observable<any[]> {
    const ruta = `${environment.apiUrl}/pedidos_por_mesa/mesa/${idMesa}`;
    return this.http.get<any[]>(ruta);
  }

  

//Factura -----------------------------------------------------------------------------

  guardarFactura(factura: any): Observable<any> {
    const ruta = `${environment.apiUrl}/facturas`;
    return this.http.post(ruta, factura);
  }
  
  
  
  desactivarPedido(idPedido: number): Observable<any> {
    const payload = { estado_pedido: false };
    return this.http.put(`${this.apiUrl2}/pedidos/${idPedido}`, payload);
  }
  
    
  



  // Método para obtener pedidos por mesa
  getPedidosPorMesa(): Observable<any> {
    let ruta = [environment.apiUrl, 'pedidos_por_mesa'].join('/');
    return this.http.get(ruta);
  }

  actualizarEstadoPedidoComanda(pedidoId: number, estado: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl2}/pedidos/ce/${pedidoId}`, { estado });
  }


  actualizarEstadoPedido(idPedido: number, data: any) {
    return this.http.put(`/api/pedidos/${idPedido}/estado`, data);
  }


  addpedidospormesas(pedidoPorMesaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}/pedidos_por_mesa`, pedidoPorMesaData);
  }

  getpedidos(): Observable<any> {
    let route = [environment.apiUrl, 'pedidos'].join('/');
    return this.http.get(route);
  }

  getpedidospormesa(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'pedidos_por_mesa'].join('/');
    return this.http.get(ruta);
  }


  // Método para obtener los pedidos de una mesa específica usando el id del pedido
  getPedidospormesa(idPedido: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/pedidos_por_mesa/${idPedido}`);
  }



  getIngredientesPorPlato(idPlato: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/platos_ingredientes/${idPlato}`); // Asegúrate que este endpoint exista
  }


  getIngredientesPlatoPedidos(idPlato: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/platos_ingredientes/${idPlato}/ingredientes`); // Asegúrate que este endpoint exista
  }






  //Pedidos---------------------------------------------

  // Método para agregar pedidos
  addpedidos(usr: any): Observable<any> {
    const ruta = `${environment.apiUrl}/pedidos`;
    return this.http.post(ruta, usr);
  }

  // Método para establecer el ID del pedido
  setIdPedido(id: string): void {
    this.idPedido = id;
  }


  // Método para obtener el ID del pedido
  getIdPedido(): string | null {
    return this.idPedido;
  }


  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/pedidos`); // Asegúrate de que la URL sea correcta
  }

  // pedidos.service.ts
  getPedidosMesa(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/pedidos`).pipe(
      tap(data => console.log('Pedidos cargados:', data)) // Agrega esta línea para verificar los datos
    );
  }


  // Acceso ---------------------------------------------------------------------------
  login(correo: string, contrasena: string): Observable<any> {
    const ruta = [environment.apiUrl, 'usuarios'].join('/');
    const params = new HttpParams()
      .set('correo', correo)
      .set('contrasena', contrasena);

    return this.http.get(ruta, { params });
  }


  addsesiones(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'sesiones_usuarios'].join('/');
    return this.http.post(ruta, usr);
  }

  getsesiones(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'sesiones_usuarios', id].join('/');
    return this.http.get(ruta);
  }

  getSesion(idSesion: number): Observable<any> {
    const ruta = `${this.apiUrl3}/${idSesion}`;
    return this.http.get(ruta); // Realiza la petición GET para obtener la sesión
  }

  getUsuario(idUsuario: number): Observable<any> {
    const ruta = `${this.apiUrl2}/usuarios/${idUsuario}`; // Ruta para obtener el usuario específico
    return this.http.get(ruta);
  }




}
