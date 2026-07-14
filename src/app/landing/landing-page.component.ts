import { ChangeDetectionStrategy, Component, OnInit, afterNextRender, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AYLLU_CONFIG } from './landing.config';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProblemComponent } from './components/problem/problem.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FeaturesComponent } from './components/features/features.component';
import { AudienceComponent } from './components/audience/audience.component';
import { WhyAylluComponent } from './components/why-ayllu/why-ayllu.component';
import { CtaContactComponent } from './components/cta-contact/cta-contact.component';
import { FooterComponent } from './components/footer/footer.component';

const PAGE_TITLE = 'Ayllu — Gestión de cobros para condominios, edificios y alquileres';
const PAGE_DESCRIPTION =
  'Ayllu digitaliza el cobro a propietarios e inquilinos: conceptos de pago, periodos, recibos automáticos y reportes financieros. Coordina una demo gratis por WhatsApp.';
const PAGE_URL = `https://${AYLLU_CONFIG.brand.domain}`;
const OG_IMAGE = `${PAGE_URL}/assets/images/ayllu-logo.png`;

@Component({
  selector: 'ayllu-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    ProblemComponent,
    HowItWorksComponent,
    FeaturesComponent,
    AudienceComponent,
    WhyAylluComponent,
    CtaContactComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.setSeoTags();
  }

  constructor() {
    // El JSON-LD toca el DOM directamente: se difiere con afterNextRender
    // para que corra igual en servidor (SSR) y cliente, sin duplicarse
    // durante la hidratación.
    afterNextRender(() => this.injectStructuredData());
  }

  private setSeoTags(): void {
    this.title.setTitle(PAGE_TITLE);

    this.meta.updateTag({ name: 'description', content: PAGE_DESCRIPTION });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'gestión de condominios, cobro de alquileres, software administración de edificios, recibos automáticos, Perú',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: PAGE_TITLE });
    this.meta.updateTag({ property: 'og:description', content: PAGE_DESCRIPTION });
    this.meta.updateTag({ property: 'og:url', content: PAGE_URL });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:locale', content: 'es_PE' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: PAGE_TITLE });
    this.meta.updateTag({ name: 'twitter:description', content: PAGE_DESCRIPTION });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    // Canonical
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', PAGE_URL);
  }

  private injectStructuredData(): void {
    const scriptId = 'ayllu-structured-data';
    if (this.document.getElementById(scriptId)) {
      return;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: AYLLU_CONFIG.brand.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      image: OG_IMAGE,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'PEN',
        availability: 'https://schema.org/InStock',
      },
    };

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }
}
