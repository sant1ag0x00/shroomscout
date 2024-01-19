import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public onRegisterMushroomClick() {
    console.log('"Register Mushroom" button clicked!');
  }

  public onLogoTitleClick() {
    console.log('Logo or title clicked!');
  }
}
