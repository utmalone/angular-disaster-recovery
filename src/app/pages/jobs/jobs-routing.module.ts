import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsLayoutComponent } from './jobs-layout.component';
import { JobsComponent } from './jobs.component';
import { AddEditJobsComponent } from './add-edit-jobs/add-edit-jobs.component';

const routes: Routes = [
    {
        path: '', component: JobsLayoutComponent,
        children: [
            { path: '', component: JobsComponent },
            { path: 'jobs/add', component: AddEditJobsComponent },
            { path: 'jobs/edit/:id', component: AddEditJobsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule { }