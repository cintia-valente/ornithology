import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BirdComponent } from './modules/pages/bird/bird.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { UserListComponent } from './modules/pages/user-list/user-list.component';
import { UserFormComponent } from './modules/pages/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: BirdComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listar-anotacoes', component: AnnotationListComponent },
  { path: 'cadastrar-anotacoes', component: AnnotationFormComponent },
  { path: 'editar-anotacoes/:id', component: AnnotationFormComponent },
  { path: 'listar-usuarios', component: UserListComponent },
  { path: 'cadastrar-usuarios', component: UserFormComponent },
  { path: 'editar-usuario/:id', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
