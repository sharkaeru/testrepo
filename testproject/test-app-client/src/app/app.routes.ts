import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Welcome } from './pages/welcome/welcome';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/edit-profile/edit-profile';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'register',
        component: Register
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'edit-profile',
        component: EditProfile
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      }
    ]
  }
];