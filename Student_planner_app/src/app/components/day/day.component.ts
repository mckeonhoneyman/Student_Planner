import { Component,InputSignal,Signal,WritableSignal,computed,input,signal, } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { RouterOutlet } from '@angular/router';
import { Event, EventService } from '../../services/event.service';

@Component({
  selector: 'app-day',
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {

  DateTime = DateTime; // for use in the template

  constructor(public calendarService: CalendarService) {}

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
  console.log('Event clicked:', event);
  alert(`Event: ${event.eventName}\nTime: ${event.sTime} - ${event.eTime}`);
}

getEventStyle(event: Event): any {
  const start = DateTime.fromISO(`${event.date}T${event.sTime}`);
  const end = DateTime.fromISO(`${event.date}T${event.eTime}`);

  const offset = 63; // DONT ASK
  const hourHeight = 35.75; // DONT ASK

const startHours = start.hour + start.minute / 60;
let endHours = end.hour + end.minute / 60;

if (end.hour === 0 && end.minute === 0) {
  endHours = 24;
}

const top = startHours * hourHeight + offset;
const height = (endHours - startHours) * hourHeight;

  return {
    position: 'absolute',
    top: `${top}px`,
    height: `${height}px`,
    left: '10px',
    right: '10px',
    marginInline: '6px',
  
    'background-color': event.color || '#90caf9',
    'border-left': '4px solid black',
    'border-radius': '6px',
    padding: '6px',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'text-align': 'center',
    'box-sizing': 'border-box',
  };
}
}