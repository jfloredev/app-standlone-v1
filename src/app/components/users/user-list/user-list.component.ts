import { User } from '../../../interfaces/users/user';
import { UserService } from './../../../services/user.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
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
