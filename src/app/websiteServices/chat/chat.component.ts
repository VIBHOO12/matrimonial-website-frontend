import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { RegistrationInfoService } from '../../services/registration-info.service';
import { Router } from '@angular/router';
import { Message } from '../../models/message';
import Swal from 'sweetalert2';
import { RegistrationInfo } from '../../models/registrationInfo';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  user!: any;
  userName!: string;
  loggedInUser!: string | null;
  chatForm!: FormGroup;
  registration!: RegistrationInfo;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private registrationInfoService: RegistrationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = history.state.user;
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
    this.userName = this.user.personalInfo.registration.userName;

    console.log(this.userName);

    this.chatForm = this.fb.group({
      fromUsername: [this.loggedInUser, Validators.required], // Assign the logged-in user's username to fromUsername
      message: ['', Validators.required],
    });

    this.loadRegistrationDetails();
  }

  onSubmit(): void {
    if (this.chatForm.valid && this.registration) {
      const message: Message = {
        ...this.chatForm.value,
        toUsername: this.registration.userName,
        sentTime: new Date(),
        registration: this.registration
      };
      
      this.messageService.saveMessage(message).subscribe(
        response => {
          console.log('Message saved successfully', response);
          // Navigate or give feedback to the user
          this.router.navigate(['/page']);
          // alert
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Message Sent Successfully"
          });
        },
        error => {
          console.error('Error saving message', error);
        }
      );
    }
  }

  loadRegistrationDetails(): void {
    this.registrationInfoService.findByUserName(this.userName).subscribe(
      (data: RegistrationInfo) => {
        console.log(data);
        this.registration = data;
        this.registration = {
          rid: data.rid,
          userName: data.userName,
          password: data.password,
          email: data.email,
        };
      },
      (error) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }
}