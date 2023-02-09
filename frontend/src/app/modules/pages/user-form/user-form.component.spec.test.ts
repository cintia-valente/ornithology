import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { UserService } from '../../../services/user.service';

import { UserFormComponent } from './user-form.component';

const mockUser = {
  idUser: '135',
  name: 'Maite',
  email: 'maite@email.com',
  password: '',
};

class UserServiceMock {
  getUserById(id: any) {
    return of();
  }

  postUsers(data: any) {
    return of();
  }

  putUser(id: any, data: any) {
    return of();
  }
}

class ToastrServiceMock {
  success(message?: string) {}

  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'cadastrar-usuarios',
    component: TestComponentRenderer,
  },
];

describe('UserFormComponent', () => {
  let injector: TestBed;
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [UserFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(UserFormComponent);

    userService = injector.inject(UserService);
    toastrService = injector.inject(ToastrService);

    jest.spyOn(userService, 'getUserById').mockReturnValue(of(mockUser));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Quando: preencher o formulário
      E: clicar no botão salvar
      Então: deve chamar os serviços userService.postAnnotations e toastrService.success`, async () => {
    //Arrange;
    const spyUserPost = jest
      .spyOn(userService, 'postUsers')
      .mockReturnValue(of(mockUser));

    const spySuccessPost = jest
      .spyOn(toastrService, 'success')
      .mockReturnValue({} as any);

    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput = fixture.nativeElement.querySelector(
      '.user-form form div:nth-child(1) input'
    );

    nameInput.value = 'teste';

    nameInput.dispatchEvent(new Event('input'));

    //Act;
    fixture.detectChanges();
    await fixture.whenStable();

    const emailInput = fixture.nativeElement.querySelector(
      '.user-form form div:nth-child(2) input'
    );

    emailInput.value = 'teste@email.com';

    emailInput.dispatchEvent(new Event('input'));

    const button = fixture.nativeElement.querySelector(
      '.user-form form div.button-register-edit button'
    );

    button.click();

    //Assert
    expect(spyUserPost).toHaveBeenCalled();
    expect(spySuccessPost).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: atribuir um erro no serviço
      E: preencher o formulário
      E: clicar no botão salvar
      Então: deve chamar os serviços userService.postAnnotations`, async () => {
    //Arrange;
    const error = {
      error: 'error',
      status: 400,
      message: 'Server Error',
    };

    const spyUserPostError = jest
      .spyOn(userService, 'postUsers')
      .mockReturnValue(throwError(() => error.message));

    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput = fixture.nativeElement.querySelector(
      '.user-form form div:nth-child(1) input'
    );

    nameInput.value = 'teste';

    nameInput.dispatchEvent(new Event('input'));

    //Act;
    fixture.detectChanges();
    await fixture.whenStable();

    const emailInput = fixture.nativeElement.querySelector(
      '.user-form form div:nth-child(2) input'
    );

    emailInput.value = 'teste@email.com';

    emailInput.dispatchEvent(new Event('input'));

    const button = fixture.nativeElement.querySelector(
      '.user-form form div.button-register-edit button'
    );

    button.click();

    //Assert
    expect(spyUserPostError).toHaveBeenCalled();
  });
});
