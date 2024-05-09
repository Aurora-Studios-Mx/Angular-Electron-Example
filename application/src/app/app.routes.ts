import { Routes } from '@angular/router';
import { MainComponent } from './org/stages/main/main.component';
import { SearchComponent } from './org/stages/search/search.component';

export const routes: Routes = [
    { path: '', component: MainComponent, pathMatch: 'prefix' },
    { path: 'search/:query', component: SearchComponent }
];
