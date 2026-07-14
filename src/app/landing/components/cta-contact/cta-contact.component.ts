import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { AYLLU_CONFIG } from '../../landing.config';

@Component({
  selector: 'ayllu-cta-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './cta-contact.component.html',
  styleUrl: './cta-contact.component.scss',
})
export class CtaContactComponent {
  protected readonly config = AYLLU_CONFIG;
}
