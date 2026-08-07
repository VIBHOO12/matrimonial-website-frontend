import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { Router } from '@angular/router';
import { RegistrationInfo } from '../../models/registrationInfo';
@Component({
  selector: 'app-settings-privacy',
  templateUrl: './settings-privacy.component.html',
  styleUrl: './settings-privacy.component.css'
})
export class SettingsPrivacyComponent {
  passwordForm: FormGroup;
  loggedInUser: string | null = null;
  registration: any;
  rid: any;

  constructor(private reset: FormBuilder, private router: Router, private registrationInfoService: RegistrationInfoService) {
    this.passwordForm = this.reset.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
    this.loadRegistrationDetails();
  }

  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  changePassword() {
    if (this.passwordForm.valid && this.registration) {
      const newPassword = this.passwordForm.get('newPassword')?.value;
      this.registration.password = newPassword;

      this.registrationInfoService.updateRegistration(this.rid, this.registration).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully',
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error updating password:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Unable to change password.',
          });
        }
      );
    }
  }

  loadRegistrationDetails(): void {
    const loggedInUserName: string = this.loggedInUser !== null ? this.loggedInUser : '';
    this.registrationInfoService.findByUserName(loggedInUserName).subscribe(
      (data: RegistrationInfo) => {
        this.rid = data.rid;  // Ensure rid is set here
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
  
    
}
