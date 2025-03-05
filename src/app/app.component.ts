import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly userService = inject(UserService);
  title = 'Google Books Explorer';

  constructor() {
    const userData = this.userService.getUserData()

    if(userData == null) {
      this.userService.setDefaultUserData();
    }
  }
}
