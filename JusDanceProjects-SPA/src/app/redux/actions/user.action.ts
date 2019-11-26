import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IUserState } from '@redux/store';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';

export enum UserActionsTypes {
  REGISTER_USER = '[User] Register user',
  REGISTER_USER_SUCCES = '[User] Register user succesful',
  REGISTER_USER_ERROR = '[User] Register user error',
  LOGIN_USER = '[User] Login user',
  LOGIN_USER_SUCCES = '[User] Login user succesful',
  LOGIN_USER_ERROR = '[User] Login user failed'
}

@Injectable({ providedIn: 'root' })
export class UserActions {
  constructor(
    private ngRedux: NgRedux<IUserState>,
    private authService: AuthService
  ) {}

  register(user: User) {
    console.log('REGISTER_USER');

    // Dispatch REGISTER_USER action
    this.ngRedux.dispatch({
      type: UserActionsTypes.REGISTER_USER
    });

    this.authService.register(user).subscribe(
      response => {

        console.log('REGISTER_USER_SUCCES');
        console.log(response);

        if (response == null) {
          // Dispatch REGISTER_USER_SUCCES action
          this.ngRedux.dispatch({
            type: UserActionsTypes.REGISTER_USER_SUCCES
          });
        }
      },
      error => {
        console.log('REGISTER_USER_ERROR');
        console.log(error);

        // Dispatch REGISTER_USER_ERROR action
        this.ngRedux.dispatch({
          type: UserActionsTypes.REGISTER_USER_ERROR,
          payload: error
        });
      }
    );
  }

  login(user: User) {
    console.log('LOGIN_USER');

    // Dispatch LOGIN_USER action
    this.ngRedux.dispatch({
      type: UserActionsTypes.LOGIN_USER
    });

    this.authService.login(user).subscribe(
      response => {

        console.log('LOGIN_USER_SUCCES');
        console.log(response);

        if (response) {
          // Dispatch LOGIN_USER_SUCCES action
          this.ngRedux.dispatch({
            type: UserActionsTypes.LOGIN_USER_SUCCES,
            payload: response
          });
        }
      },
      error => {
        console.log('LOGIN_USER_ERROR');
        console.log(error);

        // Dispatch LOGIN_USER_ERROR action
        this.ngRedux.dispatch({
          type: UserActionsTypes.LOGIN_USER_ERROR,
          payload: error
        });
      }
    );
  }
}
