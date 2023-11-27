import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  imagePath: string = 'src/app/about/image/priyanshu.png';
}
