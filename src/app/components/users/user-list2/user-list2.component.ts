import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../interfaces/users/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list2',
  imports: [],
  template: `<table class="table">
    <thead>
      <h1>demo 2</h1>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">UserName</th>
        <th scope="col">Email</th>
        <th scope="col">address</th>
      </tr>
    </thead>
    <tbody>
      @for (user of users; track user.id) {
      <tr>
        <td scope="row">{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <ul>
            <li>Street :{{ user.address.street }}</li>
            <li>Suite :{{ user.address.suite }}</li>
            <li>city :{{ user.address.city }}</li>
          </ul>
        </td>
      </tr>
      }
    </tbody>
    <tfoot>
      total de registros
    </tfoot>
  </table>`,
})
export class UserList2Component implements OnInit {
  users: User[] = [];

  //1. inyectamos
  userService = inject(UserService);

  //2. implementamos el OnInit
  ngOnInit(): void {
    //3. llamamos al servicio

    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
