import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { WeekComponent } from "./components/week/week.component";
import { DayComponent } from "./components/day/day.component";

// this is essentially acting as our display component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, CommonModule, WeekComponent, DayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student_planner_app';
  selectedView = "month";

  filterItem = ['Work', 'Class', 'Homework', 'Test', 'Exam', 'Meeting', 'Clubs', 'Study', 'Break', 'Other'];
  selectedFilter = [false, false, false, false, false, false, false, false, false, false];
  dropdownOpen = false;

  toggleSelectedFilter(index: number){
    this.selectedFilter[index] = !this.selectedFilter[index];
  }

  setSelectedView(view: string){
    this.selectedView = view;
  }
}
