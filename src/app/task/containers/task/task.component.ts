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
import {TaskTitleDialogComponent} from '../../../shared/components/task-title-dialog/task-title-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  tasks$?: Observable<Task[]>;

  filter = new FormControl(null);
  options = new Set<string>();

  constructor(private readonly taskService: TaskService,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.refresh();
    this.getOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh()
    this.getOptions();
  }

  editStatus(task: any) {
    this.taskService.save(task).subscribe(
      () => {
        this.refresh();
      }
    );
  }

  editTask(task: any) {
    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      data: {message: 'Editar tarefa', title: task.title},
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        task.title = result;
        this.taskService.save(task).subscribe(
          () => {
            this.refresh();
          }
        )
      }
    });
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      data: {message: 'Criar tarefa', title: ''},
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        const task: Task =
          {
            id: '',
            title: result,
            status: '',
            created_at: ''
          }
        this.taskService.save(task).subscribe(
          () => {
            this.refresh();
          }
        )
      }
    });
  }

  deleteTask(taskId: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover essa tarefa?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Tarefa removida com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        )
      }
    });
  }

  private refresh() {
    this.tasks$ = this.taskService.loadTasks()
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
