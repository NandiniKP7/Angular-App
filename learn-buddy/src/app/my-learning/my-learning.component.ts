import { Component } from '@angular/core';
import { TodayBuildComponent } from '../today-build/today-build.component';
import { TrackCardsComponent } from '../track-cards/track-cards.component';
import { TodayChoiceComponent } from '../today-choice/today-choice.component';
import { TopicCatalogComponent } from '../topic-catalog/topic-catalog.component';

@Component({
  imports: [TodayBuildComponent, TrackCardsComponent,TodayChoiceComponent,TopicCatalogComponent],
  selector: 'app-my-learning',
  styleUrl: './my-learning.component.css',
  templateUrl: './my-learning.component.html',
})
export class MyLearningComponent {}
