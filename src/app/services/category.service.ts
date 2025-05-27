import { Category } from './../interfaces/categories/category';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../constants/environmet';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // uri = 'http://api.escuelajs.co/api/v1/categories';

  // uri = enviroment.apiBas + '/categories';

  uri = `${enviroment.apiBas}/categories`;

  htpp = inject(HttpClient);

  constructor() {}

  getAll(): Observable<Category[]> {
    return this.htpp.get<Category[]>(this.uri);
  }
}
