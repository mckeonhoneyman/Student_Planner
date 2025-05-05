import { Injectable } from '@angular/core';
import { signal, WritableSignal, computed, Signal } from '@angular/core';
import { DateTime } from 'luxon'; 
import { Event, EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  today: Signal<DateTime> = signal(DateTime.local());
  activeDay: WritableSignal<DateTime> = signal(this.today());
  firstDayOfActiveMonth: WritableSignal<DateTime>;

  constructor(private eventService: EventService) {
    this.firstDayOfActiveMonth = signal(
      this.activeDay().startOf('month')
    );
  }

  getEvents(): Event[] {
    return this.eventService.events(); // Get all events from EventService
  }

  getEventsForHour(date: string, hour: number): Event[] {
    return this.eventService.eventList().filter((event) => {
      if (event.date !== date) return false;

      const [startHour] = event.sTime.split(':').map(Number);
      const [endHour] = event.eTime.split(':').map(Number);

      return startHour <= hour && hour < endHour;
    });
}
  
    getEventsForDate(date: string): Event[] {
    return this.eventService.events().filter(event =>
      event.date === date
    );}
  
    getEventsForMonth(month: number): Event[] {
      return this.eventService.eventList().filter((event) => {
        const eventDate = DateTime.fromISO(event.date);
        return eventDate.month === month;
      });
    }

}
