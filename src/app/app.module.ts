import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// service worker
import { ServiceWorkerModule } from '@angular/service-worker';

// ng sidebar
import { SidebarModule } from 'ng-sidebar';

// Angular Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular Material
import { MaterialModule } from './material';

// angularfire2 modulos
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

// (AGM) Angular Google Maps
import { AgmCoreModule } from '@agm/core';

// rutas
import { AppRoutingModule } from './app.routes';

// providers
import { FirebaseService } from './providers/firebase.service';
import { CarritoService } from './providers/carrito.service';
import { ComercioService } from './providers/comercio.service';
import { AutenticacionService } from './providers/autenticacion.service';
import { UsuarioService } from './providers/usuario.service';
import { PedidosService } from './providers/pedidos.service';


// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ComercioComponent } from './components/comercio/comercio.component';
import { RegisterComponent } from './components/register/register.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MicuentaComponent } from './components/micuenta/micuenta.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { RegisterComercioComponent } from './components/register-comercio/register-comercio.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { DireccionComponent } from './components/direccion/direccion.component';
import { MiComercioComponent } from './components/mi-comercio/mi-comercio.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CoPedidosComponent } from './components/co-pedidos/co-pedidos.component';
import { DialogComponent } from './components/categoria/dialog/dialog.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { DetalleCoPedidoComponent } from './components/detalle-co-pedido/detalle-co-pedido.component';
import { PedidoCompletadoComponent } from './components/pedido-completado/pedido-completado.component';
import { CoConfigComponent } from './components/co-config/co-config.component';
import { PruebaPedidosComponent } from './components/prueba-pedidos/prueba-pedidos.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { PedidoComponent } from './components/pedido/pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    ComercioComponent,
    RegisterComponent,
    CarritoComponent,
    MicuentaComponent,
    DireccionesComponent,
    PedidosComponent,
    RegisterComercioComponent,
    FavoritosComponent,
    DireccionComponent,
    MiComercioComponent,
    CategoriasComponent,
    ProductoComponent,
    ProductosComponent,
    PruebaComponent,
    MenuComponent,
    CategoriaComponent,
    CoPedidosComponent,
    DialogComponent,
    DetallePedidoComponent,
    DetalleCoPedidoComponent,
    PedidoCompletadoComponent,
    CoConfigComponent,
    PruebaPedidosComponent,
    EditarPerfilComponent,
    PedidoComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), 
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [
    FirebaseService,
    AutenticacionService,
    UsuarioService,
    CarritoService,
    ComercioService,
    PedidosService
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
