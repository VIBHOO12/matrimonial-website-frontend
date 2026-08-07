import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{
  ngOnInit(): void {
  }
  lookingFor: string = 'man'; // Default to 'man' for initial display
  showInformation: any;
  
    constructor(private router: Router) { }
  
    showProfile(): string {
      if (this.lookingFor === 'man') {
        return '/grooms'; // Navigate to groom page
      } else {
        return '/brides'; // Navigate to bride page
      }
    }

  

  dropdownActive: boolean = false;

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }

  closeDropdown() {
    this.dropdownActive = false;
  }


}
