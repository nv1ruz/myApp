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
import { DomiciliosComponent } from './components/domicilios/domicilios.component';

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
    DomiciliosComponent
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
    FormsModule
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
