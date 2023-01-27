import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  public users: User[] = [];
  error: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;
  submmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public toastr: ToastrService,
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
    this.listUser();
  }

  public listUser() {
    this.error = false;

    this.userService.getUsers().subscribe({
      next: (data: User[]) => console.log((this.users = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;

        return throwError(() => err);
      },
    });
  }
}
