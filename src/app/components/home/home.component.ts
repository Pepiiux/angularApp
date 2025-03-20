import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Book } from "../../models/book";
import { BooksService } from "../../services/books.service";
import { BookCardComponent } from "../book-card/book-card.component";

@Component({
  selector: "app-home",
  imports: [
    CommonModule,
    BookCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  booksList: Book[] = [];
  filteredBooksList: Book[] = [];
  booksService: BooksService = inject(BooksService);
  bookTypeFilter: String = "";
  bookLanguage: String = "";
  orderBy: String = "";

  constructor() {}

  ngOnInit(): void {
    //TODO: Falta agregar un unsubscribe a este observable
    this.booksService
      .getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage)
      .subscribe((bookList) => {
        if (bookList.totalItems <= 0) {
          this.booksList = [];
        } else {
          this.booksList = bookList.items;
        }

        this.filteredBooksList = this.booksList;
      });
  }

  //TODO: Falta especificar tipo de retorno: 'void'
  filterBooks(text: string) {
    if (!text) {
      this.filteredBooksList = this.booksList;
      return;
    }
    this.filteredBooksList = this.booksList.filter((book) =>
      book?.volumeInfo.title.toLowerCase().includes(text.toLowerCase())
    );
  }

  getAllLanguages(): String[] {
    var languages: String[] = this.filteredBooksList.map((book) => {
      return book.volumeInfo.language;
    });

    return [...new Set(languages)];
  }

  //TODO: Falta especificar tipo de retorno
  applyFilters() {
    this.booksService
      .getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage)
      .subscribe((booksList) => {
        if (booksList.totalItems <= 0) {
          this.booksList = [];
        } else {
          this.booksList = booksList.items;
        }

        this.filteredBooksList = this.booksList;
      });
  }

  //TODO: Falta especificar tipo de retorno
  resetFilters() {
    this.bookLanguage = "";
    this.bookTypeFilter = "all";
    this.orderBy = "newest";

    //TODO: Agregar unsubscribe
    this.booksService
      .getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage)
      .subscribe((booksList) => {
        this.booksList = booksList.items;
        this.filteredBooksList = this.booksList;
      });
  }
}
