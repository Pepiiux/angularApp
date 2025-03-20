import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { UserService } from "../services/user.service";

export const favoritesGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const userData = userService.getUserData();

  if (userData?.favoritesBooks != null) {
    return userData?.favoritesBooks.length > 0; // TODO: Aquí se podría agregar el enviar una notificación o alerta de que no puede ingresar al recurso o la ruta.
  } else {
    return false;
  }
};
