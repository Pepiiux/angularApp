import { Component, inject, OnInit } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, MatGridListModule, MatListModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  booksService = inject(BooksService);
  route: ActivatedRoute = inject(ActivatedRoute);
  book: Book | undefined;

  constructor() {}

  ngOnInit(): void {
    const bookId = String(this.route.snapshot.params['id']);
    this.booksService.getBookById(bookId).subscribe((book) => {
      this.book = book;
    });
  }
}
