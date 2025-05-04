import { Injectable } from '@angular/core';
import { signal, WritableSignal, computed, effect } from '@angular/core';

export interface Event {
  id: number;
  eventName: string;
  date: string;
  sTime: string;
  eTime: string;
  recurring?: string;
  eDate?: string;
  description?: string;
  category?: string;
  color?: string;
}

const storageKey = 'events';

@Injectable({ providedIn: 'root' })
export class EventService {
  private nextId = 0;

  public eventList: WritableSignal<Event[]> = signal(this.loadEvents()); 
  events = computed(() => this.eventList());

  constructor() {
    // this saves to localStorage whenever events change autonatically
    effect(() => {
      localStorage.setItem(storageKey, JSON.stringify(this.eventList()));
    });

    // sets the nextId to avoid duplicate IDs after reloading the page
    this.nextId = this.eventList().reduce((maxId, e) => Math.max(maxId, e.id), 0) + 1;
  }

  saveEvent(event: Omit<Event, 'id'>): void {
    const newEvent: Event = { id: this.nextId++, ...event };
    this.eventList.set([...this.eventList(), newEvent]);
  }

  private loadEvents(): Event[] { // gets events from local storage
    const json = localStorage.getItem(storageKey);
    return json ? JSON.parse(json) : [];
  }

  deleteEvent(id: number): void {
    this.eventList.set(this.eventList().filter(e => e.id !== id));
  }

  clearAll(): void {
    this.eventList.set([]);
    this.nextId = 0;
  }
}