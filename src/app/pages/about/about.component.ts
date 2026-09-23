import { Component, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../../shared/data/business.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  business = BUSINESS;

  // Real photos of the Mano Madhu team, fleet and the trips they've run
  teamPhotos = [
    'team-1.jpg', 'team-2.jpg', 'team-3.jpg', 'team-4.jpg',
    'team-5.jpg', 'team-6.jpg', 'team-7.jpg', 'team-8.jpg'
  ];

  activeSlide = signal(0);
  private track = viewChild<ElementRef<HTMLDivElement>>('teamTrack');
  private autoTimer?: ReturnType<typeof setInterval>;
  private autoPaused = false;

  ngOnInit() {
    this.autoTimer = setInterval(() => {
      if (this.autoPaused) return;
      this.goToSlide((this.activeSlide() + 1) % this.teamPhotos.length);
    }, 3500);
  }

  ngOnDestroy() {
    clearInterval(this.autoTimer);
  }

  pauseAuto() { this.autoPaused = true; }
  resumeAuto() { this.autoPaused = false; }

  onSwiperScroll() {
    const el = this.track()?.nativeElement;
    if (!el || !el.clientWidth) return;
    this.activeSlide.set(Math.round(el.scrollLeft / el.clientWidth));
  }

  goToSlide(i: number) {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
    this.activeSlide.set(i);
  }
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
