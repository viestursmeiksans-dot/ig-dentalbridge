// ============================================================
// DRÖMLEENDET / DENTAL BRIDGE — brand tokens
// Locked into the pipeline. Do not freelance.
// ============================================================
import { loadFont } from '@remotion/google-fonts/Inter';

// Load Inter 700 + 900 once; every composition imports `fontFamily` from here
export const { fontFamily } = loadFont('normal', { weights: ['700', '900'] });

// Colors
export const COLORS = {
  teal: '#0d9488',
  tealDark: '#0f766e',
  nearBlack: '#0a0a0a',
  cream: '#fef3c7',
  white: '#ffffff',
  red: '#dc2626',
  // Flag colors (for context scenes)
  swedishBlue: '#006AA7',
  swedishYellow: '#FECC00',
  latvianRed: '#9E3039',
  // iMessage SMS UI
  imessageBg: '#000000',
  imessageBubbleGray: '#26252A',
  imessageBubbleBlue: '#1781FC',
  imessageStatusGray: '#8E8E93',
} as const;

// Spring presets — reuse for consistent feel across reels
export const SPRINGS = {
  firm: { damping: 12, mass: 0.6, stiffness: 120 },
  stamp: { damping: 8, mass: 0.4, stiffness: 200 },
  bouncy: { damping: 6, mass: 0.5, stiffness: 180 },
  gentle: { damping: 14, mass: 0.8, stiffness: 90 },
} as const;

// ============================================================
// HELPERS
// ============================================================

/** Swedish number formatting: 45000 -> "45 000" (space thousands separator) */
export const formatSEK = (n: number): string => {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/** EUR formatting with the € symbol */
export const formatEUR = (n: number): string => {
  return `€${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
};

/** EUR -> SEK conversion (ECB-area rate, May 2026). Update when materially shifts. */
export const EUR_TO_SEK = 11.4;
export const eurToSek = (eur: number): number => Math.round(eur * EUR_TO_SEK);

// ============================================================
// REAL DENTAL ART PRICES (verified from dentalart.lv/en/prices, May 2026)
// All EUR; convert to SEK via eurToSek() for display
// ============================================================
export const DENTAL_ART_PRICES_EUR = {
  // Implants (titanium, "from" prices)
  implantAlphaBio: 700,
  implantStraumann: 950,
  implantNobel: 1050,
  // Crowns
  metalCeramicCrown: 560,
  zirconiumCrown: 660,
  ceramicCrown: 750,
  // Crowns on implant
  metalCeramicCrownOnImplant: 800,
  zirconiumCrownOnImplant: 900,
  // Aesthetic
  porcelainVeneer: 750,
  smileDesignMockup: 450,
  // Hygiene/whitening
  whiteningFlash: 380,
  whiteningPhoto: 250,
  // Consultations
  implantConsultation: 65,
  generalConsultation: 45,
} as const;

// ============================================================
// SWEDISH REFERENCE PRICES (mid-range private clinic, 2026)
// Sourced from public Swedish dental clinic price lists + tandvårdsstöd guides
// These are realistic ballpark numbers, not cherry-picked highest
// ============================================================
export const SWEDISH_REFERENCE_SEK = {
  fullImplantWithCrown: 28000, // 25-35k typical range in private SE
  porcelainVeneer: 13500, // 12-16k typical range
  zirconiumCrown: 9500, // 8-12k typical range
  whiteningClinic: 6500, // 5-8k typical range
  implantConsultation: 1200,
} as const;

// ============================================================
// TRAVEL — verified May 2026
// ============================================================
export const TRAVEL = {
  // airBaltic ARN↔RIX return Economy with checked bag, mid-range fare
  // (Ryanair cheaper at ~400-800 SEK return without bag)
  flightReturnSEK: 1500,

  // Grand Poet Hotel by Semarah — 5-star superior, Old Town location
  // Verified at booking.com / momondo: average €130/night, range €100-180
  // 168 rooms incl. 20 luxury suites, SPA, indoor pool, fine dining (Snob)
  // 2-min walk to Old Town, overlooks Bastion Hill / Bastejkalna Park
  grandPoetPerNightEUR: 130,
  grandPoetPerNightSEK: 130 * EUR_TO_SEK, // ~1 482 SEK/night

  // Food + transport (taxis, sightseeing) per day in Riga
  foodTransportPerDaySEK: 500,

  // Day-trip flight timing — real airBaltic / Ryanair daily schedule
  morningFlightARN: '06:30',
  morningArrivalRIX: '09:40', // +1h timezone
  eveningFlightRIX: '20:15',
  eveningArrivalARN: '20:35', // -1h timezone
  flightDurationMinutes: 70, // 1h 10min direct
} as const;

// ============================================================
// RIGA POSITIONING — for sightseeing inserts and "Why Riga?" Reel
// All landmarks verified, walking distances from Old Town / Grand Poet
// ============================================================
export const RIGA_FACTS = {
  // Trust signals
  euCertified: 'EU-certifierade kliniker',
  baltichub: 'Baltikums hub för tandvårdsturism',
  flightTimeFromStockholm: '1h 10min',

  // Real sightseeing landmarks (UNESCO World Heritage Old Town)
  // All within walking distance from Grand Poet (Raina Bulvāris 5/6)
  landmarks: [
    { name: 'Vecrīga (Gamla stan)', detail: 'UNESCO världsarv' },
    { name: 'Frihetsmonumentet', detail: '300m från hotellet' },
    { name: 'Svartshuvudenas hus', detail: '15th-cent. medeltidshall' },
    { name: 'Petrikyrkan', detail: 'Tornutsikt över staden' },
    { name: 'Latvijas Nacionālā Opera', detail: 'Rigas opera' },
    { name: 'Jugend-distriktet', detail: 'Världens största Art Nouveau-samling' },
    { name: 'Centrala saluhallen', detail: '5 zeppelinhangarer' },
  ],
} as const;
