import { MarketingBackground } from "@/components/marketing/marketing-background";
import { SiteNav } from "@/components/marketing/site-nav";
import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Features } from "@/components/marketing/features";
import { Showcase } from "@/components/marketing/showcase";
import { Security } from "@/components/marketing/security";
import { CtaBand } from "@/components/marketing/cta-band";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <>
      <MarketingBackground />
      <SiteNav />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Features />
      <Showcase />
      <Security />
      <CtaBand />
      <SiteFooter />
    </>
  );
}
