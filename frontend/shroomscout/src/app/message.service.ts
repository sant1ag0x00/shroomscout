import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // All messages for the live feed component
  private messages: string[] = [];
  private messagesSubject$ = new BehaviorSubject<string[]>(this.messages);
  public messages$ = this.messagesSubject$.asObservable();

  /**
   * Emits the new message array from the messages$ stream.
   *
   * @param message New message to add.
   *
   * @returns void
   */
  public addMessage(message: string): void {
    this.messages.unshift(message);
    this.messagesSubject$.next(this.messages);
  }
}
