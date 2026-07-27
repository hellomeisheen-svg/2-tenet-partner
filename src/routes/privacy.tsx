import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/components/Privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности | TENET Восток Моторс" },
      {
        name: "description",
        content:
          "Политика конфиденциальности сайта дилера «TENET Восток Моторс»: цели обработки, состав данных, права пользователей и меры защиты.",
      },
      { property: "og:title", content: "Политика конфиденциальности | TENET Восток Моторс" },
      {
        property: "og:description",
        content:
          "Порядок обработки и защиты персональных данных пользователей сайта «TENET Восток Моторс».",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Privacy,
});
