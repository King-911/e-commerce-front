import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // <-- Añádelo aquí
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  name = 'E-commerce';
}