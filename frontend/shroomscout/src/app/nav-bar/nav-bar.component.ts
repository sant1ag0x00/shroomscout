import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  private router = inject(Router);

  protected onRegisterMushroomClick(): void {
    this.router.navigate(['/register']);
  }

  protected onLogoTitleClick(): void {
    this.router.navigate(['']);
  }
}
