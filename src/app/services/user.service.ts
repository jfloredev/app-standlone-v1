import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //1 definimos la url
  uri = 'http://jsonplaceholder.typicode.com/users';

  //2 inyectamos
  http = inject(HttpClient);

  constructor() {}

  //3. Observable
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.uri);
  }
}
