import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import {AppMaterialModule} from "./_shared/app-material/app-material.module";
import {UserService} from "./user/user.service";

import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import {AuthGuard} from "./_shared/guards/auth.guard";
import { ChatComponent } from './chat/chat.component';
import {CircleListComponent} from "./circles/circle-list.component";
import {CircleComponent} from "./circles/circle/circle.component";
import {CirclesComponent} from "./circles/circles.component";
import { MessageComponent } from './chat/message/message.component';
import {StateService} from "./_shared/services/state.service";
import { ErrorComponent } from './_shared/error/error.component';
import { SideComponent } from './side/side.component';
import { NewCircleComponent } from './circles/new-circle/new-circle.component';
import { WallComponent } from './wall/wall.component';
import { PostComponent } from './wall/post/post.component';
import { UrlifyPipe } from './_shared/pipes/urlify.pipe';
import { RoleDirective } from './_shared/directives/role.directive';
import { EditPostComponent } from './wall/edit-post/edit-post.component';
import {PostService} from "./wall/post.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppInterceptor} from "./app.interceptor";
import {AppJwtModule} from "./app.jwt.module";
import {PushService} from "./_shared/services/push.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AlbumComponent } from './album/album.component';
import { SpinnerComponent } from './_shared/spinner/spinner.component';
import {ImageService} from "./album/image.service";
import { ImageComponent } from './album/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    CirclesComponent,
    CircleComponent,
    CircleListComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ChatComponent,
    MessageComponent,
    ErrorComponent,
    SideComponent,
    NewCircleComponent,
    WallComponent,
    PostComponent,
    UrlifyPipe,
    RoleDirective,
    EditPostComponent,
    AlbumComponent,
    SpinnerComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppJwtModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    StateService,
    UserService,
    PostService,
    PushService,
    ImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
