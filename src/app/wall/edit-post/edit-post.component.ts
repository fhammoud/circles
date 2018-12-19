import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {Post} from "../post/post.model";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @ViewChild('post') postInput: ElementRef;
  postId: string;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) =>{
        this.postId = params['postId'];
        this.postService.getPost(this.postId)
          .subscribe((post: Post) => {
            this.postInput.nativeElement.value = post.content;
          });
      });
  }

  onEditPost(post: string) {
    this.postService.updatePost(this.postId, post)
      .subscribe(()=>{
        return this.goBack();
      });
  }

  public onCancel() {
    this.goBack();
  }

  private goBack() {
    this.location.back();
  }
}
