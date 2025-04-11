import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardTitle} from '@angular/material/card';
import {Task} from '../../model/task';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatButton
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input() taskList: Task[] = [];

}
