import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
  imports: [SidebarComponent,HeaderComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  topicNo: string = '03';
  topicTitle: string = 'Components';
  appName: string = 'LearnBuddy';
}
