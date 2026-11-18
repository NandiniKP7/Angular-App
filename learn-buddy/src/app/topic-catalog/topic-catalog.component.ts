
import { Component } from '@angular/core';

const ANGULAR_TOPICS = [
  { no: '01', title: 'Angular Application Setup & Architecture', status: 'done' },
  { no: '02', title: 'String Interpolation', status: 'done' },
  { no: '03', title: 'Components', status: 'done' },
  { no: '04', title: 'Property Binding', status: 'done' },
  { no: '05', title: 'Event Binding', status: 'done' },
  { no: '06', title: 'Two-Way Binding', status: 'done' },
  { no: '07', title: 'Angular Template Control Flow', status: 'in-progress' },
  { no: '08', title: 'Parent → Child Communication with input()', status: 'not-started' },
  { no: '09', title: 'Child → Parent Communication with output()', status: 'not-started' },
  { no: '10', title: 'Writable Signals', status: 'not-started' },
  { no: '11', title: 'Computed Signals', status: 'not-started' },
  { no: '12', title: 'Signal Inputs', status: 'not-started' },
  { no: '13', title: 'Signal-Based State Changes', status: 'not-started' },
  { no: '14', title: 'effect()', status: 'not-started' },
  { no: '15', title: 'TypeScript Models / Interfaces in Angular', status: 'not-started' },
  { no: '16', title: 'Pipes', status: 'not-started' },
  { no: '17', title: 'Custom Pipes', status: 'not-started' },
  { no: '18', title: 'Services', status: 'not-started' },
  { no: '19', title: 'Dependency Injection', status: 'not-started' },
  { no: '20', title: 'Sharing Data / State with Services', status: 'not-started' },
  { no: '21', title: 'Routing', status: 'not-started' },
  { no: '22', title: 'Route Parameters & Navigation', status: 'not-started' },
  { no: '23', title: 'Forms Fundamentals', status: 'not-started' },
  { no: '24', title: 'Template-Driven Forms', status: 'not-started' },
  { no: '25', title: 'Reactive Forms', status: 'not-started' },
  { no: '26', title: 'Form Validation', status: 'not-started' },
  { no: '27', title: 'HTTP Client', status: 'not-started' },
  { no: '28', title: 'Calling REST APIs', status: 'not-started' },
  { no: '29', title: 'Loading, Error & Empty States', status: 'not-started' },
  { no: '30', title: 'RxJS Fundamentals', status: 'not-started' },
  { no: '31', title: 'Observables & Subscriptions', status: 'not-started' },
  { no: '32', title: 'Signals and RxJS Together', status: 'not-started' },
  { no: '33', title: 'Component Lifecycle', status: 'not-started' },
  { no: '34', title: 'Reusable Component Design', status: 'not-started' },
  { no: '35', title: 'Angular Application Structure', status: 'not-started' },
  { no: '36', title: 'Testing Angular Components & Services', status: 'not-started' },
  { no: '37', title: 'Build a Feature Independently', status: 'not-started' },
  { no: '38', title: 'linkedSignal()', status: 'not-started' },
  { no: '39', title: 'Route Guards — Basics', status: 'not-started' },
  { no: '40', title: 'HTTP Interceptors — Basics', status: 'not-started' },
  { no: '41', title: 'Change Detection & Performance Basics', status: 'not-started' },
  { no: '42', title: 'Deferred Loading', status: 'not-started' },
  { no: '43', title: 'Accessibility Basics', status: 'not-started' },
  { no: '44', title: 'Build & Deployment Basics', status: 'not-started' }
];

@Component({
  imports: [],
  selector: 'app-topic-catalog',
  styleUrl: './topic-catalog.component.css',
  templateUrl: './topic-catalog.component.html',
})
export class TopicCatalogComponent {
  topics = [...ANGULAR_TOPICS];
  filter: string = 'all';

  clear(): void {
    this.topics = [];
  }

  restore(): void {
    this.topics = [...ANGULAR_TOPICS];
  }

  setFilter(value: string): void {
    this.filter = value;
  }

  visibleTopics() {
    if (this.filter === 'all') {
      return this.topics;
    }
    return this.topics.filter((topic) => topic.status === this.filter);
  }
}
