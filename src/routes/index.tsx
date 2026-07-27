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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TENET для своих — Закрытый клуб партнёрской программы | Восток Моторс" },
      {
        name: "description",
        content:
          "Закрытый клуб «TENET для своих» — персональный бонус 200 000 ₽ и сертификат 5% на сервис для клиентов, пришедших по партнёрской ссылке. Официальный дилер TENET Восток Моторс в Тюмени.",
      },
      { property: "og:title", content: "Закрытый клуб «TENET для своих»" },
      {
        property: "og:description",
        content:
          "Персональный бонус 200 000 ₽ и сертификат 5% на сервис при покупке TENET по партнёрской программе. Восток Моторс, Тюмень.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToForm = useCallback(() => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onCtaClick={scrollToForm} />
      <Hero onCtaClick={scrollToForm} />
      <Benefits />
      <BonusChoice onCtaClick={scrollToForm} />
      <Certificate onCtaClick={scrollToForm} />
      <HappyClients />
      <Trust />
      <LeadForm />
      <Contacts />
      <Footer />
    </div>
  );
}
