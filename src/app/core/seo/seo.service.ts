import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SITE_URL, DEFAULT_OG_IMAGE } from './seo.constants';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleSvc = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  update(data: SeoData) {
    const fullTitle = data.title;
    const url = `${SITE_URL}${data.path === '/' ? '' : data.path}`;
    const image = data.image || DEFAULT_OG_IMAGE;

    this.titleSvc.setTitle(fullTitle);

    this.setTag('name', 'description', data.description);

    this.setTag('property', 'og:title', fullTitle);
    this.setTag('property', 'og:description', data.description);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:image', image);
    this.setTag('property', 'og:type', 'website');
    this.setTag('property', 'og:site_name', 'Mano Madhu Tours and Travels');

    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', fullTitle);
    this.setTag('name', 'twitter:description', data.description);
    this.setTag('name', 'twitter:image', image);

    this.setCanonical(url);
  }

  private setTag(attr: 'name' | 'property', key: string, content: string) {
    this.meta.updateTag({ [attr]: key, content } as any);
  }

  private setCanonical(url: string) {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
