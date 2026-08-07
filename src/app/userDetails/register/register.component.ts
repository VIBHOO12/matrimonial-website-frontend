import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormSubmitted: boolean = false;
  rid: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit(e: Event): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      this.registrationService.createRegistration(registrationData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Verify Your Email',
            text: 'Check your inbox for verification instructions.',
            confirmButtonText: 'OK'
          });

          // EmailJS sending
          const templateParams = {
            user_name: registrationData.userName,
            user_email: registrationData.email
          };

          emailjs.send(
            'service_6yo8lxn',         // ✅ Your EmailJS Service ID
            'template_ma5hek7',        // ✅ Your EmailJS Template ID
            templateParams,
            'tLJd5GoK1E28IX2W3'        // ✅ Your Public Key
          ).then(
            (result: EmailJSResponseStatus) => {
              console.log('Email sent!', result.status, result.text);
            },
            (error: EmailJSResponseStatus) => {
              console.error('Failed to send email:', error.text);
            }
          );

          // Navigation after success
          this.router.navigate(['/verify-email']);
          this.router.navigate(['/user', registrationData.userName]);
        },
        (error) => {
          console.error('Error during registration:', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Object.values(this.registrationForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  // Custom validator for password match
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsNotMatch: true });
    }
  }
}

