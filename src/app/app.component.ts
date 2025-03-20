import { Component, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  imports: [HeaderComponent, RouterOutlet, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  private readonly userService = inject(UserService);
  title = "Google Books Explorer"; //TODO: Recomendado manejar el título desde un servicio o una variable global para que sea configurable.

  constructor() {
    const userData = this.userService.getUserData();

    if (userData == null) {
      this.userService.setDefaultUserData();
    }
  }
}
