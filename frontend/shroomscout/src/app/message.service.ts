import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: string[] = [];

  public messages$ = new BehaviorSubject<string[]>(this.messages);

  public addMessage(message: string) {
    this.messages.push(message);
    this.messages$.next(this.messages);
  }
}
