/**
 * Configuración central de la landing de Ayllu.
 * Cambia el número o los mensajes acá — ningún componente
 * debe tener el teléfono o los textos de WhatsApp hardcodeados.
 */

const WHATSAPP_PHONE = '51945604546'; // +51 945 604 546, formato internacional sin '+' ni espacios

function buildWhatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const AYLLU_CONFIG = {
  brand: {
    name: 'Ayllu',
    tagline: 'Plataforma de gestión',
    domain: 'aylluapps.com',
    logoPath: 'assets/images/ayllu-logo.png',
  },
  contact: {
    phoneDisplay: '+51 945 604 546',
    whatsapp: {
      default: buildWhatsappLink('Hola, quiero coordinar una demo de Ayllu 👋'),
      header: buildWhatsappLink('Hola, me interesa conocer más sobre Ayllu.'),
      audienceAdmin: buildWhatsappLink(
        'Hola, administro un condominio/edificio y quiero una demo de Ayllu.'
      ),
      audienceRealEstate: buildWhatsappLink(
        'Hola, tengo una inmobiliaria y quiero una demo de Ayllu.'
      ),
      audienceOwner: buildWhatsappLink(
        'Hola, alquilo propiedades directamente y quiero una demo de Ayllu.'
      ),
      finalCta: buildWhatsappLink(
        'Hola, quiero coordinar una demo de Ayllu para mi propiedad.'
      ),
    },
  },
  nav: [
    { label: 'Funcionalidades', anchor: 'funcionalidades' },
    { label: 'Cómo funciona', anchor: 'como-funciona' },
    { label: 'Para quién es', anchor: 'para-quien' },
    { label: 'Contacto', anchor: 'contacto' },
  ],
} as const;
