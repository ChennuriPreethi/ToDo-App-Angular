import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Admininfo } from '../admininfo';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  tasks:any[]=[];
  ctasks:any[]=[];
  lists:any[]=[];
  listId:any;
  selectedlistId:any;
  constructor(private aS:ServiceService,private rT:Router,private fB:FormBuilder, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params)=>{
    //     console.log(params);
    //     this.aS.getAllNCTasks(params.listId).subscribe((tasks: any[])=>{
    //       this.tasks=tasks;
    //     })
    //     this.aS.getAllCTasks(params.listId).subscribe((ctasks: any[])=>{
    //       this.ctasks=ctasks;
    //     })
    //   }
    // )
    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedlistId=params.listId;
          this.aS.getAllTasks(params.listId).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        }
        else{
          this.selectedlistId = undefined;
        }
        
      }
    )
    
    // this.aS.getAllTasks(this.listId).subscribe((tasks: any) => {
    //   this.tasks = tasks;
    // });
    
  }
  
  onDoneClick(admininfo :Admininfo){
    this.aS.complete(admininfo).subscribe(()=>{
      console.log("Completed");
      admininfo.completed = true;
    })
    window.location.reload();
  }

  onUndoClick(admininfo :Admininfo){
    this.aS.notcomplete(admininfo).subscribe(()=>{
      console.log("Not Completed");
      admininfo.completed = false;
    })
    window.location.reload();
  }

}
