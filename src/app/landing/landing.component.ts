import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    // You can customize the navigation behavior here if needed
    this.router.navigate(['/home']);
  }
}
