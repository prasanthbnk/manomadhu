import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuoteModalService } from '../services/quote-modal.service';
import { WhatsappService } from '../services/whatsapp.service';
import { FARE_RATES, LONG_TRIP_SURCHARGE, LONG_TRIP_THRESHOLD_KM } from '../data/business.data';

interface Coords { lat: number; lon: number; }
interface Suggestion { label: string; lat: number; lon: number; }
interface Fare { amount: number | null; note: string; }

@Component({
  selector: 'app-quote-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quote-modal.component.html',
  styleUrl: './quote-modal.component.scss'
})
export class QuoteModalComponent {
  vehicles = FARE_RATES.map(r => r.vehicle);

  form = {
    from: '',
    to: '',
    vehicle: this.vehicles[0]
  };

  private fromCoords: Coords | null = null;
  private toCoords: Coords | null = null;
  private fromReqId = 0;
  private toReqId = 0;
  private fromDebounce?: ReturnType<typeof setTimeout>;
  private toDebounce?: ReturnType<typeof setTimeout>;
  private fromBlurTimer?: ReturnType<typeof setTimeout>;
  private toBlurTimer?: ReturnType<typeof setTimeout>;

  locating = signal(false);
  calculating = signal(false);
  distanceKm = signal<number | null>(null);
  durationMin = signal<number | null>(null);
  errorMsg = signal<string | null>(null);

  fromSuggestions = signal<Suggestion[]>([]);
  toSuggestions = signal<Suggestion[]>([]);
  fromSearching = signal(false);
  toSearching = signal(false);
  showFromList = signal(false);
  showToList = signal(false);

  constructor(
    public modal: QuoteModalService,
    private wa: WhatsappService
  ) {}

  close() {
    this.modal.close();
    this.reset();
  }

  private reset() {
    this.form = { from: '', to: '', vehicle: this.vehicles[0] };
    this.fromCoords = null;
    this.toCoords = null;
    this.locating.set(false);
    this.calculating.set(false);
    this.distanceKm.set(null);
    this.durationMin.set(null);
    this.errorMsg.set(null);
    this.fromSuggestions.set([]);
    this.toSuggestions.set([]);
    this.showFromList.set(false);
    this.showToList.set(false);
  }

  private invalidateRoute() {
    this.distanceKm.set(null);
    this.durationMin.set(null);
    this.errorMsg.set(null);
  }

  durationLabel(): string | null {
    const min = this.durationMin();
    if (min == null) return null;
    return min < 60 ? `${Math.round(min)} min` : `${(min / 60).toFixed(1)} hr`;
  }

  fareEstimate(): Fare | null {
    const km = this.distanceKm();
    if (km == null) return null;
    const rate = FARE_RATES.find(r => r.vehicle === this.form.vehicle);
    if (!rate) return null;

    const isOutstation = km > LONG_TRIP_THRESHOLD_KM;
    const perKm = isOutstation ? rate.outstationPerKm : rate.localPerKm;
    if (perKm == null) return { amount: null, note: "Fare on request — we'll confirm on WhatsApp" };

    if (isOutstation) {
      const amount = Math.round(km * 2 * perKm) + LONG_TRIP_SURCHARGE;
      const note = [
        'Outstation rate (up & down)',
        rate.outstationExtra,
        `+₹${LONG_TRIP_SURCHARGE} over ${LONG_TRIP_THRESHOLD_KM} km`
      ].filter(Boolean).join(' · ');
      return { amount, note };
    }

    const amount = Math.round(km * perKm);
    const note = ['Local rate', rate.localExtra].filter(Boolean).join(' · ');
    return { amount, note };
  }

  // ── Address autocomplete ─────────────────────────────────────────
  onFromInput(value: string) {
    this.form.from = value;
    this.fromCoords = null;
    this.invalidateRoute();
    this.showFromList.set(true);
    clearTimeout(this.fromDebounce);
    if (value.trim().length < 3) { this.fromSuggestions.set([]); return; }
    this.fromDebounce = setTimeout(() => this.searchSuggestions(value, 'from'), 350);
  }

  onToInput(value: string) {
    this.form.to = value;
    this.toCoords = null;
    this.invalidateRoute();
    this.showToList.set(true);
    clearTimeout(this.toDebounce);
    if (value.trim().length < 3) { this.toSuggestions.set([]); return; }
    this.toDebounce = setTimeout(() => this.searchSuggestions(value, 'to'), 350);
  }

  onFromFocus() { if (this.fromSuggestions().length) this.showFromList.set(true); }
  onToFocus() { if (this.toSuggestions().length) this.showToList.set(true); }

  onFromBlur() {
    clearTimeout(this.fromBlurTimer);
    this.fromBlurTimer = setTimeout(() => this.showFromList.set(false), 150);
  }

  onToBlur() {
    clearTimeout(this.toBlurTimer);
    this.toBlurTimer = setTimeout(() => this.showToList.set(false), 150);
  }

  private async searchSuggestions(query: string, target: 'from' | 'to') {
    const id = target === 'from' ? ++this.fromReqId : ++this.toReqId;
    (target === 'from' ? this.fromSearching : this.toSearching).set(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=in&accept-language=en&q=${encodeURIComponent(query)}`
      );
      const current = target === 'from' ? this.fromReqId : this.toReqId;
      if (id !== current) return;

      const data = res.ok ? await res.json() : [];
      const suggestions: Suggestion[] = (data ?? []).map((d: any) => ({
        label: d.display_name,
        lat: parseFloat(d.lat),
        lon: parseFloat(d.lon)
      }));
      (target === 'from' ? this.fromSuggestions : this.toSuggestions).set(suggestions);
    } catch {
      // network error — leave existing suggestions as-is
    } finally {
      const current = target === 'from' ? this.fromReqId : this.toReqId;
      if (id === current) (target === 'from' ? this.fromSearching : this.toSearching).set(false);
    }
  }

  selectSuggestion(target: 'from' | 'to', s: Suggestion) {
    if (target === 'from') {
      this.form.from = s.label;
      this.fromCoords = { lat: s.lat, lon: s.lon };
      this.fromSuggestions.set([]);
      this.showFromList.set(false);
    } else {
      this.form.to = s.label;
      this.toCoords = { lat: s.lat, lon: s.lon };
      this.toSuggestions.set([]);
      this.showToList.set(false);
    }
    this.invalidateRoute();
    this.maybeAutoCalculate();
  }

  // ── Location & distance ──────────────────────────────────────────
  useMyLocation() {
    if (!navigator.geolocation) {
      this.errorMsg.set('Location is not supported on this browser.');
      return;
    }
    this.locating.set(true);
    this.errorMsg.set(null);

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        this.fromCoords = { lat: latitude, lon: longitude };
        const address = await this.reverseGeocode(latitude, longitude);
        this.form.from = address ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        this.fromSuggestions.set([]);
        this.showFromList.set(false);
        this.invalidateRoute();
        this.locating.set(false);
        this.maybeAutoCalculate();
      },
      err => {
        const msg = err.code === err.PERMISSION_DENIED
          ? 'Location access denied. Please allow location access, or enter the pickup address manually.'
          : 'Could not get your GPS location. Please enter the pickup address manually.';
        this.errorMsg.set(msg);
        this.locating.set(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  private async reverseGeocode(lat: number, lon: number): Promise<string | null> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${lat}&lon=${lon}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data?.display_name ?? null;
    } catch {
      return null;
    }
  }

  private async geocode(address: string): Promise<Coords | null> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&accept-language=en&q=${encodeURIComponent(address)}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.length) return null;
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch {
      return null;
    }
  }

  private maybeAutoCalculate() {
    if (this.fromCoords && this.toCoords) this.computeRoute();
  }

  async getDistance() {
    if (!this.form.from.trim() || !this.form.to.trim()) {
      this.errorMsg.set('Please fill in both the pickup and drop locations.');
      return;
    }

    this.calculating.set(true);
    this.errorMsg.set(null);
    this.distanceKm.set(null);
    this.durationMin.set(null);

    if (!this.fromCoords) this.fromCoords = await this.geocode(this.form.from);
    if (!this.toCoords) this.toCoords = await this.geocode(this.form.to);

    if (!this.fromCoords || !this.toCoords) {
      this.errorMsg.set("Couldn't locate one of the addresses. Please refine it, or continue without the distance.");
      this.calculating.set(false);
      return;
    }

    await this.computeRoute();
  }

  private async computeRoute() {
    if (!this.fromCoords || !this.toCoords) return;
    this.calculating.set(true);
    this.errorMsg.set(null);

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${this.fromCoords.lon},${this.fromCoords.lat};${this.toCoords.lon},${this.toCoords.lat}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();
      const route = data?.routes?.[0];
      if (!route) throw new Error('No route');
      this.distanceKm.set(route.distance / 1000);
      this.durationMin.set(route.duration / 60);
    } catch {
      this.errorMsg.set("Couldn't calculate the driving distance right now. You can still continue — we'll confirm it on WhatsApp.");
    } finally {
      this.calculating.set(false);
    }
  }

  proceed() {
    if (!this.form.from.trim() || !this.form.to.trim()) {
      this.errorMsg.set('Please fill in both the pickup and drop locations.');
      return;
    }
    this.wa.sendQuoteRequest({
      from: this.form.from,
      to: this.form.to,
      fromCoords: this.fromCoords,
      toCoords: this.toCoords,
      distanceKm: this.distanceKm(),
      durationMin: this.durationMin(),
      vehicle: this.form.vehicle,
      estimatedFare: this.fareEstimate()?.amount ?? null
    });
    this.close();
  }
}
