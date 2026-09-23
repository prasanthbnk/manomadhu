import { Component, OnInit, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS, VEHICLES, PACKAGES, SERVICES } from '../../shared/data/business.data';
import { WhatsappService } from '../../shared/services/whatsapp.service';
import { QuoteModalService } from '../../shared/services/quote-modal.service';
import { ReviewsComponent } from '../../shared/reviews/reviews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChildren('reveal') reveals!: QueryList<ElementRef>;
  business = BUSINESS;
  vehicles = VEHICLES.slice(0, 4);
  packages = PACKAGES.slice(0, 3);
  services = SERVICES.slice(0, 6);

  constructor(private wa: WhatsappService, private quoteModal: QuoteModalService) {}

  ngOnInit() {
    setTimeout(() => this.initReveal(), 100);
  }

  initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  bookPackage(pkg: any) { this.wa.bookPackage(pkg.title, pkg.price); }
  openChat() { this.wa.openChat(); }
  openQuote() { this.quoteModal.open(); }
}
