import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {
  COLORS,
  SPRINGS,
  fontFamily,
  formatSEK,
  DENTAL_ART_PRICES_EUR,
  SWEDISH_REFERENCE_SEK,
  eurToSek,
  TRAVEL,
} from '../shared/brand';
import { OutroScene } from '../shared/OutroScene';

// ============================================================
// REEL #5: "ALLT INRÄKNAT" — UPGRADED with Grand Poet 5⭐
// 1080x1920, 30fps, 420 frames = 14 seconds
// ------------------------------------------------------------
// Concept: a "receipt" stacks up line-by-line.
// Even with flight + 5-star hotel + meals + treatment,
// you still come out way ahead of a single Swedish quote.
// ============================================================

// Real, defensible numbers. Treatment lives in shared/brand.ts; trip costs here.
const FLIGHT_RETURN_SEK = TRAVEL.flightReturnSEK;  // 1 500
const HOTEL_PER_NIGHT_SEK = TRAVEL.grandPoetPerNightSEK;  // ~1 482 (Grand Poet 5⭐ @ €130/night)
const FOOD_TRANSPORT_PER_DAY_SEK = TRAVEL.foodTransportPerDaySEK;  // 500

// Hollywood-smile scenario: 8 porcelain veneers needs 2 visits (prep + fit).
// Model: 6 nights total across two visits.
const NIGHTS = 6;
const DAYS = 7;

const SWEDEN_VENEERS_SEK = SWEDISH_REFERENCE_SEK.porcelainVeneer * 8;  // 108 000
const RIGA_VENEERS_SEK = eurToSek(DENTAL_ART_PRICES_EUR.porcelainVeneer * 8);  // ~68 400

const LINE_ITEMS = [
  { label: 'Flyg ARN ⇄ RIX (tur & retur)', value: FLIGHT_RETURN_SEK, icon: '✈️' },
  {
    label: `Grand Poet Hotel 5⭐ (${NIGHTS} nätter)`,
    value: Math.round(HOTEL_PER_NIGHT_SEK * NIGHTS),
    icon: '🏨',
  },
  {
    label: 'Mat & transport',
    value: FOOD_TRANSPORT_PER_DAY_SEK * DAYS,
    icon: '🍽️',
  },
  { label: '8 porslinsfasader (Dental Art)', value: RIGA_VENEERS_SEK, icon: '🦷' },
];

const TOTAL = LINE_ITEMS.reduce((s, i) => s + i.value, 0);
const SWEDEN_PRICE = SWEDEN_VENEERS_SEK;
const SAVINGS = SWEDEN_PRICE - TOTAL;

// ============================================================
// Hook scene
// ============================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const lineY = spring({
    frame,
    fps: 30,
    config: SPRINGS.firm,
    from: 30,
    to: 0,
  });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 140,
          color: COLORS.cream,
          letterSpacing: '-0.05em',
          textAlign: 'center',
          lineHeight: 0.95,
          padding: '0 60px',
          opacity,
          transform: `translateY(${lineY}px)`,
        }}
      >
        Allt
        <br />
        inräknat.
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.teal,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginTop: 40,
          textAlign: 'center',
          padding: '0 40px',
          lineHeight: 1.2,
          opacity: subOpacity,
        }}
      >
        Flyg · hotell · behandling
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Receipt scene — items stack one by one
// ============================================================
const ReceiptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each row appears 18f after the previous; total appears at frame 90
  const rowAppearFrames = [0, 18, 36, 54];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.cream,
        padding: '120px 50px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 38,
          color: COLORS.nearBlack,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 8,
          opacity: 0.6,
        }}
      >
        Resa till Riga
      </div>
      <div
        style={{
          width: 200,
          height: 4,
          backgroundColor: COLORS.nearBlack,
          margin: '0 auto 50px',
        }}
      />

      {LINE_ITEMS.map((item, i) => {
        const startFrame = rowAppearFrames[i];
        const itemOpacity = interpolate(
          frame,
          [startFrame, startFrame + 12],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const itemX = spring({
          frame: frame - startFrame,
          fps,
          config: SPRINGS.firm,
          from: -30,
          to: 0,
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '32px 0',
              borderBottom: `2px dashed ${COLORS.nearBlack}`,
              opacity: itemOpacity,
              transform: `translateX(${itemX}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ fontSize: 56 }}>{item.icon}</div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 36,
                  color: COLORS.nearBlack,
                  letterSpacing: '-0.01em',
                  maxWidth: 600,
                  lineHeight: 1.15,
                }}
              >
                {item.label}
              </div>
            </div>
            <div
              style={{
                fontFamily,
                fontWeight: 900,
                fontSize: 52,
                color: COLORS.nearBlack,
                letterSpacing: '-0.03em',
                whiteSpace: 'nowrap',
              }}
            >
              {formatSEK(item.value)} kr
            </div>
          </div>
        );
      })}

      {/* TOTAL row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: 60,
          padding: '32px 0',
          opacity: interpolate(frame, [80, 95], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          transform: `scale(${spring({
            frame: frame - 80,
            fps,
            config: SPRINGS.stamp,
            from: 1.1,
            to: 1,
          })})`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 56,
            color: COLORS.nearBlack,
            letterSpacing: '-0.02em',
          }}
        >
          Totalt
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 96,
            color: COLORS.teal,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {formatSEK(TOTAL)} kr
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Comparison scene — side by side
// ============================================================
const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left column slides in from left
  const leftX = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: -100,
    to: 0,
  });

  // Right column slides in from right (delayed)
  const rightX = spring({
    frame: frame - 12,
    fps,
    config: SPRINGS.firm,
    from: 100,
    to: 0,
  });

  // "VS" appears between them
  const vsScale = spring({
    frame: frame - 25,
    fps,
    config: SPRINGS.bouncy,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '160px 40px',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 42,
          color: COLORS.cream,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 80,
          opacity: 0.7,
        }}
      >
        Samma resultat
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
      >
        {/* SWEDEN row */}
        <div
          style={{
            backgroundColor: COLORS.swedishBlue,
            borderRadius: 32,
            padding: '50px 40px',
            transform: `translateX(${leftX}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 36,
              color: COLORS.swedishYellow,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            🇸🇪 8 fasader i Sverige
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 130,
              color: COLORS.white,
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {formatSEK(SWEDEN_PRICE)} kr
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            textAlign: 'center',
            transform: `scale(${vsScale})`,
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.cream,
            letterSpacing: '-0.04em',
            marginTop: -20,
            marginBottom: -20,
          }}
        >
          vs
        </div>

        {/* RIGA row */}
        <div
          style={{
            backgroundColor: COLORS.teal,
            borderRadius: 32,
            padding: '50px 40px',
            transform: `translateX(${rightX}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 36,
              color: COLORS.cream,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            🇱🇻 + resa till Riga
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 130,
              color: COLORS.white,
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {formatSEK(TOTAL)} kr
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Savings scene
// ============================================================
const SavingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counted = interpolate(frame, [10, 45], [0, SAVINGS], {
    extrapolateRight: 'clamp',
  });

  const stampScale = spring({
    frame,
    fps,
    config: SPRINGS.bouncy,
    from: 0.4,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.cream,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: COLORS.nearBlack,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 30,
        }}
      >
        Du sparar
      </div>

      <div
        style={{
          transform: `scale(${stampScale})`,
          fontFamily,
          fontWeight: 900,
          fontSize: 260,
          color: COLORS.teal,
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        {formatSEK(counted)}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 72,
          color: COLORS.teal,
          letterSpacing: '0.05em',
          marginTop: 10,
        }}
      >
        KRONOR
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 32,
          color: COLORS.nearBlack,
          marginTop: 50,
          textAlign: 'center',
          padding: '0 60px',
          lineHeight: 1.4,
          opacity: interpolate(frame, [50, 65], [0, 0.8], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Och du har sett Rigas gamla stan på köpet.
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================
export const TravelBreakdown: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={45}>
        <HookScene />
      </Sequence>
      <Sequence from={45} durationInFrames={150}>
        <ReceiptScene />
      </Sequence>
      <Sequence from={195} durationInFrames={90}>
        <ComparisonScene />
      </Sequence>
      <Sequence from={285} durationInFrames={90}>
        <SavingsScene />
      </Sequence>
      <Sequence from={375} durationInFrames={45}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
