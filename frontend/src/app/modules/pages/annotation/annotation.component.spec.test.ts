import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AnnotationComponent } from './annotation.component';

class ToastrServiceMock {
  success() {}
}

describe('AnnotationComponent', () => {
  let injector: TestBed;
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AnnotationComponent],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AnnotationComponent);

    toastrService = injector.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
