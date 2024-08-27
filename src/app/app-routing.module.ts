import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RouterGuardService } from './services/router-guard.service';
import { SignupComponent } from './home/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'journal',
    loadChildren: () => import('./journal-app/admin.module').then(m => m.AdminModule),
    canActivate: [RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
