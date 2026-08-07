import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service'; 
@Component({
  selector: 'app-chat-data',
  templateUrl: './chat-data.component.html',
  styleUrl: './chat-data.component.css'
})
export class ChatDataComponent implements OnInit{
  messages: Message[] = [];
  filteredMessages: Message[] = []; // Array to store filtered messages
  isDisabled = false;
  buttonText = 'Reply';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchMessages(); // Fetch messages when the component initializes
  }

  fetchMessages(): void {
    this.messageService.getAllMessage().subscribe(
      (messages: Message[]) => {
      //  console.log('Fetched messages:', messages); // Log the fetched messages
        this.messages = messages; // Assign the fetched messages to the messages array
        this.filterMessages(); // Filter the messages based on the logged-in user
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  filterMessages(): void {
    const username = sessionStorage.getItem('loggedInUser');
   // console.log('Logged in user:', username);
    this.filteredMessages = this.messages.filter(message => 
      message.toUsername === username
    );
  //  console.log('Filtered messages:', this.filteredMessages);
  }

  onClick() {
    // this.isDisabled = true;
    // this.buttonText = 'Replied';
  }

  
}

