import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ng sidebar
import { SidebarModule } from 'ng-sidebar';

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
import { ServiceWorkerModule } from '@angular/service-worker';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { DireccionComponent } from './components/direccion/direccion.component';
import { MiComercioComponent } from './components/mi-comercio/mi-comercio.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoriaComponent } from './components/categoria/categoria.component';

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
    CategoriaComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), // imports firebase/storage only needed for storage features
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBghU-HAg9wpwoszhmnK_ljHTOh3Th4Js'
    })
  ],
  providers: [
    FirebaseService,
    AutenticacionService,
    UsuarioService,
    CarritoService,
    ComercioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
