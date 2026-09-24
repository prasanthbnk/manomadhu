import { Routes } from '@angular/router';

const SITE = 'Mano Madhu Tours and Travels';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: `${SITE} | Coimbatore Taxi, Tours & Outstation Cabs`,
        description: 'Reliable taxi, tour packages and outstation trips from Coimbatore. Airport pickup, temple tours, hill stations and group travel across South India.',
        path: '/'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: {
      seo: {
        title: `About Us | ${SITE}`,
        description: 'Meet Mano Madhu Tours and Travels — a Coimbatore-based taxi and tour operator with 4+ years of experience and 200+ happy customers.',
        path: '/about'
      }
    }
  },
  {
    path: 'packages',
    loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent),
    data: {
      seo: {
        title: `Tour Packages from Coimbatore | ${SITE}`,
        description: 'Fixed-price day trips and tour packages from Coimbatore — temple circuits, waterfalls, hill stations and Kerala getaways with pickup included.',
        path: '/packages'
      }
    }
  },
  {
    path: 'fleet',
    loadComponent: () => import('./pages/fleet/fleet.component').then(m => m.FleetComponent),
    data: {
      seo: {
        title: `Our Fleet — Sedans to Mini Buses | ${SITE}`,
        description: 'Well-maintained, air-conditioned vehicles for every trip — sedans, SUVs, tempo travellers and 26 to 56-seater mini buses with experienced drivers.',
        path: '/fleet'
      }
    }
  },
  {
    path: 'tariff',
    loadComponent: () => import('./pages/tariff/tariff.component').then(m => m.TariffComponent),
    data: {
      seo: {
        title: `Taxi Fare & Tariff Rates | ${SITE}`,
        description: 'Transparent per-km taxi tariff rates in Coimbatore for local rides, hourly packages and outstation trips across every vehicle type.',
        path: '/tariff'
      }
    }
  },
  {
    path: 'destinations',
    loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent),
    data: {
      seo: {
        title: `Destinations Near Coimbatore | ${SITE}`,
        description: 'Explore top destinations near Coimbatore — Ooty, Kodaikanal, Munnar, Valparai, Palakkad and more, plus economical one-way drop taxi routes.',
        path: '/destinations'
      }
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    data: {
      seo: {
        title: `Our Services | ${SITE}`,
        description: 'Airport transfers, local rides, outstation trips and group travel services from Mano Madhu Tours and Travels, Coimbatore.',
        path: '/services'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: {
      seo: {
        title: `Contact Us | ${SITE}`,
        description: 'Get in touch with Mano Madhu Tours and Travels for a free quote — call, WhatsApp or visit us at Saibaba Colony, Coimbatore.',
        path: '/contact'
      }
    }
  },
  { path: '**', redirectTo: '' }
];
