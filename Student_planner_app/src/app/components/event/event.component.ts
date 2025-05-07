import { Component, inject } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm, NgModel } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [CommonModule,FormsModule],
  standalone: true
})
export class EventComponent {
  constructor(public eventService: EventService) {}

  get eventsAsString(): string {
    const allEvents = this.eventService.events();
    return allEvents
      .map(event =>
        `${event.eventName} ${event.date} ${event.sTime} ${event.eTime} ${event.recurring ?? ''} ${event.eDate ?? ''} ${event.description ?? ''} ${event.category ?? ''} ${event.color ?? ''}`
      )
      .join('\n\n');
  }

  
  saveEvent(eventName:string,date:string,sTime:string,eTime:string,recurring?:string,eDate?:string,description?:string,category?:string,color?:string): void {
      this.eventService.saveEvent({
        eventName, date, sTime, eTime, recurring, eDate, description, category, color
      });
      
    }
}
