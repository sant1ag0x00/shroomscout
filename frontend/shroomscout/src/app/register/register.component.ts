import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  title: string = 'Register a Mushroom:';
  name: string = '';
  environments: string[] = ['Wiese', 'Eiche', 'Buche'];
  selectedEnvironment: string = '';
  pictureUrl: string = '';

  onRegisterClick() {
    this.router.navigate(['']);
  }
}
