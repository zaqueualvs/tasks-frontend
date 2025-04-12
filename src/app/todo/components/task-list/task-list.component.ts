import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {Task} from '../../model/task';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe, NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

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
    NgClass,
    MatCardContent,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatTooltip,
    MatIconButton
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() taskList: Task[] = [];
  @Input() filter: string | null = null;

  tasks: Itask[] = [];


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'concluído':
        return 'status-concluido';
      case "pendente":
        return 'status-pendente';
      case 'em andamento':
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.tasks = this.taskList
        .filter(value => {
          if (!this.filter) {
            return this.taskList
          }
          return value.status.toLowerCase() === this.filter?.toLowerCase()
        })
        .map(value => ({
          ...value,
          statusClass: this.getStatusClass(value.status),
        }));
    }
  }

}

