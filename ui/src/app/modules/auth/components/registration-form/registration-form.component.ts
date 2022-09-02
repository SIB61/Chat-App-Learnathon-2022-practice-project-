import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  matchPassword,
  strongPassword,
  validAge,
} from '@common/validators/custom.validator';
import { Subscription } from 'rxjs';
import { fade, slideR } from 'src/app/common/animations/enterleave.animation';
import { RegistrationModel } from 'src/app/common/models/registrationModel';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { AbsRegistratoinService } from '../../services/abs/abs-registration.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styles: [],
  animations: [slideR],
  providers: [
    { provide: AbsRegistratoinService, useClass: RegistrationService },
  ],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AbsRegistratoinService,
    private snackbar: MatSnackBar,
    private loaderService: LoaderService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}
  subscription: Subscription;
  hidden: boolean;
  rHidden: boolean;
  invalidUserName: boolean;
  invalidEmail: boolean;
  showProgres: boolean;
  regFormGroup: UntypedFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, validAge]],
    password: ['', [Validators.required, strongPassword]],
    repeatedPassword: ['', [Validators.required, matchPassword]],
  });
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.hidden = true;
    this.rHidden = true;
    this.invalidUserName = false;
    this.invalidEmail = false;
    this.showProgres = false;
  }

  getErrorMsg(control: AbstractControl | null) {
    switch (control) {
      case this.regFormGroup.get('username'):
        if (control?.hasError('required')) return '*username required';
        break;
      case this.regFormGroup.get('email'):
        if (control?.hasError('required')) return '*email required';
        else if (control?.hasError('email')) return '*invalid email';
        break;
      case this.regFormGroup.get('birthDate'):
        if (control?.hasError('required')) return '*date for birth is required';
        else if (control?.hasError('validAge')) return '*minimum age is 18';
        break;
      case this.regFormGroup.get('password'):
        if (control?.hasError('required')) return '*password required';
        else if (control?.hasError('strongPassword'))
          return '*weak! must include lowercase uppercase and number';
        break;
      case this.regFormGroup.get('repeatedPassword'):
        if (control?.hasError('required')) return '*repeated password required';
        else if (control?.hasError('matchPassword'))
          return "*password didn't match";
        break;
      default:
        return '*error';
    }
    return '*error';
  }

  register(content: RegistrationModel) {
    this.loaderService.setLoading(true);
    console.warn('from register method');
    this.showProgres = true;
    this.invalidEmail = false;
    this.invalidUserName = false;
    this.subscription = this.authService
      .register({
        username: content.username,
        email: content.email,
        password: content.password,
        birthDate: content.birthDate,
      })
      .subscribe({
        next: (value) => {
          console.warn(value);
          if (value) {
            this.showProgres = false;
            this.loaderService.setLoading(false);
            this.snackbar.open('Registered Successfully', 'ok');
            localStorage.setItem('access_token', value.data.token);
            localStorage.setItem('refresh_token', value.data.refreshToken);
            localStorage.setItem('username', value.data.username);
            localStorage.setItem('expired_time',value.data.expiredTime);
            this.router.navigateByUrl('/home');
          }
        },
        error: (error: HttpErrorResponse) => {
          this.showProgres = false;
          if (error.error == 'username') {
            this.invalidUserName = true;
            this.snackbar.open('username allready exists', 'ok');
          } else if (error.error == 'email') {
            this.invalidEmail = true;
            this.snackbar.open('email allready exists', 'ok');
          }
          console.warn(error);
          this.loaderService.setLoading(false);
          this.snackbar.open('registration failed', 'ok');
        },
      });
  }
  toggleVisibility(t: number) {
    if (t == 1) this.hidden = !this.hidden;
    else if (t == 2) this.rHidden = !this.rHidden;
  }
}
