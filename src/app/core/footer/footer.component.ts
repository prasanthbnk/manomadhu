import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../../shared/data/business.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  business = BUSINESS;
  year = new Date().getFullYear();
}
