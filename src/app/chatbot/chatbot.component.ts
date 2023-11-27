import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgModel } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  input: string = '';
  msg: any[] = [];

  private apiUrl = 'https://backend-bookhubx.onrender.com/chat';
  token = localStorage.getItem('Token');
  loading = false;

  constructor(private http: HttpClient) {}

  chatbot({ input }: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(this.apiUrl, { input: this.input }, { headers });
  }

  chat(): void {
    const dataToSend = {
      input: this.input,
    };

    this.chatbot(dataToSend).subscribe(
      (response) => {
        this.msg.push(`Chatbot : ${response}`);

        console.log(response);
        this.loading = false;
        // Handle the response as needed
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }

  onSubmit() {
    this.msg.push(`User : ${this.input}`); // Assuming you want to mark user messages
    console.log(this.input);
    this.loading = true;
    this.chat();
    this.input = ''; // Clear the input after submitting
    console.log(this.msg);
  }
}
