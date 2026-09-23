import { Component, signal } from '@angular/core';
import { DESTINATIONS } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {
  all = DESTINATIONS;
  filter = signal('all');

  types = [
    { key: 'all',        label: 'All'          },
    { key: 'hill',       label: 'Hill Stations' },
    { key: 'temple',     label: 'Temples'       },
    { key: 'nature',     label: 'Nature'        },
    { key: 'local',      label: 'Local'         },
    { key: 'interstate', label: 'Interstate'    }
  ];

  get filtered() {
    return this.filter() === 'all' ? this.all : this.all.filter(d => d.type === this.filter());
  }

  // returns index in the master list (for image numbering 18+)
  allIndex(dest: any): number {
    return this.all.findIndex(d => d.name === dest.name);
  }

  constructor(private wa: WhatsappService) {}

  book(dest: any) {
    this.wa.openChat(`Hi Mano Madhu Tours, I'd like to book a trip to ${dest.name} from Coimbatore.`);
  }
}
