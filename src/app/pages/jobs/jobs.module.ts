import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsLayoutComponent } from './jobs-layout.component';
import { JobsComponent } from './jobs.component';
import { AddEditJobsComponent } from './add-edit-jobs/add-edit-jobs.component';
import { AdminNavComponent } from '../../navbar/admin-nav/admin-nav.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JobsRoutingModule,
    ],
    exports: [
        AdminNavComponent
    ],
    declarations: [
        JobsLayoutComponent,
        JobsComponent,
        AddEditJobsComponent,
        AdminNavComponent
    ]
})
export class JobsModule { }