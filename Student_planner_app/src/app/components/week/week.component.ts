import { Component,InputSignal,Signal,WritableSignal,computed,input,signal, } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { RouterOutlet } from '@angular/router';
import { Event, EventService } from '../../services/event.service';

@Component({
  selector: 'app-week',
  imports: [CommonModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.css'
})
export class WeekComponent {
  constructor(public calendarService: CalendarService) {}

  firstDayOfActiveWeek: Signal<DateTime> = computed(() => {
    const referenceDay = this.calendarService.activeDay() ?? this.calendarService.today();
    const weekday = referenceDay.weekday;
    return referenceDay.minus({ days: weekday % 7 }).startOf('day');
  });
  
  weekDays: Signal<string[]> = signal([ // makes sunday the first day of the week
    ...Info.weekdays('short').slice(-1),
    ...Info.weekdays('short').slice(0, 6)
  ]);

  goToPreviousWeek(): void {
    const ref = this.calendarService.activeDay() ?? this.calendarService.today();
    this.calendarService.activeDay.set(ref.minus({ weeks: 1 }));
  }
  
  goToNextWeek(): void {
    const ref = this.calendarService.activeDay() ?? this.calendarService.today();
    this.calendarService.activeDay.set(ref.plus({ weeks: 1 }));
  }

  //Returns the date of the first day of the week (Sunday) for the active day or today if no active day is set
  weekDates: Signal<DateTime[]> = computed(() => {
    const startOfWeek = this.firstDayOfActiveWeek();
    return Array.from({ length: 7 }, (_, i) => startOfWeek.plus({ days: i }));
  });

  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    DateTime.fromObject({ hour: i }).toFormat('h a')
  );

}
