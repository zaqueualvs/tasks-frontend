import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-task-title-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatCard,
    MatButton
  ],
  templateUrl: './task-title-dialog.component.html',
  styleUrl: './task-title-dialog.component.scss'
})
export class TaskTitleDialogComponent {

  readonly data = inject(MAT_DIALOG_DATA);
  title = new FormControl(this.data.title, [Validators.required, Validators.max(50)]);

  constructor(
    public dialogRef: MatDialogRef<TaskTitleDialogComponent>
  ) {
  }
}
