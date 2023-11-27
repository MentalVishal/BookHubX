import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  isSubmitted = false;
  msg = '';

  private apiUrl = 'https://backend-bookhubx.onrender.com/user/login';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser({ email, password }: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      email: email,
      password: password,
    });
  }

  login(): void {
    this.registerUser({
      email: this.user.email,

      password: this.user.password,
    }).subscribe(
      (response) => {
        if (response.msg == 'Invalid Credentials.') {
          this.msg = 'Invalid Credentials.';
          alert('Invalid Credentials.');
        } else if (response.msg == 'User doesnt exist, please register.') {
          this.msg = 'User doesnt exist, please register.';
          alert('User doesnt exist, please register.');
        } else {
          const token = response.Token;
          localStorage.setItem('Token', token);

          alert('Login Successful');
          this.isSubmitted = true;
          this.router.navigate(['/home']);
        }

        // Handle successful signup, navigate to another page, etc.
      },
      (error) => {
        // if (error.error.msg == 'User Already Exist') {
        //   alert('User Already Exist');
        // }
        console.error(error.error.msg);
        // Handle error, show a message to the user, etc.
      }
    );
  }

  onSubmit() {
    if (this.user.email == '') {
      this.msg = 'Email is required.';
      alert(this.msg);
    } else if (this.user.password == '') {
      this.msg = 'Password is required';
      alert(this.msg);
    } else {
      this.login();
    }
  }

  passwordStrengthValidator(control: string) {
    const value = control;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);

    const isStrongPassword =
      hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;

    return isStrongPassword ? true : false;
  }
}
