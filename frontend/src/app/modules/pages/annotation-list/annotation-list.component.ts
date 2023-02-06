import { Bird } from 'src/app/model/bird.model';
import { AnnotationService } from './../../../services/annotation.service';
import { Component } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss'],
})
export class AnnotationListComponent {
  annotationForm: FormGroup;
  public annotations: Annotation[] = [];
  error: boolean = false;
  birds: Bird[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService
  ) {
    this.annotationForm = this.formBuilder.group({
      idAnnotation: [''],
      bird: [],
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
    this.listAnnotations();
  }

  listAnnotations() {
    this.error = false;

    this.annotationService.getAnnotations().subscribe({
      next: (data: Annotation[]) => console.log((this.annotations = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;
        alert(`Erro ao carregar anotações. Tente novamente mais tarde.`);

        return throwError(() => err);
      },
    });
  }

  deleteAnnotation(annotation: Annotation) {
    this.annotationService
      .deleteAnnotations(annotation.idAnnotation)
      .subscribe({
        next: () => {
          this.listAnnotations();
          alert('Anotação ecluída com sucesso.');
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;
          alert('Erro ao excluir anotação. Tente novamente mais tarde.');

          return throwError(() => err);
        },
      });
  }
}
