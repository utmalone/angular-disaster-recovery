import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Job } from '../_models/job';

@Injectable({ providedIn: 'root' })
export class JobService {

    private userSubject: BehaviorSubject<Job>;
    public user: Observable<Job>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<Job>(JSON.parse(localStorage.getItem('job')));
        this.user = this.userSubject.asObservable();
    }

    public get jobValue(): Job {
        return this.userSubject.value;
    }

    getAll() {
        return this.http.get<Job[]>(`${environment.apiUrl}/jobs`);
    }

    getById(code: string) {
        return this.http.get<Job>("http://localhost:3000/jobs/" + code);
    }

    addJob(job: Job) {
        return this.http.post("http://localhost:3000/jobs", job);
    }

    update(code, params) {
        const job = Job
        return this.http.put<Job>(`http:localhost:3000/jobs/` + code, JSON.stringify(job),params)
            // .pipe(map(x => {
            //     // update stored user if the logged in user updated their own record
            //     if (code == this.jobValue.code) {
            //         // update local storage
            //         const user = { ...this.jobValue, ...params };
            //         localStorage.setItem('job', JSON.stringify(user));

            //         // publish updated user to subscribers
            //         this.userSubject.next(user);
            //     }
            //     return x;
            // }));
    }

    delete(id: string) {
        return this.http.delete("http://localhost:3000/jobs/" + id)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
            }));
    }

}