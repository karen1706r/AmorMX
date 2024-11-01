import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { RestauranteService } from '../../services/restaurante.service'; // Importa el servicio para obtener los datos del usuario
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public usuario: any; // Propiedad para almacenar la información del usuario
    public userRole: number | null = null; // Propiedad para almacenar el rol del usuario

    constructor(
        public sidebarservice: SidebarService,
        private restauranteService: RestauranteService, // Inyecta el servicio
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Obtener el sessionId del localStorage
        const sessionId = localStorage.getItem('sessionId');
    
        if (sessionId) {
            // Hacer una petición al servicio para obtener la sesión
            this.restauranteService.getSesion(+sessionId).subscribe({
                next: (sesionData) => {
                    console.log('Datos de la sesión:', sesionData); // Log para verificar los datos de la sesión
    
                    if (sesionData && sesionData.id_usuario) {
                        const userId = sesionData.id_usuario;
    
                        // Ahora, obtener los datos del usuario
                        this.restauranteService.getUsuario(userId).subscribe({
                            next: (usuarioData) => {
                                console.log('Datos del usuario:', usuarioData); // Log para verificar los datos del usuario
                                this.usuario = usuarioData; // Guardar los datos del usuario para mostrarlos en la vista
                                this.userRole = usuarioData.rol; // Asignar el rol del usuario
                            },
                            error: (error) => {
                                console.error('Error al obtener los datos del usuario:', error);
                            }
                        });
                    } else {
                        console.warn('No se pudo obtener el id_usuario de la sesión');
                    }
                },
                error: (error) => {
                    console.error('Error al obtener los datos de la sesión:', error);
                }
            });
        } else {
            console.warn('No se encontró un sessionId en localStorage');
        }
    }

    // Método logout para cerrar sesión
    logout(): void {
        this.authService.logout(); // Llamar al método de logout del AuthService
    }

    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    // Métodos para verificar el rol del usuario
    isAdmin(): boolean {
        return this.userRole === 1;
    }

    isMesero(): boolean {
        return this.userRole === 2;
    }

    isChef(): boolean {
        return this.userRole === 3;
    }

    isCajero(): boolean {
        return this.userRole === 4;
    }
}
