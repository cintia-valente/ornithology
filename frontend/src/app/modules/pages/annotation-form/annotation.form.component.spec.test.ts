import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnotationFormComponent } from './annotation-form.component';

class ToastrServiceMock {
  success() {}
}

describe('AnnotationComponent', () => {
  let injector: TestBed;
  let component: AnnotationFormComponent;
  let fixture: ComponentFixture<AnnotationFormComponent>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AnnotationFormComponent],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AnnotationFormComponent);

    toastrService = injector.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
