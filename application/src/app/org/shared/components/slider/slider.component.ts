import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [TooltipModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

}
