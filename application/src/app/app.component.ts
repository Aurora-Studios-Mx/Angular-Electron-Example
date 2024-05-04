import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalsService } from './org/shared/services/signals.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  pong: boolean = false;
  title = 'application';

  constructor(private ipcService: SignalsService, private cdRef: ChangeDetectorRef) {}

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
      
  }

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners("reply");
  }
}
