import { Hero } from "@/components/marketing/Hero";
import { PainPoints } from "@/components/marketing/PainPoints";
import { Features } from "@/components/marketing/Features";
import { TrustBlock } from "@/components/marketing/TrustBlock";
import { DecoderTeaser } from "@/components/marketing/DecoderTeaser";
import { PriceBlock } from "@/components/marketing/PriceBlock";
import { Faq } from "@/components/marketing/Faq";

/** Landing-/Sales-Page (Prompt 2). Footer kommt aus dem Root-Layout. */
export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Features />
      <TrustBlock />
      <DecoderTeaser />
      <PriceBlock />
      <Faq />
    </>
  );
}
