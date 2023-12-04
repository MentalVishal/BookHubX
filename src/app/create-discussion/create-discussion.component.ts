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

@Component({
  selector: 'app-create-discussion',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './create-discussion.component.html',
  styleUrl: './create-discussion.component.css',
})
export class CreateDiscussionComponent {
  title: string = '';
  content: string = '';
  userId = localStorage.getItem('Id'); // Add your user ID logic here
  userName = localStorage.getItem('Name');
  token = localStorage.getItem('Token');

  private apiUrl = 'https://backend-bookhubx.onrender.com/discussion/create';

  constructor(private http: HttpClient, private router: Router) {}

  createDiscussion() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    this.http
      .post(
        this.apiUrl,
        {
          title: this.title,
          content: this.content,
          userId: this.userId,
          userName: this.userName,
        },
        { headers }
      )
      .subscribe(
        (data: any) => {
          // Handle the data returned from the API
          console.log(data);
          alert('Discussion Created Sucessfull');
          this.router.navigate(['/discussion']);
          // Now you can use the 'data' variable to work with the received data
        },
        (error) => {
          // Handle any errors that occurred during the request
          console.error('HTTP error:', error);
        }
      );
  }
}
