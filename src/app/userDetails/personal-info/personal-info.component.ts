import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';;
import { PersonalInfoService } from '../../services/personal-info.service';
import { RegistrationInfo } from '../../models/registrationInfo';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { PersonalInfo } from '../../models/personalInfo';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit{
  personalForm: FormGroup;
  registration!: RegistrationInfo;
  userName!: string;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personalInfoService: PersonalInfoService,
    private registrationService: RegistrationInfoService,
    private route: ActivatedRoute
  ) {
    this.personalForm = this.formBuilder.group({
      photograph: [null, Validators.required],
      bloodGroup: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.personalForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('bloodGroup', this.personalForm.get('bloodGroup')!.value);
      formData.append('registration', JSON.stringify(this.registration));

      this.personalInfoService.createPersonalInfo(formData).subscribe(
        (response) => {
          this.router.navigate(['/edu', this.userName]);
          console.log('Personal info received successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Personal info saved successfully',
            text: 'Your Personal information has been saved successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/edu', this.userName]);
        },
        (error) => {
          console.error('Failed to save personal info:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to save personal info',
            text: error.message,
            showConfirmButton: true,
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please fill out all required fields.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  loadRegistrationDetails(): void {
    this.registrationService.findByUserName(this.userName).subscribe(
      (data: RegistrationInfo) => {
        this.registration = data;
      },
      (error) => {
        console.error('Error fetching registration details:', error);
      }
    );
  }
}