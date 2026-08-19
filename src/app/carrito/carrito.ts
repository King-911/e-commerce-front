import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, Carrito as CarritoModel, ItemCarrito } from '../services/carrito.service';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  carrito: CarritoModel | null = null;
  items: ItemCarrito[] = [];
  cargando = true;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const usuario = this.authService.currentUser();
    if (!usuario) {
      this.cargando = false;
      return;
    }

    // Una sola llamada trae el carrito, sus ítems y el producto de cada ítem gracias al 'with' de Laravel
    this.carritoService.getCarritoPorUsuario(usuario.id).subscribe({
      next: (carrito: any) => {
        this.carrito = carrito;
        // Asignamos directamente los items que vienen anidados en la respuesta
        this.items = carrito?.items || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el carrito:', err);
        this.cargando = false;
      }
    });
  }

  subtotal(item: ItemCarrito): number {
    return item.cantidad * Number(item.precio_unitario);
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + this.subtotal(item), 0);
  }

  eliminarItem(id: string): void {
    this.carritoService.eliminarItem(id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== id);
    });
  }
}