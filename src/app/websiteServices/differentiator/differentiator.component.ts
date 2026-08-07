import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserinfoService } from '../../services/userinfo.service'; 
import { EducationInfoService } from '../../services/education-info.service';
import { FamillyInfoService } from '../../services/familly-info.service'; 
import { PersonalInfoService } from '../../services/personal-info.service'; 
import { forkJoin } from 'rxjs';
import { RegistrationInfoService } from '../../services/registration-info.service'; 
import { UserInfo } from '../../models/user-info.model'; 
import { RegistrationInfo } from '../../models/registrationInfo';

@Component({
  selector: 'app-differentiator',
  templateUrl: './differentiator.component.html',
  styleUrls: ['./differentiator.component.css']
})
export class DifferentiatorComponent implements OnInit {
  personalInfo: any = [];
  users: any = [];
  educationInfo: any = [];
  familyInfo: any = [];
  loggedInUser: string | null = null;
  registration: any;
  allUserInfo: any[] = [];
  gender: any;

  constructor(
    private userService: UserinfoService,
    private registrationService: RegistrationInfoService,
    private educationCareerService: EducationInfoService,
    private familyInfoService: FamillyInfoService,
    private personalInfoService: PersonalInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.isBrowser()) {
      this.loggedInUser = sessionStorage.getItem('loggedInUser');
    }
    if (this.loggedInUser) {
      this.loadRegistrationDetails();

      this.userService.getAllUser().subscribe(
        (userInfo: any[]) => {
          this.allUserInfo = userInfo;
          console.log(this.allUserInfo);
          
          const currentUser = this.allUserInfo.find(user => user.registration.userName === this.loggedInUser);
          if (currentUser) {
            this.gender = currentUser.gender;
            console.log(this.gender);
            this.loadAllInfo();
          } else {
            console.error('Logged in user not found in user info');
          }
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    }
  }
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  loadAllInfo(): void {
    forkJoin({
      userInfo: this.userService.getAllUser(),
      educationCareers: this.educationCareerService.getAllEducation(),
      familyInfos: this.familyInfoService.getAllFamily(),
      personalInfos: this.personalInfoService.getAllPersonalInfo()
    }).subscribe(
      ({ userInfo, educationCareers, familyInfos, personalInfos }) => {
        this.users = userInfo
          .filter(user => user.gender !== this.gender)
          .map(user => {
            const educationCareer = educationCareers.find(ec => ec?.registration?.rid === user.registration.rid);
            const familyInfo = familyInfos.find(fi => fi?.registration?.rid === user.registration.rid);
            const personalInfo = personalInfos.find(pi => pi?.registration?.rid === user.registration.rid);
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              age: user.age,
              gender: user.gender,
              dateOfBirth: user.dateOfBirth,
              registration: user.registration,
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
        console.log(this.registration?.rid);
      },
      (error) => {
        console.error('Error fetching combined info:', error);
      }
    );
  }
  

  viewDetails(user: any): void {
    const targetRoute = this.gender === 'Male' ? 'brides/bride-info' : 'grooms/groom-info';
    this.router.navigate([targetRoute], {
      state: { user }
    });
  }

  loadRegistrationDetails(): void {
    const loggedInUserName = this.loggedInUser || '';
    this.registrationService.findByUserName(loggedInUserName).subscribe(
      (data: RegistrationInfo) => {
        console.log(data);
        this.registration = data;
      },
      (error) => {
        console.error('Error fetching registration details:', error);
      }
    );
  }
}
