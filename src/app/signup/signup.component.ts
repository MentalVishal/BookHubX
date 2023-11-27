import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };

  isSubmitted = false;
  msg = '';

  private apiUrl = 'https://backend-bookhubx.onrender.com/user/register';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser({ email, name, password, role }: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      name: name,
      email: email,
      password: password,
      role: role,
    });
  }

  signup(): void {
    this.registerUser({
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      role: this.user.role,
    }).subscribe(
      (response) => {
        console.log('Signup Successful:', response);
        alert('Signup Successful');
        this.isSubmitted = true;
        this.router.navigate(['/login']);
        // Handle successful signup, navigate to another page, etc.
      },
      (error) => {
        if (error.error.msg == 'User Already Exist') {
          alert('User Already Exist');
        }
        console.error(error.error.msg);
        // Handle error, show a message to the user, etc.
      }
    );
  }

  onSubmit() {
    if (this.user.name == '') {
      this.msg = 'Name is Required';
      alert(this.msg);
    } else if (this.user.name.length < 3) {
      this.msg = 'Name must be at least 3 characters long.';
      alert(this.msg);
    } else if (this.user.email == '') {
      this.msg = 'Email is required.';
      alert(this.msg);
    } else if (this.user.password == '') {
      this.msg = 'Password is required';
      alert(this.msg);
    } else if (this.user.password.length < 8) {
      this.msg = 'Password must be at least 8 characters long.';
      alert(this.msg);
    } else if (!this.passwordStrengthValidator(this.user.password)) {
      this.msg =
        'Password must contain 1 upercase 1 lowercase 1 number 1 special character';
      alert(this.msg);
    } else if (this.user.confirmPassword == '') {
      this.msg = 'Confirm Password is required';
      alert(this.msg);
    } else if (this.user.password != this.user.confirmPassword) {
      this.msg = 'Passwords do not match.';
      alert(this.msg);
    } else if (this.user.role == '') {
      this.msg = 'Role is required';
      alert(this.msg);
    } else {
      this.signup();

      if (this.isSubmitted) {
        console.log({ user: this.user });
        this.msg = '';
        alert(' Registration successful! Thank you for signing up.');
      }
    }

    // this.user = {
    //   name: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    //   phoneNumber: '',
    // };
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
