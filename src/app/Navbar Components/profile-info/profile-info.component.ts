import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserinfoService } from '../../services/userinfo.service';
import { EducationInfoService } from '../../services/education-info.service';
import { FamillyInfoService } from '../../services/familly-info.service';
import { PersonalInfoService } from '../../services/personal-info.service';
import { forkJoin } from 'rxjs';
import { RegistrationInfoService } from '../../services/registration-info.service';
import Swal from 'sweetalert2';
import { EducationInfo } from '../../models/educationInfo';
import { FamilyInfo } from '../../models/familyInfo';
import { PersonalInfo } from '../../models/personalInfo';
import { RegistrationInfo } from '../../models/registrationInfo';
import { UserInfo } from '../../models/user-info.model';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName!: string | null;
  userInfo: any = {
    firstName: '',
    lastName: '',
    age: null,
    dateOfBirth: Date,
    gender: '',
    email: '',
    educationCareer: {
      educationLevel: '',
      educationFiled: '',
      id: null
    },
    familyInfo: {
      familyType: '',
      familyStatus: '',
      fatherName: '',
      id: null
    },
    personalInfo: {
      bloodGroup: '',
      photograph: null,
      id: null
    },
    registrationInfo: {
      userName: '',
      email: '',
      password: '',
      rid: null
    },
    registration: null
  };
  passwordVisible: boolean = false;
  selectedFile: File | null = null;
  constructor(
    private router: Router,
    private userService: UserinfoService,
    private educationCareerService: EducationInfoService,
    private familyInfoService: FamillyInfoService,
    private personalInfoService: PersonalInfoService,
    private registrationInfoService: RegistrationInfoService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userName = sessionStorage.getItem('loggedInUser');
      this.isLoggedIn = !!this.userName;
      console.log('Logged in user:', this.userName);
    } else {
      this.userName = null;
    }

    if (this.isLoggedIn && this.userName) {
      forkJoin({
        registrationInfo: this.registrationInfoService.getAllRegistrations(),
        userInfo: this.userService.getAllUser(),
        educationCareers: this.educationCareerService.getAllEducation(),
        familyInfos: this.familyInfoService.getAllFamily(),
        personalInfos: this.personalInfoService.getAllPersonalInfo()
      }).subscribe(({ registrationInfo, userInfo, educationCareers, familyInfos, personalInfos }) => {
        const loggedInUserRegistration = registrationInfo.find(registration => registration.userName === this.userName);
        if (loggedInUserRegistration) {
          const loggedInUserInfo = userInfo.find(user => user.registration.rid === loggedInUserRegistration.rid);
          const loggedInUserEducationCareer = educationCareers.find(ec => ec.registration.rid === loggedInUserRegistration.rid);
          const loggedInUserFamilyInfo = familyInfos.find(fi => fi.registration.rid === loggedInUserRegistration.rid);
          const loggedInUserPersonalInfo = personalInfos.find(pi => pi.registration.rid === loggedInUserRegistration.rid);

          this.userInfo = {
            firstName: loggedInUserInfo?.firstName || '',
            lastName: loggedInUserInfo?.lastName || '',
            age: loggedInUserInfo?.age || null,
            dateOfBirth: loggedInUserInfo?.dateOfBirth || '',
            gender: loggedInUserInfo?.gender || '',
            email: loggedInUserRegistration.email || '',
            educationCareer: {
              educationLevel: loggedInUserEducationCareer?.educationLevel || 'Not available',
              educationFiled: loggedInUserEducationCareer?.educationFiled || 'Not available',
              id: loggedInUserEducationCareer?.id
            },
            familyInfo: {
              familyStatus: loggedInUserFamilyInfo?.familyStatus || 'Not available',
              familyType: loggedInUserFamilyInfo?.familyType || 'Not available',
              fatherName: loggedInUserFamilyInfo?.fatherName || 'Not available',
              id: loggedInUserFamilyInfo?.id
            },
            personalInfo: {
              bloodGroup: loggedInUserPersonalInfo?.bloodGroup || 'Not available',
              photograph: loggedInUserPersonalInfo?.photograph || 'Not available',
              id: loggedInUserPersonalInfo?.id
            },
            registrationInfo: {
              userName: loggedInUserRegistration?.userName || 'Not available',
              email: loggedInUserRegistration?.email || 'Not available',
              password: loggedInUserRegistration?.password || 'Not available',
              rid: loggedInUserRegistration?.rid
            },
            registration: loggedInUserRegistration
          };
        }
      });
    }
  }

  updateProfile() {
  if (this.isLoggedIn && this.userName) {
    const { rid } = this.userInfo.registrationInfo;
    const educationCareerId = this.userInfo.educationCareer.id;
    const familyInfoId = this.userInfo.familyInfo.id;
    const personalInfoId = this.userInfo.personalInfo.id;
    //const originalUserInfo = JSON.parse(JSON.stringify(this.userInfo));
    const formData = new FormData();
    formData.append('bloodGroup', this.userInfo.personalInfo.bloodGroup);
    formData.append('registration', JSON.stringify(this.userInfo.registrationInfo));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    forkJoin({
      registrationInfo: this.registrationInfoService.updateRegistration(rid, this.userInfo.registrationInfo),
      userInfo: this.userService.updateUserInfo(rid, this.userInfo),
      educationCareers: this.educationCareerService.updateEducationInfo(rid, this.userInfo.educationCareer),
      familyInfos: this.familyInfoService.updateFamilyInfo(rid, this.userInfo.familyInfo),
      personalInfos: this.personalInfoService.updatePersonalInfo(rid, formData)
    }).subscribe({
      next: ({
        registrationInfo,
        userInfo,
        educationCareers,
        familyInfos,
        personalInfos
      }: {
        registrationInfo: RegistrationInfo,
        userInfo: UserInfo,
        educationCareers: EducationInfo,
        familyInfos: FamilyInfo,
        personalInfos: PersonalInfo
      }) => {
        this.userInfo = {
          firstName: userInfo?.firstName || '',
          lastName: userInfo?.lastName || '',
          age: userInfo?.age || null,
          dateOfBirth: userInfo?.dateOfBirth || '',
          gender: userInfo?.gender || '',
          email: registrationInfo.email || '',
          educationCareer: {
            educationLevel: educationCareers?.educationLevel || 'Not available',
            educationFiled: educationCareers?.educationFiled || 'Not available',
            id: educationCareers?.id
          },
          familyInfo: {
            familyStatus: familyInfos?.familyStatus || 'Not available',
            familyType: familyInfos?.familyType || 'Not available',
            fatherName: familyInfos?.fatherName || 'Not available',
            id: familyInfos?.id
          },
          personalInfo: {
            bloodGroup: personalInfos?.bloodGroup || 'Not available',
            photograph: personalInfos?.photograph || null,
            id: personalInfos?.id
          },
          registrationInfo: {
            userName: registrationInfo?.userName || 'Not available',
            password: registrationInfo?.password || 'Not available',
            email: registrationInfo?.email || 'Not available',
            rid: registrationInfo?.rid
          },
          registration: registrationInfo
        };

      //  const hasChanges = JSON.stringify(originalUserInfo) !== JSON.stringify(this.userInfo);
        if (!this.userInfo.educationCareer.id) {
          console.error('Education career ID is missing:', this.userInfo.educationCareer);
        }
        if (!this.userInfo.familyInfo.id) {
          console.error('Family info ID is missing:', this.userInfo.familyInfo);
        }
        if (!this.userInfo.personalInfo.id) {
          console.error('Personal info ID is missing:', this.userInfo.personalInfo);
        }
     
          Swal.fire('Success', 'Profile updated successfully', 'success');
        
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        Swal.fire('Error', 'Failed to update profile', 'error');
      }
    });
  } else {
    Swal.fire('Error', 'User is not logged in', 'error');
  }
}

handleFileInput(event: any) {
  const file = event.target.files[0];
  this.selectedFile = file;
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

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
