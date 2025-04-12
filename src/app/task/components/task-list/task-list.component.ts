import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {Task} from '../../model/task';
import {MatIconButton} from '@angular/material/button';
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
    MatCardFooter,
    MatChipSet,
    MatChip,
    NgClass,
    MatCardContent,
    DatePipe,
    MatIcon,
    MatTooltip,
    MatIconButton
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() taskList: Task[] = [];
  @Input() filter: string | null = null;

  @Output() changeStatus = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  tasks: Itask[] = [];

  ngOnInit(): void {
    this.changeClassStatus();
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

  onChangeStatus(task: Task) {
    task.status = this.nextStatus(task.status);
    this.changeStatus.emit(task);
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task.id)
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  private changeClassStatus() {
    this.tasks = this.taskList.map(value => ({
      ...value,
      statusClass: this.getStatusClass(value.status),
    }));
  }

  private getStatusClass(status: string): string {
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

  private nextStatus(status: string) {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'Em andamento';
      case 'em andamento':
        return 'Concluído';
      default:
        return status;
    }
  }

}

