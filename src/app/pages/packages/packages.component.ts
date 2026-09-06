import { Component } from '@angular/core';
import { PACKAGES } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {
  packages = PACKAGES;
  constructor(private wa: WhatsappService) {}
  book(pkg: any) { this.wa.bookPackage(pkg.title, pkg.price); }
  customTrip() { this.wa.openChat('Hi Mano Madhu Tours, I\'d like to enquire about a custom trip package.'); }
}
