import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * [aylluReveal] — agrega la clase 'is-visible' cuando el elemento
 * entra al viewport. El estilo real (opacity/transform/transition)
 * vive en cada componente vía el mixin `reveal-base` de _tokens.scss;
 * esta directiva solo orquesta el "cuándo".
 *
 * SSR-safe: en el servidor no existe IntersectionObserver, así que
 * simplemente no se activa (el contenido queda visible por defecto
 * gracias a la regla @media (prefers-reduced-motion) / fallback).
 *
 * Uso: <div aylluReveal [aylluRevealDelay]="100">...</div>
 */
@Directive({
  selector: '[aylluReveal]',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  /** Retardo opcional en ms, útil para escalonar tarjetas dentro de un grid */
  readonly aylluRevealDelay = input<number>(0);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const node = this.el.nativeElement;

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }

    node.style.transitionDelay = `${this.aylluRevealDelay()}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
