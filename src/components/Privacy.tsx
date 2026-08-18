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
        body: 'Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта дилера «TENET Восток Моторс» (далее — «Оператор»).',
      },
      {
        id: '1-2',
        num: '1.2',
        body: 'Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными нормативными правовыми актами Российской Федерации в области персональных данных.',
      },
      {
        id: '1-3',
        num: '1.3',
        body: 'Используя сайт и оставляя заявку через формы, размещённые на нём, пользователь подтверждает своё согласие с условиями настоящей Политики.',
      },
      {
        id: '1-4',
        num: '1.4',
        body: 'В случае несогласия с условиями Политики пользователь обязан прекратить использование сайта и не передавать свои персональные данные Оператору.',
      },
    ],
  },
  {
    id: 'terms',
    num: '2',
    title: 'Термины и определения',
    items: [
      {
        id: '2-1',
        num: '2.1',
        body: 'В Политике используются следующие термины:',
        list: [
          '«Персональные данные» — любая информация, относящаяся к прямо или косвенно определённому физическому лицу (субъекту персональных данных);',
          '«Обработка персональных данных» — любое действие с персональными данными, совершаемое с использованием средств автоматизации или без таковых;',
          '«Пользователь» — физическое лицо, использующее сайт и/или оставившее заявку через формы обратной связи;',
          '«Сайт» — совокупность страниц, размещённых в сети «Интернет» по адресу дилера «TENET Восток Моторс».',
        ],
      },
    ],
  },
  {
    id: 'purposes',
    num: '3',
    title: 'Цели обработки персональных данных',
    items: [
      {
        id: '3-1',
        num: '3.1',
        body: 'Оператор обрабатывает персональные данные пользователей в следующих целях:',
        list: [
          'обработка входящих заявок и обращений пользователей;',
          'информирование о продуктах, услугах, акциях и специальных предложениях дилера;',
          'заключение и исполнение договоров купли-продажи автомобилей и сопутствующих услуг;',
          'выполнение обязательств, предусмотренных законодательством Российской Федерации;',
          'улучшение качества обслуживания и работы сайта.',
        ],
      },
    ],
  },
  {
    id: 'categories',
    num: '4',
    title: 'Состав обрабатываемых данных',
    items: [
      {
        id: '4-1',
        num: '4.1',
        body: 'Оператор может обрабатывать следующие персональные данные пользователей:',
        list: [
          'фамилия, имя, отчество;',
          'номер контактного телефона;',
          'адрес электронной почты;',
          'сведения об интересующей модели автомобиля и комплектации;',
          'иные данные, добровольно указанные пользователем в формах на сайте.',
        ],
      },
      {
        id: '4-2',
        num: '4.2',
        body: 'Оператор также может собирать обезличенные данные о посетителях сайта (файлы cookie, IP-адрес, сведения об устройстве и браузере) с помощью сервисов интернет-статистики.',
      },
    ],
  },
  {
    id: 'legal-basis',
    num: '5',
    title: 'Правовые основания обработки',
    items: [
      {
        id: '5-1',
        num: '5.1',
        body: 'Правовыми основаниями обработки персональных данных являются:',
        list: [
          'согласие пользователя на обработку его персональных данных;',
          'договоры, заключаемые между Оператором и пользователем;',
          'федеральные законы и иные нормативные правовые акты Российской Федерации.',
        ],
      },
    ],
  },
  {
    id: 'processing',
    num: '6',
    title: 'Порядок обработки данных',
    items: [
      {
        id: '6-1',
        num: '6.1',
        body: 'Обработка персональных данных осуществляется с использованием средств автоматизации и без таковых и включает: сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление и уничтожение.',
      },
      {
        id: '6-2',
        num: '6.2',
        body: 'Хранение персональных данных осуществляется в течение срока, необходимого для достижения целей обработки, либо в течение срока, установленного законодательством Российской Федерации.',
      },
      {
        id: '6-3',
        num: '6.3',
        body: 'Персональные данные могут передаваться третьим лицам исключительно в случаях и порядке, предусмотренных законодательством Российской Федерации либо на основании согласия пользователя.',
      },
    ],
  },
  {
    id: 'security',
    num: '7',
    title: 'Меры по защите данных',
    items: [
      {
        id: '7-1',
        num: '7.1',
        body: 'Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.',
      },
      {
        id: '7-2',
        num: '7.2',
        body: 'Доступ к персональным данным имеют только уполномоченные сотрудники Оператора, обязанные соблюдать конфиденциальность.',
      },
    ],
  },
  {
    id: 'rights',
    num: '8',
    title: 'Права пользователей',
    items: [
      {
        id: '8-1',
        num: '8.1',
        body: 'Пользователь имеет право:',
        list: [
          'получать информацию об обработке своих персональных данных;',
          'требовать уточнения, блокирования или удаления своих персональных данных, если данные являются неполными, устаревшими, неточными или не являются необходимыми для целей обработки;',
          'отозвать своё согласие на обработку персональных данных в любой момент;',
          'обжаловать действия или бездействие Оператора в уполномоченном органе по защите прав субъектов персональных данных или в судебном порядке.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    num: '9',
    title: 'Файлы cookie и аналитика',
    items: [
      {
        id: '9-1',
        num: '9.1',
        body: 'Сайт использует файлы cookie для обеспечения корректной работы, сохранения пользовательских настроек и сбора статистики посещений.',
      },
      {
        id: '9-2',
        num: '9.2',
        body: 'Пользователь может самостоятельно управлять файлами cookie через настройки своего браузера. Отключение cookie может привести к невозможности использования отдельных функций сайта.',
      },
    ],
  },
  {
    id: 'changes',
    num: '10',
    title: 'Изменения Политики',
    items: [
      {
        id: '10-1',
        num: '10.1',
        body: 'Оператор оставляет за собой право вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её размещения на сайте, если иное не предусмотрено новой редакцией.',
      },
      {
        id: '10-2',
        num: '10.2',
        body: 'Пользователю рекомендуется периодически знакомиться с актуальной редакцией Политики, размещённой на сайте.',
      },
    ],
  },
  {
    id: 'contacts',
    num: '11',
    title: 'Контактная информация',
    items: [
      {
        id: '11-1',
        num: '11.1',
        body: 'По всем вопросам, связанным с обработкой персональных данных, а также для реализации своих прав пользователь может обратиться к Оператору по контактным данным, указанным в разделе «Контакты» на сайте дилера «TENET Восток Моторс».',
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

export function Privacy() {
  const activeSection = useActiveSection();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-graphite-dark">
      {/* CMS content loading must be enabled only after PostgreSQL is configured in production.
          Public components must always preserve static fallback content. */}
      <Header onCtaClick={() => { window.location.href = '/'; }} />

      {/* Hero / intro block */}
      <header className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-dark via-graphite-dark to-graphite-dark/95" />
        <div className="relative max-w-content mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <span className="divider-line !bg-beige/25" />
              <span className="text-beige font-heading text-[11px] tracking-[0.4em] uppercase">
                Юридическая информация
              </span>
            </div>
            <h1 className="text-white font-display font-black text-[1.6rem] sm:text-5xl lg:text-[4rem] leading-[1.05] sm:leading-[0.95] tracking-[-0.025em] animate-fade-up break-words hyphens-auto">
              Политика
              <span className="block text-beige mt-2 break-words">конфиденциальности</span>
            </h1>
            <p className="text-white/65 font-body text-base lg:text-lg leading-[1.8] mt-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.16s' }}>
              Настоящий документ определяет порядок обработки и защиты персональных
              данных пользователей сайта дилера «TENET Восток Моторс». Оставляя
              заявку через формы на сайте, пользователь подтверждает согласие с
              условиями настоящей Политики.
            </p>
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
                  Примечание
                </h2>
                <div className="space-y-5">
                  <p className="text-white/55 font-body text-sm leading-[1.8]">
                    Настоящая Политика носит шаблонный характер и подлежит
                    уточнению в соответствии с фактическими процессами обработки
                    персональных данных Оператором и требованиями действующего
                    законодательства Российской Федерации.
                  </p>
                </div>
              </section>

              <div className="mt-12">
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
                  className="inline-flex items-center gap-2 text-beige/80 hover:text-beige font-heading text-[13px] tracking-wide transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Вернуться на главную
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
