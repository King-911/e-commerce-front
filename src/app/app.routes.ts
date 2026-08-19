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
    path: 'registro', 
    loadComponent: () => import('./features/auth/registro/registro').then(m => m.RegistroComponent) 
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
    loadComponent: () => import('./carrito/carrito').then(m => m.Carrito)
  },
  { 
    path: 'pagos', 
    loadComponent: () => import('./pagos/pagos').then(m => m.Pagos)
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];