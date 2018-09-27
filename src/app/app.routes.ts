import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
    HomeComponent,
    LoginComponent,
    ComercioComponent,
    RegisterComponent,
    CarritoComponent,
    MicuentaComponent,
    DireccionesComponent
 } from './components/index.paginas';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'carrito/:id', component: CarritoComponent },
    { path: 'micuenta', component: MicuentaComponent },
    { path: 'direcciones', component: DireccionesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash:true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}