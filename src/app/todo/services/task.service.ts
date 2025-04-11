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

  listAllTasks():Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }
}
