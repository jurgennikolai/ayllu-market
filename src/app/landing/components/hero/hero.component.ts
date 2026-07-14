import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AYLLU_CONFIG } from '../../landing.config';

@Component({
  selector: 'ayllu-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly config = AYLLU_CONFIG;

  protected readonly trustPoints = [
    { label: 'Jerarquía flexible', detail: 'Propiedad → Bloque → Unidad' },
    { label: 'Cobros automáticos', detail: 'Recibos en lote + notificación' },
    { label: 'Reportes en vivo', detail: 'Finanzas por bloque y periodo' },
  ];
}
