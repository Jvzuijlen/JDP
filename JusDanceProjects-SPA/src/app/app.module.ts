import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { NavLoginComponent } from './nav/nav-login/nav-login.component';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      NavLoginComponent
   ],
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
      NgbModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
