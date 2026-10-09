import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { FooterComponent } from '../landing/components/footer/footer.component';
import { PRIVACY_POLICY, PRIVACY_POLICY_CONFIG } from './privacy-policy.content';

const PAGE_URL = `https://${PRIVACY_POLICY_CONFIG.site}/privacy-policy`;
const PAGE_TITLE = 'Privacy Policy — Ayllu';
const PAGE_DESCRIPTION =
  'What data the Ayllu app processes, why, who it is shared with, and how to exercise your rights or delete your account.';

@Component({
  selector: 'ayllu-privacy-policy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  protected readonly config = PRIVACY_POLICY_CONFIG;
  protected readonly policy = PRIVACY_POLICY;

  ngOnInit(): void {
    this.setSeoTags();
  }

  private setSeoTags(): void {
    this.title.setTitle(PAGE_TITLE);
    this.meta.updateTag({ name: 'description', content: PAGE_DESCRIPTION });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: PAGE_TITLE });
    this.meta.updateTag({ property: 'og:description', content: PAGE_DESCRIPTION });
    this.meta.updateTag({ property: 'og:url', content: PAGE_URL });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', PAGE_URL);
  }
}
