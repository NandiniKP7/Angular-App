import { Component } from '@angular/core';
import { TodayBuildComponent } from '../today-build/today-build.component';
import { TrackCardsComponent } from '../track-cards/track-cards.component';
import { WelcomeCardComponent } from '../welcome-card/welcome-card.component';

@Component({
  imports: [TodayBuildComponent, TrackCardsComponent,WelcomeCardComponent],
  selector: 'app-my-learning',
  styleUrl: './my-learning.component.css',
  templateUrl: './my-learning.component.html',
})
export class MyLearningComponent {}
