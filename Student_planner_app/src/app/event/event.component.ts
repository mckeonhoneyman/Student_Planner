import { Component, inject } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm, NgModel } from '@angular/forms';

interface event{
  id:number;
  eventName:string;
  date:string;
  sTime:string;
  eTime:string;
  recurring?:string;
  eDate?:string;
  description?:string
  category?:string;
  color?:string;

}

@Component({
  selector: 'app-secondary',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [CommonModule,FormsModule],
  standalone: true
})
export class EventComponent implements event{
  numOfEvents:number=0;
  events:event[]=[];
  id:number=0;
  eventName:string='';
  date:string='';
  sTime:string='';
  eTime:string='';
  recurring?:string;
  eDate?:string;
  description?:string
  category?:string;
  color?:string;


  saveEvent(eventName:string,date:string,sTime:string,eTime:string,recurring?:string,eDate?:string,description?:string,category?:string,color?:string):void{
    this.events[this.numOfEvents]=({id:this.numOfEvents++,eventName:eventName,date:date,sTime:sTime,eTime:eTime,recurring:recurring,eDate:eDate,description:description,category:category,color:color})
  }


}
