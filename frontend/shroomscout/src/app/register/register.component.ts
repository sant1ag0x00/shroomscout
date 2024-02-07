import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private markerService = inject(MarkerService);

  // Values for register form
  protected title: string = 'Pilzdaten angeben:';
  protected name: string = '';
  protected environments: string[] = ['Wiese', 'Eiche', 'Buche'];
  protected selectedEnvironment: string = '';
  protected pictureUrl: string = '';

  protected get isMarkerPlaced(): boolean {
    return this.markerService.isMarkerPlaced();
  }

  protected onRegisterClick() {
    const message: string = `${this.name} stand nahe einer ${this.selectedEnvironment}.`;
    this.messageService.addMessage(message);
    this.markerService.persistMarker(this.name);
    this.router.navigate(['']);
  }
}
