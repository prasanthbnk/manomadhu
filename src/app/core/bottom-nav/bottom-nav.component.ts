import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BUSINESS } from '../../shared/data/business.data';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  business = BUSINESS;
}
