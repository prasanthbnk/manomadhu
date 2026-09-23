import { Component, signal } from '@angular/core';
import { BUSINESS } from '../data/business.data';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  template: `
    <div class="wa-widget">
      @if (open()) {
        <div class="wa-popup">
          <div class="wa-popup-head">
            <div class="wa-avatar">MM</div>
            <div>
              <strong>Mano Madhu Tours</strong>
              <span>Typically replies instantly</span>
            </div>
            <button (click)="toggle()" aria-label="Close">✕</button>
          </div>
          <div class="wa-popup-body">
            <p>Hi 👋 Planning a trip from Coimbatore? Chat with us on WhatsApp for quick quotes and bookings!</p>
          </div>
          <a [href]="waLink" target="_blank" class="wa-popup-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1A7.9 7.9 0 0 0 12 20a7.94 7.94 0 0 0 5.6-13.7z"/></svg>
            Start Chat
          </a>
        </div>
      }
      <button class="wa-fab" (click)="toggle()" aria-label="Chat on WhatsApp">
        @if (!open()) {
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1A7.9 7.9 0 0 0 12 20a7.94 7.94 0 0 0 5.6-13.7zM12 18.5a6.6 6.6 0 0 1-3.4-.9l-.24-.15-2.5.65.67-2.43-.16-.25A6.56 6.56 0 1 1 12 18.5zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.62.77-.23.15-.43.05a5.36 5.36 0 0 1-1.58-.98 6 6 0 0 1-1.1-1.36c-.11-.2 0-.3.09-.4s.2-.23.3-.35a1.4 1.4 0 0 0 .2-.33.37.37 0 0 0 0-.35c0-.1-.44-1.06-.6-1.45s-.32-.33-.44-.34h-.38a.72.72 0 0 0-.52.24 2.19 2.19 0 0 0-.68 1.63A3.8 3.8 0 0 0 8.1 12a8.66 8.66 0 0 0 3.32 2.93 11.2 11.2 0 0 0 1.11.41 2.67 2.67 0 0 0 1.23.08 2 2 0 0 0 1.31-.93 1.63 1.63 0 0 0 .11-.92c-.04-.09-.17-.14-.37-.24z"/></svg>
        } @else {
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        }
      </button>
    </div>
  `,
  styles: [`
    .wa-widget { position: fixed; bottom: 22px; right: 22px; z-index: 80; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
    @media (max-width: 900px) {
      .wa-widget { bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom) + 14px); right: 16px; }
    }
    .wa-fab {
      width: 58px; height: 58px; border-radius: 50%;
      background: var(--wa); color: #fff; border: none; cursor: pointer;
      display: grid; place-items: center;
      box-shadow: 0 8px 24px rgba(34,184,91,.45);
      transition: transform .18s; position: relative;
      &:hover { transform: scale(1.08); }
      &::after {
        content: ''; position: absolute; inset: 0; border-radius: 50%;
        border: 2px solid var(--wa); animation: pulse 2.2s infinite;
      }
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: .7; }
      70% { transform: scale(1.5); opacity: 0; }
      100% { opacity: 0; }
    }
    .wa-popup {
      background: #fff; border-radius: 16px; width: 290px;
      box-shadow: 0 12px 40px rgba(22,58,46,.2);
      overflow: hidden; animation: popIn .2s ease;
    }
    @keyframes popIn { from { opacity: 0; transform: scale(.9) translateY(10px); } to { opacity: 1; transform: none; } }
    .wa-popup-head {
      background: var(--wa); color: #fff; padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
      .wa-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.3); display: grid; place-items: center; font-weight: 700; flex-shrink: 0; }
      strong { display: block; font-weight: 700; }
      span { font-size: .78rem; opacity: .9; }
      button { margin-left: auto; background: none; border: none; color: #fff; cursor: pointer; font-size: 1rem; padding: 4px; }
    }
    .wa-popup-body { padding: 16px; }
    .wa-popup-body p { font-size: .94rem; color: var(--ink); background: var(--sand); padding: 12px 14px; border-radius: 10px; border-bottom-left-radius: 2px; line-height: 1.5; }
    .wa-popup-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: var(--wa); color: #fff; padding: 13px; font-weight: 600;
      font-family: 'Bricolage Grotesque', sans-serif; font-size: .98rem;
      transition: background .15s;
      &:hover { background: #1da54f; }
    }
  `]
})
export class WhatsappWidgetComponent {
  open = signal(false);
  waLink = `https://wa.me/${BUSINESS.whatsapp}?text=Hi%20Mano%20Madhu%20Tours%2C%20I%27d%20like%20to%20book%20a%20trip.`;
  toggle() { this.open.update(v => !v); }
}
