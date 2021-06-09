import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.less']
})
export class UserNavComponent implements OnInit {

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
