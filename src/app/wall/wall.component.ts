import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post/post.model";
import {ActivatedRoute} from "@angular/router";
import {StateService} from "../_shared/services/state.service";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {SwPush} from "@angular/service-worker";
import {PushService} from "../_shared/services/push.service";
import {MatSnackBar} from "@angular/material";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  @ViewChild('post') post: ElementRef;
  posts: Post[] = [];
  circleId: string;
  circleName: string;
  user: string;
  snackBarDuration: number = 2000;
  enableNotifications: boolean;

  constructor(private postService: PostService,
              private stateService: StateService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private swPush: SwPush,
              private pushService: PushService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.stateService.getUsername();
    this.route.params
      .subscribe(params => {
        this.circleId = params['id'];
        this.postService.getPosts(this.circleId)
          .subscribe(data => {
            this.stateService.setTitle(data.name);
            this.circleName = data.name;
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
        // this.onPushNotification("New post in " + this.circleName);
      });
  }

  /*onNotificationChange(event) {
    if (event.checked) {

      // Subscribe
      this.enableNotifications = true;
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapid_public_key
      })
        .then(subscription => {
          const sub = {
            circleId: this.circleId,
            subscription: subscription
          };
          this.pushService.addSubscriber(sub)
            .subscribe(res => {
                let snackBarRef = this.snackBar.open('You are subscribed', null, {
                  duration: this.snackBarDuration
                });
                localStorage.setItem("notifications", "true");
              },
              err => {
                console.log('[App] Add subscriber request failed', err);
              })
        })
        .catch(err => {
          console.error(err);
        });
    } else {

      // Unsubscribe
      this.enableNotifications = false;
      this.swPush.subscription
        .pipe(take(1))
        .subscribe(subscription => {
          this.pushService.removeSubscriber(subscription)
            .subscribe(
              res => {
                let snackBarRef = this.snackBar.open('You are unsubscribed', null, {
                  duration: this.snackBarDuration
                });

                subscription.unsubscribe()
                  .then(success => {
                    console.log('[App] Unsubscription successful', success);
                    localStorage.setItem("notifications", "false");
                  })
                  .catch(err => {
                    console.log('[App] Unsubscription failed', err)
                  });
              }
            );
        });
    }
  }

  onPushNotification(message: string) {
    let notification = {
      circleId: this.circleId,
      notification: {
        title: this.circleName,
        body: message,
        icon: '/assets/icons/android-chrome-192x192.png',
        badge: '/assets/icons/android-chrome-192x192.png',
        vibrate: [100, 50, 200],
        data: {
          url: window.location.href
        },
        actions: [
          {action: 'reply', title: 'Reply'},
          {action: 'confirm', title: 'OK'}
        ]
      }
    };

    this.pushService.push(notification).subscribe();
  }*/
}
