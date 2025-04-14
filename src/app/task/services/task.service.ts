import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../model/task';
import {environment} from '../../../environments/environment';
import {first, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `${environment.apiUrl}tasks`

  constructor(private readonly http: HttpClient) {
  }

  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API).pipe(first());

  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(first());

  }

  save(task: Task) {
    if (task.id) {
      return this.updateTask(task);
    }
    return this.createTask(task);
  }

  private updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.API}/${task.id}`, task).pipe(first());

  }

  private createTask(task: Task): Observable<void> {
    return this.http.post<void>(this.API, task).pipe(first());
  }
}
