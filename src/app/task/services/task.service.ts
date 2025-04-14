import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../model/task';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `${environment.apiUrl}tasks`

  constructor(private readonly http: HttpClient) {
  }

  listAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  save(task: Task) {
    if (task.id) {
      return this.updateTask(task);
    }
    console.log(task);
    return this.createTask(task);

  }

  private updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.API}/${task.id}`, task);
  }

  private createTask(task: Task): Observable<void> {
    return this.http.post<void>(this.API, task);
  }
}
