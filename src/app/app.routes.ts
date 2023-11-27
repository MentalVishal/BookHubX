import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'book', component: BookComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'chatbot', component: ChatbotComponent },
  // Add other routes as needed
];
