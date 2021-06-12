import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Machine } from '../_models/machine';

@Injectable({ providedIn: 'root' })
export class MachineService {

    private userSubject: BehaviorSubject<Machine>;
    public user: Observable<Machine>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<Machine>(JSON.parse(localStorage.getItem('machine')));
        this.user = this.userSubject.asObservable();
    }

    public get machineValue(): Machine {
        return this.userSubject.value;
    }

    getAll() {
        return this.http.get<Machine[]>(`${environment.apiUrl}/machine`);
    }

    getById(code: string) {
        return this.http.get<Machine>("http://localhost:3000/machine/" + code);
    }

    addJob(job: Machine) {
        return this.http.post("http://localhost:3000/machine", job);
    }

    update(code, params) {
        return this.http.put(`${environment.apiUrl}/machine/${code}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (code == this.machineValue.code) {
                    // update local storage
                    const user = { ...this.machineValue, ...params };
                    localStorage.setItem('machine', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete("http://localhost:3000/machine/" + id)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
            }));
    }
}