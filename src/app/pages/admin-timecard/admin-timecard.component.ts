import { Component, OnInit } from '@angular/core';
import { Timecard } from '../../_models/timecard';
import { TimecardService } from '../../_services/timecard.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-timecard',
  templateUrl: './admin-timecard.component.html',
  styleUrls: ['./admin-timecard.component.less']
})
export class AdminTimecardComponent implements OnInit {

//   constructor(private accountService: AccountService) {
//     this.accountService.user.subscribe(x => this.user = x);

//   logout() {
//     this.accountService.logout();
// }

card = null;
loading = false;
approve: boolean;
id: string;

constructor(
  private route: ActivatedRoute, 
  private router: Router, 
  private timecard: TimecardService, 
  private alertService: AlertService
  ) {}

ngOnInit() {
    this.timecard.getAll()
        .pipe(first())
        .subscribe(card => this.card = card);
}

onApprove(){
  this.timecard.update(this.id, "Approved")
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Update successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
}


// public toggleNamedColor(friend): void {
//   if(friend.ionicNamedColor === 'rank') { 
//     friend.ionicNamedColor = 'primary'
//   } else {
//     friend.ionicNamedColor = 'rank'
//   }

// }

// onClick(){
//   if(approve){
//     clicked = false;
//   }
}
