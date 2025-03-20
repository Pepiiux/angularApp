import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../../models/book";
import { BooksService } from "../../services/books.service";

@Component({
  selector: "app-book-details",
  imports: [CommonModule, MatGridListModule, MatListModule],
  templateUrl: "./book-details.component.html",
  styleUrl: "./book-details.component.css",
})
export class BookDetailsComponent implements OnInit {
  booksService = inject(BooksService);
  route: ActivatedRoute = inject(ActivatedRoute);
  book: Book | undefined;

  constructor() {}

  ngOnInit(): void {
    //TODO: Agregar una validación en caso de que el getBookById arroje un error.
    const bookId = String(this.route.snapshot.params["id"]);
    this.booksService.getBookById(bookId).subscribe((book) => {
      this.book = book;
    });
  }
}
