import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Book } from "../../models/book";
import { UserService } from "../../services/user.service";
import { BookCardComponent } from "../book-card/book-card.component";

@Component({
  selector: "app-reading-list",
  imports: [BookCardComponent, CommonModule, RouterModule],
  templateUrl: "./reading-list.component.html",
  styleUrl: "./reading-list.component.css",
})
export class ReadingListComponent implements OnInit {
  myFavoritesBooks: Book[] = [];
  private readonly userService = inject(UserService);
  unsubscribe$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.userService
      .getUserDataObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (userData) => (this.myFavoritesBooks = userData?.favoritesBooks ?? [])
      );
  }
  // TODO: tipo de retorno 'void'
  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
