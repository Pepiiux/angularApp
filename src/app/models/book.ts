export interface Book {
    id: string;
    kind: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SalesInfo;
    accessInfo: AccessInfo;
}

export interface VolumeInfo {
    title: string;
    subtitle: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: [string];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface SalesInfo {
    country: string;
    saleability: string;
    isEbook: Boolean;
    listPrice: Price;
    retailPrice: Price;
    buyLink: string;
}

export interface Price {
    amount: number;
    currencyCode: string;
}

export interface AccessInfo {
    country: string;
    viewability: string;
    webReaderLink: string;
    accessViewStatus: string;
}