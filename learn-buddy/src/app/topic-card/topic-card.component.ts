import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-topic-card',
  styleUrl: './topic-card.component.css',
  templateUrl: './topic-card.component.html',
})
export class TopicCardComponent {
  no=input.required<number>();
 title = input('Untitled topic');
  status = input('not-started');

}
