// chatbot.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface QuestionAnswer {
  tags: string[];
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private dataUrl = './questions-answers.json';

  constructor(private http: HttpClient) {}

  getQuestionAnswers(): Observable<QuestionAnswer[]> {
    return this.http.get<QuestionAnswer[]>(this.dataUrl);
  }

  getResponse(input: string, qaList: QuestionAnswer[]): string {
    input = input.toLowerCase();
    for (let qa of qaList) {
      for (let tag of qa.tags) {
        if (input.includes(tag)) {
          return qa.response;
        }
      }
    }
    return "I'm sorry, I don't understand your question.";
  }
}
