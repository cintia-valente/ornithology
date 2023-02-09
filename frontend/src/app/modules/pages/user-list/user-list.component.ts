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
      next: (data: User[]) => (this.users = data),

      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao carregar usuários. Por favor, tente novamente mais tarde'
        );

        return throwError(() => err);
      },
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.idUser).subscribe({
      next: () => {
        this.listUser();
        this.toastr.error('Excluído com sucesso.');
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao excluir usuário. Por favor, tente novamente mais tarde.'
        );

        return throwError(() => err);
      },
    });
  }
}
