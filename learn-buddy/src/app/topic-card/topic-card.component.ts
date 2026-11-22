import { booleanAttribute, Component, input, output } from '@angular/core';
import { Topic } from '../models/topic';

@Component({
  imports: [],
  selector: 'app-topic-card',
  styleUrl: './topic-card.component.css',
  templateUrl: './topic-card.component.html',
})
export class TopicCardComponent {
  topic = input.required<Topic>();
  compact = input(false, { transform: booleanAttribute });
  opened = output<number>();
  completed = output<number>();
  reviewRequested = output<number>();
  percent(): number {
    const topic = this.topic();
    if (topic.subTopicsTotal === 0) {
      return 0;
    }
    return Math.round((topic.subTopicsDone / topic.subTopicsTotal) * 100);
  }
}
