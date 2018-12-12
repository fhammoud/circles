import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PushService {

  constructor(private http: HttpClient) { }

  addSubscriber(subscription: any) {
    return this.http.post('/subscriptions', subscription);
  }

  removeSubscriber(subscription: PushSubscription) {
    let urlArray = subscription.endpoint.split('/');
    let endpoint = urlArray[urlArray.length - 1];
    return this.http.delete('/subscriptions/' + endpoint);
  }

  push(message: any) {
    return this.http.post('/subscriptions/push', message);
  }
}
