import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Timecard } from '../_models/timecard';

@Injectable({ providedIn: 'root' })
export class TimecardService {

    private timeSubject: BehaviorSubject<Timecard>;
    public timecard: Observable<Timecard>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.timeSubject = new BehaviorSubject<Timecard>(JSON.parse(localStorage.getItem('timecard')));
        this.timecard = this.timeSubject.asObservable();
    }

    public get timeValue(): Timecard {
        return this.timeSubject.value;
    }

    getAll() {
        return this.http.get<Timecard[]>(`http://localhost:3000/timecard`);
    }

    getById(code: string) {
        return this.http.get<Timecard>(`http://localhost/3000/timecard` + code);
    }

    addTimecard(card: Timecard){
        return this.http.post("http://localhost:3000/timecard", card);
    }

    update(code, params) {
        return this.http.put(`http://localhost:3000/timecard` + code, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (code == this.timeValue.code) {
                    // update local storage
                    const user = { ...this.timeValue, ...params };
                    localStorage.setItem('timecard', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.timeSubject.next(user);
                }
                return x;
            }));
    }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.timeValue.code) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }

}