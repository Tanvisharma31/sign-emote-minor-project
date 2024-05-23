// converse-page.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ConversePageComponent } from './converse-page.component';
import { ChatbotService } from './chatbot.service';

const routes: Routes = [
  {
    path: '',
    component: ConversePageComponent
  }
];

@NgModule({
  declarations: [
    ConversePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ChatbotService
  ],
  exports: [
    ConversePageComponent
  ]
})
export class ConversePageModule { }

