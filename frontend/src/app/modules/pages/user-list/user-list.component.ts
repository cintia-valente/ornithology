import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  error: boolean = false;
  isEdit: boolean = false;
  submmited: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listUser();
  }

  listUser() {
    this.error = false;

    this.userService.getUsers().subscribe({
      next: (data: User[]) => console.log((this.users = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;
        alert(`Erro ao carregar usuários. Tente novamente mais tarde.`);

        return throwError(() => err);
      },
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.idUser).subscribe({
      next: () => {
        alert(`Usuário excluído com sucesso.`);
        this.listUser();
      },
      error: (err: HttpErrorResponse) => {
        this.error = true;
        alert(`Erro ao excluir usuário. Tente novamente mais tarde.`);

        return throwError(() => err);
      },
    });
  }
}
