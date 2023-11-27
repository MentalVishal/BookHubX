import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {}
