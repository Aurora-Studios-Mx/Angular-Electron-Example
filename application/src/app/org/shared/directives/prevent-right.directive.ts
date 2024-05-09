import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[PreventRight]',
  standalone: true
})
export class PreventRightDirective {

  constructor() { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    console.log('Right click disabled');
    event.preventDefault();
  }

}
