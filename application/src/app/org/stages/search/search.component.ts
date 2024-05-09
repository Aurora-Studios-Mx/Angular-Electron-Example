import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  protected query: string | undefined;
  
  constructor(private _ar: ActivatedRoute, private _searchHandle: SearchService){}
  
  transportNewQuery(): void{
    
  }

  ngOnInit(): void {
    let searchValue;

    this._searchHandle.newSearch$.subscribe(() => {
      searchValue = this._searchHandle.getSearchValue().getValue()
      
      this.query = searchValue;
    });
    
    if(searchValue == undefined){
      this.query = this._ar.snapshot.params['query'];
    }
    
    console.log(this.query)
  }
}
