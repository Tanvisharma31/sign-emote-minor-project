// converse-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-converse-page',
  templateUrl: './converse-page.component.html',
  styleUrls: ['./converse-page.component.css']
})
export class ConversePageComponent implements OnInit {
  userInput: string = '';
  response: string = '';
  qaList: any[] = [];

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.chatbotService.getQuestionAnswers().subscribe(qaList => {
      this.qaList = qaList;
    });
  }

  onUserInput(event: any): void {
    this.userInput = event.target.value;
    this.response = this.chatbotService.getResponse(this.userInput, this.qaList);
  }
}
