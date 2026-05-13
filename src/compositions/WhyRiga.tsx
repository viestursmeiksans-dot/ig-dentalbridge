import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { COLORS, SPRINGS, fontFamily, RIGA_FACTS } from '../shared/brand';
import { OutroScene } from '../shared/OutroScene';

// ============================================================
// REEL #7: "VARFÖR RIGA?"
// 1080x1920, 30fps, 450 frames = 15 seconds
// ------------------------------------------------------------
// Concept: Trust / authority Reel. Doesn't sell a treatment —
// sells the destination. Hits the "is this safe?" objection.
// Three trust pillars stack: EU certification, Baltic hub status,
// Old Town location. Ends with sightseeing photo strip and outro.
// ------------------------------------------------------------
// 0.0 - 2.0s   (0-60f)    Hook: "Varför Riga?"
// 2.0 - 4.5s   (60-135f)  Pillar 1: EU-certified clinics
// 4.5 - 7.0s   (135-210f) Pillar 2: Baltic dental hub
// 7.0 - 9.5s   (210-285f) Pillar 3: 1h 10min from Stockholm
// 9.5 - 13.0s  (285-390f) Sightseeing landmarks strip
// 13.0 - 15.0s (390-450f) Outro
// ============================================================

// ============================================================
// Hook scene — bold question
// ============================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 50,
    to: 0,
  });
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Subtle pulse on the question mark
  const punctPulse = interpolate(
    spring({
      frame: frame - 15,
      fps,
      config: SPRINGS.bouncy,
      from: 0,
      to: 1,
    }),
    [0, 1],
    [1, 1.15]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.teal,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 280,
            color: COLORS.cream,
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
          }}
        >
          Varför
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 20,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 280,
            color: COLORS.white,
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
          }}
        >
          Riga
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 280,
            color: COLORS.cream,
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
            transform: `scale(${punctPulse})`,
            transformOrigin: 'bottom left',
          }}
        >
          ?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Trust pillar — reusable, 3 variants
// ============================================================
type Pillar = {
  number: string;
  headline: string;
  body: string;
  accent: string; // emoji
  background: string;
  accentColor: string;
};

const PILLAR_1: Pillar = {
  number: '01',
  headline: 'EU-certifierade kliniker',
  body:
    'Samma EU-standarder, samma material, samma garantier som i Sverige. Lettland är EU-medlem sedan 2004.',
  accent: '🇪🇺',
  background: COLORS.nearBlack,
  accentColor: COLORS.cream,
};

const PILLAR_2: Pillar = {
  number: '02',
  headline: 'Baltikums hub för\ntandvårdsturism',
  body:
    'Tusentals patienter från Norden, Tyskland och Storbritannien varje år. Klinikerna har erfarenheten — och engelska och tyska som arbetsspråk.',
  accent: '⚓',
  background: COLORS.teal,
  accentColor: COLORS.cream,
};

const PILLAR_3: Pillar = {
  number: '03',
  headline: '1h 10min från\nStockholm',
  body:
    'Direktflyg från Arlanda flera gånger om dagen. Närmare än många svenska städer. airBaltic · Ryanair · Norwegian.',
  accent: '✈️',
  background: COLORS.cream,
  accentColor: COLORS.teal,
};

const PillarScene: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isLightBg = pillar.background === COLORS.cream;
  const headlineColor = isLightBg ? COLORS.nearBlack : COLORS.white;
  const bodyColor = isLightBg
    ? COLORS.nearBlack
    : COLORS.cream;

  // Number scales in
  const numberScale = spring({
    frame,
    fps,
    config: SPRINGS.bouncy,
    from: 0.5,
    to: 1,
  });

  // Headline slides in from left
  const headlineX = spring({
    frame: frame - 10,
    fps,
    config: SPRINGS.firm,
    from: -40,
    to: 0,
  });
  const headlineOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Body fades in
  const bodyOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Accent emoji pulses in
  const accentScale = spring({
    frame: frame - 30,
    fps,
    config: SPRINGS.bouncy,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pillar.background,
        padding: '180px 60px',
        flexDirection: 'column',
      }}
    >
      {/* Top: big number */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 220,
          color: pillar.accentColor,
          letterSpacing: '-0.06em',
          lineHeight: 0.85,
          transform: `scale(${numberScale})`,
          transformOrigin: 'left center',
        }}
      >
        {pillar.number}
      </div>

      {/* Accent emoji floating right */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          right: 60,
          fontSize: 200,
          transform: `scale(${accentScale}) rotate(-8deg)`,
        }}
      >
        {pillar.accent}
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 92,
          color: headlineColor,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          marginTop: 60,
          whiteSpace: 'pre-line',
          transform: `translateX(${headlineX}px)`,
          opacity: headlineOpacity,
        }}
      >
        {pillar.headline}
      </div>

      {/* Body */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 40,
          color: bodyColor,
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          marginTop: 50,
          opacity: bodyOpacity * 0.9,
          maxWidth: 900,
        }}
      >
        {pillar.body}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Sightseeing strip — landmarks scroll into view
// ============================================================
const SightseeingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 30,
    to: 0,
  });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Use 5 landmarks max for clean stagger
  const landmarks = RIGA_FACTS.landmarks.slice(0, 5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        padding: '140px 50px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.teal,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Bonus
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 90,
          color: COLORS.cream,
          letterSpacing: '-0.04em',
          textAlign: 'center',
          marginBottom: 60,
          lineHeight: 1.0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Sevärdheterna
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {landmarks.map((lm, i) => {
          const itemX = spring({
            frame: frame - 15 - i * 7,
            fps,
            config: SPRINGS.firm,
            from: -80,
            to: 0,
          });
          const itemOpacity = interpolate(
            frame,
            [15 + i * 7, 28 + i * 7],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 32px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: 24,
                border: `2px solid rgba(254, 243, 199, 0.15)`,
                transform: `translateX(${itemX}px)`,
                opacity: itemOpacity,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 40,
                  color: COLORS.white,
                  letterSpacing: '-0.01em',
                  flex: 1,
                  lineHeight: 1.2,
                }}
              >
                {lm.name}
              </div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 26,
                  color: COLORS.teal,
                  letterSpacing: '0.02em',
                  textAlign: 'right',
                  marginLeft: 20,
                }}
              >
                {lm.detail}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 30,
          color: COLORS.imessageStatusGray,
          textAlign: 'center',
          marginTop: 40,
          opacity: interpolate(frame, [70, 85], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Allt inom gångavstånd från Grand Poet Hotel
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================
export const WhyRiga: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}>
        <HookScene />
      </Sequence>
      <Sequence from={60} durationInFrames={75}>
        <PillarScene pillar={PILLAR_1} />
      </Sequence>
      <Sequence from={135} durationInFrames={75}>
        <PillarScene pillar={PILLAR_2} />
      </Sequence>
      <Sequence from={210} durationInFrames={75}>
        <PillarScene pillar={PILLAR_3} />
      </Sequence>
      <Sequence from={285} durationInFrames={105}>
        <SightseeingScene />
      </Sequence>
      <Sequence from={390} durationInFrames={60}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
