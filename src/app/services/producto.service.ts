import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Cambiamos localhost por tu URL de Render
  private apiUrl = 'https://e-commerce-back-v7cg.onrender.com/api/productos';
  private baseApiUrl = 'https://e-commerce-back-v7cg.onrender.com/api';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductosPorCategoria(categoriaId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseApiUrl}/categorias/${categoriaId}/productos`);
  }
}