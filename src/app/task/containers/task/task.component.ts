import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {TaskService} from '../../services/task.service';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {Observable, of} from 'rxjs';
import {Task} from '../../model/task';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {
  ConfirmationDialogComponent
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    MatToolbar,
    TaskListComponent,
    AsyncPipe,
    MatProgressSpinner,
    MatFormFieldModule,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatButton,
    MatDialogModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, OnChanges {

  tasks$: Observable<Task[]> = of([]);

  filter = new FormControl(null);
  options = new Set<string>();

  constructor(private readonly taskService: TaskService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh();
    this.getOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getOptions();
  }

  editStatus(task: any) {
    console.log(task);
  }

  editTask(task: any) {
    console.log(task);
  }

  deleteTask(task: any) {
    const dialogRed = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa tarefa?',
    })
    console.log(task);
  }

  private refresh() {
    this.tasks$ = this.taskService.listAllTasks().pipe()
  }

  private getOptions() {
    this.options.clear()
    this.tasks$?.subscribe((value) => {
      value.forEach(task => {
        this.options.add(task.status);
      });
    })
  }

}
