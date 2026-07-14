import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Comparison {
  before: string;
  after: string;
}

interface Pillar {
  title: string;
  description: string;
}

@Component({
  selector: 'ayllu-why-ayllu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './why-ayllu.component.html',
  styleUrl: './why-ayllu.component.scss',
})
export class WhyAylluComponent {
  protected readonly comparisons: Comparison[] = [
    { before: 'Planilla de cobros armada a mano cada periodo', after: 'Periodo publicado con autorrelleno del histórico' },
    { before: 'Recibos en Word, uno por uno', after: 'Recibos en lote, listos para imprimir o enviar' },
    { before: 'Notificar por WhatsApp o correo manualmente', after: 'Notificación automática a cada propietario/inquilino' },
    { before: 'Reportes armados en Excel antes de cada asamblea', after: 'Reportes visuales por bloque y periodo, siempre listos' },
  ];

  protected readonly pillars: Pillar[] = [
    {
      title: 'Moderno e intuitivo',
      description: 'Una interfaz pensada para usarse sin manual, no un ERP de hace diez años.',
    },
    {
      title: 'Soporte 24/7',
      description: 'Alguien responde cuando lo necesitas, no un ticket que se pierde en una cola.',
    },
    {
      title: 'Escalable',
      description: 'El producto crece contigo: nuevas funciones se suman de forma continua.',
    },
  ];
}
