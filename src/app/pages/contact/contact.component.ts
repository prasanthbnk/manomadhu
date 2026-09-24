import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BUSINESS } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  business = BUSINESS;
  mapUrl: SafeResourceUrl;

  form = {
    name: '',
    from: 'Coimbatore',
    to: '',
    date: '',
    vehicle: '4-Seater (Sedan)',
    notes: ''
  };

  vehicles = [
    '4-Seater (Sedan)',
    '7-Seater (Ertiga)',
    '7-Seater (Innova / Crysta)',
    '14-Seater (Tempo Traveller)',
    '26 to 56-Seater (Mini Bus)'
  ];

  sent = signal(false);

  constructor(private wa: WhatsappService, private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=Saibaba+Colony+NSR+Road+Coimbatore&output=embed'
    );
  }

  submit() {
    if (!this.form.to) return;
    this.wa.sendEnquiry(this.form);
    this.sent.set(true);
    setTimeout(() => this.sent.set(false), 4000);
  }
}
