import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './../services/local-storage.service';
import { UserData } from './../models/userData';
import { Book } from '../models/book';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly localStorageService = inject(LocalStorageService);
  private userObs$: BehaviorSubject<UserData>;

  constructor() {
    const userData = this.localStorageService.get<UserData>('UserDataKey')!
    this.userObs$ = new BehaviorSubject(userData);
  }

  setDefaultUserData() {
    const userData = this.localStorageService.get('UserDataKey');

    if(userData == null) {
      const defaultUserData: UserData = ({
        currency: '',
        favoritesBooks: [],
      });

      this.localStorageService.set('UserDataKey', defaultUserData);
      this.userObs$.next(defaultUserData);
    }
  }

  getUserDataObs(): Observable<UserData | null> {
    return this.userObs$.asObservable();
  }

  addBookToMyFavorites(bookToAdd: Book) {
    var userData = this.userObs$.value;
    userData.favoritesBooks.push(bookToAdd);

    this.localStorageService.set('UserDataKey', userData);
    this.userObs$.next(userData);
  }

  removeBookFromMyFavorites(bookToRemove: Book) {
    var userData = this.userObs$.value;
    var favoritesBooks = userData.favoritesBooks.filter(book => book.id !== bookToRemove.id);
    userData.favoritesBooks = favoritesBooks!;

    this.localStorageService.set('UserDataKey', userData);
    this.userObs$.next(userData);
  }

  getUserData(): UserData | null {
    return this.localStorageService.get<UserData>('UserDataKey');
  }
}
