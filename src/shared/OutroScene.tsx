// Shared outro — every Reel ends with this so the brand stays consistent
// and the EU-certification trust signal hits every viewer.

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, SPRINGS, fontFamily } from './brand';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: SPRINGS.firm,
    from: 0.8,
    to: 1,
  });

  const urlOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const trustOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.teal,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 30,
      }}
    >
      <div
        style={{
          transform: `scale(${logoScale})`,
          width: 220,
          height: 220,
          borderRadius: 40,
          backgroundColor: COLORS.cream,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily,
          fontWeight: 900,
          fontSize: 170,
          color: COLORS.teal,
          letterSpacing: '-0.08em',
        }}
      >
        D
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 72,
          color: COLORS.white,
          letterSpacing: '-0.02em',
          opacity: urlOpacity,
          marginTop: 16,
        }}
      >
        Drömleendet
      </div>

      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.cream,
          letterSpacing: '0.05em',
          opacity: urlOpacity,
        }}
      >
        dentalbridge.eu
      </div>

      {/* Trust signal — drops in last */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 30,
          padding: '14px 28px',
          border: `2px solid ${COLORS.cream}`,
          borderRadius: 999,
          opacity: trustOpacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 30,
            color: COLORS.cream,
            letterSpacing: '0.05em',
          }}
        >
          🇪🇺 EU-certifierade kliniker · Riga
        </div>
      </div>
    </AbsoluteFill>
  );
};
