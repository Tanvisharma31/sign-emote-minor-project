import {Component, OnInit} from '@angular/core';
import {ChatbotService} from './chatbot.service';

@Component({
  selector: 'app-converse-page',
  templateUrl: './converse-page.component.html',
  styleUrls: ['./converse-page.component.css'],
})
export class ConversePageComponent implements OnInit {
  userInput: string = '';
  intents: any[] = [];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.getIntents().subscribe(intents => {
      this.intents = intents;
    });
  }

  async onUserInput(event: KeyboardEvent): Promise<void> {
    if (event.key === 'Enter' && this.userInput.trim()) {
      await this.sendMessage(this.userInput);
      this.userInput = ''; // Clear the input field after processing
    }
  }

  async onSendButtonClick(): Promise<void> {
    if (this.userInput.trim()) {
      await this.sendMessage(this.userInput);
      this.userInput = ''; // Clear the input field after processing
    }
  }

  private async sendMessage(message: string): Promise<void> {
    try {
      // Add the user's message to the chat
      this.addMessageToChat('sent', message);

      // Get the chatbot's response
      const response = await this.chatbotService.getResponse(
        message,
        await this.chatbotService.getIntents().toPromise()
      );

      // Add the chatbot's response to the chat
      this.addMessageToChat('received', response);
    } catch (error) {
      console.error('Error sending message:', error);
      this.addMessageToChat('received', "I'm sorry, I encountered an error while processing your request.");
    }
  }

  private addMessageToChat(type: string, message: string): void {
    const listUL = document.getElementById('listUL');
    if (!listUL) return;

    // Create and apply styles
    const style = document.createElement('style');
    style.innerHTML = `
    .dynamic-sent {
      text-align: end;
      float: right;
      width: auto;
      max-width: 45%;
    }
    .dynamic-green {
      margin: 5px;
      text-align: start;
      width: auto;
      padding: 10px;
      background-color: #005c4b;
      border-radius: 15px 15px 0px;
    }
    .dynamic-grey {
      max-width: 45%;
      margin: 5px;
      text-align: start;
      width: auto;
      padding: 10px;
      background-color: #202c33;
      border-radius: 0px 15px 15px;
    }
    .dynamic-dateLabel {
      color: #94bab3;
      display: block;
      text-align: end;
      font-size: x-small;
    }
  `;
    document.head.appendChild(style);

    const myLI = document.createElement('li');
    const myDiv = document.createElement('div');
    const messageDiv = document.createElement('div');
    const dateLabel = document.createElement('label');

    // Set text and attributes
    dateLabel.innerText = new Date().toLocaleTimeString();
    myDiv.setAttribute('class', type === 'sent' ? 'dynamic-sent' : 'dynamic-received');
    messageDiv.setAttribute('class', type === 'sent' ? 'dynamic-green' : 'dynamic-grey');
    messageDiv.innerText = message;

    dateLabel.setAttribute('class', 'dynamic-dateLabel');

    // Append elements
    myDiv.appendChild(messageDiv);
    myLI.appendChild(myDiv);
    messageDiv.appendChild(dateLabel);

    listUL.appendChild(myLI);

    // Scroll to bottom
    const scrollingElement = document.getElementById('chatting');
    if (scrollingElement) {
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
  }

  openFullScreenDP() {
    const fullScreenDP = document.getElementById('fullScreenDP');
    if (fullScreenDP) {
      fullScreenDP.style.display = fullScreenDP.style.display === 'flex' ? 'none' : 'flex';
    }
  }
}
