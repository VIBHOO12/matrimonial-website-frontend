import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactinfoService } from '../../services/contactinfo.service';
import { ContactInfo } from '../../models/contactInfo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact1',
  templateUrl: './contact1.component.html',
  styleUrl: './contact1.component.css'
})
export class Contact1Component {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactinfoService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: ContactInfo = this.contactForm.value;
      this.contactService.createContact(contact).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Thank you for reaching out!',
            text: 'Your query has been submitted successfully. We will get back to you shortly.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          this.contactForm.reset();
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops! Something went wrong',
              text: 'We couldn\'t process your request. Please try again later.',
              footer: `<a href="mailto:support@example.com">Contact Support</a>`,
              confirmButtonText: 'Retry',
              confirmButtonColor: '#d33',
              background: '#f8d7da',
              backdrop: `rgba(0,0,0,0.4)`
            });
          }          
      );
    }
  }
}
