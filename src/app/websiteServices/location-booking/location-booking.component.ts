import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
import Swal from 'sweetalert2';
import { RegistrationInfo } from '../../models/registrationInfo';
@Component({
  selector: 'app-location-booking',
  templateUrl: './location-booking.component.html',
  styleUrl: './location-booking.component.css'
})
export class LocationBookingComponent implements OnInit{
  user!: any;
  userName!: any;
  loggedInUser!: any;
  interestForm!: FormGroup;
  registration!:any;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private registrationInfoService: RegistrationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = history.state.user;
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
    this.userName = this.user.personalInfo.registration.userName;

    console.log(this.userName);

    this.interestForm = this.fb.group({
      name: [this.loggedInUser, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });

    this.registration = this.loadRegistrationDetails()
  }

  onSubmit(): void {
    console.log(this.registration)
    if (this.interestForm.valid) {
        const location: Location = {
          ...this.interestForm.value,
          registration: this.registration
        };
      this.locationService.saveLocation(location).subscribe(
        response => {
          console.log('Message saved successfully', response);
          // Navigate or give feedback to the user
          this.router.navigate(['/page']);
          //alert
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Location Booking Successfully"
          });
        },
        error => {
          console.error('Error saving message', error);
        }
      );
    }
  }

  loadRegistrationDetails(): void {
    this.registrationInfoService.findByUserName(this.userName).subscribe(
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
