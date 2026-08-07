import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-brides',
  templateUrl: './groom-information.component.html',
  styleUrls: ['./groom-information.component.css']
})
export class GroomInformationComponent implements OnInit{
  user!: any;
  loggedInUser: string | null = null;

  constructor(
    private router : Router
  ) {}
  ngOnInit(): void {
    this.user = history.state.user;
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
    console.log(this.loggedInUser);
  }

  chatBtnDisabled = true;
  interestBtnDisabled = false;
  intrestButton = 'Share Interest';

  onClick(e:Event){
    this.chatBtnDisabled = false;
    this.interestBtnDisabled = true;
    this.intrestButton = 'Interest Shared';

    //sweet alert
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Interest Shared Successfully',
    });

    //Email verification
    const form = document.getElementById('interestForm') as HTMLFormElement;
    emailjs.sendForm('service_rh4ook3', 'template_pvao5ik', form, 'Rra6DMv3qrH7sxVmm')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error: EmailJSResponseStatus) => {
          console.log('FAILED...', error.text);
        }
      );
  }

  OnLocationClick(){
    this.router.navigate(['/location-booking'], {
      state: { user: this.user }
    });
  }

  OnChatClick(){
    this.router.navigate(['/chat'], {
      state: { user: this.user }
    });
  }
}
