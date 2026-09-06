import { Injectable } from '@angular/core';
import { BUSINESS } from '../data/business.data';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private base = `https://wa.me/${BUSINESS.whatsapp}?text=`;

  openChat(message = 'Hi Mano Madhu Tours, I\'d like to book a trip.') {
    window.open(this.base + encodeURIComponent(message), '_blank');
  }

  sendEnquiry(form: {
    name: string;
    from: string;
    to: string;
    date: string;
    vehicle: string;
    notes: string;
  }) {
    const lines = [
      `Hi Mano Madhu Tours, I'd like to book a trip.`,
      ``,
      form.name  ? `Name: ${form.name}`    : '',
      form.from  ? `From: ${form.from}`    : '',
      form.to    ? `To: ${form.to}`        : '',
      form.date  ? `Date: ${form.date}`    : '',
      `Vehicle: ${form.vehicle}`,
      form.notes ? `Notes: ${form.notes}`  : ''
    ].filter(Boolean).join('\n');

    window.open(this.base + encodeURIComponent(lines), '_blank');
  }

  bookPackage(title: string, price: number) {
    const msg = `Hi Mano Madhu Tours, I'd like to book the "${title}" package (₹${price.toLocaleString('en-IN')}). Please confirm availability.`;
    window.open(this.base + encodeURIComponent(msg), '_blank');
  }

  sendQuoteRequest(details: {
    from: string;
    to: string;
    fromCoords?: { lat: number; lon: number } | null;
    toCoords?: { lat: number; lon: number } | null;
    distanceKm?: number | null;
    durationMin?: number | null;
    vehicle: string;
    estimatedFare?: number | null;
  }) {
    const mapLink = (c: { lat: number; lon: number }) => `https://maps.google.com/?q=${c.lat},${c.lon}`;

    const lines = [
      `Hi Mano Madhu Tours, I'd like a fare quote for a trip.`,
      ``,
      `From: ${details.from}`,
      details.fromCoords ? `\u{1F4CD} ${mapLink(details.fromCoords)}` : '',
      `To: ${details.to}`,
      details.toCoords ? `\u{1F4CD} ${mapLink(details.toCoords)}` : '',
      details.distanceKm ? `Approx. distance: ${details.distanceKm.toFixed(1)} km` : '',
      details.durationMin ? `Approx. drive time: ${this.formatDuration(details.durationMin)}` : '',
      `Vehicle needed: ${details.vehicle}`,
      details.estimatedFare ? `Estimated fare: ₹${details.estimatedFare.toLocaleString('en-IN')} (website estimate, please confirm)` : '',
      ``,
      `Please share the fare and availability.`
    ].filter(Boolean).join('\n');

    window.open(this.base + encodeURIComponent(lines), '_blank');
  }

  private formatDuration(min: number): string {
    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  }

  quickCall() {
    window.location.href = `tel:+91${BUSINESS.phone}`;
  }
}
