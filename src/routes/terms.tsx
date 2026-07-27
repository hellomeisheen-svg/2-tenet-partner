import { createFileRoute } from "@tanstack/react-router";
import { Terms } from "@/components/Terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Условия программы «TENET для своих» | Восток Моторс" },
      {
        name: "description",
        content:
          "Условия участия в закрытом клубе «TENET для своих»: получение персонального бонуса 200 000 ₽ и сертификата 5% на сервис.",
      },
      { property: "og:title", content: "Условия программы «TENET для своих»" },
      {
        property: "og:description",
        content: "Полные условия и правила программы «TENET для своих» от Восток Моторс.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Terms,
});
