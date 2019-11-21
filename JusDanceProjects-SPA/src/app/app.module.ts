import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatMenuModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ValueComponent } from './components/value/value.component';
import { NavComponent } from './components/nav/nav.component';
import { NavLoginComponent } from './components/nav/nav-login/nav-login.component';
import { IAppState, rootReducer } from '@redux/store';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from '@angular-redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from '@components/home/home.component';
import { RegisterComponent } from '@components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ERRORS } from './shared/custom-errors';
import { RegisterSuccesComponent } from '@components/register/register-succes/register-succes.component';
import { HeaderComponent } from '@components/nav/header/header.component';
import { FooterComponent } from '@components/nav/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    NavLoginComponent,
    HomeComponent,
    RegisterComponent,
    RegisterSuccesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    BrowserAnimationsModule,
    NgbModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {},
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

    ngReduxRouter.initialize(/* args */);
  }
}
