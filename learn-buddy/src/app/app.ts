import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  appName: string = 'LearnBuddy';
  tagLine: string = 'Learn · Practice · Improve';
  pageTitle: string = 'My Learning';
  weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  topicNo: string = '02';
  topicTitle: string = 'String Interpolation';
  topicsDone: number = 2;
  topicsTotal: number = 44;
  percentDone(): number {
    return Math.round((this.topicsDone / this.topicsTotal) * 100);
  }
  topicsLeft():number{
    return this.topicsTotal-this.topicsDone
  }
}
