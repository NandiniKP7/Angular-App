import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-today-choice',
  styleUrl: './today-choice.component.css',
  templateUrl: './today-choice.component.html',
})
export class TodayChoiceComponent {
  choice:string='';
  saved:string='';
  save():void
  {
     this.saved==this.choice
  }
}
