import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Book } from '../models/book';
import { BooksList } from '../models/booksList';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly localStorageService = inject(LocalStorageService);
  readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getBooks(orderBy: String, type: String, language: String): Observable<BooksList> {
    var queryParams = "?q=maxResults=30";

    if (type != "") {
      queryParams = queryParams + `&orderBy=${orderBy}`;
    }

    if (type != "") {
      queryParams = queryParams + `&printType=${type}`;
    }

    if (language != "") {
      queryParams = queryParams + `&langRestrict=${language}`;
    }

    return this.http.get<BooksList>(`${this.baseUrl}${queryParams}`).pipe(
      // Catch errors and return an empty array if the call fails
      catchError(error => {
        console.error('Error fetching books:', error);
        throw error;
      })
    )
  }

  getBookById(id: String): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`).pipe(
      // Catch errors and return an empty array if the call fails
      catchError(error => {
        console.error('Error fetching book:', error);
        throw error;
      })
    );
  }
}