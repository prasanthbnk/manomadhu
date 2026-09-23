import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BUSINESS } from '../../shared/data/business.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  business = BUSINESS;
  menuOpen = signal(false);
  scrolled = signal(false);

  navLinks = [
    { path: '/',            label: 'Home'         },
    { path: '/about',       label: 'About'        },
    { path: '/packages',    label: 'Packages'     },
    { path: '/fleet',       label: 'Fleet'        },
    { path: '/tariff',      label: 'Tariff'       },
    { path: '/destinations',label: 'Destinations' },
    { path: '/services',    label: 'Services'     },
    { path: '/contact',     label: 'Contact'      }
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 20); }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    document.body.classList.toggle('menu-locked', this.menuOpen());
  }
  closeMenu() {
    this.menuOpen.set(false);
    document.body.classList.remove('menu-locked');
  }
}
