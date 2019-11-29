import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@redux/store';
import { AlertService, Alert, AlertType } from '@services/_alert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private alert: AlertService
  ) {
    this.ngRedux
      .select(x => x.user)
      .subscribe(state => {
        this.isLoggedIn = state.loggedIn;
      });
  }

  canActivate(): boolean {
    if (this.isLoggedIn) {
      return true;
    }

    this.alert.alert(new Alert({ message: 'Om deze pagina te bezoeken moet je ingelogd zijn',
     type: AlertType.Warning, keepAfterRouteChange: true }));

    this.router.navigate(['/login']);
    return false;
  }
}
