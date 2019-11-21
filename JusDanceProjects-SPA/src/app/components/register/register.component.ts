import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { User } from '@models/user';
import { UserActions } from '@redux/actions/user.action';
import { IAppState } from '@redux/store';
import { NgRedux } from '@angular-redux/store';
import { Loadable } from '@redux/helper/loadable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loadAble: Loadable;

  constructor(private fb: FormBuilder, private userActions: UserActions, private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      acceptagreement: ''
    }, { validators: this.validateRegisterForm });

    this.ngRedux.select(x => x.user).subscribe(state => {
      this.loadAble = state;
    });
  }

  onRegisterSubmit() {
    this.registerForm.markAllAsTouched();
    console.log('onRegisterSubmit()');
    if (this.registerForm.valid) {

      const user = this.registerForm.value as User;

      this.userActions.register(user);
    }
  }

  validateRegisterForm: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const username = control.get('username');
    const password = control.get('password');
    const accept = control.get('acceptagreement');

    return username.valid && password.valid && !accept.value ? { 'All required fields need to be filled in': true } : null;
  }

}