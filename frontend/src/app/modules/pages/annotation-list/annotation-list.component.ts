import { AnnotationService } from './../../../services/annotation.service';
import { Component } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss'],
})
export class AnnotationListComponent {
  public annotations: Annotation[] = [];
  error: boolean = false;

  constructor(private annotationService: AnnotationService) {}

  ngOnInit(): void {
    this.listAnnotations();
  }

  listAnnotations() {
    this.error = false;

    this.annotationService.getAnnotations().subscribe({
      next: (data: Annotation[]) => console.log((this.annotations = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;

        return throwError(() => err);
      },
    });
  }

  deleteAnnotation(annotation: Annotation) {
    this.annotationService
      .deleteAnnotations(annotation.idAnnotation)
      .subscribe(() => {
        alert(`Anotação excluída com sucesso!`);
        this.listAnnotations();
      });
  }
  // getAnnotationsForBird(){
  //   this.paciente = [];
  //   this.atendimentoService.getAtendimentoPorUnidade(this.listForm.get('unidade').value).subscribe({
  //     next: atendimentosEncontrados => {
  //       atendimentosEncontrados.forEach(atendimento => {
  //         const atendimentoPaciente = atendimento.paciente as Paciente
  //         console.log(atendimento)
  //       // Verifica se o paciente já está na lista para adicionar
  //       if (this.paciente.every(paciente => paciente._id !== atendimentoPaciente._id)){
  //           this.paciente.unshift(atendimentoPaciente);
  //           console.log(atendimento)
  //       }
  //     }
  //   });
  // }
}
