import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnotationService } from 'src/app/services/annotation.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  annotationForm: FormGroup;
  submmited: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  annotationFormData: any;

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService,
    public toastr: ToastrService
  ) {
    this.annotationForm = this.formBuilder.group({
      idAnnotation: [''],
      idBird: [''],
      date: [''],
      place: ['', [Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {}

  addAnnotations() {
    //debugger;
    this.annotationService.postAnnotations(this.annotationForm.value).subscribe(
      () => {
        this.loading = false;
        alert('Cadastrado com sucesso');
      }
      // () => {
      //   this.loading = false;

      //   this.error = true;
      //   return throwError(() => new Error('err'));
      // }
    );
  }
}
