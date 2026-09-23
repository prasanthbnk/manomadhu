import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { BottomNavComponent } from './core/bottom-nav/bottom-nav.component';
import { WhatsappWidgetComponent } from './shared/whatsapp-widget/whatsapp-widget.component';
import { QuoteModalComponent } from './shared/quote-modal/quote-modal.component';

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
export class AppComponent {}
