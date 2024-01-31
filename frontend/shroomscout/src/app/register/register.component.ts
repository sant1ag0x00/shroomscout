import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);

  // Values for register form
  protected title: string = 'Register a Mushroom:';
  protected name: string = '';
  protected environments: string[] = ['Wiese', 'Eiche', 'Buche'];
  protected selectedEnvironment: string = '';
  protected pictureUrl: string = '';

  protected onRegisterClick() {
    this.messageService.addMessage(this.name);
    this.router.navigate(['']);
  }
}
