import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserinfoService } from '../../services/userinfo.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import { UserInfo } from '../../models/user-info.model';
import { RegistrationInfoService } from '../../services/registration-info.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  userInfo: any;
  userForm: FormGroup;
  registration!: RegistrationInfo;
  userName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userInfoService: UserinfoService,
    private registrationService: RegistrationInfoService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      dateOfBirth: [Date,Validators.required],
      gender: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    console.log(this.userName)
    this.loadRegistrationDetails();
    console.log(this.registration)
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userInfoData = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        dateOfBirth: this.userForm.value.dateOfBirth, 
        gender: this.userForm.value.gender,
        registration: this.registration,// Instantiate a Date object here
      };
      
      this.userInfoService.createUserInfo(userInfoData).subscribe(
        () => {
          this.router.navigate(['/family', this.userName]);
          Swal.fire({
            icon: 'success',
            title: 'User Info Saved',
            text: 'Your information has been saved successfully!',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.error('Failed to save user info:', error);
          Swal.fire({
            icon: 'error',
            title: 'Save Error',
            text: 'An error occurred while saving your information. Please try again later.',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  }  

  loadRegistrationDetails(): void {
    this.registrationService.findByUserName(this.userName).subscribe(
      (data: RegistrationInfo) => {
        console.log(data);
        this.registration = data;
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