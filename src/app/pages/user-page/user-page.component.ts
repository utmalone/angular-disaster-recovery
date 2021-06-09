import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {

  user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

  ngOnInit(): void {
  }

}
