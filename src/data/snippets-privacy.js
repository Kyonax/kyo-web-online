/*
 * Copyright (c) 2026 Cristian D. Moreno — @Kyonax
 * Distributed under the terms of GPL-2.0-only — see LICENSE.
 */

/*
 * snippets-privacy.js — the privacy page's body copy, read only by
 * views/privacy.vue. `privacy.meta`, `.title` and `.breadcrumb` stay in
 * the core: the JSON-LD builders read them off the static import, not vue-i18n.
 */
export const TRANSLATIONS_PRIVACY = {
  'en': {
    'kyo-web': {
      'privacy': {
        'lead': 'This page describes how <strong>kyonax.com</strong> handles visitor data. The site is operated by <strong>Cristian D. Moreno (Kyonax)</strong>. It collects the minimum data needed to understand traffic patterns. No advertising, no profiling, no third-party data brokers.',
        'signoff': 'Cristian D. Moreno - Privacy Policy',
        'sections': [
          {
            'title': 'What we collect',
            'body': '<p>If you accept the cookie banner, this site loads <a href=\'https://policies.google.com/privacy\'>Google Analytics 4</a> with IP anonymization enabled. We see aggregated visit counts, traffic sources, country-level location, browser type, and which pages are viewed. We never see your IP address, identity, or any personally identifying information.</p><p>If you decline, no analytics fires. Google\'s Consent Mode v2 ensures cookies for analytics are never set.</p>',
          },
          {
            'title': 'What we don\'t collect',
            'body': '<ul><li>No ad-targeting cookies.</li><li>No fingerprinting beyond Google Analytics\' default aggregation.</li><li>No third-party trackers beyond GA4.</li><li>No email or contact form data unless you initiate a message via the contact links.</li></ul>',
          },
          {
            'title': 'Cookies',
            'body': '<p>The only persistent storage this site sets in your browser:</p><ul><li><code>kyo:lang</code>, your language preference (EN or ES).</li><li><code>kyo:consent</code>, your analytics consent decision.</li><li>Google Analytics cookies (<code>_ga</code>, <code>_ga_*</code>), only after you accept.</li></ul>',
          },
          {
            'title': 'Embedded videos',
            'body': '<p>Some project entries include short demo videos hosted on YouTube. Thumbnails load from <code>i.ytimg.com</code> without setting cookies. When you confirm playback, the player loads from <code>youtube-nocookie.com</code>, which can store data on your device under Google\'s privacy policy (linked above). A confirmation prompt appears the first time you press play, and your decision is remembered alongside the analytics consent above.</p>',
          },
          {
            'title': 'Your rights',
            'body': '<p>Clear your browser\'s site data for <code>kyonax.com</code> to revoke all preferences and any analytics cookies. The next visit will show the consent banner again.</p>',
          },
          {
            'title': 'Contact',
            'body': '<p>For privacy questions: <a href=\'mailto:support&#64;kyonax.com\'>support&#64;kyonax.com</a>.</p>',
          },
        ],
      },
    },
  },
  'es': {
    'kyo-web': {
      'privacy': {
        'lead': 'Esta página describe cómo <strong>kyonax.com</strong> maneja los datos de los visitantes. El sitio es operado por <strong>Cristian D. Moreno (Kyonax)</strong>. Recolecta el mínimo de datos necesarios para entender los patrones de tráfico. Sin publicidad, sin perfilado, sin intermediarios de datos.',
        'signoff': 'Cristian D. Moreno - Política de Privacidad',
        'sections': [
          {
            'title': 'Qué recolectamos',
            'body': '<p>Si aceptas el banner de cookies, este sitio carga <a href=\'https://policies.google.com/privacy\'>Google Analytics 4</a> con anonimización de IP activada. Vemos conteos de visitas agregados, fuentes de tráfico, ubicación a nivel de país, tipo de navegador y qué páginas se ven. Nunca vemos tu dirección IP, identidad ni ninguna información personal identificable.</p><p>Si rechazas, no se dispara analítica. El Modo de Consentimiento v2 de Google asegura que las cookies de análisis nunca se establezcan.</p>',
          },
          {
            'title': 'Qué no recolectamos',
            'body': '<ul><li>Sin cookies de segmentación publicitaria.</li><li>Sin huellas digitales más allá de la agregación por defecto de Google Analytics.</li><li>Sin rastreadores de terceros más allá de GA4.</li><li>Sin datos de correo o formularios de contacto a menos que tú inicies un mensaje vía los enlaces de contacto.</li></ul>',
          },
          {
            'title': 'Cookies',
            'body': '<p>El único almacenamiento persistente que este sitio establece en tu navegador:</p><ul><li><code>kyo:lang</code>, tu preferencia de idioma (EN o ES).</li><li><code>kyo:consent</code>, tu decisión de consentimiento de analítica.</li><li>Cookies de Google Analytics (<code>_ga</code>, <code>_ga_*</code>), solo después de que aceptes.</li></ul>',
          },
          {
            'title': 'Videos embebidos',
            'body': '<p>Algunos proyectos incluyen videos de demostración alojados en YouTube. Las miniaturas cargan desde <code>i.ytimg.com</code> sin establecer cookies. Cuando confirmas la reproducción, el reproductor carga desde <code>youtube-nocookie.com</code>, lo cual puede guardar datos en tu dispositivo bajo la política de privacidad de Google (enlazada arriba). La primera vez que pulsas reproducir aparece un mensaje de confirmación, y tu decisión queda guardada junto al consentimiento de analítica de arriba.</p>',
          },
          {
            'title': 'Tus derechos',
            'body': '<p>Limpia los datos de sitio de tu navegador para <code>kyonax.com</code> para revocar todas las preferencias y cookies de analítica. La siguiente visita mostrará el banner de consentimiento de nuevo.</p>',
          },
          {
            'title': 'Contacto',
            'body': '<p>Para preguntas de privacidad: <a href=\'mailto:support&#64;kyonax.com\'>support&#64;kyonax.com</a>.</p>',
          },
        ],
      },
    },
  },
};

export default TRANSLATIONS_PRIVACY;
