import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    console.log('1. onSubmit ejecutado');

    if (this.loginForm.invalid) {
      console.log('1b. formulario invalido, se detiene aqui');
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    console.log('2. isLoading seteado a true ->', this.isLoading());
    this.errorMessage.set(null);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('3. next ejecutado, respuesta OK ->', response);
        this.isLoading.set(false);
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.log('4. error ejecutado ->', err);
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Error connecting to the server.'
        );
      }
    });
  }
}