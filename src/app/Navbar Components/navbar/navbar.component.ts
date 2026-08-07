import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { PersonalInfoService } from '../../services/personal-info.service';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean = false; 
  userName!: string | null;
  userInfo: any = {};
  constructor(private router: Router,
    private userService: UserinfoService,
    private personalInfoService: PersonalInfoService,
    private registrationInfoService: RegistrationInfoService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userName = sessionStorage.getItem('loggedInUser');
      this.isLoggedIn = !!this.userName; // Update isLoggedIn based on userName presence
      console.log('Logged in user:', this.userName);
    } else {
      this.userName = null; // Handle server-side rendering or other environments
    }
    if (this.isLoggedIn && this.userName) {
      forkJoin({
        registrationInfo: this.registrationInfoService.getAllRegistrations(),
        userInfo: this.userService.getAllUser(),
        personalInfos: this.personalInfoService.getAllPersonalInfo()
      }).subscribe(({ registrationInfo, userInfo, personalInfos }) => {
        const loggedInUserRegistration = registrationInfo.find(registration => registration.userName === this.userName);
        if (loggedInUserRegistration) {
          const loggedInUserInfo = userInfo.find(user => user.registration.rid === loggedInUserRegistration.rid);
          const loggedInUserPersonalInfo = personalInfos.find(pi => pi.registration.rid === loggedInUserRegistration.rid);
          
          this.userInfo = {
            firstName: loggedInUserInfo?.firstName,
            lastName: loggedInUserInfo?.lastName,
            age: loggedInUserInfo?.age,
            dateOfBirth: loggedInUserInfo?.dateOfBirth,
            gender: loggedInUserInfo?.gender,
            email: loggedInUserRegistration.email,
            personalInfo: {
              bloodGroup: loggedInUserPersonalInfo?.bloodGroup || 'Not available',
              photograph: loggedInUserPersonalInfo?.photograph || 'Not available'
            }
          };
        }
      });
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('loggedInUser'); // Clear session storage
    }
    this.isLoggedIn = false; // Update isLoggedIn state
    this.userName = null; // Clear userName
    this.showToast('success', 'Logout successfully');
    this.router.navigate(['']); 
  }
  
  isSubMenuOpen: boolean = false;

  toggleMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
    console.log('Toggle menu called. Submenu is now open: ', this.isSubMenuOpen);
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

