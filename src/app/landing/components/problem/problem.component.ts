import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface PainPoint {
  title: string;
  description: string;
  icon: 'sheet' | 'receipt' | 'search' | 'chart';
}

@Component({
  selector: 'ayllu-problem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.scss',
})
export class ProblemComponent {
  protected readonly painPoints: PainPoint[] = [
    {
      title: 'Cobros a mano, mes tras mes',
      description:
        'Cada periodo vuelves a armar la misma planilla de cobros, unidad por unidad, desde cero.',
      icon: 'sheet',
    },
    {
      title: 'Recibos en Word o Excel',
      description:
        'Formatos sueltos, sin numeración clara, difíciles de enviar y más difíciles de rastrear.',
      icon: 'receipt',
    },
    {
      title: 'No sabes quién pagó',
      description:
        'La conciliación entre lo depositado y lo registrado se hace revisando estados de cuenta a mano.',
      icon: 'search',
    },
    {
      title: 'Reportes armados a último minuto',
      description:
        'Juntar gastos por bloque, unidad o periodo para una asamblea toma horas que no tienes.',
      icon: 'chart',
    },
  ];
}
