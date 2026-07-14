import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AYLLU_CONFIG } from '../../landing.config';

@Component({
  selector: 'ayllu-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly config = AYLLU_CONFIG;
  protected readonly year = new Date().getFullYear();
}
