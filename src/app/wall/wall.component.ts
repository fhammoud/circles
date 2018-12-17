import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post/post.model";
import {ActivatedRoute} from "@angular/router";
import {StateService} from "../_shared/services/state.service";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  @ViewChild('post') post: ElementRef;
  posts: Post[] = [];
  circleId: string;
  user: string;
  enableNotifications: boolean;

  constructor(private postService: PostService,
              private stateService: StateService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.stateService.getUsername();
    this.route.params
      .subscribe(params => {
        this.circleId = params['id'];
        this.postService.getPosts(this.circleId)
          .subscribe(data => {
            this.posts = data.posts;
            this.enableNotifications = localStorage.getItem("notifications") === "true";
          });
      });
  }


  onNewPost() {
    let content = this.post.nativeElement.value;
    this.postService.createPost(this.circleId, content)
      .subscribe(res => {
        this.post.nativeElement.value = "";
      });
  }
}
