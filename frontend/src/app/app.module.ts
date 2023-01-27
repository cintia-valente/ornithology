import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnotationFormComponent } from './modules/pages/annotation-form/annotation-form.component';
import { BirdComponent } from './modules/pages/bird/bird.component';
import { UserComponent } from './modules/pages/user/user.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AnnotationListComponent } from './modules/pages/annotation-list/annotation-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserUpdateComponent } from './modules/pages/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationFormComponent,
    BirdComponent,
    UserComponent,
    LoginComponent,
    AnnotationListComponent,
    UserUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
