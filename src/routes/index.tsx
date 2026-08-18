import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { BonusChoice } from "@/components/BonusChoice";
import { Certificate } from "@/components/Certificate";
import { HappyClients } from "@/components/HappyClients";
import { Trust } from "@/components/Trust";
import { LeadForm } from "@/components/LeadForm";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { getPublicContent } from "@/lib/cms.server";

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getPublicContent();
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.settings || {};
    return {
      meta: [
        { title: seo.seo_title || "TENET для своих — Закрытый клуб партнёрской программы | Восток Моторс" },
        {
          name: "description",
          content: seo.seo_description || "Закрытый клуб «TENET для своих» — персональный бонус 200 000 ₽ и сертификат 5% на сервис для клиентов, пришедших по партнёрской ссылке. Официальный дилер TENET Восток Моторс в Тюмени.",
        },
        { property: "og:title", content: seo.seo_og_title || seo.seo_title || "TENET для своих — Закрытый клуб партнёрской программы | Восток Моторс" },
        {
          property: "og:description",
          content: seo.seo_og_description || seo.seo_description || "Закрытый клуб «TENET для своих» — персональный бонус 200 000 ₽ и сертификат 5% на сервис для клиентов, пришедших по партнёрской ссылке. Официальный дилер TENET Восток Моторс в Тюмени.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: seo.seo_og_image || "" },
      ],
      links: [
        { rel: "canonical", href: seo.seo_canonical_url || "" }
      ]
    };
  },
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();
  const blocks = (data as any)?.blocks || [];
  const items = (data as any)?.items || [];
  
  const scrollToForm = useCallback(() => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Map blocks for components
  const heroContent = blocks?.find((b: any) => b.slug === 'hero');
  const benefitsItems = items?.filter((i: any) => i.type === 'benefit');
  const happyClientsItems = items?.filter((i: any) => i.type === 'client');
  const trustItems = items?.filter((i: any) => i.type === 'trust');

  return (
    <div className="min-h-screen bg-white">
      <Header onCtaClick={scrollToForm} />
      <Hero onCtaClick={scrollToForm} content={heroContent} />
      <Benefits items={benefitsItems} />
      <BonusChoice onCtaClick={scrollToForm} />
      <Certificate onCtaClick={scrollToForm} />
      <HappyClients items={happyClientsItems} />
      <Trust items={trustItems} />
      <LeadForm />
      <Contacts />
      <Footer />
    </div>
  );
}
