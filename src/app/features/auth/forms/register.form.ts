import { Validators } from '@angular/forms';

export interface IRegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}

export interface IRegisterSecondHandDealer extends IRegisterForm {
  birthDate: string;
}

export interface IRegisterOrganizer extends IRegisterForm {
  nationalRegister: string;
  organizationName: string;
  organizationPhone: string;
  street: string;
  zip: string;
  city: string;
}

const REGISTER_FORM = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
  firstname: ['', [Validators.required]],
  lastname: ['', [Validators.required]],
  phoneNumber: ['', [Validators.required]],
};

const REGISTER_SECONDHANDDEALER_FORM = {
  ...REGISTER_FORM,
  birthDate: ['', [Validators.required]],
};

const REGISTER_ORGANIZER_FORM = {
  ...REGISTER_FORM,
  nationalRegister: ['', [Validators.required]],
  organizationName: [''],
  organizationPhone: [''],
  street: ['', [Validators.required]],
  zip: ['', [Validators.required]],
  city: ['', [Validators.required]],
};

export const FORMS = {
  secondhanddealer: REGISTER_SECONDHANDDEALER_FORM,
  organizer: REGISTER_ORGANIZER_FORM,
};
