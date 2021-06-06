import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TimecardService } from '../../_services/timecard.service';
import { AccountService } from '@app/_services/account.service';

@Component({ selector: 'app-admin-timecard', templateUrl: 'list.component.html' })
export class AdminListComponent implements OnInit {


//   user: User;

//   constructor(private accountService: AccountService) {
//     this.accountService.user.subscribe(x => this.user = x);

//   logout() {
//     this.accountService.logout();
// }

    card = null;

    constructor(private timecard: TimecardService) {}

    ngOnInit() {
        this.timecard.getAll()
            .pipe(first())
            .subscribe(card => this.card = card);
    }

    public text: string = 'Review';

public toggleNamedColor(friend): void {
      if(friend.ionicNamedColor === 'rank') { 
        friend.ionicNamedColor = 'primary'
      } else {
        friend.ionicNamedColor = 'rank'
      }

    }

    public changeText(friend, event: any): void {
        friend.text = 'Finalized';
        event.target.disabled = true;
    }

}