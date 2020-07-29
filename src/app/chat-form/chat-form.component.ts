import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
// import {firebase} from '@agnular/fire/databse'
import { ChatService } from "../services/chat.service";
import { ChatMessage } from "../models/chat-message.model";

@Component({
  selector: "app-chat-form",
  templateUrl: "./chat-form.component.html",
  styleUrls: ["./chat-form.component.css"],
})
export class ChatFormComponent implements OnInit {
  @ViewChild("scroller") private feedContainer: ElementRef;
  message: string;
  feed = [];
  chatMessages: AngularFireList<ChatMessage>;
  constructor(
    private chatService: ChatService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.getFeed();
    const ref = firebase.database().ref("messages");
    ref.limitToLast(1).on("child_added", (snapshot) => {
      // all records after the last continue to invoke this function
      // console.log(snapshot.val());
      this.getFeed();
    });
  }

  send() {
    this.chatService.sendMessage(this.message);
    // this.getFeed();
    this.message = "";
  }
  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
  ngOnChanges() {
    this.getFeed();
  }
  getFeed() {
    this.chatMessages = this.chatService.getMessage();
    this.chatMessages
      .valueChanges()
      .pipe(take(1))
      .subscribe((data) => {
        this.feed = data;
        // console.log(this.feed);
      });
  }
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }
  scrollHandler = () => {
    // if()
    console.log("scroll called")
    // console.log(e.target.scrollTop, e.target.scrollBottom, e.target.clientHeight, e.target.scrollHeight);
    // this.chatMessages = this.chatService.getMoreMessages();
    // this.chatMessages.valueChanges().pipe(take(1)).subscribe(data => {
    //   // this.feed = data;
    //   // console.log(data);
    // })
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
