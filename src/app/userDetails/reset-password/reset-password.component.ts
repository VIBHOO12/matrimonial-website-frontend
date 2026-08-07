import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  passwordForm: FormGroup;
  userName!: string;
  registration: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationInfoService
  ) {
    this.passwordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  loadRegistrationDetails(): void {
    const resetUserName: string = this.userName !== null ? this.userName : '';
    this.registrationService.findByUserName(resetUserName).subscribe(
      (data: RegistrationInfo) => {
        console.log(data);
        this.registration = {
          rid: data.rid,
          userName: data.userName,
          password: data.password,
          email: data.email,
        };
      },
      (error) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }

  onSubmit() {
    if (this.passwordForm.valid && this.registration) {
      // Extract new password
      const newPassword = this.passwordForm.get('newPassword')?.value;

      // Update password in the registration object
      this.registration.password = newPassword;

      // Call the service to update the password
      this.registrationService.updateRegistration(this.registration.rid, this.registration).subscribe(
        (response) => {
          // Display success message
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully',
          });

          // Redirect to the desired page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error updating password:', error);
          // Display error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to change password.',
          });
        }
      );
    }
  }
}
