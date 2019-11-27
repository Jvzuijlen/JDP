import { Component, OnInit } from '@angular/core';
import { UserActions } from '@redux/actions/user.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState, DecodedToken } from '@redux/store';
import { AuthService } from '@services/auth.service';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'JusDanceProjects-SPA';
  screenWidth: number;
  lxScreenWidth = 1600;
  decodeToken: DecodedToken;

  constructor(
    private router: Router,
    private userActions: UserActions,
    private ngRedux: NgRedux<IAppState>,
    public authService: AuthService
  ) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        userActions.resetLoadable();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

    if (authService.loggedIn()) {
      userActions.login(null, authService.getToken());
    }

    this.ngRedux.select(x => x.user).subscribe(state => {
      this.decodeToken = state.decodeToken;
    });
  }

  ngOnInit() {}

  onLogout() {
    this.userActions.logout();
  }
}
