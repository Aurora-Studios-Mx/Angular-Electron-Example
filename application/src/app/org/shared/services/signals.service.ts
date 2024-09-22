import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  private ipc!: typeof ipcRenderer;

  constructor(private ngZone: NgZone) {
    try{
      this.ipc = window.require('electron').ipcRenderer;
    }catch(e){
      throw e;
    }
  }

  public on(channel: string, listener: (...args: any[]) => void): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, (event, ...args) => {
      this.ngZone.run(() => {
        listener(event, ...args);
      });
    });
  }

  public once(channel: string, listener: (...args: any[]) => void): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.once(channel, (event, ...args) => {
      this.ngZone.run(() => {
        listener(event, ...args);
      });
    });
  }

  public send(channel: string, ...args: any[]): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }

  public removeAllListeners(channel: string): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.removeAllListeners(channel);
  }
}
