import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import { RegistrationInfoService } from '../../services/registration-info.service';
@Component({
  selector: 'app-location-booking-data',
  templateUrl: './location-booking-data.component.html',
  styleUrl: './location-booking-data.component.css'
})
export class LocationBookingDataComponent implements OnInit{
  locations: Location[] = [];
  filteredLocation: Location[] = []; // Array to store filtered locations
  isDisabled = false;
  buttonText = 'Reply';

  constructor(
    private locationService: LocationService,
    private registrationService: RegistrationInfoService
  ) {} // Inject RegistrationInfoService

  ngOnInit(): void {
    this.fetchLocations(); // Fetch locations when the component initializes
  }

  fetchLocations(): void {
    this.locationService.getAllLocation().subscribe(
      (locations: Location[]) => {
      //  console.log('Fetched locations:', locations); // Log the fetched locations
        this.locations = locations; // Assign the fetched locations to the locations array
        this.filterLocations(); // Filter the locations based on logged-in user
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  // filterLocations(): void {
  //   const username = sessionStorage.getItem('loggedInUser');
  //  // console.log('Logged in user:', username);
  //   this.filteredLocation = this.locations.filter(location => location.registration.userName === username);
  //   //console.log('Filtered locations:', this.filteredLocation);
  // }

  filterLocations(): void {

  if (typeof window === 'undefined') {
    return;
  }

  const username = window.sessionStorage.getItem('loggedInUser');

  if (!username) {
    return;
  }

  this.filteredLocation = this.locations.filter(
    location => location.registration.userName === username
  );
}
  onClick() {
    // this.isDisabled = true;
    // this.buttonText = 'Replied';
  }


  
/*
  loadRegistrationDetails(): void {
    const username = sessionStorage.getItem('loggedInUser'); // Get logged-in user's username
    if (username) { // Check if username is defined
      this.registrationService.findByUserName(username).subscribe(
        (data: RegistrationInfo) => {
          console.log('Registration details:', data);
          this.registration = data; // Assign fetched registration details
          this.filterLocations(); // After fetching registration details, filter the locations
        },
        (error) => {
          console.error('Error fetching registration details:', error);
        }
      );
    }
  }
  */

}

