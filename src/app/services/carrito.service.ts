import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  precio: number | string;
  descripcion?: string;
  imagen?: string;
}

export interface ItemCarrito {
  id?: string;
  carrito_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number | string;
  producto?: Producto; // <-- Propiedad anidada que viene de Laravel con 'with'
}

export interface Carrito {
  id?: string;
  usuario_id: string;
  items?: ItemCarrito[]; // <-- Items anidados que vienen de Laravel
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'https://e-commerce-back-v7cg.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Ahora consume directamente la ruta personalizada de Laravel con el 'with'
  getCarritoPorUsuario(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/carritos/usuario/${usuarioId}`);
  }

  crearCarrito(usuarioId: string): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.baseUrl}/carritos`, { usuario_id: usuarioId });
  }

  // Método opcional si en otro lado necesitas buscar items sueltos
  getItemsPorCarrito(carritoId: string): Observable<ItemCarrito[]> {
    return this.http.get<ItemCarrito[]>(`${this.baseUrl}/item-carritos`);
  }

  agregarItem(item: ItemCarrito): Observable<ItemCarrito> {
    return this.http.post<ItemCarrito>(`${this.baseUrl}/item-carritos`, item);
  }

  actualizarItem(id: string, item: Partial<ItemCarrito>): Observable<ItemCarrito> {
    return this.http.put<ItemCarrito>(`${this.baseUrl}/item-carritos/${id}`, item);
  }

  eliminarItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/item-carritos/${id}`);
  }
}