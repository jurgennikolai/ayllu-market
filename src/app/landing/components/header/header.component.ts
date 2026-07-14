import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AYLLU_CONFIG } from '../../landing.config';

@Component({
  selector: 'ayllu-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly config = AYLLU_CONFIG;
  protected readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
