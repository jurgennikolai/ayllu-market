import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface FeatureGroup {
  eyebrow: string;
  title: string;
  bullets: string[];
  imageHint: string;
}

@Component({
  selector: 'ayllu-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  protected readonly groups: FeatureGroup[] = [
    {
      eyebrow: 'Conceptos y periodos',
      title: 'Define cómo se cobra, una sola vez',
      bullets: [
        'Conceptos individuales, medidos (agua, luz), fijos o grupales',
        'Formatos de recibo personalizados por propiedad',
        'Autorrelleno de montos desde periodos anteriores',
        'Publicación de periodo con un clic',
      ],
      imageHint: 'pantalla de configuración de conceptos y periodos de pago',
    },
    {
      eyebrow: 'Cobros y recibos',
      title: 'De la publicación al cobro, sin fricción',
      bullets: [
        'Generación de recibos en lote, listos para imprimir',
        'Notificación automática por correo a propietarios e inquilinos',
        'Descarga en PDF y registro de cobros recibidos',
        'Entidades bancarias y números de pago configurables',
      ],
      imageHint: 'vista de generación masiva de recibos y notificaciones',
    },
    {
      eyebrow: 'Finanzas y reportes',
      title: 'Visibilidad real de cada sol que entra y sale',
      bullets: [
        'Gastos visualizados por año, bloque o unidad',
        'Gráficos listos para presentar en asamblea',
        'Registro y trazabilidad de transacciones',
      ],
      imageHint: 'dashboard de finanzas con gráficos por bloque y periodo',
    },
    {
      eyebrow: 'Roles y accesos',
      title: 'Cada quien ve solo lo que le corresponde',
      bullets: [
        'Cuentas de administrador con permisos por propiedad o bloque',
        'Acceso propio para propietarios e inquilinos',
        'Trazabilidad de todos los correos y procesos enviados',
      ],
      imageHint: 'panel de administración de usuarios, roles y permisos',
    },
  ];
}
