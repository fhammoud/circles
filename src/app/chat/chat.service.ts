import { Injectable } from '@angular/core';
import {Message} from "./message/message.model";
import {StateService} from "../_shared/services/state.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ChatService {
  constructor(private http: HttpClient, private stateService: StateService) { }

  getChat(circle: string) {
    return this.http.get('/chat/' + circle)
      .pipe(map((response: any) => {
        let messages: Message[] = [];
        let name = response[0].name;
        let chat = response[0].chat;
        for (let i = 0; i < chat.length; i++) {
          messages.push(new Message(chat[i].sender.username, chat[i].content));
        }
        return {name: name, chat: messages};
      }));
  }

  addMessage(circle: string, content: string) {
    let userId = this.stateService.getUserId();
    let message = new Message(userId, content);
    return this.http.post('/chat/' + circle, message)
      .pipe(map((response: any) => {
        return response
      }));
  }
}
