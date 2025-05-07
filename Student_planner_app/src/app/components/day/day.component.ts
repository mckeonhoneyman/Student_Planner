import { Component,InputSignal,Signal,WritableSignal,computed,Input,signal,inject, NgModule } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { RouterOutlet } from '@angular/router';
import { Event, EventService } from '../../services/event.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-day',
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {

  DateTime = DateTime; // for use in the template

  constructor(public calendarService: CalendarService, public eventService:EventService) {}



  goToPreviousDay(): void {
    const ref = this.calendarService.activeDay() ?? this.calendarService.today();
    this.calendarService.activeDay.set(ref.minus({ days: 1 }));
  }

  goToNextDay(): void {
    const ref = this.calendarService.activeDay() ?? this.calendarService.today();
    this.calendarService.activeDay.set(ref.plus({ days: 1 }));
  }

  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    DateTime.fromObject({ hour: i }).toFormat('h a')
  );

  //Returns the date of the active day or today if no active day is set
  dayDate: Signal<DateTime> = computed(() => {
    return this.calendarService.activeDay() ?? this.calendarService.today();
  });

  onEventClick(event: Event): void { // Handle event click
    // You can customize this function to do whatever you want with the event
    this.eventService.viewEvent(event);
    //setSidebar('view');
  //console.log('Event clicked:', event);
  //alert(`Event: ${event.eventName}\nTime: ${event.sTime} - ${event.eTime}`);
}

getEventStyle(event: any): any { // Dont Ask why this works, it just does
  const start = DateTime.fromISO(`${event.date}T${event.sTime}`);
  const end = DateTime.fromISO(`${event.date}T${event.eTime}`);

  const hourHeight = 51; // Match .hour-block height in CSS
  const startHours = start.hour + start.minute / 60;
  const endHours = end.hour + end.minute / 60;

  const offset = 86; // Random offset I had to add to make it look good

  const top = (startHours * hourHeight) + offset;
  const durationInHours = endHours - startHours;
  const height = (durationInHours * hourHeight)

  return {
    position: 'absolute',
    top: `${top}px`,
    height: `${height}px`,
    'background-color': event.color,
    'border-left': '4px solid rgb(0, 0, 0)',
  };
}
}
