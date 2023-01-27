import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BirdComponent } from './modules/pages/bird/bird.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { UserComponent } from './modules/pages/user/user.component';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { UserUpdateComponent } from './modules/pages/user-update/user-update.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'listar-aves', component: BirdComponent },
  { path: 'listar-anotacoes', component: AnnotationListComponent },
  { path: 'cadastrar-anotacoes', component: AnnotationFormComponent },
  { path: 'editar-anotacoes/:id', component: AnnotationFormComponent },
  { path: 'listar-usuario', component: UserComponent },
  { path: 'editar-usuario/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
