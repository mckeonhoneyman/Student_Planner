import { Component,InputSignal,Signal,WritableSignal,computed,input,signal, } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class CalendarComponent {
  today: Signal<DateTime> = signal(DateTime.local());
  activeDay: WritableSignal<DateTime | null> = signal(null);
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  )
  firstDayOfActiveWeek: Signal<DateTime> = computed(() => {
    const referenceDay = this.activeDay() ?? this.today();
    const weekday = referenceDay.weekday;
    return referenceDay.minus({ days: weekday % 7 }).startOf('day');
  });
  
  weekDays: Signal<string[]> = signal([ // makes sunday the first day of the week
    ...Info.weekdays('short').slice(-1),
    ...Info.weekdays('short').slice(0, 6)
  ]);
  daysOfMonth: Signal<DateTime[]> = computed(() => { // makes sunday the first day of the week
    const firstDay = this.firstDayOfActiveMonth();
    const startOfCalendar = firstDay
      .minus({ days: firstDay.weekday % 7 })
      .startOf('day');
  
    const endOfMonth = firstDay.endOf('month');
    const endOfCalendar = endOfMonth
      .plus({ days: 6 - (endOfMonth.weekday % 7) })
      .endOf('day');
  
    return Interval.fromDateTimes(startOfCalendar, endOfCalendar)
      .splitBy({ days: 1 })
      .map(interval => {
        if (!interval.start) throw new Error('Invalid interval');
        return interval.start;
      });
  });
  DATE_MED = DateTime.DATE_MED;
  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.activeDay.set(this.today());
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  goToPreviousWeek(): void {
    const ref = this.activeDay() ?? this.today();
    this.activeDay.set(ref.minus({ weeks: 1 }));
  }
  
  goToNextWeek(): void {
    const ref = this.activeDay() ?? this.today();
    this.activeDay.set(ref.plus({ weeks: 1 }));
  }

  goToPreviousDay(): void {
      const ref = this.activeDay() ?? this.today();
      this.activeDay.set(ref.minus({ days: 1 }));
  }

  goToNextDay(): void {
    const ref = this.activeDay() ?? this.today();
      this.activeDay.set(ref.plus({ days: 1 }));
  }

  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    DateTime.fromObject({ hour: i }).toFormat('h a')
  );

  //Returns the date of the first day of the week (Sunday) for the active day or today if no active day is set
  weekDates: Signal<DateTime[]> = computed(() => {
    const startOfWeek = this.firstDayOfActiveWeek();
    return Array.from({ length: 7 }, (_, i) => startOfWeek.plus({ days: i }));
  });
  
  //Returns the date of the active day or today if no active day is set
  dayDate: Signal<DateTime> = computed(() => {
    return this.activeDay() ?? this.today();
  });
  
}