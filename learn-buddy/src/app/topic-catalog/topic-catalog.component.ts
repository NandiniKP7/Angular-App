import { Component } from '@angular/core';
import { TopicCardComponent } from '../topic-card/topic-card.component';
import { Topic } from '../models/topic';
import { ANGULAR_TOPICS } from '../data/angular-topics';

@Component({
  imports: [TopicCardComponent],
  selector: 'app-topic-catalog',
  styleUrl: './topic-catalog.component.css',
  templateUrl: './topic-catalog.component.html',
})
export class TopicCatalogComponent {
  topics: Topic[] = [...ANGULAR_TOPICS];
  lastAction: string = 'Nothing yet';
  filter: string = 'all';

  onOpen(no: number): void {
    this.lastAction = 'Opened topic ' + no;
  }
  onComplete(no: number): void {
    this.topics = this.topics.map((topic): Topic => {
      if (topic.no === no) {
        return {
          ...topic,
          status: 'done',
          subTopicsDone: topic.subTopicsTotal,
        };
      }
      return topic;
    });
    this.lastAction = 'Completed topic ' + no;
  }
  onReview(no: number): void {
    this.lastAction = 'Reviewed topic ' + no;
  }

  clear(): void {
    this.topics = [];
  }

  restore(): void {
    this.topics = [...ANGULAR_TOPICS];
  }

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics(): Topic[] {
    if (this.filter === 'all') {
      return this.topics;
    }
    return this.topics.filter((topic) => topic.status === this.filter);
  }
}
