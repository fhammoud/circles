import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from "./message/message.model";
import {ChatService} from "./chat.service";
import {ActivatedRoute} from "@angular/router";
import * as io from "socket.io-client";
import {StateService} from "../_shared/services/state.service";
import {Participant} from "./participant.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  messageForm: FormGroup;
  messages: Message[] = [];
  groupedMessages: Message[][] = [];
  circleId: string;
  participants: Participant[] = [];
  typing: string = '';
  socket = io('', {query: 'username=' + this.stateService.getUsername()});
  main: any;

  constructor(
    private chatService: ChatService,
    private stateService: StateService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });

    this.route.params
      .pipe(map(params => params['id']))
      .subscribe(params => {
        this.circleId = params;
        this.chatService.getChat(this.circleId)
          .subscribe(data => {
            this.groupedMessages = this.groupMessages(data.chat);
          });
      });

    this.socket.on('get users', function (users) {
      for (let i = 0; i <users.length; i++) {
        this.participants.push(new Participant(users[i], false, true));
      }
    }.bind(this));

    this.socket.on('new user', function (user) {
      this.participants.push(new Participant(user, false, true));
      console.log(this.participants);
    }.bind(this));

    this.socket.on('new message', function (message: Message) {
      let index = this.findUser(message.sender);
      this.participants[index].isTyping = false;
      this.appendMessage(message);
      this.scrollToBottom();
    }.bind(this));

    this.socket.on('user typing', function (user) {
      let index = this.findUser(user);
      this.participants[index].isTyping = true;
    }.bind(this));

    this.socket.on('user disconnected', function (user) {
      this.participants.splice(this.findUser(user), 1);
      console.log(this.participants);
    }.bind(this));

    this.socket.on('connect', function () {
      this.socket.emit('join room', this.circleId);
    }.bind(this));
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  onSendMessage() {
    let input = this.messageForm.get('message');

    this.chatService.addMessage(this.circleId, input.value)
      .subscribe((message: Message) => {
        this.appendMessage(message);
        this.socket.emit('new message', message);
        this.messageForm.reset();
      });
  }

  onKeyDown(event: KeyboardEvent) {
    this.socket.emit('user typing');
    /*if (event.code === 'Enter') {
      this.onSendMessage();
    }*/
  }

  private appendMessage(message: Message) {
    let lastMessage = this.groupedMessages[this.groupedMessages.length - 1];
    if (lastMessage && lastMessage[0].sender === message.sender) {
      lastMessage.push(message);
    } else {
      this.groupedMessages.push([message]);
    }
  }

  private groupMessages(chat: Message[]) {
    let groupedMessages: Message[][] = [];
    let temp: Message[] = [];
    let currentUser = chat[0] ? chat[0].sender : null;

    for (let i = 0; i < chat.length; i++) {
      if (chat[i].sender !== currentUser) {
        groupedMessages.push(temp);
        temp = [];
        currentUser = chat[i].sender;
      }
      temp.push(chat[i]);
    }
    if (currentUser)
      groupedMessages.push(temp);

    return groupedMessages;
  }

  private findUser(name) {
    let index = -1;
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].name === name) {
        index = i;
        break;
      }
    }
    return index;
  }

  ngAfterViewChecked(): void {
    this.main = document.getElementById('main');
    this.main.scrollTop = this.main.scrollHeight;
  }
}
