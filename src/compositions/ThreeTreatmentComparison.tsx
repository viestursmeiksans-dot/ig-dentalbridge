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
// REEL #2: "3 BEHANDLINGAR — SAMMA KVALITET"
// 1080x1920, 30fps, 450 frames = 15 seconds
// ------------------------------------------------------------
// 0.0 - 1.5s   (0-45f)    Title card "3 behandlingar"
// 1.5 - 4.5s   (45-135f)  Row 1: Tandimplantat + krona
// 4.5 - 7.5s   (135-225f) Row 2: Zirkoniumkrona
// 7.5 - 10.5s  (225-315f) Row 3: Porslinsfasad
// 10.5 - 13.0s (315-390f) Savings total counter
// 13.0 - 15.0s (390-450f) CTA outro
// ============================================================

// Build the three treatments from REAL Dental Art prices.
// Implant uses Alpha Bio + metal-ceramic crown (cheapest real combo); swap to
// Straumann/Nobel in shared/brand.ts if you want to compare premium tiers.
const TREATMENTS = [
  {
    name: 'Tandimplantat\n+ krona',
    swedenSEK: SWEDISH_REFERENCE_SEK.fullImplantWithCrown, // ~28 000
    rigaSEK: eurToSek(
      DENTAL_ART_PRICES_EUR.implantAlphaBio +
        DENTAL_ART_PRICES_EUR.metalCeramicCrownOnImplant
    ), // €1500 → ~17 100
  },
  {
    name: 'Zirkoniumkrona',
    swedenSEK: SWEDISH_REFERENCE_SEK.zirconiumCrown, // ~9 500
    rigaSEK: eurToSek(DENTAL_ART_PRICES_EUR.zirconiumCrown), // €660 → ~7 525
  },
  {
    name: 'Porslinsfasad',
    swedenSEK: SWEDISH_REFERENCE_SEK.porcelainVeneer, // ~13 500
    rigaSEK: eurToSek(DENTAL_ART_PRICES_EUR.porcelainVeneer), // €750 → ~8 550
  },
];

const TOTAL_SE = TREATMENTS.reduce((s, t) => s + t.swedenSEK, 0); // 51 000
const TOTAL_RIGA = TREATMENTS.reduce((s, t) => s + t.rigaSEK, 0); // ~33 175
const TOTAL_SAVINGS = TOTAL_SE - TOTAL_RIGA; // ~17 825

// ============================================================
// Title card
// ============================================================
const TitleCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 0.85,
    to: 1,
  });
  const subOpacity = interpolate(frame, [15, 30], [0, 1], {
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
          fontSize: 280,
          color: COLORS.teal,
          letterSpacing: '-0.06em',
          lineHeight: 0.9,
          transform: `scale(${titleScale})`,
        }}
      >
        3
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 90,
          color: COLORS.white,
          letterSpacing: '-0.03em',
          marginTop: 10,
          textAlign: 'center',
          lineHeight: 1.05,
        }}
      >
        behandlingar
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: COLORS.cream,
          letterSpacing: '0.05em',
          marginTop: 40,
          textTransform: 'uppercase',
          opacity: subOpacity,
        }}
      >
        Sverige vs. Riga
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Single comparison row — used 3x in sequence
// ============================================================
const ComparisonRow: React.FC<{
  name: string;
  swedenSEK: number;
  rigaSEK: number;
  index: number;
}> = ({ name, swedenSEK, rigaSEK, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slides in from top
  const titleY = spring({
    frame: frame - 0,
    fps,
    config: SPRINGS.firm,
    from: -60,
    to: 0,
  });

  // Sweden price counts up first
  const seCounted = interpolate(frame, [10, 30], [0, swedenSEK], {
    extrapolateRight: 'clamp',
  });

  // Riga price counts up second
  const rigaCounted = interpolate(frame, [40, 60], [0, rigaSEK], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Savings stamp appears last
  const savings = swedenSEK - rigaSEK;
  const savingsScale = spring({
    frame: frame - 65,
    fps,
    config: SPRINGS.bouncy,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        padding: '120px 60px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.teal,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: 0.7,
        }}
      >
        {index} av 3
      </div>

      {/* Treatment name */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 88,
          color: COLORS.white,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          lineHeight: 1.0,
          transform: `translateY(${titleY}px)`,
          marginBottom: 80,
          whiteSpace: 'pre-line',
        }}
      >
        {name}
      </div>

      {/* Two-column price grid */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: 30,
          marginBottom: 80,
        }}
      >
        {/* Sweden column */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.imessageBubbleGray,
            borderRadius: 32,
            padding: '50px 30px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 38,
              color: COLORS.swedishYellow,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Sverige
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 88,
              color: COLORS.white,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {formatSEK(seCounted)}
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 32,
              color: COLORS.imessageStatusGray,
              marginTop: 8,
            }}
          >
            kr
          </div>
        </div>

        {/* Riga column */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.teal,
            borderRadius: 32,
            padding: '50px 30px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 38,
              color: COLORS.cream,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Riga
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: 88,
              color: COLORS.white,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {formatSEK(rigaCounted)}
          </div>
          <div
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: 32,
              color: COLORS.cream,
              marginTop: 8,
            }}
          >
            kr
          </div>
        </div>
      </div>

      {/* Savings stamp */}
      <div
        style={{
          transform: `scale(${savingsScale}) rotate(-2deg)`,
          padding: '24px 50px',
          backgroundColor: COLORS.cream,
          borderRadius: 100,
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 42,
            color: COLORS.nearBlack,
            letterSpacing: '-0.02em',
          }}
        >
          Du sparar
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.teal,
            letterSpacing: '-0.04em',
          }}
        >
          {formatSEK(savings)} kr
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Final total scene
// ============================================================
const TotalSavingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const totalCounted = interpolate(frame, [10, 45], [0, TOTAL_SAVINGS], {
    extrapolateRight: 'clamp',
  });

  const stampScale = spring({
    frame: frame - 45,
    fps,
    config: SPRINGS.bouncy,
    from: 0.7,
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
          fontSize: 56,
          color: COLORS.nearBlack,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: labelOpacity,
          marginBottom: 10,
        }}
      >
        Totalt sparar du
      </div>

      <div
        style={{
          transform: `scale(${stampScale})`,
          fontFamily,
          fontWeight: 900,
          fontSize: 240,
          color: COLORS.teal,
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}
      >
        {formatSEK(totalCounted)}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 80,
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
          fontSize: 36,
          color: COLORS.nearBlack,
          marginTop: 50,
          opacity: interpolate(frame, [50, 65], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          textAlign: 'center',
          padding: '0 60px',
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
export const ThreeTreatmentComparison: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={45}>
        <TitleCardScene />
      </Sequence>
      <Sequence from={45} durationInFrames={90}>
        <ComparisonRow
          name={TREATMENTS[0].name}
          swedenSEK={TREATMENTS[0].swedenSEK}
          rigaSEK={TREATMENTS[0].rigaSEK}
          index={1}
        />
      </Sequence>
      <Sequence from={135} durationInFrames={90}>
        <ComparisonRow
          name={TREATMENTS[1].name}
          swedenSEK={TREATMENTS[1].swedenSEK}
          rigaSEK={TREATMENTS[1].rigaSEK}
          index={2}
        />
      </Sequence>
      <Sequence from={225} durationInFrames={90}>
        <ComparisonRow
          name={TREATMENTS[2].name}
          swedenSEK={TREATMENTS[2].swedenSEK}
          rigaSEK={TREATMENTS[2].rigaSEK}
          index={3}
        />
      </Sequence>
      <Sequence from={315} durationInFrames={75}>
        <TotalSavingsScene />
      </Sequence>
      <Sequence from={390} durationInFrames={60}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
