import { Component } from '@angular/core';
import { VEHICLES } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss'
})
export class FleetComponent {
  vehicles = VEHICLES;
  constructor(private wa: WhatsappService) {}
  book(v: any) { this.wa.openChat(`Hi Mano Madhu Tours, I'd like to book a ${v.seats}-seater (${v.models}) for my trip.`); }
}
