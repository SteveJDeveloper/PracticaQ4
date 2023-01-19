import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ErrorValidate } from 'src/app/utils/interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  fromEcuador(control: FormControl): ErrorValidate | null {
    let value: string = control.value;
    if (value.substring(0, 3).includes("09") || value.substring(0, 3).includes("+593")) {
      return null;
    }
    return { noFromEcuador: true };
  }

  maxLength(max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length > max ? { maxLength: true } : null;
    }
  }

  minLength(min: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length < min ? { minLength: true } : null;
    }
  }
}
