import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  onEditPost(post: string) {
    this.route.params
      .pipe(map((params: Params) => {
        const id = params['postId'];
        this.postService.updatePost(id, post).subscribe();
        this.goBack();
      })).subscribe();
  }

  public onCancel() {
    this.goBack();
  }

  private goBack() {
    this.location.back();
  }
}
