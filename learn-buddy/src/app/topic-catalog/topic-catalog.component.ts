import { Component, signal } from '@angular/core';
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
  topics = signal<Topic[]>([...ANGULAR_TOPICS]);
  filter = signal<string>('all');
  selectedNo = signal<number | null>(null);
  lastAction = signal<string>('Nothing yet');
  favorites = signal<number[]>([]);
  stats = signal({ opened: 0, completed: 0 });

  setFilter(value: string) {
    this.filter.set(value);
  }
  onOpen(no: number): void {
    this.selectedNo.set(no);
    this.lastAction.set('Opened topic ' + no);
    this.stats.update((current) => ({ ...current, opened: current.opened + 1 }));
  }
  onComplete(no: number): void {
    this.topics.set(
      this.topics().map((topic): Topic => {
        if (topic.no === no) {
          return {
            ...topic,
            status: 'done',
            subTopicsDone: topic.subTopicsTotal,
          };
        }
        return topic;
      }),
    );
    this.lastAction.set('Completed topic ' + no);
    this.stats.update((c) => ({ ...c, completed: c.completed + 1 }));
  }
  onReview(no: number): void {
    this.selectedNo.set(no);
    this.lastAction.set('Reviewed topic ' + no);
  }
  toggleFavorite(no: number): void {
      this.favorites.update(current => {
    if (current.includes(no)) {
      return current.filter(n=>n!=no)
    } else {
      return [...current,no]
    }
  });
}
  isFavorite(no: number): boolean {
    if (this.favorites().includes(no)) {
      return true;
    } else {
      return false;
    }
  }
  clear(): void {
    this.topics.set([]);
  }

  restore(): void {
    this.topics.set([...ANGULAR_TOPICS]);
  }

  selectedTopic(): Topic | undefined {
    return this.topics().find((topic) => topic.no === this.selectedNo());
  }

  visibleTopics(): Topic[] {
    if (this.filter() === 'all') {
      return this.topics();
    }
    return this.topics().filter((topic) => topic.status === this.filter());
  }
}
