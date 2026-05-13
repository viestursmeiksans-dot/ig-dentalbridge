import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const statRevealSchema = z.object({
  hook: z.string(),
  stat: z.string(),
  statSuffix: z.string(),
  context: z.string(),
  cta: z.string(),
  brand: z.string(),
});

export type StatRevealProps = z.infer<typeof statRevealSchema>;

export const defaultStatRevealProps: StatRevealProps = {
  hook: "Skillnaden mellan svensk och utländsk klinik?",
  stat: "62",
  statSuffix: " 000 kr",
  context: "Samma behandling. Granskad klinik. Det här sparar du.",
  cta: "Drömleendet, utan svenska priser.",
  brand: "@dromleendet",
};

export const StatReveal: React.FC<StatRevealProps> = ({
  hook,
  stat,
  statSuffix,
  context,
  cta,
  brand,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const hookOpacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const statProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.6 },
  });
  const statValue = Math.round(parseFloat(stat) * statProgress);
  const statScale = interpolate(statProgress, [0, 1], [0.6, 1]);
  const statOpacity = interpolate(frame, [90, 105, 240, 260], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const contextOpacity = interpolate(
    frame,
    [150, 170, 240, 260],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const ctaProgress = spring({
    frame: frame - 270,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const ctaOpacity = interpolate(frame, [270, 285], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [40, 0]);

  const brandOpacity = interpolate(
    frame,
    [durationInFrames - 60, durationInFrames - 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #134e4a 0%, #0a0a0a 75%)",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
        color: "white",
        padding: "120px 80px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: hookOpacity,
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: 900,
          position: "absolute",
        }}
      >
        {hook}
      </div>

      <div
        style={{
          opacity: statOpacity,
          transform: `scale(${statScale})`,
          fontSize: 360,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "#fef3c7",
          position: "absolute",
          top: 540,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "baseline",
          gap: 20,
        }}
      >
        <span>{statValue}</span>
        <span
          style={{
            fontSize: 140,
            fontWeight: 700,
            whiteSpace: "nowrap",
            letterSpacing: "normal",
          }}
        >
          {statSuffix.trim()}
        </span>
      </div>

      <div
        style={{
          opacity: contextOpacity,
          fontSize: 56,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          maxWidth: 880,
          position: "absolute",
          bottom: 480,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {context}
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: 900,
          position: "absolute",
          bottom: 280,
        }}
      >
        {cta}
      </div>

      <div
        style={{
          opacity: brandOpacity,
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
          position: "absolute",
          bottom: 140,
        }}
      >
        {brand}
      </div>
    </AbsoluteFill>
  );
};
