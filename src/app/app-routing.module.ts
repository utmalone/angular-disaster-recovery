import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminTimecardComponent } from './pages/admin-timecard/admin-timecard.component';
import { AddEditJobsComponent } from './pages/jobs/add-edit-jobs/add-edit-jobs.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MachinesComponent } from './pages/machines/machines.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserSubmissionComponent } from './pages/user-submission/user-submission.component';
import { UserTimecardComponent } from './pages/user-timecard/user-timecard.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const jobsModule = () => import('./pages/jobs/jobs.module').then(x => x.JobsModule);
const machineModule = () => import('./pages/machines/machine.module').then(x => x.MachineModule);

const routes: Routes = [
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
    { path:'admin/timecard', component: AdminTimecardComponent, canActivate: [AuthGuard]},
    // { path: 'admin/machine', component: MachinesComponent, canActivate: [AuthGuard]},
    { path:'timecard/user', component: UserTimecardComponent, canActivate: [AuthGuard]},
    { path: 'user/timecard/submit', component: UserSubmissionComponent, canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'machine', loadChildren: machineModule, canActivate: [AuthGuard]},
    { path: 'jobs', loadChildren: jobsModule, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }