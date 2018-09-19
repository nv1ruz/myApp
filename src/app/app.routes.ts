import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
    HomeComponent,
    LoginComponent,
    ComercioComponent,
    RegisterComponent
 } from './components/index.paginas';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {}