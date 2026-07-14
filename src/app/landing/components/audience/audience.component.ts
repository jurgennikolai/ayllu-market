import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { AYLLU_CONFIG } from '../../landing.config';

interface Segment {
  title: string;
  pain: string;
  benefit: string;
  whatsapp: string;
  featured: boolean;
}

@Component({
  selector: 'ayllu-audience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './audience.component.html',
  styleUrl: './audience.component.scss',
})
export class AudienceComponent {
  protected readonly segments: Segment[] = [
    {
      title: 'Administradores de condominios y edificios',
      pain: 'Cobras a decenas de unidades y armas reportes para junta de propietarios a mano.',
      benefit: 'Publica el periodo una vez y deja que Ayllu genere recibos, notifique y reporte.',
      whatsapp: AYLLU_CONFIG.contact.whatsapp.audienceAdmin,
      featured: true,
    },
    {
      title: 'Inmobiliarias',
      pain: 'Gestionas varias propiedades a la vez, cada una con sus propios inquilinos y montos.',
      benefit: 'Una sola plataforma para todas tus propiedades, con accesos separados por cartera.',
      whatsapp: AYLLU_CONFIG.contact.whatsapp.audienceRealEstate,
      featured: false,
    },
    {
      title: 'Propietarios individuales',
      pain: 'Alquilas directamente y llevas el control de pagos en notas o mensajes sueltos.',
      benefit: 'Recibos formales, recordatorios automáticos y todo tu historial en un solo lugar.',
      whatsapp: AYLLU_CONFIG.contact.whatsapp.audienceOwner,
      featured: false,
    },
  ];
}
