import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'packages', loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent) },
  { path: 'fleet', loadComponent: () => import('./pages/fleet/fleet.component').then(m => m.FleetComponent) },
  { path: 'tariff', loadComponent: () => import('./pages/tariff/tariff.component').then(m => m.TariffComponent) },
  { path: 'destinations', loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
