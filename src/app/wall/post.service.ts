import { Injectable } from '@angular/core';
import {Post} from "./post/post.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PostService {
  posts: Post[] = [];
  constructor(private http: HttpClient) { }

  getPosts(circle: string) {
    return this.http.get('/posts/' + circle)
      .map((response: any) => {
        let name = response[0].name;
        let wall = response[0].wall;
        this.posts = [];
        for (let i = 0; i < wall.length; i++) {
          this.posts.unshift(new Post(wall[i]._id, wall[i].owner.username, wall[i].content, wall[i].time));
        }
        return ({name: name, posts: this.posts});
      });
  }

  createPost(circle: string, content: string) {
    return this.http.post('/posts/' + circle, {content: content})
      .map((response: any) => {
        let data = response;
        this.posts.unshift(new Post(data._id, data.sender, data.content, data.time));
      });
  }

  updatePost(id: string, content: string) {
    return this.http.put('/posts/' + id, {content: content})
      .map((response: any) => console.log(response));
  }

  deletePost(id: string) {
    return this.http.delete('/posts/' + id)
      .map((response: any) => {
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].id === id)
            this.posts.splice(i, 1);
        }
      });
  }
}
