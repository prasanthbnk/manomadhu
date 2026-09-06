import { Component } from '@angular/core';
import { TARIFF } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-tariff',
  standalone: true,
  imports: [],
  templateUrl: './tariff.component.html',
  styleUrl: './tariff.component.scss'
})
export class TariffComponent {
  tariff = TARIFF;
  constructor(private wa: WhatsappService) {}
  getQuote() { this.wa.openChat('Hi, I\'d like a quote for my trip. Please let me know the rates.'); }
}
