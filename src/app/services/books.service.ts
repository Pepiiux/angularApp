import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Book } from "../models/book";
import { BooksList } from "../models/booksList";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private readonly localStorageService = inject(LocalStorageService);
  readonly baseUrl = "https://www.googleapis.com/books/v1/volumes";

  constructor(private http: HttpClient) {}

  //TODO: No llevan $, pero deben indicar en el nombre que devuelven un Observable
  getBooks(
    orderBy: String, // Cuando usamos String con la letra capital estamos espeficando que es un objeto de la clase String, es recomendado usar string como tipo primitivo
    type: String,
    language: String
  ): Observable<BooksList> {
    var queryParams = "?q=maxResults=30";

    // TODO: Aqui seria orderBy ?
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
      catchError((error) => {
        console.error("Error fetching books:", error);
        throw error;
      })
    );
  }

  getBookById(id: String): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`).pipe(
      // Catch errors and return an empty array if the call fails
      catchError((error) => {
        console.error("Error fetching book:", error);
        throw error;
      })
    );
  }
}
