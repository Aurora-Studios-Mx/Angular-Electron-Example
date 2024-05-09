import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValue = new BehaviorSubject<string>('');

  private newSearch = new Subject<void>();

  newSearch$ = this.newSearch.asObservable();

  emitNewSearch() {
    this.newSearch.next();
  }

  setSearchValue(value: string): void {
    this.searchValue.next(value);
  }

  getSearchValue(): BehaviorSubject<string> {
    return this.searchValue;
  }
}
