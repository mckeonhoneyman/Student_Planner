import { Injectable } from '@angular/core';
import { signal, WritableSignal, computed, Signal } from '@angular/core';
import { DateTime, Info, Interval  } from 'luxon'; 

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  today: Signal<DateTime> = signal(DateTime.local());
  activeDay: WritableSignal<DateTime> = signal(this.today());

  firstDayOfActiveMonth!: WritableSignal<DateTime>;

  constructor() {
    this.firstDayOfActiveMonth = signal(
      this.activeDay().startOf('month')
    );
  }
}
