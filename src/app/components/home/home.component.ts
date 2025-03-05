import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, BookCardComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
    this.booksService.getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage).subscribe((bookList) => {
      if (bookList.totalItems <= 0) {
        this.booksList = [];
      } else {
        this.booksList = bookList.items;
      }
      
      this.filteredBooksList = this.booksList;
    });
  }

  filterBooks(text: string) {
    if (!text) {
      this.filteredBooksList = this.booksList;
      return;
    }
    this.filteredBooksList = this.booksList.filter((book) =>
      book?.volumeInfo.title.toLowerCase().includes(text.toLowerCase()),
    );
  }

  getAllLanguages(): String[] {
    var languages: String[] = this.filteredBooksList.map((book) => {
      return book.volumeInfo.language;
    })

    return [...new Set(languages)];
  }

  applyFilters() {
    this.booksService.getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage).subscribe((booksList) => {
      if (booksList.totalItems <= 0) {
        this.booksList = [];
      } else {
        this.booksList = booksList.items;
      }

      this.filteredBooksList = this.booksList;
    });
  }

  resetFilters() {
    this.bookLanguage = "";
    this.bookTypeFilter = "all";
    this.orderBy = "newest";
    
    this.booksService.getBooks(this.orderBy, this.bookTypeFilter, this.bookLanguage).subscribe((booksList) => {
      this.booksList = booksList.items;
      this.filteredBooksList = this.booksList;
    });
  }
}
