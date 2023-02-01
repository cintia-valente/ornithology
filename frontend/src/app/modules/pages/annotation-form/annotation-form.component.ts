import { BirdService } from './../../../services/bird.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  annotations: Annotation[] = [];
  annotation: Annotation[] = [];
  birds: Bird[] = [];
  isEdit: boolean = false;
  formData: any;
  currentBird: any = {};
  birdData: Array<{
    id: string;
    image?: string;
    namePtbr: string;
    nameEnglish: string;
    nameLatin: string;
    size: string;
    genre: string;
    color: string;
    family: string;
    habitat: string;
  }> = [];

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService,
    private route: ActivatedRoute,
    private birdService: BirdService
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
    this.listBirds();
    this.findAnnotationById();
  }

  findAnnotationById() {
    // debugger;
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id === null) {
        return;
      }
      this.loading = true;
      this.annotationService.getAnnotationById(id).subscribe((data) => {
        this.isEdit = true;
        this.loadForm(data);

        this.loading = false;
      });
    });
  }

  onSubmit() {
    this.submmited = true;

    if (this.annotationForm.value.idAnnotation) {
      this.updateAnnotations();
    } else {
      this.addAnnotations();
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
          this.loading = false;

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
    //debugger;
    this.annotationForm.patchValue({
      idAnnotation: annotation.idAnnotation,
      bird: annotation.bird,
      date: annotation.date,
      place: annotation.place,
    });

    this.currentBird = this.annotationForm.value.bird.id;

    //   this.annotationForm.get('bird').setValue(this.currentBird);

    // annotation.bird.forEach((indicator) =>
    //this.setIndicatorTrue(indicator)

    // this.currentBird = this.annotationForm.value.bird.id;

    // console.log(this.birds);

    // this.currentBird = this.annotationForm.value.bird.id;
    //this.annotationForm.value.idAnnotation.bird.id.setValue(this.currentBird);
  }

  // setIndicatorTrue(indicatorParam: Bird) {
  //   const id = this.annotations.findIndex(
  //     (indicator) => indicator == indicatorParam.id
  //   );

  //this.getIndicatorsForm.at(id).setValue(true);

  listBirds() {
    //debugger;
    const birdData = [];
    this.error = false;

    this.birdService.getBirds().subscribe({
      next: (data) => {
        this.birds = data;
        data.forEach((value, index) => {
          birdData.push(this.birds[index]);
        });
      },
    });
  }
  // error: (err: HttpErrorResponse) => {
  //   this.error = true;

  //   return throwError(() => err);
  // },

  //  console.log(this.setIndicatorTrue(this.));

  onChangeBirds(option: any) {
    //debugger;
    this.annotationForm.value.bird.id.setValue(option);
    this.currentBird = option;
  }
}
