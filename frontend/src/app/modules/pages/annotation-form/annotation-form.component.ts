import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AnnotationService } from '../../../services/annotation.service';
import { Annotation } from 'src/app/model/annotation.model';
import { ActivatedRoute } from '@angular/router';
import { Bird } from 'src/app/model/bird.model';

@Component({
  selector: 'app-annotation-form',
  templateUrl: './annotation-form.component.html',
  styleUrls: ['./annotation-form.component.scss'],
})
export class AnnotationFormComponent implements OnInit {
  annotationForm: FormGroup;
  submmited: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  annotationFormData: any;
  annotation: Annotation[] = [];
  birds: Bird[] = [];
  isEdit: boolean = false;
  formData: any;

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.annotationForm = this.formBuilder.group({
      idAnnotation: [''],
      idBird: [''],
      date: [''],
      place: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.findAnnotationById();
  }

  findAnnotationById() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id === null) {
        return;
      }
      this.loading = true;
      this.annotationService.getAnnotationById(id).subscribe((data) => {
        this.loadForm(data);
        this.isEdit = true;
        this.loading = false;
      });
    });
  }

  onSubmit() {
    this.submmited = true;
    if (this.annotationForm.valid) {
      if (this.annotationForm.value.id) {
        this.updateAnnotations();
      } else {
        this.addAnnotations();
      }
    }
  }

  addAnnotations() {
    this.annotationService
      .postAnnotations(this.annotationForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Cadastrado com sucesso');
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;

          return throwError(() => err);
        },
      });
  }

  updateAnnotations() {
    this.annotationService
      .putAnnotation(
        this.annotationForm.value.idAnnotation,
        this.annotationForm.value
      )
      .subscribe({
        next: () => {
          if (this.annotationForm.value.idAnnotation) {
            alert('Atualizado com sucesso');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;

          return throwError(() => err);
        },
      });
  }

  public loadForm(annotation: Annotation) {
    this.annotationForm.patchValue({
      id: annotation.idAnnotation,
      // bird: annotation.bird.idBird,
      date: annotation.date,
      place: annotation.place,
    });
    console.log(this.annotationForm);
  }
}
