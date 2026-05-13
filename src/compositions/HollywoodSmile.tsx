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
} from '../shared/brand';
import { OutroScene } from '../shared/OutroScene';

// ============================================================
// REEL #3: "HOLLYWOOD-LEENDE — 8 FASADER"
// 1080x1920, 30fps, 420 frames = 14 seconds
// ------------------------------------------------------------
// 0.0 - 1.5s   (0-45f)    Hook "Hollywood-leende"
// 1.5 - 5.0s   (45-150f)  8 teeth populate one by one with running total
// 5.0 - 7.0s   (150-210f) Sweden total lands hard (108 000 kr)
// 7.0 - 9.0s   (210-270f) Riga total counter (68 400 kr)
// 9.0 - 12.0s  (270-360f) Savings reveal "39 600 kr"
// 12.0 - 14.0s (360-420f) CTA outro
// ============================================================

const VENEER_SE = SWEDISH_REFERENCE_SEK.porcelainVeneer; // 13 500
const VENEER_RIGA = eurToSek(DENTAL_ART_PRICES_EUR.porcelainVeneer); // €750 → ~8 550
const TOTAL_SE = VENEER_SE * 8; // 108 000
const TOTAL_RIGA = VENEER_RIGA * 8; // ~68 400
const SAVINGS = TOTAL_SE - TOTAL_RIGA; // ~39 600

// ============================================================
// Hook scene — "Hollywood-leende"
// ============================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 40,
    to: 0,
  });
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateRight: 'clamp',
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
          fontWeight: 900,
          fontSize: 130,
          color: COLORS.teal,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          textAlign: 'center',
          padding: '0 60px',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        Hollywood-<br />leende
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 60,
          color: COLORS.nearBlack,
          letterSpacing: '-0.02em',
          marginTop: 40,
          opacity: subOpacity,
        }}
      >
        8 porslinsfasader
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Tooth SVG (simple, stylized — does not need to be anatomically perfect)
// ============================================================
const Tooth: React.FC<{ filled: boolean; scale: number }> = ({
  filled,
  scale,
}) => {
  return (
    <div
      style={{
        width: 90,
        height: 110,
        transform: `scale(${scale})`,
        transformOrigin: 'center bottom',
      }}
    >
      <svg viewBox="0 0 60 80" width="100%" height="100%">
        <path
          d="M 30 8 C 18 8, 10 15, 10 32 C 10 50, 14 68, 20 74 C 24 78, 28 72, 30 60 C 32 72, 36 78, 40 74 C 46 68, 50 50, 50 32 C 50 15, 42 8, 30 8 Z"
          fill={filled ? COLORS.white : 'transparent'}
          stroke={filled ? COLORS.white : COLORS.imessageStatusGray}
          strokeWidth={2}
        />
        {/* Subtle shine when filled */}
        {filled && (
          <ellipse
            cx="22"
            cy="22"
            rx="4"
            ry="8"
            fill={COLORS.cream}
            opacity={0.5}
          />
        )}
      </svg>
    </div>
  );
};

// ============================================================
// 8 teeth populate + running counter
// ============================================================
const VeneerCountScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 8 teeth, each pops in at intervals of 10 frames starting at frame 10
  // Last one done at frame 80
  const teethFilled = Math.min(8, Math.max(0, Math.floor((frame - 10) / 10) + 1));

  // Running SE counter — smoothly interpolates 0 → TOTAL_SE during the count
  const counterDisplay = interpolate(
    frame,
    [10, 90],
    [0, TOTAL_SE],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.swedishYellow,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 40,
        }}
      >
        Privattandvård i Sverige
      </div>

      {/* 8 teeth in 2 rows of 4 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          marginBottom: 70,
          padding: '0 60px',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const isFilled = i < teethFilled;
          const popFrame = 10 + i * 10;
          const popScale = isFilled
            ? spring({
                frame: frame - popFrame,
                fps,
                config: SPRINGS.bouncy,
                from: 0.3,
                to: 1,
              })
            : 1;
          return <Tooth key={i} filled={isFilled} scale={popScale} />;
        })}
      </div>

      {/* Live counter */}
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 180,
          color: COLORS.white,
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        {formatSEK(counterDisplay)}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: COLORS.imessageStatusGray,
          letterSpacing: '0.05em',
          marginTop: 8,
        }}
      >
        kr
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Sweden total lands
// ============================================================
const SwedenTotalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampScale = spring({
    frame,
    fps,
    config: SPRINGS.stamp,
    from: 1.25,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.swedishBlue,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 52,
          color: COLORS.swedishYellow,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 30,
        }}
      >
        🇸🇪 Sverige
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 240,
          color: COLORS.white,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          transform: `scale(${stampScale})`,
          textShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {formatSEK(TOTAL_SE)}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 60,
          color: COLORS.swedishYellow,
          marginTop: 20,
        }}
      >
        kronor
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Riga total counter
// ============================================================
const RigaTotalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counted = interpolate(frame, [5, 35], [0, TOTAL_RIGA], {
    extrapolateRight: 'clamp',
  });

  const landScale = spring({
    frame: frame - 35,
    fps,
    config: SPRINGS.stamp,
    from: 1.15,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.latvianRed,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 52,
          color: COLORS.white,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 30,
        }}
      >
        🇱🇻 Riga (Dental Art)
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 240,
          color: COLORS.white,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          transform: `scale(${landScale})`,
          textShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {formatSEK(counted)}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 60,
          color: COLORS.white,
          marginTop: 20,
        }}
      >
        kronor
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Savings reveal
// ============================================================
const SavingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counted = interpolate(frame, [10, 50], [0, SAVINGS], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stampScale = spring({
    frame: frame - 5,
    fps,
    config: SPRINGS.bouncy,
    from: 0.4,
    to: 1,
  });
  const stampRotation = interpolate(
    spring({
      frame,
      fps,
      config: { damping: 10, mass: 0.5, stiffness: 100 },
      from: 0,
      to: 1,
    }),
    [0, 1],
    [-6, -2]
  );

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
          fontSize: 60,
          color: COLORS.nearBlack,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Du sparar
      </div>

      <div
        style={{
          transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
          padding: '50px 90px',
          border: `14px solid ${COLORS.teal}`,
          borderRadius: 28,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 220,
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
            textAlign: 'center',
            letterSpacing: '0.1em',
            marginTop: 10,
          }}
        >
          KRONOR
        </div>
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 32,
          color: COLORS.nearBlack,
          marginTop: 60,
          opacity: interpolate(frame, [50, 65], [0, 0.7], {
            extrapolateRight: 'clamp',
          }),
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        Samma kvalitet. Samma material.
      </div>
    </AbsoluteFill>
  );
};


// ============================================================
// MAIN COMPOSITION
// ============================================================
export const HollywoodSmile: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={45}>
        <HookScene />
      </Sequence>
      <Sequence from={45} durationInFrames={105}>
        <VeneerCountScene />
      </Sequence>
      <Sequence from={150} durationInFrames={60}>
        <SwedenTotalScene />
      </Sequence>
      <Sequence from={210} durationInFrames={60}>
        <RigaTotalScene />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <SavingsScene />
      </Sequence>
      <Sequence from={360} durationInFrames={60}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
