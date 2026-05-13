import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { COLORS, SPRINGS, fontFamily, TRAVEL } from '../shared/brand';
import { OutroScene } from '../shared/OutroScene';

// ============================================================
// REEL #6: "PÅ EN DAG"
// 1080x1920, 30fps, 450 frames = 15 seconds
// ------------------------------------------------------------
// Concept: Kill the #1 objection ("I don't have time for dental tourism")
// by showing it can be a single-day commitment. Real airBaltic schedule
// supports this: ARN→RIX 06:30 lands 09:40, RIX→ARN 20:15 lands 20:35.
// Includes lunch in Old Town between treatment and flight.
// ------------------------------------------------------------
// 0.0 - 2.0s   (0-60f)    Hook: "På en dag." question reframe
// 2.0 - 11.0s  (60-330f)  Timeline: 5 time-stamped beats, each ~1.8s
// 11.0 - 12.5s (330-375f) Summary card: "Hemma till middagen"
// 12.5 - 15.0s (375-450f) Outro
// ============================================================

type TimelineBeat = {
  time: string;
  title: string;
  detail: string;
  icon: string;
};

const TIMELINE: TimelineBeat[] = [
  {
    time: TRAVEL.morningFlightARN,
    title: 'Avgång ARN',
    detail: 'airBaltic direktflyg',
    icon: '✈️',
  },
  {
    time: TRAVEL.morningArrivalRIX,
    title: 'Ankomst Riga',
    detail: `Flygtid: ${TRAVEL.flightDurationMinutes} min`,
    icon: '🛬',
  },
  {
    time: '10:30',
    title: 'Konsultation',
    detail: 'Hämtas vid hotellet',
    icon: '🦷',
  },
  {
    time: '14:00',
    title: 'Lunch i Gamla stan',
    detail: '5 min från kliniken',
    icon: '🍽️',
  },
  {
    time: TRAVEL.eveningFlightRIX,
    title: 'Avgång Riga',
    detail: 'Hemma till middagen',
    icon: '🌆',
  },
];

// ============================================================
// Hook scene
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

  // "Inget hotell. Inget paket." appears below
  const subOpacity = interpolate(frame, [20, 35], [0, 1], {
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
          fontWeight: 700,
          fontSize: 56,
          color: COLORS.cream,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 30,
          opacity: titleOpacity * 0.7,
        }}
      >
        Tandvård i Riga?
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 280,
          color: COLORS.teal,
          letterSpacing: '-0.06em',
          lineHeight: 0.9,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        På en dag.
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.white,
          letterSpacing: '-0.01em',
          marginTop: 40,
          opacity: subOpacity,
          textAlign: 'center',
          padding: '0 60px',
          lineHeight: 1.3,
        }}
      >
        Inget hotell.
        <br />
        Inget paket.
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Single timeline row — used 5x with stagger
// ============================================================
const TimelineRow: React.FC<{
  beat: TimelineBeat;
  index: number;
}> = ({ beat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rowX = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: -100,
    to: 0,
  });
  const rowOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Time scales up slightly with bounce
  const timeScale = spring({
    frame: frame - 3,
    fps,
    config: SPRINGS.bouncy,
    from: 0.7,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
      }}
    >
      {/* Step counter top */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily,
          fontWeight: 700,
          fontSize: 32,
          color: COLORS.teal,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.6,
        }}
      >
        {index + 1} av {TIMELINE.length}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          transform: `translateX(${rowX}px)`,
          opacity: rowOpacity,
          maxWidth: 900,
        }}
      >
        {/* Big icon */}
        <div style={{ fontSize: 180, lineHeight: 1 }}>{beat.icon}</div>

        {/* Time stamp — hero */}
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 220,
            color: COLORS.cream,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            transform: `scale(${timeScale})`,
          }}
        >
          {beat.time}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 80,
            color: COLORS.white,
            letterSpacing: '-0.03em',
            textAlign: 'center',
          }}
        >
          {beat.title}
        </div>

        {/* Detail subline */}
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 38,
            color: COLORS.teal,
            letterSpacing: '0.02em',
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          {beat.detail}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Summary card — all beats stacked together
// ============================================================
const SummaryCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 0.92,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.cream,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 50px',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.nearBlack,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 40,
          opacity: 0.6,
        }}
      >
        En dag i Riga
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: '100%',
          transform: `scale(${cardScale})`,
        }}
      >
        {TIMELINE.map((beat, i) => {
          const rowOpacity = interpolate(
            frame,
            [i * 4, i * 4 + 12],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '18px 28px',
                backgroundColor: COLORS.white,
                borderRadius: 20,
                opacity: rowOpacity,
              }}
            >
              <div style={{ fontSize: 44 }}>{beat.icon}</div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 44,
                  color: COLORS.teal,
                  letterSpacing: '-0.03em',
                  width: 170,
                }}
              >
                {beat.time}
              </div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 36,
                  color: COLORS.nearBlack,
                  letterSpacing: '-0.01em',
                  flex: 1,
                }}
              >
                {beat.title}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 36,
          color: COLORS.nearBlack,
          marginTop: 50,
          textAlign: 'center',
          opacity: interpolate(frame, [25, 40], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          letterSpacing: '-0.01em',
        }}
      >
        Hemma till middagen. 🍽️
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================
export const SameDayTrip: React.FC = () => {
  // 5 timeline beats × 54f each = 270f
  const BEAT_DURATION = 54;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}>
        <HookScene />
      </Sequence>
      {TIMELINE.map((beat, i) => (
        <Sequence
          key={i}
          from={60 + i * BEAT_DURATION}
          durationInFrames={BEAT_DURATION}
        >
          <TimelineRow beat={beat} index={i} />
        </Sequence>
      ))}
      <Sequence from={60 + TIMELINE.length * BEAT_DURATION} durationInFrames={60}>
        <SummaryCardScene />
      </Sequence>
      <Sequence
        from={60 + TIMELINE.length * BEAT_DURATION + 60}
        durationInFrames={60}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
