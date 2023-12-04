import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FooterComponent,
  ],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css',
})
export class DiscussionComponent {
  token = localStorage.getItem('Token');
  allDiscussion: any[] = [];
  loading = false;

  private apiUrl = 'https://backend-bookhubx.onrender.com/discussion';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.loading = true;
    // Make a GET request using HttpClient
    this.http.get(this.apiUrl, { headers }).subscribe(
      (data: any) => {
        // Handle the data returned from the API
        console.log(data.AllDiscussion);
        this.allDiscussion = data.AllDiscussion;
        this.loading = false;
        // Now you can use the 'data' variable to work with the received data
      },
      (error) => {
        // Handle any errors that occurred during the request
        console.error('HTTP error:', error);
      }
    );
  }

  navigateToDiscussion(_id: string) {
    // Navigate to the discussion page when clicking on the card
    this.router.navigate(['/discussion', _id]);
  }
  create() {
    this.router.navigate(['/create']);
  }
}
