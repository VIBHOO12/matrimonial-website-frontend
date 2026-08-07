import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserinfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ContactinfoService } from '../../services/contactinfo.service';
import { forkJoin } from 'rxjs';
import { PersonalInfoService } from '../../services/personal-info.service';
import { FamillyInfoService } from '../../services/familly-info.service';
import { EducationInfoService } from '../../services/education-info.service';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { LocationService } from '../../services/location.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users: any[] = [];
  personalInfo: any = [];
  educationInfo: any = [];
  familyInfo: any = [];
  totalGrooms: number = 0;
  totalBrides: number = 0;
  totalRegistrations: number = 0;
  totalMessages: number = 0;
  totalQueries: number = 0;
  totalLocations: number = 0;

  constructor(
    private userService: UserinfoService,
    private messageService: MessageService,
    private contactService: ContactinfoService,
    private router: Router,
    private registrationsService: RegistrationInfoService,
    private educationCareerService: EducationInfoService,
    private familyInfoService: FamillyInfoService,
    private personalInfoService: PersonalInfoService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDashboardData();
    this.fetchTotalMessages();
    this.fetchTotalQueries();

    forkJoin({
      regdInfo: this.registrationsService.getAllRegistrations(),
      userInfo: this.userService.getAllUser(),
      educationCareers: this.educationCareerService.getAllEducation(),
      familyInfos: this.familyInfoService.getAllFamily(),
      personalInfos: this.personalInfoService.getAllPersonalInfo()
    }).subscribe(({ userInfo, educationCareers, familyInfos, personalInfos }) => {
      this.users = userInfo.map(user => {
        const educationCareer = educationCareers.find(ec => ec.registration.rid === user.registration.rid);
        const familyInfo = familyInfos.find(fi => fi.registration.rid === user.registration.rid);
        const personalInfo = personalInfos.find(pi => pi.registration.rid === user.registration.rid);
        return {
          ...user,
          educationCareer: {
            educationLevel: educationCareer?.educationLevel || 'Not available',
            educationFiled: educationCareer?.educationFiled || 'Not available'
          },
          familyInfo: {
            familyStatus: familyInfo?.familyStatus || 'Not available',
            familyType: familyInfo?.familyType || 'Not available',
            fatherName: familyInfo?.fatherName || 'Not available'
          },
          personalInfo: personalInfo || null
        };
      });
    });
  }

  deleteUser(event: any, rid: number) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Delete User RID:', rid);
            event.target.innerText = 'Deleting...';
            this.registrationsService.deleteUser(rid).subscribe((res: any) => {
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                );
            }, (error) => {
                console.error('Error deleting user', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the user.',
                    'error'
                );
            });
        }
    });
}

  

  fetchUsers(): void {
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout() {
    Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('loggedInUser');
    }
    this.router.navigate(['']);
  }

  fetchDashboardData() {
    this.userService.getAllUser().subscribe(
      (userInfo: any[]) => {
        this.totalGrooms = userInfo.filter(reg => reg.gender === 'Male').length;
        this.totalBrides = userInfo.filter(reg => reg.gender === 'Female').length;
        this.totalRegistrations = userInfo.length;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  fetchTotalMessages(): void {
    this.messageService.getAllMessage().subscribe(
      (messages: any[]) => {
        this.totalMessages = messages.length;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  fetchTotalQueries(): void {
    this.contactService.getAllContacts().subscribe(
      (contacts: any[]) => {
        this.totalQueries = contacts.length;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  fetchTotalLocations(): void{
    this.locationService.getAllLocation().subscribe(
      (locations: any[]) => {
        this.totalLocations = locations.length;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    )
  }

  viewDetails(user: any): void {
    if (user.gender === 'Male') {
        this.router.navigate(['grooms/groom-info'], {
            state: { user }
        });
    } else{
        this.router.navigate(['brides/bride-info'], {
            state: { user }
      });
    }
  }
}