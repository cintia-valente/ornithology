import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { UserService } from '../../../services/user.service';

import { UserListComponent } from './user-list.component';

const mockUsers = [
  {
    idUser: '135',
    name: 'Maite',
    email: 'maite@email.com',
    password: '',
  },
];

class UserServiceMock {
  getUsers() {
    return of();
  }

  deleteUser(id: any) {
    return of();
  }
}

class ToastrServiceMock {
  success(message?: string) {}

  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'editar-anotacoes/:id',
    component: TestComponentRenderer,
  },
];

describe('UserListComponent', () => {
  let injector: TestBed;
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [UserListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(UserListComponent);
    //location = injector.inject(Location);

    userService = injector.inject(UserService);
    toastrService = injector.inject(ToastrService);

    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUsers));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Então: deve chamar o serviço userService.getUsers`, async () => {
    //Arrange
    const spyUserList = jest
      .spyOn(userService, 'getUsers')
      .mockReturnValue(of(mockUsers));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyUserList).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: ocorrer um erro ao carregar os birds
      Então: deve chamar o serviço userService.getUsers`, async () => {
    //Arrange
    const error = {
      error: 'error',
      status: 400,
      message: 'Server Error',
    };

    const spyUserListError = jest
      .spyOn(userService, 'getUsers')
      .mockReturnValue(throwError(() => error.message));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyUserListError).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      E: clicar no ícone de deletar
      Então: deve chamar o serviço userService.deleteUser`, async () => {
    //Arrange
    const mockUser = {
      idUser: '135',
      name: 'Maite',
      email: 'maite@email.com',
      password: '',
    };

    const spyUserDelete = jest
      .spyOn(userService, 'deleteUser')
      .mockReturnValue(of(mockUser));

    fixture.detectChanges();
    await fixture.whenStable();

    const userDelete = fixture.nativeElement.querySelector(
      '.users table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span.icon-delete > img'
    );

    userDelete.click();

    fixture.detectChanges();
    await fixture.whenStable();

    //Assert
    expect(spyUserDelete).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: atribuir um erro no serviço 
      Então: deve chamar o serviço userService.deleteUser`, async () => {
    //Arrange
    const error = {
      error: 'error',
      status: 400,
      message: 'Server Error',
    };

    const spyUserDeleteError = jest
      .spyOn(userService, 'deleteUser')
      .mockReturnValue(throwError(() => error.message));

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    const userDelete = fixture.nativeElement.querySelector(
      '.users table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span.icon-delete > img'
    );

    userDelete.click();

    fixture.detectChanges();
    await fixture.whenStable();

    //Assert
    expect(spyUserDeleteError).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: detectar as alterações
      Então: deve gerar um Snapshot do componente carregado`, async () => {
    //Arrange
    jest.spyOn(userService, 'getUsers').mockReturnValue(of(mockUsers));

    //Act
    fixture.detectChanges();

    //Assert
    expect(fixture).toMatchSnapshot();
  });
});
