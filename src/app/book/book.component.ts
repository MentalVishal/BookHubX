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
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  userId = localStorage.getItem('Id'); // Add your user ID logic here
  userName = localStorage.getItem('Name');
  token = localStorage.getItem('Token');
  books: any[] = [];
  loading = false;

  private apiUrl = 'https://backend-bookhubx.onrender.com/book';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.token) {
      this.router.navigate(['/login']);
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.loading = true;
    this.http
      .get(
        this.apiUrl,

        { headers }
      )
      .subscribe(
        (data: any) => {
          // Handle the data returned from the API
          console.log(data);
          this.books = data.AllBook;
          this.loading = false;

          // Now you can use the 'data' variable to work with the received data
        },
        (error) => {
          // Handle any errors that occurred during the request
          console.error('HTTP error:', error);
        }
      );
  }
  isAdminUser(): boolean {
    if (this.userName === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  deleteBook(book: any): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    this.http
      .delete(
        `${this.apiUrl}/delete/${book._id}`,

        { headers }
      )
      .subscribe(
        (data: any) => {
          // Handle the data returned from the API
          console.log(data);
          this.books = this.books.filter((el) => el._id !== book._id);

          // Now you can use the 'data' variable to work with the received data
        },
        (error) => {
          // Handle any errors that occurred during the request
          console.error('HTTP error:', error);
        }
      );
    console.log('Delete book:', book);
  }
}
