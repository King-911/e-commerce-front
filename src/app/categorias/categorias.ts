import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService, Categoria } from '../services/categoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, FormsModule, RouterLink], // <-- Asegúrate de incluir RouterLink aquí
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];
  nuevoNombre = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  guardarCategoria(): void {
    if (!this.nuevoNombre.trim()) return;

    this.categoriaService.crearCategoria({ nombre: this.nuevoNombre }).subscribe(() => {
      this.nuevoNombre = '';
      this.cargarCategorias();
    });
  }
}