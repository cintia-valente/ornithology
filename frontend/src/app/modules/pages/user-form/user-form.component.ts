import { UserService } from '../../../services/user.service';
import { User } from 'src/app/model/user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm: FormGroup;
  public users: User[] = [];
  error: boolean = false;
  loading: boolean = false;
  submmited: boolean = false;
  formatData: any;
  formatUser: User[] = [];
  teste: any[] = [];
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      idUser: [''],
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  ngOnInit(): void {
    this.findUserById();
  }

  findUserById() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id === null) {
        return;
      }
      this.loading = true;
      this.userService.getUserById(id).subscribe((data) => {
        this.loadForm(data);
        this.isEdit = true;
        this.loading = false;
      });
    });
  }

  onSubmit() {
    this.submmited = true;

    if (this.userForm.value.idUser) {
      this.updateUser();
    } else {
      this.addUsers();
    }
  }

  addUsers() {
    this.error = false;
    this.userService.postUsers(this.userForm.value).subscribe({
      next: (data) => {
        this.loading = false;

        if (data) {
          this.toastr.success('Cadastrado com sucesso');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao cadastrar os dados. Por favor, tente novamente mais tarde.'
        );

        return throwError(() => err);
      },
    });
  }

  updateUser() {
    this.userService
      .putUser(this.userForm.value.idUser, this.userForm.value)
      .subscribe({
        next: () => {
          this.loading = false;

          if (this.userForm.value.idUser) {
            this.toastr.success('Atualizado com sucesso');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(
            'Erro ao atualizar os dados. Por favor, tente novamente mais tarde.'
          );

          return throwError(() => err);
        },
      });
  }

  public loadForm(user: User) {
    this.userForm.patchValue({
      idUser: user.idUser,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
