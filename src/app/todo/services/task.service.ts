import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/Task';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `${environment.apiUrl}tasks`

  constructor(private readonly http: HttpClient) {
  }

  listAllTasks(): Observable<Task> {
    return this.http.get<Task>(this.API);
  }
}
