import {Component} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {TaskService} from '../../services/task.service';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {Observable} from 'rxjs';
import {Task} from '../../model/task';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    MatToolbar,
    TaskListComponent,
    AsyncPipe,
    MatProgressSpinner
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent{

  tasks$: Observable<Task[]> | null = null;

  constructor(private readonly taskService: TaskService) {
    this.refresh();
  }

  refresh() {
    this.tasks$ = this.taskService.listAllTasks().pipe()
  }

}
