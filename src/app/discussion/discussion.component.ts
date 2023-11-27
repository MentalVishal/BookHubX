import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css',
})
export class DiscussionComponent {}
