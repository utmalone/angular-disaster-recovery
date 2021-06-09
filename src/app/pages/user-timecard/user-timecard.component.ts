import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Timecard } from '@app/_models/timecard';
import { TimecardService } from '@app/_services/timecard.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-timecard',
  templateUrl: './user-timecard.component.html',
  styleUrls: ['./user-timecard.component.less']
})
export class UserTimecardComponent implements OnInit {


  users: Timecard;

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
