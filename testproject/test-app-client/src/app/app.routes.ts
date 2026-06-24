import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'register',
        component: Register
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
      }
    ]
  }
];