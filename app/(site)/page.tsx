import { Hero } from "@/components/marketing/Hero";
import { PainPoints } from "@/components/marketing/PainPoints";
import { Benefits } from "@/components/marketing/Benefits";
import { Features } from "@/components/marketing/Features";
import { TrustBlock } from "@/components/marketing/TrustBlock";
import { MidCta } from "@/components/marketing/MidCta";
import { DecoderTeaser } from "@/components/marketing/DecoderTeaser";
import { PriceBlock } from "@/components/marketing/PriceBlock";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Faq } from "@/components/marketing/Faq";
import { StickyCta } from "@/components/marketing/StickyCta";
import { TrackOnMount } from "@/components/TrackOnMount";

/** Landing-/Sales-Page. Footer kommt aus dem Root-Layout. */
export default function Home() {
  return (
    <>
      <TrackOnMount events={["ViewContent"]} />
      <Hero />
      <PainPoints />
      <Benefits />
      <Features />
      <TrustBlock />
      <MidCta />
      <DecoderTeaser />
      <PriceBlock />
      <Testimonials />
      <Faq />
      <StickyCta />
    </>
  );
}
