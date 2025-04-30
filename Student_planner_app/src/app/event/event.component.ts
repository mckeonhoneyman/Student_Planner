import { Component, inject } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { NgForm, NgModel } from '@angular/forms';

interface event{
  id:number;
  eventName:string;
  date:number;
  sTime:number;
  eTime:number;
  recurring?:string;
  eDate?:number;
  description?:string
  category?:string;
  color?:string;

}

@Component({
  selector: 'app-secondary',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [CommonModule],
  standalone: true
})
export class EventComponent implements event{
  numOfEvents:number=0;
  events:event[]=[];
  id:number=0;
  eventName:string='';
  date:number=0;
  sTime:number=0;
  eTime:number=0;
  recurring?:string;
  eDate?:number;
  description?:string
  category?:string;
  color?:string;


  saveEvent(eventName:string,date:number,sTime:number,eTime:number,recurring?:string,eDate?:number,description?:string,category?:string,color?:string):void{
    console.log("step 1 works")
    this.events[this.numOfEvents]=({id:this.numOfEvents++,eventName:eventName,date:date,sTime:sTime,eTime:eTime,recurring:recurring,eDate:eDate,description:description,category:category,color:color})
    console.log("worked?")
    console.log(this.events[0])
  }


}
