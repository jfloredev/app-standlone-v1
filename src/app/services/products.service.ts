import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/products/product';
import { Observable } from 'rxjs';
import { enviroment } from '../constants/environmet';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  //1
  //uri = 'http://api.escuelajs.co/api/v1/products';
  uri = `${enviroment.apiBas}/products`;
  http = inject(HttpClient);

  constructor() {}

  //2
  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.uri, product);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.uri);
  }

  findById(id?: number): Observable<Product> {
    const uri_local = `${this.uri}/${id}`;
    console.log('URI:', uri_local);
    return this.http.get<Product>(uri_local);
  }

  update(id: number, product: Product): Observable<Product> {
    const uri_local = `${this.uri}/${product.id}`;
    console.log('URI:', uri_local);
    return this.http.put<Product>(uri_local, product);
  }

  delete(id: number): Observable<boolean> {
    const uri_local = `${this.uri}/${id}`;
    console.log('URI:', uri_local);
    return this.http.delete<boolean>(uri_local);
  }
}
