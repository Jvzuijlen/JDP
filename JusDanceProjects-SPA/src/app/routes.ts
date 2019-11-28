import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { RegisterComponent } from '@components/register/register.component';
import { LoginComponent } from '@components/login/login.component';
import { AccountComponent } from '@components/account/account.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'account', component: AccountComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
