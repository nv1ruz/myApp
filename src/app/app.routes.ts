import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
    HomeComponent,
    LoginComponent,
    ComercioComponent,
    RegisterComponent,
    CarritoComponent,
    MiComercioComponent,
    MenuComponent,
    CategoriaComponent,
    ProductoComponent,
    CategoriasComponent,
    ProductosComponent,
    MicuentaComponent,
    EditarPerfilComponent,
    DireccionesComponent,
    DireccionComponent,
    PedidosComponent,
    PedidoComponent,
    RegisterComercioComponent,
    FavoritosComponent,
    PruebaComponent,
    PruebaPedidosComponent,
    CoPedidosComponent,
    DetallePedidoComponent,
    DetalleCoPedidoComponent,
    PedidoCompletadoComponent,
    CoConfigComponent    
 } from './components/index.paginas';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'carrito/:id', component: CarritoComponent },

    { path: 'micomercio', component: MiComercioComponent },
    { path: 'micomercio/menu', component: MenuComponent },
    { path: 'micomercio/menu/categoria', component: CategoriaComponent },
    { path: 'micomercio/menu/categoria/:id', component: CategoriaComponent },
    { path: 'micomercio/menu/producto', component: ProductoComponent },
    { path: 'micomercio/menu/producto/:id', component: ProductoComponent },
    { path: 'micomercio/categorias', component: CategoriasComponent },
    { path: 'micomercio/productos', component: ProductosComponent },

    { path: 'micuenta', component: MicuentaComponent },
    { path: 'micuenta/editar', component: EditarPerfilComponent },
    { path: 'direccion/:id', component: DireccionComponent },
    { path: 'direccion', component: DireccionComponent },
    { path: 'direcciones', component: DireccionesComponent },

    { path: 'pedidos', component: PedidosComponent },
    { path: 'pedido/:id', component: PedidoComponent },

    { path: 'registerComercio', component: RegisterComercioComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'prueba', component: PruebaComponent },
    { path: 'prueba-pedidos', component: PruebaPedidosComponent },
    { path: 'co-pedidos', component: CoPedidosComponent },
    { path: 'detalle-pedido', component: DetallePedidoComponent },
    { path: 'detalle-co-pedido/:id', component: DetalleCoPedidoComponent },
    { path: 'pedido-completado', component: PedidoCompletadoComponent },
    { path: 'co-config', component: CoConfigComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash:true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}