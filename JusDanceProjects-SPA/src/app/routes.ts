import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { RegisterComponent } from '@components/register/register.component';
import { LoginComponent } from '@components/login/login.component';
import { AccountComponent } from '@components/account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { DanceOffersComponent } from '@components/dance-offers/dance-offers.component';
import { LessonsComponent } from '@components/lessons/lessons.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'aanbod', component: DanceOffersComponent},
    {
        path: 'user',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'account', component: AccountComponent},
            { path: 'lessons', component: LessonsComponent},
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
