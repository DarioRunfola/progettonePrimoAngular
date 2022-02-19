import { Component, OnInit } from "@angular/core";
import { Todo } from '../models/todo';
import * as TodoSrv from '../todos.service';

@Component({
  selector: 'app-todos.pages',
  template: `
    <div>
    <ng-container *ngIf="tasks; else elseTemplate">

        <div *ngIf="tasks.length > 0; else elseNoTask">
          <div *ngFor="let task of tasks; let i =  index">
            <div>
              - {{task.title}}
              <button class="complete" (click)="completeTask(task, i)" >✅</button>
            </div>

          </div>

        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Tasks...</p>

      </ng-template>

    </div>

    <div class="footer">
      <input type="text" [(ngModel)]="newTaskTitle" >
      <button (click)="addTask()">+</button>
    </div>

    <ng-template #elseNoTask>
        <p>Ops, non ci sono Task</p>
      </ng-template>

  `,
  styles: [
    `
    button.complete{
      background:transparent;
      border:none;
      cursor:pointer;
    }
    .footer{
      margin-top:1rem;
    }

    `
  ]
})
export class TodosPage implements OnInit {
  tasks!: Todo[]

  newTaskTitle:string | undefined;
  constructor() {
    TodoSrv.get().then(todos=>this.tasks = todos.filter(todo=>!todo.completed))
  }

  ngOnInit(): void {
  }
  async addTask(){
    const nTodo = await TodoSrv.add({title:this.newTaskTitle as string,completed:false}
    )
    this.tasks.push(nTodo);
    this.newTaskTitle ='';
  }
  async completeTask(todo:Todo,i:number){
    await TodoSrv.update({completed:true},todo.id)
    this.tasks.splice(i,1)
  }

}
// finito cosi
