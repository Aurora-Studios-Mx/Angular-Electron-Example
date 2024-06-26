import { Component, OnInit } from '@angular/core';
import { SignalsService } from '../../shared/services/signals.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  private date: number = new Date().getHours();
  protected greetingMessage: string = '';

  constructor(private _ipc: SignalsService) {}

  generateNewMessage(): void{
    if(this.date < 12){
      this.greetingMessage = "home.title.version_1";
    }
    else if(this.date >= 12 && this.date < 17){
      this.greetingMessage = "home.title.version_2";
    }
    else{
      this.greetingMessage = "home.title.version_3";
    }
  }

  youtube(): void{
    this._ipc.send("youtube", [{method: "search", query: "Kanye West"}]);
    this._ipc.on("youtube:reply", (event: any, arg: any) => {
      if (arg[0].result === true) {
        console.log(arg[0].data);
      }
      else{
        console.log("Youtube is now off");
      }
    })
  }

  test(value: number): void{
    if(value === 1){
      this._ipc.send("discord", "active"); 
    }
    else{
      this._ipc.send("discord", "inactive");
    }
    this._ipc.on("discord:reply", (event: any, arg: any) => {
      if (arg === "discord_true") {
        console.log("Discord is now on");
      }
      else if (arg === "discord_false") {
        console.log("Discord is now off");
      }
    })
  }

  ngOnInit(): void {
    this.generateNewMessage();
  }
}
