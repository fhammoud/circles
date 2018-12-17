import {NgModule} from "@angular/core";
import {ChatComponent} from "../chat/chat.component";
import {RouterModule} from "@angular/router";
import {CircleListComponent} from "./circle-list.component";
import {CirclesComponent} from "./circles.component";
import {NewCircleComponent} from "./new-circle/new-circle.component";
import {WallComponent} from "../wall/wall.component";
import {EditPostComponent} from "../wall/edit-post/edit-post.component";
import {AlbumComponent} from "../album/album.component";

const circleRoutes = [
  {
    path: '',
    component: CirclesComponent,
    children: [
      { path: '', component: CircleListComponent },
      { path: ':id/chat', component: ChatComponent },
      { path: ':id/wall', component: WallComponent },
      { path: ':id/wall/:postId/edit', component: EditPostComponent },
      { path: ':id/album', component: AlbumComponent},
      { path: 'new-circle', component: NewCircleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(circleRoutes)],
  exports: [RouterModule]
})
export class CircleRoutingModule {}
