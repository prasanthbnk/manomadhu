import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { BottomNavComponent } from './core/bottom-nav/bottom-nav.component';
import { WhatsappWidgetComponent } from './shared/whatsapp-widget/whatsapp-widget.component';
import { QuoteModalComponent } from './shared/quote-modal/quote-modal.component';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BottomNavComponent, WhatsappWidgetComponent, QuoteModalComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-bottom-nav />
    <app-whatsapp-widget />
    <app-quote-modal />
  `
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) child = child.firstChild;
        return child?.snapshot.data['seo'];
      })
    ).subscribe(seo => { if (seo) this.seo.update(seo); });
  }
}
