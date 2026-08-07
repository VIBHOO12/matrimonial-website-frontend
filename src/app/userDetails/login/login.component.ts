import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistrationInfoService } from '../../services/registration-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  isFormSubmitted: boolean = false;
  registration: any;
  loginInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationInfoService
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.invalid) {
      this.showToast('error', 'Please fill out both Username and Password');
      return;
    }
    
    sessionStorage.setItem('loggedInUser', this.userForm.value.userName);
    const loginInfo = {
      userName: this.userForm.value.userName,
      password: this.userForm.value.password,
    };

    if(this.userForm.value.userName === "admin1" && this.userForm.value.password === "Admin@1234"){
      this.showToast('success', 'Admin Signed in successfully');
      this.router.navigate(['/admin'])
    }
    else{
    this.registrationService.findByUserName(loginInfo.userName).subscribe(
      (data) => {
        if (data && data.password === loginInfo.password) {
          this.showToast('success', 'Signed in successfully');
          this.router.navigate(['/page']);
        } else {
          this.showToast('error', 'Incorrect username or password');
        }
      },
      (error) => {
        console.error('Error fetching registration details:', error);
        this.showToast('error', 'User not found');
      }
    );
  }
}

  showToast(icon: 'success' | 'error', title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }
}
