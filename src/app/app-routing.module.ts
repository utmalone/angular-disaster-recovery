import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminListComponent } from './pages/admin-timecard/list.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
    { path:'timecard/admin', component: AdminListComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }