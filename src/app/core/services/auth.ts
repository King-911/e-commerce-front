import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, Usuario } from '../models/usuario';

export interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private readonly API_URL = 'https://e-commerce-back-v7cg.onrender.com/api';

  currentUser = signal<Usuario | null>(this.getStoredUser());

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
        this.router.navigate(['/categorias']); 
      })
    );
  }

  register(datos: RegisterRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, datos).pipe(
      tap((usuario) => {
        localStorage.setItem('user', JSON.stringify(usuario));
        this.currentUser.set(usuario);
        this.router.navigate(['/categorias']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private getStoredUser(): Usuario | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}