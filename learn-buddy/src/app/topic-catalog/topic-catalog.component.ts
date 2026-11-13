import { Component } from '@angular/core';

const ANGULAR_TOPICS = [
  { no: '01', title: 'Angular Application Setup & Architecture', status: 'Not Started' },
  { no: '02', title: 'String Interpolation', status: 'Not Started' },
  { no: '03', title: 'Components', status: 'Not Started' },
  { no: '04', title: 'Property Binding', status: 'Not Started' },
  { no: '05', title: 'Event Binding', status: 'Not Started' },
  { no: '06', title: 'Two-Way Binding', status: 'Not Started' },
  { no: '07', title: 'Angular Template Control Flow', status: 'Not Started' },
  { no: '08', title: 'Parent → Child Communication with input()', status: 'Not Started' },
  { no: '09', title: 'Child → Parent Communication with output()', status: 'Not Started' },
  { no: '10', title: 'Writable Signals', status: 'Not Started' },
  { no: '11', title: 'Computed Signals', status: 'Not Started' },
  { no: '12', title: 'Signal Inputs', status: 'Not Started' },
  { no: '13', title: 'Signal-Based State Changes', status: 'Not Started' },
  { no: '14', title: 'effect()', status: 'Not Started' },
  { no: '15', title: 'TypeScript Models / Interfaces in Angular', status: 'Not Started' },
  { no: '16', title: 'Pipes', status: 'Not Started' },
  { no: '17', title: 'Custom Pipes', status: 'Not Started' },
  { no: '18', title: 'Services', status: 'Not Started' },
  { no: '19', title: 'Dependency Injection', status: 'Not Started' },
  { no: '20', title: 'Sharing Data / State with Services', status: 'Not Started' },
  { no: '21', title: 'Routing', status: 'Not Started' },
  { no: '22', title: 'Route Parameters & Navigation', status: 'Not Started' },
  { no: '23', title: 'Forms Fundamentals', status: 'Not Started' },
  { no: '24', title: 'Template-Driven Forms', status: 'Not Started' },
  { no: '25', title: 'Reactive Forms', status: 'Not Started' },
  { no: '26', title: 'Form Validation', status: 'Not Started' },
  { no: '27', title: 'HTTP Client', status: 'Not Started' },
  { no: '28', title: 'Calling REST APIs', status: 'Not Started' },
  { no: '29', title: 'Loading, Error & Empty States', status: 'Not Started' },
  { no: '30', title: 'RxJS Fundamentals', status: 'Not Started' },
  { no: '31', title: 'Observables & Subscriptions', status: 'Not Started' },
  { no: '32', title: 'Signals and RxJS Together', status: 'Not Started' },
  { no: '33', title: 'Component Lifecycle', status: 'Not Started' },
  { no: '34', title: 'Reusable Component Design', status: 'Not Started' },
  { no: '35', title: 'Angular Application Structure', status: 'Not Started' },
  { no: '36', title: 'Testing Angular Components & Services', status: 'Not Started' },
  { no: '37', title: 'Build a Feature Independently', status: 'Not Started' },
  { no: '38', title: 'linkedSignal()', status: 'Not Started' },
  { no: '39', title: 'Route Guards — Basics', status: 'Not Started' },
  { no: '40', title: 'HTTP Interceptors — Basics', status: 'Not Started' },
  { no: '41', title: 'Change Detection & Performance Basics', status: 'Not Started' },
  { no: '42', title: 'Deferred Loading', status: 'Not Started' },
  { no: '43', title: 'Accessibility Basics', status: 'Not Started' },
  { no: '44', title: 'Build & Deployment Basics', status: 'Not Started' }
];

@Component({
  imports: [],
  selector: 'app-topic-catalog',
  styleUrl: './topic-catalog.component.css',
  templateUrl: './topic-catalog.component.html',
})
export class TopicCatalogComponent {
  topics=[...ANGULAR_TOPICS]
  clear():void{
    this.topics = []
  }
  restore():void{
    this.topics=[...ANGULAR_TOPICS]
  }
}
