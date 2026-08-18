import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'productos', 
    loadComponent: () => import('./productos/productos').then(m => m.Productos) 
  },
  { 
    path: 'categorias', 
    loadComponent: () => import('./categorias/categorias').then(m => m.Categorias) 
  }, 
    { 
    path: 'carrito', 
    loadComponent: () => import('./carrito/carrito').then(m => m.Carrito) // Asegúrate que la clase se llame Carrito o CarritoComponent
  },
  { 
    path: 'pagos', 
    loadComponent: () => import('./pagos/pagos').then(m => m.Pagos) // Lo mismo para pagos
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];