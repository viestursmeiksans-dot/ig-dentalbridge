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
// REEL #1: "PRICE REVEAL — IMPLANT"
// 1080x1920, 30fps, 375 frames = 12.5 seconds
// ------------------------------------------------------------
// Real Dental Art price: Alpha Bio implant (€700) + metal-ceramic crown (€800) = €1500 ≈ 17 100 SEK
// Swedish reference: ~28 000 SEK for a full implant + crown private clinic
// Savings: ~10 900 SEK
// ============================================================

const SE_PRICE = SWEDISH_REFERENCE_SEK.fullImplantWithCrown; // 28 000
const RIGA_PRICE = eurToSek(
  DENTAL_ART_PRICES_EUR.implantAlphaBio +
    DENTAL_ART_PRICES_EUR.metalCeramicCrownOnImplant
); // 17 100
const SAVINGS = SE_PRICE - RIGA_PRICE; // ~10 900

// ============================================================
// SCENE 1: Swedish flag + "Tandimplantat i Sverige" (0 - 1.5s = 0-45f)
// ============================================================
const SwedishContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const captionY = spring({
    frame: frame - 10,
    fps,
    config: SPRINGS.firm,
    from: 30,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.swedishBlue }}>
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          height: 120,
          backgroundColor: COLORS.swedishYellow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '30%',
          width: 120,
          backgroundColor: COLORS.swedishYellow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily,
          fontWeight: 700,
          fontSize: 80,
          color: COLORS.white,
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          textShadow: '0 4px 24px rgba(0,0,0,0.4)',
          letterSpacing: '-0.02em',
          padding: '0 40px',
        }}
      >
        Tandimplantat i Sverige
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 2: SE price counts up (1.5 - 3.0s = 45-90f)
// ============================================================
const SwedishPriceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counted = interpolate(frame, [0, 25], [0, SE_PRICE], {
    extrapolateRight: 'clamp',
  });

  const landScale = spring({
    frame: frame - 25,
    fps,
    config: SPRINGS.stamp,
    from: 1.15,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.swedishBlue,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 190,
          color: COLORS.white,
          letterSpacing: '-0.04em',
          transform: `scale(${landScale})`,
          textShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {formatSEK(counted)} kr
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 72,
          color: COLORS.swedishYellow,
          marginTop: 20,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [20, 35], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Sverige
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 3: Flag wipe (3.0 - 4.0s = 90-120f)
// ============================================================
const FlagWipeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wipeProgress = interpolate(frame, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLORS.swedishBlue }}>
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
            height: 120,
            backgroundColor: COLORS.swedishYellow,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '30%',
            width: 120,
            backgroundColor: COLORS.swedishYellow,
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: `${wipeProgress}%`,
          backgroundColor: COLORS.latvianRed,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 2, backgroundColor: COLORS.latvianRed }} />
        <div style={{ flex: 1, backgroundColor: COLORS.white }} />
        <div style={{ flex: 2, backgroundColor: COLORS.latvianRed }} />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 4: Riga context (4.0 - 5.5s = 120-165f)
// ============================================================
const RigaContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const captionY = spring({
    frame: frame - 5,
    fps,
    config: SPRINGS.firm,
    from: 30,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.latvianRed }}>
      <div style={{ flex: 2, backgroundColor: COLORS.latvianRed }} />
      <div style={{ flex: 1, backgroundColor: COLORS.white }} />
      <div style={{ flex: 2, backgroundColor: COLORS.latvianRed }} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily,
          fontWeight: 700,
          fontSize: 64,
          color: COLORS.red,
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          textShadow: '0 4px 24px rgba(255,255,255,0.35)',
          letterSpacing: '-0.02em',
          padding: '0 40px',
        }}
      >
        Samma behandling i Riga
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 5: Riga price (5.5 - 7.0s = 165-210f)
// ============================================================
const RigaPriceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counted = interpolate(frame, [0, 22], [0, RIGA_PRICE], {
    extrapolateRight: 'clamp',
  });

  const landScale = spring({
    frame: frame - 22,
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
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 190,
          color: COLORS.white,
          letterSpacing: '-0.04em',
          transform: `scale(${landScale})`,
          textShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {formatSEK(counted)} kr
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: COLORS.white,
          marginTop: 20,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [18, 32], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Riga
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 6: Strikethrough (7.0 - 9.0s = 210-270f)
// ============================================================
const StrikethroughScene: React.FC = () => {
  const frame = useCurrentFrame();

  const lineWidth = interpolate(frame, [5, 18], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const oldPriceOpacity = interpolate(frame, [18, 30], [1, 0.4], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div style={{ position: 'relative', opacity: oldPriceOpacity }}>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 140,
            color: COLORS.white,
            letterSpacing: '-0.04em',
          }}
        >
          {formatSEK(SE_PRICE)} kr
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: `${lineWidth}%`,
            height: 12,
            backgroundColor: COLORS.red,
            transform: 'translateY(-50%) rotate(-3deg)',
            transformOrigin: 'left center',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)',
          }}
        />
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 180,
          color: COLORS.teal,
          letterSpacing: '-0.04em',
          opacity: interpolate(frame, [22, 35], [0.5, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {formatSEK(RIGA_PRICE)} kr
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 7: Savings stamp (8.5 - 10.5s = 255-315f)
// ============================================================
const SavingsStampScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampScale = spring({
    frame,
    fps,
    config: SPRINGS.bouncy,
    from: 0.3,
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
    [-8, -3]
  );

  const savings = interpolate(frame, [10, 35], [0, SAVINGS], {
    extrapolateLeft: 'clamp',
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
          fontWeight: 700,
          fontSize: 56,
          color: COLORS.nearBlack,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: interpolate(frame, [5, 18], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Du sparar
      </div>

      <div
        style={{
          transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
          padding: '40px 80px',
          border: `12px solid ${COLORS.teal}`,
          borderRadius: 20,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 200,
            color: COLORS.teal,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {formatSEK(savings)}
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 64,
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
          opacity: interpolate(frame, [40, 55], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          letterSpacing: '-0.01em',
        }}
      >
        + ersättning via Försäkringskassan
      </div>
    </AbsoluteFill>
  );
};


// ============================================================
// MAIN COMPOSITION
// ============================================================
export const PriceReveal: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={45}>
        <SwedishContextScene />
      </Sequence>
      <Sequence from={45} durationInFrames={45}>
        <SwedishPriceScene />
      </Sequence>
      <Sequence from={90} durationInFrames={30}>
        <FlagWipeScene />
      </Sequence>
      <Sequence from={120} durationInFrames={45}>
        <RigaContextScene />
      </Sequence>
      <Sequence from={165} durationInFrames={45}>
        <RigaPriceScene />
      </Sequence>
      <Sequence from={210} durationInFrames={60}>
        <StrikethroughScene />
      </Sequence>
      <Sequence from={270} durationInFrames={60}>
        <SavingsStampScene />
      </Sequence>
      <Sequence from={330} durationInFrames={45}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
