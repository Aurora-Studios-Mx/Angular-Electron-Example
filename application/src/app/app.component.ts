import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignalsService } from './org/shared/services/signals.service';
import { SliderComponent } from './org/shared/components/slider/slider.component';
import { NavbarComponent } from './org/shared/components/navbar/navbar.component';
import { PlayerComponent } from './org/shared/components/player/player.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, NavbarComponent, PlayerComponent, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  pong: boolean = false;
  title = 'application';

  constructor(private ipcService: SignalsService, private cdRef: ChangeDetectorRef, private rt: Router, protected translate: TranslateService) {
    translate.addLangs(['en', 'es'])
    translate.setDefaultLang('en');
  }

  ping = () => {
    console.log("ping");
    this.ipcService.send("message", "ping");
    this.ipcService.on("reply", (event: any, arg: any) => {
      console.log(arg);
      this.pong = arg === "pong";
      this.cdRef.detectChanges();
    });
  }

  ngOnInit(): void {
    // this.rt.navigateByUrl("/search/felicilandia")
  }

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners("reply");
    this.ipcService.removeAllListeners("configuration:reply");
  }
}
