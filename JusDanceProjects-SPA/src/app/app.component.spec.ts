import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule } from '@angular/material';
import { NavComponent } from '@components/nav/nav.component';
import { NavLoginComponent } from '@components/nav/nav-login/nav-login.component';
import { ValueComponent } from '@components/value/value.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ValueComponent, NavComponent, NavLoginComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        BrowserAnimationsModule,
        NgbModule,
        NgReduxModule,
        NgReduxRouterModule.forRoot(),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'JusDanceProjects-SPA'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('JusDanceProjects-SPA');
  });
});
