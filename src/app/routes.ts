import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { favoritesGuard } from './guards/favorites.guard';
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'book-details/:id',
        component: BookDetailsComponent,
        title: 'Book Details',
    },
    {
        path: 'reading-list',
        component: ReadingListComponent,
        title: 'My Favorites Books',
        canActivate: [favoritesGuard],
    },
];

export default routeConfig;