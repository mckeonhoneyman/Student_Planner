import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { WeekComponent } from "./components/week/week.component";
import { DayComponent } from "./components/day/day.component";
import { EventCreation } from './components/eventCreation/eventCreation.component';
import { EventView } from './components/eventView/eventView.component';
import { EventEdit } from './components/eventEdit/eventEdit.component';
import { EventService } from './services/event.service';

// this is essentially acting as our display component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, CommonModule, WeekComponent, DayComponent, EventCreation,EventEdit,EventView],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  eventService1 = inject(EventService);
  title = 'Student_planner_app';
  selectedView = "month";
  sidebar='create'

  filterItem = ['Work', 'Class', 'Homework', 'Test', 'Exam', 'Meeting', 'Clubs', 'Study', 'Break', 'Other'];
  selectedFilter = [false, false, false, false, false, false, false, false, false, false];
  dropdownOpen = false;

  toggleSelectedFilter(index: number){
    this.selectedFilter[index] = !this.selectedFilter[index];
  }

  setSelectedView(view: string){
    this.selectedView = view;
  }

  setSidebar(){
    this.sidebar=this.eventService1.sidebar();
  }
}
