import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Book } from '../../models/book';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reading-list',
  imports: [BookCardComponent, CommonModule, RouterModule],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css'
})
export class ReadingListComponent implements OnInit {
  myFavoritesBooks: Book[] = [];
  private readonly userService = inject(UserService);
  unsubscribe$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.userService.getUserDataObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userData => 
        this.myFavoritesBooks = userData?.favoritesBooks ?? []
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
