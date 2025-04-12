import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {Task} from '../../model/task';
import {MatButton} from '@angular/material/button';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {NgClass} from '@angular/common';

interface Itask extends Task {
  statusClass: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatCardFooter,
    MatChipSet,
    MatChip,
    NgClass
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  @Input() taskList: Task[] = [];

  tasks: Itask[] = [];


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'concluído':
        console.log(status);
        return 'status-concluido';
      case "pendente":
        return 'status-pendente';
      case 'em andamento':
        console.log(status);
        return 'status-em-andamento';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.tasks = this.taskList.map(value => ({
      ...value,
      statusClass: this.getStatusClass(value.status),
    }));

    console.log(this.tasks);
  }

}

