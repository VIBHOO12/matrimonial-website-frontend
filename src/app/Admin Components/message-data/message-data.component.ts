import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message-data',
  templateUrl: './message-data.component.html',
  styleUrl: './message-data.component.css'
})
export class MessageDataComponent implements OnInit{
  messages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messageService.getAllMessage().subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Error fetching messages', error);
      }
    );
  }

  deleteMessage(msgId: number): void {
    console.log('Attempting to delete user with ID:', msgId); // Add this line for debugging
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.deleteMessage(msgId).subscribe(
          () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.removeLocalMessage(msgId); // Remove user from local list
          },
          error => {
            Swal.fire('Error!', 'Error deleting user.', 'error');
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }
  
  removeLocalMessage(msgId: number): void {
    this.messages = this.messages.filter(message => message.msgId !== msgId);
  }
}
