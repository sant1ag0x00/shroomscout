import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss'],
})
export class LiveFeedComponent implements OnInit {
  public messages: string[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
