import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../../shared/data/business.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  business = BUSINESS;
  stats = [
    { value: '4+', label: 'Years of Experience' },
    { value: '200+', label: 'Happy Customers' },
    { value: '5.0★', label: 'Google Rating' },
    { value: '24×7', label: 'Always Available' }
  ];
  values = [
    { icon: '🛡️', title: 'Safety First', desc: 'All vehicles are regularly serviced and insured. Drivers are verified and trained for safe driving.' },
    { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges. You see the rate upfront and pay exactly what was quoted.' },
    { icon: '⏱️', title: 'Punctual Always', desc: 'We respect your time. On-time pickup is our promise for every booking.' },
    { icon: '🤝', title: 'Local Expertise', desc: 'Born and based in Coimbatore — we know every road, temple and hill station in the region.' }
  ];
}
