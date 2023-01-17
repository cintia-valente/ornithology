import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BirdComponent } from './modules/pages/bird/bird.component';
import { AnnotationComponent } from './modules/pages/annotation/annotation.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { UserComponent } from './modules/pages/user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'listar-aves', component: BirdComponent },
  { path: 'cadastrar-anotacoes', component: AnnotationComponent },
  { path: 'editar-anotacoes/:id', component: AnnotationComponent },
  { path: 'listar-usuario', component: UserComponent },
  { path: 'editar-usuario/:id', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
