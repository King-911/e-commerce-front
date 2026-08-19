import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Carrito {
  id?: string;
  usuario_id: string;
}

export interface ItemCarrito {
  id?: string;
  carrito_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'https://e-commerce-back-v7cg.onrender.com/api';

  constructor(private http: HttpClient) {}

  getCarritoPorUsuario(usuarioId: string): Observable<Carrito | undefined> {
    return this.http.get<Carrito[]>(`${this.baseUrl}/carritos`).pipe(
      map(carritos => carritos.find(c => c.usuario_id === usuarioId))
    );
  }

  crearCarrito(usuarioId: string): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.baseUrl}/carritos`, { usuario_id: usuarioId });
  }

  getItemsPorCarrito(carritoId: string): Observable<ItemCarrito[]> {
    return this.http.get<ItemCarrito[]>(`${this.baseUrl}/item-carritos`).pipe(
      map(items => items.filter(i => i.carrito_id === carritoId))
    );
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