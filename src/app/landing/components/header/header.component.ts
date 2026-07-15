import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, signal, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AYLLU_CONFIG } from '../../landing.config';

@Component({
  selector: 'ayllu-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected readonly config = AYLLU_CONFIG;
  protected readonly isMenuOpen = signal(false);
  protected readonly isDarkMode = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const storageKey = 'ayllu-theme';
    const storedTheme = this.document.defaultView?.localStorage.getItem(storageKey);
    const prefersDark = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    const initialTheme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : prefersDark
          ? 'dark'
          : 'light';

    this.applyTheme(initialTheme, false);

    const mediaQuery = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener?.('change', (event: MediaQueryListEvent) => {
      if (!this.document.defaultView?.localStorage.getItem(storageKey)) {
        this.applyTheme(event.matches ? 'dark' : 'light', false);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const nextTheme = this.isDarkMode() ? 'light' : 'dark';
    this.applyTheme(nextTheme, true);
  }

  private applyTheme(theme: 'light' | 'dark', persist: boolean): void {
    this.document.documentElement.setAttribute('data-theme', theme);
    this.isDarkMode.set(theme === 'dark');

    if (persist && this.isBrowser) {
      this.document.defaultView?.localStorage.setItem('ayllu-theme', theme);
    }
  }
}
