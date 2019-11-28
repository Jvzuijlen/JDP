import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Loadable } from '@redux/helper/loadable';
import { UserActions } from '@redux/actions/user.action';
import { IAppState } from '@redux/store';
import { NgRedux } from '@angular-redux/store';
import { User } from '@models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadAble: Loadable;
  loggedIn: boolean;

  constructor(private fb: FormBuilder, private userActions: UserActions, private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: ''
    }, { validators: this.validateloginForm });

    this.ngRedux.select(x => x.user).subscribe(state => {
      this.loadAble = state;
      this.loggedIn = state.loggedIn;
    });
  }

  onloginSubmit() {
    this.loginForm.markAllAsTouched();
    console.log('onloginSubmit()');
    if (this.loginForm.valid) {

      const user = this.loginForm.value as User;

      this.userActions.login(user, null);
    }
  }

  validateloginForm: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const password = control.get('password');

    return email.valid && password.valid ? null : { 'All required fields need to be filled in': true };
  }
}
