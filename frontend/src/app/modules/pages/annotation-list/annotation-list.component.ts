import { AnnotationService } from './../../../services/annotation.service';
import { Component } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css'],
})
export class AnnotationListComponent {
  public annotations: Annotation[] = [];

  constructor(private annotationService: AnnotationService) {}

  ngOnInit(): void {
    this.getAnnotations();
  }

  getAnnotations() {
    //debugger;
    this.annotationService
      .getAnnotations()
      .subscribe((data: any) => console.log((this.annotations = data)));
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
