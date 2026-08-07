import { Component } from '@angular/core';
import { RegistrationInfoService } from '../../services/registration-info.service';
@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrl: './registration-data.component.css'
})
export class RegistrationDataComponent {
registrations: any[] = [];


  constructor(private registrationsService: RegistrationInfoService) {}

  ngOnInit() {
    this.fetchRegistrationData();
  }

  fetchRegistrationData() {
    this.registrationsService.getAllRegistrations().subscribe(
      (data: any[]) => {
        this.registrations = data;
      },
      (error) => {
        console.error('Error fetching contact data:', error);
      }
    );
  }

}
