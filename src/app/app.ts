import { Component, inject, signal } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Alto del header sticky (`.header__bar`): el scroll a una sección se
// compensa para que el título no quede tapado. Páginas sin header
// (p. ej. /privacy-policy) no llevan compensación.
const STICKY_HEADER_HEIGHT = 76;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ayllu-market');

  constructor() {
    const document = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => [
      0,
      document.querySelector('ayllu-header') ? STICKY_HEADER_HEIGHT : 0,
    ]);
  }
}
