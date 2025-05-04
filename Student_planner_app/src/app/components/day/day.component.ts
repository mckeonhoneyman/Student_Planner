import { Component,InputSignal,Signal,WritableSignal,computed,input,signal, } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-day',
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css'
})
export class DayComponent {
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
}
