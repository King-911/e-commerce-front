export interface Usuario {
  id: string;
  email: string;
  rol: 'admin' | 'cliente' | string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  user: Usuario;
  token?: string;
}