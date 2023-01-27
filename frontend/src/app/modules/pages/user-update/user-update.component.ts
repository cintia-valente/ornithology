import { UserService } from './../../../services/user.service';
import { User } from 'src/app/model/user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {
  userForm: FormGroup;
  public users: User[] = [];
  error: boolean = false;
  loading: boolean = false;
  submmited: boolean = false;
  formatType: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      idUser: [''],
      name: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  ngOnInit(): void {
    this.findUserById();
  }

  findUserById() {
    // debugger;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id === null) {
        return;
      }
      this.loading = true;
      this.userService.getUserById(id).subscribe((data) => {
        this.loadForm(data);
        this.loading = false;
      });
    });
  }

  updateUser() {
    this.userService
      .putUser(this.userForm.value.idUser, this.userForm.value)
      .subscribe({
        next: () => {
          if (this.userForm.value.idUser) {
            alert('Atualizado com sucesso');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;

          return throwError(() => err);
        },
      });
  }

  public loadForm(user: User) {
    this.userForm.patchValue({
      // id: user.idUser,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
