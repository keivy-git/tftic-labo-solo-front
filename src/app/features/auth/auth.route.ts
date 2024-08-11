import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GuestGuard } from '../../core/guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';

export const AuthRoute: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
];
