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
  private apiUrl = 'http://127.0.0.1:8000/api/productos';
  // Definimos la raíz de la API para construir rutas relativas limpias
  private baseApiUrl = 'http://127.0.0.1:8000/api';

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
    // Apunta correctamente a: http://127.0.0.1:8000/api/categorias/{id}/productos
    return this.http.get<Producto[]>(`${this.baseApiUrl}/categorias/${categoriaId}/productos`);
  }
}