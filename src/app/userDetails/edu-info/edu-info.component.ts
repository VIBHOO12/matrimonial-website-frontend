import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EducationInfoService } from '../../services/education-info.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { EducationInfo } from '../../models/educationInfo';
@Component({
  selector: 'app-edu-info',
  templateUrl: './edu-info.component.html',
  styleUrl: './edu-info.component.css'
})
export class EduInfoComponent implements OnInit{
  eduForm: FormGroup;
  userName!: string;
  registration!: RegistrationInfo;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eduInfoService: EducationInfoService,
    private registrationService: RegistrationInfoService,
    private route: ActivatedRoute
  ) {
    this.eduForm = this.formBuilder.group({
      educationLevel: ['', Validators.required],
      educationFiled: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onSubmit() {
    if (this.eduForm.valid) {
      const eduInfoData = {
        registration: this.registration,
        educationLevel: this.eduForm.value.educationLevel,
        educationFiled: this.eduForm.value.educationFiled
      };

      this.eduInfoService.createEduInfo(eduInfoData).subscribe(
        (response) => {
          this.router.navigate(['/login']); // Replace with actual navigation path
          Swal.fire({
            icon: 'success',
            title: 'Educational Info Saved',
            text: 'Your educational information has been saved successfully!',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Failed to save educational info:', error);
          Swal.fire({
            icon: 'error',
            title: 'Save Error',
            text: 'An error occurred while saving your educational information. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK'
      });
    }
  }

  loadRegistrationDetails(): void {
    this.registrationService.findByUserName(this.userName).subscribe(
      (data: RegistrationInfo) => {
        this.registration = data;
      },
      (error: any) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }


}
