import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student_planner_app';
  meetings = {
    '2024-04-05': ['Dring Coffee', 'Learn React', 'Sleep'],
    '2024-04-06': ['Dring Coffee', 'Learn Angular', 'Sleep'],
  }
}
