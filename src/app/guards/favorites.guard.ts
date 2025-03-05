import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const favoritesGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const userData = userService.getUserData();

  if (userData?.favoritesBooks != null) {
    return (userData?.favoritesBooks.length > 0);
  } else {
    return false;
  }
};
