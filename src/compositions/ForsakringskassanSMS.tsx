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
} from '../shared/brand';
import { OutroScene } from '../shared/OutroScene';

// ============================================================
// REEL #4: "FÖRSÄKRINGSKASSAN-SMS"
// 1080x1920, 30fps, 360 frames = 12 seconds
// ------------------------------------------------------------
// Realistic flow:
// 1) Patient goes to Riga, pays ~20 100 kr total
// 2) Applies to Försäkringskassan after treatment
// 3) Gets reimbursement based on Swedish tandvårdsstöd rules
//    (50% in 3000-15000 bracket, 85% above 15000)
// 4) Realistic reimbursement on a 20k Latvia treatment: ~7 200 kr
// ------------------------------------------------------------
// 0.0 - 1.5s   (0-45f)    Lock screen with date/time
// 1.5 - 3.0s   (45-90f)   Notification slides in (haptic moment)
// 3.0 - 5.5s   (90-165f)  SMS expands, message types in
// 5.5 - 8.0s   (165-240f) "7 200 kr" highlights & counter
// 8.0 - 10.5s  (240-315f) Math breakdown: "Du betalade 20 100, fick tillbaka 7 200"
// 10.5 - 12.0s (315-360f) CTA outro
// ============================================================

const REIMBURSEMENT = 7200; // SEK — realistic on a ~20 100 SEK Latvia treatment
const TOTAL_PAID = 20100; // SEK — implant + crown at Dental Art (Straumann)

// ============================================================
// iOS-style lock screen background
// ============================================================
const LockScreenBg: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    }}
  >
    {/* Subtle vignette for depth */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(circle at 50% 30%, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  </AbsoluteFill>
);

const StatusBar: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 30,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 60px',
      fontFamily,
      fontWeight: 700,
      fontSize: 36,
      color: COLORS.white,
    }}
  >
    <div>11:42</div>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <span style={{ fontSize: 28 }}>●●●●</span>
      <span style={{ fontSize: 32 }}>📶</span>
      <span
        style={{
          padding: '4px 8px',
          border: `2px solid ${COLORS.white}`,
          borderRadius: 6,
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        86
      </span>
    </div>
  </div>
);

const ClockBig: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: 240,
      left: 0,
      right: 0,
      textAlign: 'center',
      opacity,
    }}
  >
    <div
      style={{
        fontFamily,
        fontWeight: 700,
        fontSize: 48,
        color: COLORS.white,
        letterSpacing: '0.02em',
        marginBottom: 10,
      }}
    >
      måndag 11 maj
    </div>
    <div
      style={{
        fontFamily,
        fontWeight: 700,
        fontSize: 280,
        color: COLORS.white,
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}
    >
      11:42
    </div>
  </div>
);

// ============================================================
// Lock screen scene
// ============================================================
const LockScreenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clockOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <LockScreenBg />
      <StatusBar />
      <ClockBig opacity={clockOpacity} />
    </AbsoluteFill>
  );
};

// ============================================================
// Notification slides in (compact preview style)
// ============================================================
const NotificationPreviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from top
  const slideY = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: -200,
    to: 0,
  });

  // Subtle scale pulse on entry (haptic feel)
  const pulseScale = spring({
    frame: frame - 5,
    fps,
    config: SPRINGS.bouncy,
    from: 1.08,
    to: 1,
  });

  return (
    <AbsoluteFill>
      <LockScreenBg />
      <StatusBar />
      <ClockBig opacity={0.5} />

      {/* Notification card */}
      <div
        style={{
          position: 'absolute',
          top: 860,
          left: 40,
          right: 40,
          backgroundColor: 'rgba(40, 40, 50, 0.85)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 36,
          padding: '32px 36px',
          transform: `translateY(${slideY}px) scale(${pulseScale})`,
          boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* App icon — Försäkringskassan blue square */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 18,
              backgroundColor: '#005AA0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily,
              fontWeight: 900,
              fontSize: 48,
              color: COLORS.white,
              flexShrink: 0,
            }}
          >
            FK
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 32,
                  color: COLORS.white,
                }}
              >
                FÖRSÄKRINGSKASSAN
              </div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 700,
                  fontSize: 26,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                nu
              </div>
            </div>
            <div
              style={{
                fontFamily,
                fontWeight: 700,
                fontSize: 34,
                color: COLORS.white,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Utbetalning klar
            </div>
            <div
              style={{
                fontFamily,
                fontWeight: 700,
                fontSize: 30,
                color: 'rgba(255,255,255,0.85)',
                marginTop: 4,
                lineHeight: 1.3,
              }}
            >
              7 200 kr har satts in på ditt konto.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Notification expanded — full-screen SMS-style view
// ============================================================
const NotificationExpandedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const expandScale = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 0.92,
    to: 1,
  });

  // Money counter inside the bubble
  const counted = interpolate(frame, [20, 55], [0, REIMBURSEMENT], {
    extrapolateRight: 'clamp',
  });

  // Highlight pulse on the number
  const highlightPulse = interpolate(
    frame,
    [55, 65, 75],
    [1, 1.06, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.imessageBg,
        padding: '120px 40px',
        flexDirection: 'column',
      }}
    >
      {/* Top: app identity */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 60,
          transform: `scale(${expandScale})`,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            backgroundColor: '#005AA0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.white,
            marginBottom: 20,
          }}
        >
          FK
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 42,
            color: COLORS.white,
          }}
        >
          Försäkringskassan
        </div>
      </div>

      {/* Message bubble */}
      <div
        style={{
          alignSelf: 'flex-start',
          maxWidth: '88%',
          backgroundColor: COLORS.imessageBubbleGray,
          borderRadius: 36,
          borderBottomLeftRadius: 8,
          padding: '40px 44px',
          fontFamily,
          fontWeight: 700,
          color: COLORS.white,
        }}
      >
        <div style={{ fontSize: 40, lineHeight: 1.35 }}>
          Hej! Din ansökan om ersättning för planerad tandvård i Riga är godkänd.
        </div>
        <div
          style={{
            fontSize: 36,
            color: COLORS.imessageStatusGray,
            marginTop: 24,
            lineHeight: 1.3,
          }}
        >
          Vi har satt in
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 140,
            color: COLORS.teal,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginTop: 8,
            transform: `scale(${highlightPulse})`,
            transformOrigin: 'left center',
          }}
        >
          {formatSEK(counted)} kr
        </div>
        <div
          style={{
            fontSize: 32,
            color: COLORS.imessageStatusGray,
            marginTop: 12,
            lineHeight: 1.3,
          }}
        >
          på ditt konto.
        </div>
      </div>

      {/* Timestamp */}
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.imessageStatusGray,
          marginTop: 16,
          marginLeft: 30,
          opacity: interpolate(frame, [40, 55], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Levererad
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Math breakdown — honest reframe
// ============================================================
const MathBreakdownScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const row1Y = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 40,
    to: 0,
  });
  const row2Y = spring({
    frame: frame - 15,
    fps,
    config: SPRINGS.firm,
    from: 40,
    to: 0,
  });
  const row3Y = spring({
    frame: frame - 30,
    fps,
    config: SPRINGS.firm,
    from: 40,
    to: 0,
  });

  const row1Opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const row2Opacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const row3Opacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '24px 0',
    borderBottom: `2px solid ${COLORS.imessageBubbleGray}`,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 700,
    fontSize: 44,
    color: COLORS.white,
  };

  const valueStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 900,
    fontSize: 56,
    letterSpacing: '-0.03em',
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.nearBlack,
        padding: '180px 60px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 48,
          color: COLORS.cream,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 60,
          textAlign: 'center',
        }}
      >
        Så funkar det
      </div>

      <div
        style={{
          transform: `translateY(${row1Y}px)`,
          opacity: row1Opacity,
          ...rowStyle,
        }}
      >
        <span style={labelStyle}>Du betalar i Riga</span>
        <span style={{ ...valueStyle, color: COLORS.white }}>
          {formatSEK(TOTAL_PAID)} kr
        </span>
      </div>

      <div
        style={{
          transform: `translateY(${row2Y}px)`,
          opacity: row2Opacity,
          ...rowStyle,
        }}
      >
        <span style={labelStyle}>Du får tillbaka</span>
        <span style={{ ...valueStyle, color: COLORS.teal }}>
          {formatSEK(REIMBURSEMENT)} kr
        </span>
      </div>

      <div
        style={{
          transform: `translateY(${row3Y}px)`,
          opacity: row3Opacity,
          ...rowStyle,
          borderBottom: 'none',
          marginTop: 20,
        }}
      >
        <span style={{ ...labelStyle, color: COLORS.cream }}>Din netto­kostnad</span>
        <span style={{ ...valueStyle, color: COLORS.cream, fontSize: 72 }}>
          {formatSEK(TOTAL_PAID - REIMBURSEMENT)} kr
        </span>
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.imessageStatusGray,
          marginTop: 60,
          textAlign: 'center',
          lineHeight: 1.4,
          padding: '0 20px',
        }}
      >
        Beräknat enligt högkostnadsskyddet
        <br />
        50% i intervallet 3 000–15 000 kr · 85% över 15 000 kr
      </div>
    </AbsoluteFill>
  );
};


// ============================================================
// MAIN COMPOSITION
// ============================================================
export const ForsakringskassanSMS: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={45}>
        <LockScreenScene />
      </Sequence>
      <Sequence from={45} durationInFrames={45}>
        <NotificationPreviewScene />
      </Sequence>
      <Sequence from={90} durationInFrames={75}>
        <NotificationExpandedScene />
      </Sequence>
      <Sequence from={165} durationInFrames={150}>
        <MathBreakdownScene />
      </Sequence>
      <Sequence from={315} durationInFrames={45}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
