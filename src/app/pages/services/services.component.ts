import { Component } from '@angular/core';
import { SERVICES } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = SERVICES;
  constructor(private wa: WhatsappService) {}
  enquire(svc: any) { this.wa.openChat(`Hi Mano Madhu Tours, I'd like to enquire about your ${svc.title} service.`); }
}
