import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SearchService } from '../../services/search.service';
import { SignalsService } from '../../services/signals.service';
import { TooltipModule } from 'primeng/tooltip';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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

  constructor(private _rt: Router, private _searchHandle: SearchService, private _location: Location, private translate: TranslateService, private _loader: NgxUiLoaderService, private _ipc: SignalsService){}

  saveNewLang(): void{
    this._ipc.send("configuration", [{ method: 'setLang'}])
  }

  changeLang(): void{
    this._loader.start();

    this.translate.use(this.translate.currentLang === 'en' ? 'es' : 'en');
    
    this._loader.stop();
  }

  onSubmit(): void{
    if(this.query == ''){
      return;
    }
    
    if (this._rt.url != '/') {
      this._searchHandle.setSearchValue(this.query)
      this._searchHandle.emitNewSearch();
    }
    else {
      this._rt.navigateByUrl('/search/' + this.query)
    }
  }
}
