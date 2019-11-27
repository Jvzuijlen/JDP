import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IUserState } from '@redux/store';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { AlertService } from '@services/_alert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export enum UserActionsTypes {
  REGISTER_USER = '[User] Register user',
  REGISTER_USER_SUCCES = '[User] Register user succesful',
  REGISTER_USER_ERROR = '[User] Register user error',
  LOGIN_USER = '[User] Login user',
  LOGIN_USER_SUCCES = '[User] Login user succesful',
  LOGIN_USER_ERROR = '[User] Login user failed',
  LOGOUT_USER = '[User] Log out user',
  LOADABLE_RESET = '[LOADABLE] Reset loadable'
}

@Injectable({ providedIn: 'root' })
export class UserActions {
  jwtHelper = new JwtHelperService();

  constructor(
    private ngRedux: NgRedux<IUserState>,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  register(user: User) {
    console.log('REGISTER_USER');

    this.alertService.clear();

    // Dispatch REGISTER_USER action
    this.ngRedux.dispatch({
      type: UserActionsTypes.REGISTER_USER
    });

    this.authService.register(user).subscribe(
      response => {
        console.log('REGISTER_USER_SUCCES');
        console.log(response);

        if (response == null) {
          this.alertService.success('Register Succesfull!');

          // Dispatch REGISTER_USER_SUCCES action
          this.ngRedux.dispatch({
            type: UserActionsTypes.REGISTER_USER_SUCCES
          });
        }
      },
      error => {
        console.log('REGISTER_USER_ERROR');
        console.log(error);

        this.alertService.warn(error);

        // Dispatch REGISTER_USER_ERROR action
        this.ngRedux.dispatch({
          type: UserActionsTypes.REGISTER_USER_ERROR,
          payload: error
        });
      }
    );
  }

  login(user: User, token: string) {
    console.log('LOGIN_USER');

    this.alertService.clear();

    if (token == null) {
      // Dispatch LOGIN_USER action
      this.ngRedux.dispatch({
        type: UserActionsTypes.LOGIN_USER
      });

      this.authService.login(user).subscribe(
        (response: any) => {
          // tslint:disable-next-line: no-shadowed-variable
          const user = response;

          console.log('LOGIN_USER_SUCCES');

          if (user) {
            this.alertService.success('Login Succesfull!');

            localStorage.setItem('token', user.token);

            // Dispatch LOGIN_USER_SUCCES action
            this.ngRedux.dispatch({
              type: UserActionsTypes.LOGIN_USER_SUCCES,
              payload: {
                loggedIn: true,
                decodeToken: this.jwtHelper.decodeToken(user.token)
              }
            });

            this.router.navigate(['/home']);
          }
        },
        error => {
          console.log('LOGIN_USER_ERROR');
          console.log(error);

          this.alertService.error(error);

          // Dispatch LOGIN_USER_ERROR action
          this.ngRedux.dispatch({
            type: UserActionsTypes.LOGIN_USER_ERROR,
            payload: error
          });
        }
      );
    } else {
      // Dispatch LOGIN_USER_SUCCES action
      this.ngRedux.dispatch({
        type: UserActionsTypes.LOGIN_USER_SUCCES,
        payload: {
          loggedIn: true,
          decodeToken: this.jwtHelper.decodeToken(token)
        }
      });
    }
  }

  logout() {
    console.log('LOGOUT_USER');

    this.authService.logout();

    // Dispatch LOGIN_USER_SUCCES action
    this.ngRedux.dispatch({
      type: UserActionsTypes.LOGOUT_USER,
      payload: {
        loggedIn: false,
        decodeToken: null
      }
    });
  }

  resetLoadable() {
    console.log('LOADABLE_RESET');

    // Dispatch LOADABLE_RESET action
    this.ngRedux.dispatch({
      type: UserActionsTypes.LOADABLE_RESET
    });
  }
}
