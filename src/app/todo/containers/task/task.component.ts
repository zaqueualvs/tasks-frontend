import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {TaskService} from '../../services/task.service';
import {TaskListComponent} from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    MatToolbar,
    TaskListComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  constructor(private readonly taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.listAllTasks().subscribe(tasks => {
      console.log(tasks);
    });
  }

}
