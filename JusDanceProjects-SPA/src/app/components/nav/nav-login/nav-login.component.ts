import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '@models/user';
import { Loadable } from '@redux/helper/loadable';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@redux/store';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent implements OnInit {
  loginForm: FormGroup;
  loadAble: Loadable;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: ''
    }, { validators: this.validateLoginForm });

    this.ngRedux.select(x => x.user).subscribe(state => {
      this.loadAble = state;
    });
  }

  onLoginSubmit() {
    console.log('onLoginSubmit()');
    const user = this.loginForm.value as User;
    console.log(user);
  }

  validateLoginForm: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const username = control.get('username');
    const password = control.get('password');

    console.log('validateLoginForm()');

    return username.valid && password.valid ? null : { 'All required fields need to be filled in': true };
  }
}
