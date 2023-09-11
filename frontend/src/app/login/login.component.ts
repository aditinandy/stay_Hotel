import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  activeField: any;
  enterNumber: any = true;
  getOTP!: FormGroup;
  getOTPVerify!: FormGroup
  loginRedirection: boolean = true;
  userType: any = 'Customer'

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  @ViewChildren('digitInput')
  digitInputs!: QueryList<ElementRef>;

  ngOnInit() {
    this.getOTP = this.formBuilder.group({
      phone: ['', [Validators.required]],
      userType: [this.userType, [Validators.required]],
    })

    this.getOTPVerify = this.formBuilder.group({
      digit1: ['', [Validators.required]],
      digit2: ['', [Validators.required]],
      digit3: ['', [Validators.required]],
      digit4: ['', [Validators.required]],
      digit5: ['', [Validators.required]],
      digit6: ['', [Validators.required]],
    })
  }

  onDigitInput(digitNumber: number) {
    this.activeField = digitNumber
    const nextDigitNumber = digitNumber + 1;
    const nextInput = this.digitInputs.toArray()[nextDigitNumber - 1]?.nativeElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

  selectField(digitNumber: number) {
    this.activeField = digitNumber
  }

  setCursorPosition(input: HTMLInputElement) {
    input.selectionStart = input.selectionEnd = input.value.length;
  }

  onClick(digitNumber: number) {
    const input = this.digitInputs.toArray()[digitNumber - 1].nativeElement;
    this.setCursorPosition(input);
  }

  // onBackspace(fieldNumber: number) {
  //   if (fieldNumber > 1) {
  //     this.activeField = fieldNumber - 1;
  //   }
  // }

  onBackspace(event: KeyboardEvent, currentField: number) {
    // if (event.key === 'Backspace' && this.activeField >= 1) {
    //   event.preventDefault();
    //   const previousField = `digit${this.activeField}`;
    //   this.getOTPVerify.get(previousField)?.setValue('');
    //   this.selectField(this.activeField - 1);
    // }


    if (event.key === 'Backspace' && currentField >= 1) {
      const previousFieldIndex = currentField - 2; // Adjusted for 0-based index

      if (this.getOTPVerify) {
        const previousInput = this.digitInputs.toArray()[previousFieldIndex]?.nativeElement;

        if (previousInput) {
          setTimeout(() => {
            previousInput.focus();
          }, 0); // Use setTimeout to ensure cursor style updates

          this.getOTPVerify?.get(`digit${currentField}`)?.setValue(''); // Clear current field
        }
      }
    }
  }

  loginOTP() {
    const formValues = this.getOTP.value;
    const formValuesJson = JSON.stringify(formValues);
    if (this.getOTP.valid) {
      this.http.post(environment.nodeapi + 'signup', formValues).subscribe(
        (res: any) => {
          console.log(formValuesJson);
          if (res[0].message == false) {
            this.enterNumber = true
            // this.router.navigate(['/']);
          } else {
            this.enterNumber = false
            sessionStorage.setItem('phone', formValuesJson.split(':')[1].split('"')[1])
            console.log(this.enterNumber, res[0].message);
          }

        }
        , (error: HttpErrorResponse) => {
          console.log(error.status);
          if (error.status === 500) {
            this.enterNumber = false
            console.log(this.enterNumber);
          }
          console.log(formValuesJson.split(':')[1].split('"')[1]);
          sessionStorage.setItem('phone', formValuesJson.split(':')[1].split('"')[1])
          this.getOTP.reset();
        }
      )
    }
  }

  loginOTPVerify() {
    const formValues = this.getOTPVerify.value;
    var otp = {}
    otp = { otp: formValues.digit1 + formValues.digit2 + formValues.digit3 + formValues.digit4 + formValues.digit5 + formValues.digit6, phone: sessionStorage.getItem('phone') }

    if (otp) {
      this.http.post(environment.nodeapi + 'otpverify', otp).subscribe(
        (res) => {
          this.enterNumber = true
          console.log(this.enterNumber, res);
          this.getOTPVerify.reset();
        }
        , (error: HttpErrorResponse) => {
          console.log(error.status);
          if (error.status === 500) {
            this.enterNumber = false
            console.log(this.enterNumber);
          }
        }
      )
    }
  }

  loginForHotel() {
    this.userType = 'Hotel'
    this.loginRedirection = false
    this.getOTP = this.formBuilder.group({
      phone: ['', [Validators.required]],
      userType: [this.userType, [Validators.required]],
    })
    this.router.navigate(['/']);
  }

  loginForCustomer() {
    this.userType = 'Customer'
    this.loginRedirection = true
    this.getOTP = this.formBuilder.group({
      phone: ['', [Validators.required]],
      userType: [this.userType, [Validators.required]],
    })
    this.router.navigate(['/']);
  }

  // showSuccessToast() {
  //   const toast: NgbToast = this.toastService.show('Success message', {
  //     header: 'Success',
  //     autohide: true,
  //   });
  // }

}
