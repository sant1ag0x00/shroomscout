import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  title: string = 'Register a Mushroom:';
  name: string = '';
  environments: string[] = ['Wiese', 'Eiche', 'Buche'];
  selectedEnvironment: string = '';
  pictureUrl: string = '';

  public onRegisterClick() {
    this.messageService.addMessage(this.name);
    this.router.navigate(['']);
  }
}
