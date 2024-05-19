import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';
import { TranslateModule } from '@ngx-translate/core';
import { SignalsService } from '../../shared/services/signals.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  protected query: string = "";
  protected loader: boolean = false;
  protected errors: boolean = false;
  protected results: any[] = [];
  
  constructor(private _ar: ActivatedRoute, private _searchHandle: SearchService, private _ipc: SignalsService, private _loader: NgxUiLoaderService, private cdRef: ChangeDetectorRef){}
  
  transportNewQuery(query: string): void {
    this.loader = true;
    this.errors = false;

    this._ipc.send("youtube", [{method: 'search', query: query}])
    this._ipc.once("youtube:reply", (event: any, arg: any) => {
      const interData = setInterval(() => {
        if(arg[0].result === false){
          clearInterval(interData);
          this.loader = false;
          this.errors = true;
        }
        else{
          clearInterval(interData);
          this.cdRef.detectChanges();
          this.loader = false;
          this.errors = false;
          this.results = arg[0].data.content;
          console.log(this.results)
        }
      }, 500);
    })

  }

  ngOnInit(): void {
    let searchValue;

    this._searchHandle.newSearch$.subscribe(() => {
      searchValue = this._searchHandle.getSearchValue().getValue()
      
      this.query = searchValue;
      this.transportNewQuery(searchValue);
    });
    
    if(searchValue == undefined){
      this.query = this._ar.snapshot.params['query'];
    }
    
    this.transportNewQuery(this.query);
  }
}
