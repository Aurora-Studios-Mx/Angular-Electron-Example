import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SearchService } from '../../services/search.service';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, TooltipModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  protected query: string = '';

  ngOnInit(): void {

  }
  
  goBack(): void{
    this._location.back();
  }

  goForward(): void{
    this._location.forward();
  }

  constructor(private _rt: Router, private _searchHandle: SearchService, private _location: Location, private translate: TranslateService){}

  changeLang(): void{
    const langs = this.translate.getLangs();
    alert(langs);
  }

  onSubmit(): void{
    if (this._rt.url != '/'){
      this._searchHandle.setSearchValue(this.query)
      this._searchHandle.emitNewSearch();
    }
    else{
      this._rt.navigateByUrl('/search/' + this.query)
    }
  }
}
