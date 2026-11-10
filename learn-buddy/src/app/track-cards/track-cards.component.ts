import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-track-cards',
  styleUrl: './track-cards.component.css',
  templateUrl: './track-cards.component.html',
})
export class TrackCardsComponent {
  angularName: string = 'Angular';
  typescriptName: string = 'TypeScript';
  csharpName: string = 'C# / .NET';
  angularIcon: string = 'angular.png';
  typescriptIcon: string = 'typescript.png';
  csharpIcon: string = 'csharp.png';
  csharpLocked: boolean = true;
  csharpHint: string = 'Coming later';
  angularHint: string = 'Open the Angular topics';
  typescriptHint: string = 'Open the TypeScript topics';
  iconSize: number = 48;
  angularStatus: string = 'In progress';
  typescriptStatus: string = 'Continue roadmap';
  csharpStatus: string = 'Not started';
  angularPercent: number = 5;
  typescriptPercent: number = 30;
}
