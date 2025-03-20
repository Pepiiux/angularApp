import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { RouterLink, RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Book } from "../../models/book";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-book-card",
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: "./book-card.component.html",
  styleUrl: "./book-card.component.css",
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  isFavorite: boolean = false;
  favoritesBooks: Book[] = [];
  private readonly userService = inject(UserService);
  unsubscribe$: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.userService
      .getUserDataObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((userData) => {
        this.favoritesBooks = userData?.favoritesBooks ?? [];
        this.isFavorite = this.favoritesBooks.some(
          (book) => book.id === this.book.id
        );
      });
  }
  //TODO: Tipo de retorno ? 'void'
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  //TODO: Tipo de retorno ? 'void'
  addToMyFavorites() {
    this.userService.addBookToMyFavorites(this.book);
    this.isFavorite = true;
  }
  //TODO: Tipo de retorno ? 'void'
  removeFromMyFavorites() {
    this.userService.removeBookFromMyFavorites(this.book);
    this.isFavorite = false;
  }
}
