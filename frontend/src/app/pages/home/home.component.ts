import {NgFor} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {TuiCarousel} from '@taiga-ui/kit';

@Component({
  selector: 'app-home',
  imports: [NgFor, TuiCarousel, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected index = 0;
  protected items = [
    'Shop Now',
  ]
}
