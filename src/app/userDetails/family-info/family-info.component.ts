import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FamillyInfoService } from '../../services/familly-info.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import { FamilyInfo } from '../../models/familyInfo';
import { RegistrationInfoService } from '../../services/registration-info.service';
@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent implements OnInit {
  familyForm: FormGroup;
  registration!: RegistrationInfo;
  userName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private familyInfoService: FamillyInfoService,
    private registrationService: RegistrationInfoService,
    private route: ActivatedRoute
  ) {
    this.familyForm = this.formBuilder.group({
      familyStatus: ['', Validators.required],
      familyType: ['', Validators.required],
      fatherName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onSubmit() {
    if (this.familyForm.valid) {
      const familyInfoData = {
        registration: this.registration,
        familyStatus: this.familyForm.value.familyStatus,
        familyType: this.familyForm.value.familyType,
        fatherName: this.familyForm.value.fatherName
      };

      this.familyInfoService.createFamilyInfo(familyInfoData).subscribe(
        (response) => { 
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Family Info Saved',
            text: 'Your family information has been saved successfully!',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/personal', this.userName]); // Redirect to the next page after saving
        },
        (error) => {
          console.error('Failed to save family info:', error);
          Swal.fire({
            icon: 'error',
            title: 'Save Error',
            text: 'An error occurred while saving your family information. Please try again later.',
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
      (error) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }
}
