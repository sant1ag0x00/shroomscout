import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  public onRegisterMushroomClick() {
    this.router.navigate(['/register']);
  }

  public onLogoTitleClick() {
    this.router.navigate(['']);
  }
}
