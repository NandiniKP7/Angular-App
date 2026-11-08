import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  pageTitle: string = 'My Learning';
  greeting: string = 'Good to see you'
  weekday: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
}
