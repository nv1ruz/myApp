import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
    HomeComponent,
    LoginComponent,
    ComercioComponent,
    RegisterComponent,
    CarritoComponent,
    MiComercioComponent,
    CategoriasComponent,
    ProductosComponent,
    MicuentaComponent,
    DireccionesComponent,
    DireccionComponent,
    PedidosComponent,
    RegisterComercioComponent,
    FavoritosComponent
 } from './components/index.paginas';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'carrito/:id', component: CarritoComponent },
    { path: 'micomercio', component: MiComercioComponent },
    { path: 'micomercio/categorias', component: CategoriasComponent },
    { path: 'micomercio/productos', component: ProductosComponent },
    { path: 'micuenta', component: MicuentaComponent },
    { path: 'direccion/:id', component: DireccionComponent },
    { path: 'direccion', component: DireccionComponent },
    { path: 'direcciones', component: DireccionesComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'registerComercio', component: RegisterComercioComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash:true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}