import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
import { UserActions } from '@redux/actions/user.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState, DecodedToken } from '@redux/store';
import { Loadable } from '@redux/helper/loadable';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  loadable: Loadable;
  decodeToken: DecodedToken;

  constructor(
    private userActions: UserActions,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.ngRedux
    .select(x => x.user)
    .subscribe(state => {
      this.user = state.loggedInUser;
      this.loadable = state;
      this.decodeToken = state.decodeToken;
    });

    if (!this.user) {
      this.userActions.getUser(this.decodeToken.nameid);
    }
  }

}
