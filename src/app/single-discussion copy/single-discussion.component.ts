import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-discussion',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './single-discussion.component.html',
  styleUrl: './single-discussion.component.css',
})
export class SingleDiscussionComponent {
  constructor(
    private http: HttpClient,
    private router: Router, // Import Router
    private route: ActivatedRoute,
    private location: Location
  ) {}

  private apiUrl = 'https://backend-bookhubx.onrender.com/discussion/message/';

  discussions: any[] = [];
  newCommentText: string = '';
  showCommentBox: boolean = false;
  token = localStorage.getItem('Token');

  ngOnInit() {
    // Your existing logic to fetch discussion details by ID
    this.route.paramMap.subscribe((params) => {
      const discussionId = params.get('id');
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );
      // For demonstration, I'll use a hardcoded discussion ID
      this.http
        .get(`https://backend-bookhubx.onrender.com/discussion`, { headers })
        .subscribe(
          (data: any) => {
            const theData = data.AllDiscussion.find(
              (el: any) => el._id === discussionId
            );
            this.discussions.push(theData);

            console.log(this.discussions);
          },
          (error) => {
            console.error('HTTP error:', error);
          }
        );
    });
  }

  toggleCommentBox() {
    this.showCommentBox = !this.showCommentBox;
  }

  addComment() {
    this.route.paramMap.subscribe((params) => {
      const discussionId = params.get('id');

      console.log(discussionId);

      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );
      const messageData = {
        userId: localStorage.getItem('Id'),
        userName: localStorage.getItem('Name'),
        text: this.newCommentText,
      };

      // Your existing logic to add a new comment
      this.http
        .post(
          `https://backend-bookhubx.onrender.com/discussion/message/${discussionId}`,
          messageData,
          { headers }
        )
        .subscribe(
          (data: any) => {
            console.log('Post request successful:', data);
            // Update the discussion details after adding a comment

            // Optionally, you can reset the newCommentText
            this.newCommentText = '';

            alert('Comment Sucessful');
            this.router.navigate(['/discussion']);
          },
          (error) => {
            console.error('Post request error:', error);

            // Log the full error response
            if (error instanceof HttpErrorResponse) {
              console.error('Full error response:', error);
            }
          }
        );
    });
  }
}
