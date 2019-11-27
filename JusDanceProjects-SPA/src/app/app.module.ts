import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatMenuModule,
  MatDividerModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ValueComponent } from './components/value/value.component';
import { NavComponent } from './components/nav/nav.component';
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
import { ErrorInterceptorProvider } from '@services/error.interceptor';
import { LoginComponent } from '@components/login/login.component';
import { AlertModule } from '@services/_alert';
import { FooterComponent } from '@components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
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
    RouterModule.forRoot(appRoutes),
    AlertModule,
    MatDividerModule
  ],
  providers: [ErrorInterceptorProvider, {
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
