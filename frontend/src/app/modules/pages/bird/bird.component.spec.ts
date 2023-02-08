import { BirdService } from '../../../services/bird.service';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { of } from 'rxjs';

import { BirdComponent } from './bird.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockBirds = [
  {
    id: '27',
    image: 'img',
    namePtbr: 'Arara',
    nameEnglish: 'Blue-and-yellow Macaw',
    nameLatin: 'Ara ararauna',
    size: '90 cm',
    genre: 'Can',
    color: 'Amarelo',
    family: 'Psittacidae',
    habitat: 'Floresta',
  },
];

class BirdServiceMock {
  getBirds() {
    return of();
  }
}

class ToastrServiceMock {
  success(message?: string) {}

  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'cadastrar/:birdName',
    component: TestComponentRenderer,
  },
];

describe('BirdComponent', () => {
  let injector: TestBed;
  let component: BirdComponent;
  let fixture: ComponentFixture<BirdComponent>;
  let location: Location;
  let birdService: BirdService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [BirdComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BirdService, useClass: BirdServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(BirdComponent);
    location = injector.inject(Location);

    birdService = injector.inject(BirdService);
    toastrService = injector.inject(ToastrService);

    jest.spyOn(birdService, 'getBirds').mockReturnValue(of(mockBirds));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Então: deve chamar o serviço birdService.getBirds`, async () => {
    //Arrange
    const spyUser = jest
      .spyOn(birdService, 'getBirds')
      .mockReturnValue(of(mockBirds));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyUser).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: detectar as alterações
      Então: deve gerar um Snapshot do componente carregado`, async () => {
    //Arrange
    jest.spyOn(birdService, 'getBirds').mockReturnValue(of(mockBirds));

    //Act
    fixture.detectChanges();

    //Assert
    expect(fixture).toMatchSnapshot();
  });
});
