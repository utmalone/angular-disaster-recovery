import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.less']
})
export class AdminNavComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
}

  ngOnInit(): void {
  }
  logout() {
    this.accountService.logout();
}
}
