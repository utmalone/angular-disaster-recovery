import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { AdminNavComponent } from './navbar/admin-nav/admin-nav.component';
import { UserNavComponent } from './navbar/user-nav/user-nav.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserTimecardComponent } from './pages/user-timecard/user-timecard.component';;
import { UserSubmissionComponent } from './pages/user-submission/user-submission.component';
import { AdminTimecardComponent } from './pages/admin-timecard/admin-timecard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MachinesComponent } from './pages/machines/machines.component';
import { AddEditJobsComponent } from './pages/jobs/add-edit-jobs/add-edit-jobs.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule
    ],
    exports: [
        AdminNavComponent,
        UserNavComponent
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        AdminNavComponent,
        UserNavComponent,
        AdminPageComponent,
        UserPageComponent,
        UserTimecardComponent,
        UserSubmissionComponent ,
        AdminTimecardComponent ,
        JobsComponent ,
        MachinesComponent ,
        AddEditJobsComponent,

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };