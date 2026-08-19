import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, Carrito as CarritoModel, ItemCarrito } from '../services/carrito.service';
import { ProductoService, Producto } from '../services/producto.service';
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
  productos: Producto[] = [];
  cargando = true;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.cargarCarrito();
    });
  }

  cargarCarrito(): void {
    const usuario = this.authService.currentUser();
    if (!usuario) {
      this.cargando = false;
      return;
    }

    this.carritoService.getCarritoPorUsuario(usuario.id).subscribe((carrito) => {
      if (!carrito || !carrito.id) {
        this.cargando = false;
        return;
      }
      this.carrito = carrito;
      this.carritoService.getItemsPorCarrito(carrito.id).subscribe((items) => {
        this.items = items;
        this.cargando = false;
      });
    });
  }

  nombreProducto(productoId: string): string {
    return this.productos.find(p => p.id === productoId)?.nombre ?? '—';
  }

  subtotal(item: ItemCarrito): number {
    return item.cantidad * item.precio_unitario;
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