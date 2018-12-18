import { Injectable } from '@angular/core';
import {Post} from "./post/post.model";
import {HttpClient} from "@angular/common/http";
import {map, tap} from 'rxjs/operators'

@Injectable()
export class PostService {
  posts: Post[] = [];
  constructor(private http: HttpClient) { }

  getPost(id: string) {
    return this.http.get('/posts/' + id)
      .pipe(tap((response: any) => {
        return new Post(response._id, response.owner, response.content, response.time);
      }))
  }

  getPosts(circle: string) {
    return this.http.get('/posts?circleId=' + circle)
      .pipe(map((response: any) => {
        let name = response[0].name;
        let wall = response[0].wall;
        this.posts = [];
        for (let i = 0; i < wall.length; i++) {
          this.posts.unshift(new Post(wall[i]._id, wall[i].owner.username, wall[i].content, wall[i].time));
        }
        return ({name: name, posts: this.posts});
      }));
  }

  createPost(circle: string, content: string) {
    return this.http.post('/posts/' + circle, {content: content})
      .pipe(map((response: any) => {
        let data = response;
        this.posts.unshift(new Post(data._id, data.sender, data.content, data.time));
      }));
  }

  updatePost(id: string, content: string) {
    return this.http.put('/posts/' + id, {content: content});
  }

  deletePost(id: string) {
    return this.http.delete('/posts/' + id)
      .pipe(map((response: any) => {
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].id === id)
            this.posts.splice(i, 1);
        }
      }));
  }
}
