import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserList2Component } from './components/users/user-list2/user-list2.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProductAddComponent } from './components/products/product-add/product-add.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

export const routes: Routes = [
  /*
  {
    path: '',
    component: UserListComponent,
  },*/
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  //

  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users2',
    component: UserList2Component,
    
  },
  {
    path: 'products/add/:id',
    component: ProductAddComponent,
  },

  /*
  {
    path: 'products/add',
    component: ProductAddComponent,
  },
*/

  {
    path: 'products/add',
    loadComponent: () =>
      import('./components/products/product-add/product-add.component').then(
        (m) => m.ProductAddComponent
      ),
  },

  {
    path: 'products/list',
    loadComponent: () =>
      import('./components/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },

  /*
  {
    path: 'products/list',
    component: ProductListComponent,
  },
  */
  {
    path: '**',
    component: NotFoundComponent,
  },
];
