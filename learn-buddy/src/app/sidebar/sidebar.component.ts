import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  appName: string = 'LearnBuddy';
  tagLine: string = 'Learn · Practice · Improve';
  topicsDone: number = 2;
  topicsTotal: number = 44;
  percentDone(): number {
    return Math.round((this.topicsDone / this.topicsTotal) * 100);
  }
}
