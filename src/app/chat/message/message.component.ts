import {Component, Input, OnInit} from '@angular/core';
import {Message} from "./message.model";
import {StateService} from "../../_shared/services/state.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messages: Message[];
  username: string;
  sender: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.username = this.stateService.getUsername();
    this.sender = this.messages[0].sender;
  }
}
