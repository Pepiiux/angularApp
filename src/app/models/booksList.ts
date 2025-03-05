import { Book } from "./book";

export interface BooksList {
    kind: string;
    totalItems: number;
    items: [Book]
}