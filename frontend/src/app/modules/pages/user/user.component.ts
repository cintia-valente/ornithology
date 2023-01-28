import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  error: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;
  submmited: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listUser();
  }

  listUser() {
    this.error = false;

    this.userService.getUsers().subscribe({
      next: (data: User[]) => console.log((this.users = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;

        return throwError(() => err);
      },
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.idUser).subscribe(() => {
      alert(`Usuário excluído com sucesso!`);
      this.listUser();
    });
  }
}
