import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MyLearningComponent } from './my-learning/my-learning.component';

@Component({
  imports: [SidebarComponent,HeaderComponent,MyLearningComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
