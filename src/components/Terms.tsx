import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

type SubItem = string;
type Section = {
  id: string;
  num: string;
  title: string;
  intro?: string;
  items: { id: string; num: string; body: string; list?: SubItem[] }[];
};

const sections: Section[] = [
  {
    id: 'general',
    num: '1',
    title: 'Общие положения',
    items: [
      {
        id: '1-1',
        num: '1.1',
        body: 'Акция «TENET ДЛЯ СВОИХ» проводится в целях предоставления клиентам специальных условий при покупке автомобиля TENET.',
      },
      {
        id: '1-2',
        num: '1.2',
        body: 'Участником акции может быть физическое лицо, которое:',
        list: [
          'перешло на страницу акции по партнерской ссылке, либо',
          'обратилось с указанием промокода или иного идентификатора партнера, предусмотренного условиями программы, и',
          'оставило заявку на странице акции или иным способом обратилось в дилерский центр в период действия акции.',
        ],
      },
      {
        id: '1-3',
        num: '1.3',
        body: 'Организатором предложения в части предоставления дополнительной выгоды выступает дилер «TENET Восток Моторс».',
      },
      {
        id: '1-4',
        num: '1.4',
        body: 'Участие в акции означает ознакомление и согласие клиента с настоящими условиями.',
      },
    ],
  },
  {
    id: 'term',
    num: '2',
    title: 'Срок действия акции',
    items: [
      {
        id: '2-1',
        num: '2.1',
        body: 'Акция действует до 31 декабря 2026 года включительно.',
      },
      {
        id: '2-2',
        num: '2.2',
        body: 'Организатор вправе изменить сроки действия акции, приостановить ее проведение либо прекратить действие акции досрочно в случаях, допускаемых действующим законодательством Российской Федерации, с размещением соответствующей информации на сайте или в дилерском центре.',
      },
    ],
  },
  {
    id: 'offer',
    num: '3',
    title: 'Суть предложения',
    items: [
      {
        id: '3-1',
        num: '3.1',
        body: 'По условиям закрытого клуба «TENET ДЛЯ СВОИХ» клиент получает право выбора персонального дополнительного бонуса к действующим предложениям от импортера в размере 200 000 рублей при покупке автомобиля TENET.',
      },
      {
        id: '3-2',
        num: '3.2',
        body: 'Участнику акции предоставляется право выбрать один из следующих вариантов бонуса:',
        list: [
          'комплект дополнительного оборудования и услуг под ключ на сумму до 200 000 рублей;',
          'дисконт в размере 200 000 рублей на покупку автомобиля.',
        ],
      },
      {
        id: '3-3',
        num: '3.3',
        body: 'Одновременное предоставление обоих вариантов бонуса по одной сделке не допускается, если иное прямо не согласовано организатором акции в письменной форме.',
      },
    ],
  },
  {
    id: 'equipment',
    num: '4',
    title: 'Вариант бонуса: дополнительное оборудование',
    items: [
      {
        id: '4-1',
        num: '4.1',
        body: 'При выборе варианта дополнительного оборудования клиенту может быть предоставлен комплект опций и услуг на сумму до 200 000 рублей.',
      },
      {
        id: '4-2',
        num: '4.2',
        body: 'В состав комплекта могут входить:',
        list: [
          'тонировка задней полусферы;',
          'сетка в передний бампер для защиты радиатора;',
          'антикоррозийное и шумоизоляционное покрытие днища;',
          'ковры в салон и багажник;',
          'защита картера двигателя;',
          'брызговики;',
          'набор автомобилиста;',
          'сигнализация с автозапуском.',
        ],
      },
      {
        id: '4-3',
        num: '4.3',
        body: 'Итоговый перечень оборудования, состав работ и возможность установки конкретных позиций определяются организатором акции с учетом выбранной модели автомобиля, комплектации, технической совместимости, наличия оборудования и условий сделки на дату обращения клиента.',
      },
      {
        id: '4-4',
        num: '4.4',
        body: 'Замена отдельных позиций комплекта на денежный эквивалент, иные товары, услуги или выплаты производится только по решению организатора акции.',
      },
    ],
  },
  {
    id: 'discount',
    num: '5',
    title: 'Вариант бонуса: дисконт',
    items: [
      {
        id: '5-1',
        num: '5.1',
        body: 'При выборе варианта дисконта клиенту предоставляется прямая скидка от дилера «TENET Восток Моторс» в размере 200 000 рублей на покупку автомобиля TENET.',
      },
      {
        id: '5-2',
        num: '5.2',
        body: 'Скидка применяется в рамках оформления сделки купли-продажи автомобиля и учитывается в документах, сопровождающих сделку, в порядке, определяемом организатором акции.',
      },
      {
        id: '5-3',
        num: '5.3',
        body: 'Денежная выплата клиенту в размере суммы скидки не производится. Скидка предоставляется исключительно как уменьшение стоимости приобретаемого автомобиля на условиях акции.',
      },
    ],
  },
  {
    id: 'service',
    num: '6',
    title: 'Сервисный сертификат 5%',
    items: [
      {
        id: '6-1',
        num: '6.1',
        body: 'В рамках программы на странице акции также может размещаться предложение о предоставлении сервисного сертификата 5% на услуги сервисного центра.',
      },
      {
        id: '6-2',
        num: '6.2',
        body: 'Сервисный сертификат действует на все услуги сервисного центра дилера и суммируется с другими предложениями дилера, если иное не указано отдельно в условиях конкретной сервисной акции.',
      },
      {
        id: '6-3',
        num: '6.3',
        body: 'Срок действия предложения по сервисному сертификату — до 31 декабря 2026 года включительно.',
      },
      {
        id: '6-4',
        num: '6.4',
        body: 'Порядок применения сертификата, а также технические и организационные ограничения его использования уточняются у сотрудников дилерского центра на дату обращения клиента.',
      },
    ],
  },
  {
    id: 'participation',
    num: '7',
    title: 'Порядок участия',
    items: [
      {
        id: '7-1',
        num: '7.1',
        body: 'Для получения предложения клиенту необходимо:',
        list: [
          'перейти на страницу акции по партнерской ссылке либо использовать предусмотренный промокод / идентификатор;',
          'заполнить форму заявки, указав имя, телефон и интересующую модель автомобиля;',
          'дождаться обратной связи менеджера дилерского центра для подтверждения деталей обращения и условий участия в акции.',
        ],
      },
      {
        id: '7-2',
        num: '7.2',
        body: 'Идентификатор партнера, переданный в URL или иным способом, может сохраняться в заявке в целях учета источника обращения и корректного применения условий партнерской программы.',
      },
      {
        id: '7-3',
        num: '7.3',
        body: 'Организатор акции вправе запросить у клиента дополнительные сведения, необходимые для проверки возможности предоставления предложения и оформления сделки.',
      },
    ],
  },
  {
    id: 'restrictions',
    num: '8',
    title: 'Ограничения и особенности',
    items: [
      {
        id: '8-1',
        num: '8.1',
        body: 'Предложение действует только в период проведения акции и только при обращении в дилерский центр «TENET Восток Моторс».',
      },
      {
        id: '8-2',
        num: '8.2',
        body: 'Предоставление бонуса зависит от наличия соответствующего автомобиля, выбранной комплектации, технической возможности установки дополнительного оборудования, а также от соблюдения клиентом условий участия в акции.',
      },
      {
        id: '8-3',
        num: '8.3',
        body: 'Предложение носит индивидуальный характер и не предназначено для свободного публичного распространения вне условий партнерской программы «TENET ДЛЯ СВОИХ».',
      },
      {
        id: '8-4',
        num: '8.4',
        body: 'Организатор вправе отказать в предоставлении бонуса в случаях:',
        list: [
          'указания недостоверных сведений в заявке;',
          'невозможности идентифицировать участие клиента в партнерской программе;',
          'завершения срока действия акции;',
          'отсутствия технической или организационной возможности предоставить выбранный вариант бонуса на заявленных условиях.',
        ],
      },
    ],
  },
  {
    id: 'stacking',
    num: '9',
    title: 'Суммирование с иными предложениями',
    items: [
      {
        id: '9-1',
        num: '9.1',
        body: 'Предложение по персональному бонусу суммируется со всеми действующими акциями импортера в объеме и порядке, определяемом организатором акции и условиями конкретной сделки.',
      },
      {
        id: '9-2',
        num: '9.2',
        body: 'Возможность одновременного применения акции с иными программами дилера, скидками, кредитными продуктами, trade-in, страховыми и иными маркетинговыми предложениями определяется отдельно на дату обращения клиента.',
      },
    ],
  },
  {
    id: 'privacy',
    num: '10',
    title: 'Персональные данные',
    items: [
      {
        id: '10-1',
        num: '10.1',
        body: 'При заполнении формы заявки клиент предоставляет персональные данные, необходимые для обработки обращения и предоставления информации по условиям акции.',
      },
      {
        id: '10-2',
        num: '10.2',
        body: 'Обработка персональных данных осуществляется в соответствии с политикой конфиденциальности, размещенной на сайте, и действующим законодательством Российской Федерации.',
      },
    ],
  },
  {
    id: 'final',
    num: '11',
    title: 'Заключительные положения',
    items: [
      {
        id: '11-1',
        num: '11.1',
        body: 'Настоящая страница носит исключительно информационный характер и предназначена для ознакомления клиентов с условиями участия в акции.',
      },
      {
        id: '11-2',
        num: '11.2',
        body: 'Итоговые условия приобретения автомобиля, предоставления скидки, дополнительного оборудования и сервисных преимуществ определяются в документах, оформляемых при совершении сделки, а также в подтверждении от дилерского центра.',
      },
      {
        id: '11-3',
        num: '11.3',
        body: 'Настоящие условия не являются публичной офертой в смысле положений действующего гражданского законодательства Российской Федерации.',
      },
    ],
  },
];

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Terms() {
  const activeSection = useActiveSection();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-graphite-dark">
      <Header onCtaClick={() => { window.location.href = '/'; }} />

      {/* Hero / intro block */}
      <header
        className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-dark via-graphite-dark to-graphite-dark/95" />
        <div className="relative max-w-content mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <span className="divider-line !bg-beige/25" />
              <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
                Юридическая информация
              </span>
            </div>
            <h1 className="text-white font-display font-black text-[2.25rem] sm:text-5xl lg:text-[4rem] leading-[0.95] tracking-[-0.025em] animate-fade-up">
              Условия акции
              <span className="block text-beige mt-2">«TENET ДЛЯ СВОИХ»</span>
            </h1>
            <p className="text-white/65 font-body text-base lg:text-lg leading-[1.8] mt-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.16s' }}>
              Настоящие условия регулируют порядок предоставления специального
              предложения в рамках программы «TENET ДЛЯ СВОИХ» для клиентов,
              перешедших по партнерской ссылке либо использующих промокод,
              предусмотренный условиями партнерского направления. Предложение
              действует у дилера «TENET Восток Моторс» в течение установленного
              срока акции.
            </p>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
              className="inline-flex items-center gap-2 text-beige/80 hover:text-beige font-heading text-[13px] tracking-wide transition-colors mt-10 animate-fade-up"
              style={{ animationDelay: '0.28s' }}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Вернуться на главную
            </a>
          </div>
        </div>
      </header>

      {/* Main content — sticky TOC + legal text */}
      <main className="relative pb-24 lg:pb-32">
        <div className="max-w-content mx-auto px-6 lg:px-12">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Sticky table of contents — desktop */}
            <nav aria-label="Содержание" className="hidden lg:block">
              <div className="sticky top-32">
                <div className="text-beige font-heading text-xs uppercase tracking-[0.2em] mb-6">
                  Содержание
                </div>
                <ul className="space-y-3 border-l border-beige/15">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleNav(e, s.id)}
                        className={`block pl-5 -ml-px border-l py-1 text-sm font-body tracking-wide transition-colors ${
                          activeSection === s.id
                            ? 'border-beige text-beige'
                            : 'border-transparent text-white/45 hover:text-white/80'
                        }`}
                      >
                        <span className="text-white/35 mr-2">{s.num}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Legal content */}
            <article className="max-w-[680px]">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 mb-16 lg:mb-20"
                >
                  <div className="flex items-baseline gap-4 mb-7">
                    <span className="text-beige/60 font-display font-black text-2xl lg:text-3xl">
                      {section.num}
                    </span>
                    <h2 className="text-white font-display font-black text-xl lg:text-2xl tracking-[-0.01em]">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div key={item.id} id={item.id} className="scroll-mt-32">
                        <p className="text-white/75 font-body text-[15px] lg:text-base leading-[1.85]">
                          <span className="text-beige/70 font-heading mr-2">{item.num}</span>
                          {item.body}
                        </p>
                        {item.list && (
                          <ul className="mt-4 space-y-2.5 pl-10">
                            {item.list.map((li, i) => (
                              <li
                                key={i}
                                className="text-white/65 font-body text-[15px] lg:text-base leading-[1.8] flex gap-3"
                              >
                                <span className="text-beige/40 mt-2 shrink-0">
                                  <span className="block w-1 h-1 rounded-full bg-beige/40" />
                                </span>
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Disclaimer block */}
              <section className="mt-8 pt-10 border-t border-beige/15">
                <h2 className="text-beige font-heading text-xs uppercase tracking-[0.2em] mb-6">
                  Дисклеймер
                </h2>
                <div className="space-y-5">
                  <p className="text-white/55 font-body text-sm leading-[1.8]">
                    Указанная выгода предоставляется в виде прямой денежной скидки
                    от дилера «TENET Восток Моторс» или комплекта дополнительного
                    оборудования и услуг на соответствующую сумму в подарок.
                    Предложение суммируется со всеми действующими акциями
                    импортера. Акция действует до 31.12.2026 г. Не является
                    публичной офертой.
                  </p>
                  <p className="text-white/55 font-body text-sm leading-[1.8]">
                    Условия сервисного предложения: выгода по сервисному
                    сертификату действует на все услуги сервисного центра,
                    суммируется с другими предложениями дилера. Акция действует
                    до 31.12.2026 г. Не является публичной офертой.
                  </p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
