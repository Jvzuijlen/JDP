import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IUserState, DecodedToken } from '@redux/store';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { AlertService, Alert, AlertType } from '@services/_alert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

export enum UserActionsTypes {
  REGISTER_USER = '[User] Register user',
  REGISTER_USER_SUCCES = '[User] Register user succesful',
  REGISTER_USER_ERROR = '[User] Register user error',
  LOGIN_USER = '[User] Login user',
  LOGIN_USER_SUCCES = '[User] Login user succesful',
  LOGIN_USER_ERROR = '[User] Login user failed',
  LOGOUT_USER = '[User] Log out user',
  GET_USER = '[User] Get current user',
  GET_USER_SUCCES = '[User] Get current user succesful',
  GET_USER_ERROR = '[User] Get current user failed',
  GET_USERS = '[User] Get users',
  GET_USERS_SUCCES = '[User] Get users succesful',
  GET_USERS_ERROR = '[User] Get users failed',
  LOADABLE_RESET = '[LOADABLE] Reset loadable'
}

@Injectable({ providedIn: 'root' })
export class UserActions {
  jwtHelper = new JwtHelperService();

  constructor(
    private ngRedux: NgRedux<IUserState>,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  register(user: User) {
    this.alertService.clear();

    this.ngRedux.dispatch({
      type: UserActionsTypes.REGISTER_USER
    });

    this.authService.register(user).subscribe(
      response => {
        if (response != null) {
          this.alertService.alert(
            new Alert({
              message: 'Succesfully registered! You can login now:',
              type: AlertType.Success,
              keepAfterRouteChange: true
            })
          );

          this.ngRedux.dispatch({
            type: UserActionsTypes.REGISTER_USER_SUCCES
          });

          this.router.navigate(['/login']);

        } else {
          console.log('response !== null');
        }
      },
      error => {
        console.log(error);

        this.alertService.warn(error);

        this.ngRedux.dispatch({
          type: UserActionsTypes.REGISTER_USER_ERROR,
          payload: error
        });
      }
    );
  }

  login(user: User, token: string) {
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

          if (user) {
            this.alertService.success('Login Succesfull!');

            localStorage.setItem('token', user.token);

            const decodedToken: DecodedToken = this.jwtHelper.decodeToken(user.token);

            this.ngRedux.dispatch({
              type: UserActionsTypes.LOGIN_USER_SUCCES,
              payload: {
                loggedIn: true,
                decodeToken: decodedToken
              }
            });

            this.router.navigate(['/home']);

            this.getUser(decodedToken.nameid);

          } else {
            console.log('user != null');
          }
        },
        error => {
          console.log(error);

          this.alertService.error(error);

          this.ngRedux.dispatch({
            type: UserActionsTypes.LOGIN_USER_ERROR,
            payload: error
          });
        }
      );
    } else {

      const decodedToken: DecodedToken = this.jwtHelper.decodeToken(token);

      this.ngRedux.dispatch({
        type: UserActionsTypes.LOGIN_USER_SUCCES,
        payload: {
          loggedIn: true,
          decodeToken: decodedToken
        }
      });

      this.getUser(decodedToken.nameid);
    }
  }

  logout() {
    this.authService.logout();

    this.ngRedux.dispatch({
      type: UserActionsTypes.LOGOUT_USER,
      payload: {
        loggedInUser: null,
        loggedIn: false,
        decodeToken: null
      }
    });

    this.router.navigate(['/home']);
  }

  getUser(id) {
    this.ngRedux.dispatch({
      type: UserActionsTypes.GET_USER
    });

    this.userService.getUser(id).subscribe(
      (response: User) => {
        if (response != null) {
          this.ngRedux.dispatch({
            type: UserActionsTypes.GET_USER_SUCCES,
            payload: response
          });

        } else {
          console.log('response !== null');
        }
      },
      error => {
        console.log(error);

        this.alertService.warn(error);

        this.ngRedux.dispatch({
          type: UserActionsTypes.GET_USER_ERROR,
          payload: error
        });
      }
    );
  }

  getUsers() {
    this.ngRedux.dispatch({
      type: UserActionsTypes.GET_USERS
    });

    this.userService.getUsers().subscribe(
      (response: User[]) => {
        if (response != null) {
          this.ngRedux.dispatch({
            type: UserActionsTypes.GET_USERS_SUCCES,
            payload: response
          });

        } else {
          console.log('response !== null');
        }
      },
      error => {
        console.log(error);

        this.alertService.warn(error);

        this.ngRedux.dispatch({
          type: UserActionsTypes.GET_USERS_ERROR,
          payload: error
        });
      }
    );
  }

  resetLoadable() {
    this.ngRedux.dispatch({
      type: UserActionsTypes.LOADABLE_RESET
    });
  }
}
