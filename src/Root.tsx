import React from "react";
import { Composition } from "remotion";

import { StatReveal, statRevealSchema, defaultStatRevealProps } from "./compositions/StatReveal";
import { PriceReveal } from "./compositions/PriceReveal";
import { ThreeTreatmentComparison } from "./compositions/ThreeTreatmentComparison";
import { HollywoodSmile } from "./compositions/HollywoodSmile";
import { ForsakringskassanSMS } from "./compositions/ForsakringskassanSMS";
import { TravelBreakdown } from "./compositions/TravelBreakdown";
import { SameDayTrip } from "./compositions/SameDayTrip";
import { WhyRiga } from "./compositions/WhyRiga";

export const Root: React.FC = () => {
  return (
    <>
      {/* StatReveal — generic Swedish stat-reveal template (used by post-01, post-07) */}
      <Composition
        id="StatReveal"
        component={StatReveal}
        durationInFrames={15 * 30}
        fps={30}
        width={1080}
        height={1920}
        schema={statRevealSchema}
        defaultProps={defaultStatRevealProps}
      />

      {/* Reel 1 — 12.5s — Price reveal: implant Sweden vs Riga */}
      <Composition
        id="01-PriceReveal-Implant"
        component={PriceReveal}
        durationInFrames={375}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 2 — 15s — 3 treatments side by side */}
      <Composition
        id="02-ThreeTreatments"
        component={ThreeTreatmentComparison}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 3 — 14s — Hollywood smile / 8 veneers */}
      <Composition
        id="03-HollywoodSmile"
        component={HollywoodSmile}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 4 — 12s — Försäkringskassan SMS mockup */}
      <Composition
        id="04-ForsakringskassanSMS"
        component={ForsakringskassanSMS}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 5 — 14s — Travel breakdown with Grand Poet 5⭐ hotel */}
      <Composition
        id="05-TravelBreakdown"
        component={TravelBreakdown}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 6 — 15s — Same-day trip option (kills "I don't have time") */}
      <Composition
        id="06-SameDayTrip"
        component={SameDayTrip}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Reel 7 — 15s — Why Riga? Trust + destination authority */}
      <Composition
        id="07-WhyRiga"
        component={WhyRiga}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
