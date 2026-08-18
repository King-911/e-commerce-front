import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService, Producto } from '../services/producto.service';
import { CategoriaService, Categoria } from '../services/categoria';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionadaId: string | null = null;

  nuevoProducto: Producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    categoria_id: '',
  };

  editandoId: string | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();

    this.route.paramMap.subscribe((params) => {
      const categoriaId = params.get('id');
      if (categoriaId) {
        this.categoriaSeleccionadaId = categoriaId;
        this.nuevoProducto.categoria_id = categoriaId;
        
        this.productoService.getProductosPorCategoria(categoriaId).subscribe((data) => {
          this.productos = data;
        });
      } else {
        this.cargarProductos();
      }
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  guardarProducto(): void {
    if (!this.nuevoProducto.nombre.trim() || !this.nuevoProducto.categoria_id) return;

    if (this.editandoId) {
      this.productoService.actualizarProducto(this.editandoId, this.nuevoProducto).subscribe(() => {
        this.resetFormulario();
        this.recargarActual();
      });
    } else {
      this.productoService.crearProducto(this.nuevoProducto).subscribe(() => {
        this.resetFormulario();
        this.recargarActual();
      });
    }
  }

  recargarActual(): void {
    if (this.categoriaSeleccionadaId) {
      this.productoService.getProductosPorCategoria(this.categoriaSeleccionadaId).subscribe((data) => {
        this.productos = data;
      });
    } else {
      this.cargarProductos();
    }
  }

  editarProducto(producto: Producto): void {
    this.editandoId = producto.id ?? null;
    this.nuevoProducto = { ...producto };
  }

  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.recargarActual();
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.nuevoProducto = { 
      nombre: '', 
      precio: 0, 
      stock: 0, 
      categoria_id: this.categoriaSeleccionadaId ?? '' 
    };
    this.editandoId = null;
  }

  nombreCategoria(categoriaId: string): string {
    return this.categorias.find(c => c.id === categoriaId)?.nombre ?? '—';
  }
}