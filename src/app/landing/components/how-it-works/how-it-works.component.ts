import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

type Tier = 'property' | 'block' | 'unit';

interface DiagramNode {
  id: string;
  cx: number;
  cy: number;
  r: number;
  tier: Tier;
  /** puntos del polígono hexagonal, precalculados una sola vez */
  points: string;
}

interface DiagramEdge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** longitud de línea recta, usada para el stroke-dasharray del trazo animado */
  length: number;
}

interface HierarchyScene {
  id: string;
  /** [propiedad, bloque, unidad] con el nombre que toma cada nivel en este rubro */
  labels: [string, string, string];
  caption: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

interface Step {
  label: string;
  title: string;
  description: string;
}

/** Genera los puntos de un hexágono "pointy-top", igual al del logo de Ayllu */
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function node(id: string, cx: number, cy: number, r: number, tier: Tier): DiagramNode {
  return { id, cx, cy, r, tier, points: hexPoints(cx, cy, r) };
}

function edge(id: string, x1: number, y1: number, x2: number, y2: number): DiagramEdge {
  return { id, x1, y1, x2, y2, length: Math.hypot(x2 - x1, y2 - y1) };
}

/**
 * Tres configuraciones reales de la misma jerarquía Ayllu, para dejar claro
 * que "un bloque" no siempre significa lo mismo: puede ser 1-a-1, 1-a-muchos,
 * o varias propiedades en paralelo — y el nombre de cada nivel se adapta al rubro.
 */
const SCENES: HierarchyScene[] = [
  {
    id: 'simple',
    labels: ['Propiedad', 'Bloque', 'Unidad'],
    caption: '1 propiedad · 1 bloque · 3 unidades',
    nodes: [
      node('p1', 120, 150, 70, 'property'),

      node('b1', 400, 150, 50, 'block'),

      node('u1', 680, 70, 28, 'unit'),
      node('u2', 680, 150, 28, 'unit'),
      node('u3', 680, 230, 28, 'unit'),
    ],
    edges: [
      edge('p1-b1', 120, 150, 400, 150),

      edge('b1-u1', 400, 150, 680, 70),
      edge('b1-u2', 400, 150, 680, 150),
      edge('b1-u3', 400, 150, 680, 230),
    ],
  },

  {
    id: 'towers',
    labels: ['Condominio', 'Torre', 'Departamento'],
    caption: '1 condominio · 2 torres · 4 departamentos',
    nodes: [
      node('p1', 120, 150, 68, 'property'),

      node('b1', 400, 90, 44, 'block'),
      node('b2', 400, 210, 44, 'block'),

      node('u1', 680, 50, 24, 'unit'),
      node('u2', 680, 110, 24, 'unit'),
      node('u3', 680, 190, 24, 'unit'),
      node('u4', 680, 250, 24, 'unit'),
    ],
    edges: [
      edge('p1-b1', 120, 150, 400, 90),
      edge('p1-b2', 120, 150, 400, 210),

      edge('b1-u1', 400, 90, 680, 50),
      edge('b1-u2', 400, 90, 680, 110),

      edge('b2-u3', 400, 210, 680, 190),
      edge('b2-u4', 400, 210, 680, 250),
    ],
  },

  {
    id: 'portfolio',
    labels: ['Propiedad', 'Casa', 'Habitación'],
    caption: '2 propiedades · 2 casas · 4 habitaciones',
    nodes: [
      node('p1', 120, 90, 46, 'property'),
      node('p2', 120, 210, 46, 'property'),

      node('b1', 400, 90, 40, 'block'),
      node('b2', 400, 210, 40, 'block'),

      node('u1', 680, 60, 22, 'unit'),
      node('u2', 680, 120, 22, 'unit'),
      node('u3', 680, 180, 22, 'unit'),
      node('u4', 680, 240, 22, 'unit'),
    ],
    edges: [
      edge('p1-b1', 120, 90, 400, 90),
      edge('p2-b2', 120, 210, 400, 210),

      edge('b1-u1', 400, 90, 680, 60),
      edge('b1-u2', 400, 90, 680, 120),

      edge('b2-u3', 400, 210, 680, 180),
      edge('b2-u4', 400, 210, 680, 240),
    ],
  },
];

const SCENE_INTERVAL_MS = 5200;
const SWITCH_FADE_MS = 220;

@Component({
  selector: 'ayllu-how-it-works',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;
  private switchTimeoutId?: ReturnType<typeof setTimeout>;

  protected readonly scenes = SCENES;
  protected readonly activeIndex = signal(0);
  protected readonly isSwitching = signal(false);
  protected readonly activeScene = computed(() => this.scenes[this.activeIndex()]);

  protected readonly steps: Step[] = [
    {
      label: '01',
      title: 'Crea tu jerarquía',
      description:
        'Registra tu propiedad, sus bloques y unidades — con el nombre que uses en tu día a día.',
    },
    {
      label: '02',
      title: 'Configura conceptos de pago',
      description:
        'Individuales, medidos (agua, luz), fijos o grupales, con formato de recibo propio.',
    },
    {
      label: '03',
      title: 'Publica el periodo',
      description:
        'Autorrellena montos desde el histórico anterior y publica cuando esté listo.',
    },
    {
      label: '04',
      title: 'Cobra y notifica',
      description:
        'Genera recibos en lote, notifica por correo y registra cada cobro que entra.',
    },
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // el usuario sigue pudiendo cambiar de escena manualmente con los puntos
    }

    this.intervalId = setInterval(() => {
      this.goToScene((this.activeIndex() + 1) % this.scenes.length);
    }, 10);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.switchTimeoutId) {
      clearTimeout(this.switchTimeoutId);
    }
  }

  protected goToScene(index: number): void {
    console.log("xxx")
    if (index === this.activeIndex()) {
      return;
    }
    console.log("xxx2")

    // reinicia el auto-avance cuando el usuario elige manualmente,
    // para que no cambie de escena a los dos segundos de haber elegido
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
            console.log("xxx3")

        this.goToScene((this.activeIndex() + 1) % this.scenes.length);
      }, SCENE_INTERVAL_MS);
    }
    console.log("xxx4")

    this.isSwitching.set(true);
    this.switchTimeoutId = setTimeout(() => {
      this.activeIndex.set(index);
      this.isSwitching.set(false);
    }, SWITCH_FADE_MS);
  }

  protected diagramAriaLabel(scene: HierarchyScene): string {
    const [propertyLabel, blockLabel, unitLabel] = scene.labels;
    return `Diagrama: un/a ${propertyLabel.toLowerCase()} contiene ${blockLabel.toLowerCase()}s, y cada ${blockLabel.toLowerCase()} contiene ${unitLabel.toLowerCase()}s. Ejemplo actual: ${scene.caption}.`;
  }
}
