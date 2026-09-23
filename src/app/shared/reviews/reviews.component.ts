import { Component, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { BUSINESS, REVIEWS } from '../data/business.data';

interface ReviewItem {
  name: string;
  initial: string;
  rating: number;
  time: string;
  text: string;
  photo?: string;
}

declare const google: any;

/**
 * Shows Google-style reviews on the homepage.
 *
 * By default it renders the curated REVIEWS list from business.data.ts. To switch
 * to LIVE reviews pulled straight from the business's Google Business Profile:
 *
 *   1. Get the Place ID for "Mano Madhu Tours and Travels" —
 *      https://developers.google.com/maps/documentation/places/web-service/place-id
 *      (paste the business name into the widget at that link and copy the ID it returns)
 *   2. Create an API key at console.cloud.google.com with "Maps JavaScript API" and
 *      "Places API" enabled, restricted by HTTP referrer to this site's domain(s).
 *   3. Set both BUSINESS.googlePlaceId and BUSINESS.googleMapsApiKey in
 *      src/app/shared/data/business.data.ts.
 *
 * Once both are set, this component loads the Google Maps JS SDK client-side and
 * calls PlacesService.getDetails() for `reviews`, `rating` and `user_ratings_total`.
 * Google's API only returns up to 5 reviews and does not allow filtering/reordering
 * them, so whatever it returns is shown as-is (this is a Google ToS requirement).
 */
@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  business = BUSINESS;
  reviews = signal<ReviewItem[]>(REVIEWS);
  liveRating = signal<string | null>(null);
  liveTotal = signal<number | null>(null);
  isLive = signal(false);
  loading = signal(false);

  track = viewChild<ElementRef<HTMLDivElement>>('revTrack');
  private autoTimer?: ReturnType<typeof setInterval>;
  private autoPaused = false;

  ngOnInit() {
    if (this.business.googlePlaceId && this.business.googleMapsApiKey) {
      this.loadLiveReviews();
    }
    this.autoTimer = setInterval(() => this.advanceAuto(), 3500);
  }

  ngOnDestroy() {
    clearInterval(this.autoTimer);
  }

  pauseAuto() { this.autoPaused = true; }
  resumeAuto() { this.autoPaused = false; }

  private advanceAuto() {
    if (this.autoPaused) return;
    const el = this.track()?.nativeElement;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const cardWidth = el.querySelector<HTMLElement>('.rev-card')?.offsetWidth ?? 300;
    const step = cardWidth + 16; // card width + gap
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' });
  }

  private loadLiveReviews() {
    this.loading.set(true);
    this.loadGoogleMapsScript()
      .then(() => this.fetchPlaceDetails())
      .catch(() => this.loading.set(false));
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps?.places) { resolve(); return; }
      const existing = document.getElementById('google-maps-sdk');
      if (existing) { existing.addEventListener('load', () => resolve()); return; }
      const script = document.createElement('script');
      script.id = 'google-maps-sdk';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.business.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private fetchPlaceDetails() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      { placeId: this.business.googlePlaceId, fields: ['reviews', 'rating', 'user_ratings_total'] },
      (place: any, status: string) => {
        this.loading.set(false);
        if (status !== 'OK' || !place) return;
        if (place.reviews?.length) {
          this.reviews.set(place.reviews.map((r: any) => ({
            name: r.author_name,
            initial: r.author_name?.charAt(0) ?? '?',
            rating: r.rating,
            time: r.relative_time_description,
            text: r.text,
            photo: r.profile_photo_url
          })));
          this.isLive.set(true);
        }
        if (place.rating) this.liveRating.set(place.rating.toFixed(1));
        if (place.user_ratings_total) this.liveTotal.set(place.user_ratings_total);
      }
    );
  }

  stars(n: number) { return Array(5).fill(0).map((_, i) => i < Math.round(n)); }
}
