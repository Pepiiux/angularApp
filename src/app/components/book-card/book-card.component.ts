import {Component, Input, Output, OnInit, inject, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Book } from '../../models/book';
import { RouterModule, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule, RouterModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  isFavorite: boolean = false;
  favoritesBooks: Book[] = [];
  private readonly userService = inject(UserService);
  unsubscribe$: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.userService.getUserDataObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userData => {
        this.favoritesBooks = userData?.favoritesBooks ?? [];
        this.isFavorite = this.favoritesBooks.some(book => book.id === this.book.id);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  addToMyFavorites() {
    this.userService.addBookToMyFavorites(this.book)
    this.isFavorite = true;
  }

  removeFromMyFavorites() {
    this.userService.removeBookFromMyFavorites(this.book)
    this.isFavorite = false;
  }
}
