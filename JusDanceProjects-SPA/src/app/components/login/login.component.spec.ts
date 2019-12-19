import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from '@services/_alert/alert.component';
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES
} from 'ng-bootstrap-form-validation';
import {
  MatDividerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatMenuModule,
  MatCardModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'app/routes';
import { HomeComponent } from '@components/home/home.component';
import { NavComponent } from '@components/nav/nav.component';
import { RegisterComponent } from '@components/register/register.component';
import { FooterComponent } from '@components/footer/footer.component';
import { AppComponent } from 'app/app.component';
import { ValueComponent } from '@components/value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { AlertModule } from '@services/_alert';
import { ErrorInterceptorProvider } from '@services/error.interceptor';
import { CUSTOM_ERRORS } from 'app/shared/custom-errors';
import { AccountComponent } from '@components/account/account.component';
import { DanceOffersComponent } from '@components/dance-offers/dance-offers.component';
import { TimeAgoPipe } from 'app/shared/time-ago.pipe';
import { FilterCourseTypesPipe } from 'app/shared/filter-course-types.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { getToken } from 'app/app.module';
import { environment } from 'environments/environment';
import { AuthGuard } from 'app/guards/auth.guard';
import { LessonsComponent } from '@components/lessons/lessons.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ValueComponent,
        NavComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        AccountComponent,
        DanceOffersComponent,
        TimeAgoPipe,
        FilterCourseTypesPipe,
        LessonsComponent
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
        MatDividerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatCardModule,
        BrowserAnimationsModule,
        NgbModule,
        NgReduxModule,
        NgReduxRouterModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        AlertModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: getToken,
            whitelistedDomains: [environment.baseUrl],
            blacklistedRoutes: [environment.baseUrl + '/api/auth']
          }
        }),
      ],
      providers: [ErrorInterceptorProvider, {
        provide: CUSTOM_ERROR_MESSAGES,
        useValue: CUSTOM_ERRORS,
        multi: true
      }, AuthGuard]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
