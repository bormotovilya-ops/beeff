import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  Award,
  Code2,
  ArrowRight,
  Briefcase,
  Layers,
  Wrench,
  Bot,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beeff — Внедрение 1С в Перми | 15 лет опыта" },
      {
        name: "description",
        content:
          "ООО «БИФ» — 15 лет внедрения информационных систем 1С в Перми и Пермском крае. Команда высококлассных специалистов. Решаем задачи любой сложности.",
      },
      { property: "og:title", content: "Beeff — Внедрение 1С в Перми" },
      {
        property: "og:description",
        content: "15 лет опыта внедрения 1С. Команда экспертов в Перми и Пермском крае.",
      },
    ],
  }),
  component: Index,
});

function TeamMemberCard({
  icon: Icon,
  role,
  name,
  text,
  featured = false,
}: {
  icon: LucideIcon;
  role: string;
  name: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8 ${
        featured ? "border-primary/30 bg-secondary/20 md:p-12" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={`shrink-0 text-primary ${featured ? "h-7 w-7 md:h-6 md:w-6" : "h-7 w-7"}`}
          strokeWidth={1.5}
        />
        <p className="text-sm uppercase leading-snug tracking-[0.15em] text-primary md:text-xs md:tracking-[0.2em]">
          {role}
        </p>
      </div>
      <h3
        className={`mt-5 font-semibold tracking-tight ${
          featured ? "text-2xl sm:text-3xl md:text-3xl" : "text-xl sm:text-lg md:text-lg"
        }`}
      >
        {name}
      </h3>
      <p
        className={`mt-4 flex-1 leading-relaxed text-muted-foreground ${
          featured ? "text-lg sm:text-xl md:text-lg" : "text-base md:text-sm"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <a href="#top" className="flex min-w-0 items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight sm:text-2xl">Beeff</span>
            <span className="hidden text-sm uppercase tracking-[0.2em] text-muted-foreground sm:inline md:text-xs">
              1С · Пермь
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground transition-colors">О компании</a>
            <a href="#expertise" className="hover:text-foreground transition-colors">Экспертиза</a>
            <a href="#team" className="hover:text-foreground transition-colors">Команда</a>
            <a href="#contacts" className="hover:text-foreground transition-colors">Контакты</a>
          </nav>
          <a
            href="#contacts"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 md:rounded-md md:px-4 md:py-2 md:text-sm"
          >
            Связаться
          </a>
        </div>
        <nav
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto border-t border-border/40 px-4 py-3 text-base text-muted-foreground [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
          aria-label="Разделы сайта"
        >
          {[
            ["#about", "О компании"],
            ["#expertise", "Экспертиза"],
            ["#team", "Команда"],
            ["#contacts", "Контакты"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-lg px-4 py-2.5 font-medium transition-colors hover:bg-secondary hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
          <p className="mb-5 text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
            ООО «БИФ» · с 2010 года
          </p>
          <h1 className="max-w-4xl text-[1.875rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            Внедряем 1С под задачи бизнеса —{" "}
            <span className="text-primary">15 лет в Перми</span> и Пермском крае.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
            Информационные системы 1С любого масштаба и сложности. Аналитика, разработка,
            сопровождение — под требования вашего бизнеса.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a
              href="#contacts"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:min-h-0 sm:rounded-md sm:px-6 sm:py-3 sm:text-sm"
            >
              Обсудить проект <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
            </a>
            <a
              href="#expertise"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-7 py-4 text-base font-medium transition-colors hover:bg-secondary sm:min-h-0 sm:rounded-md sm:px-6 sm:py-3 sm:text-sm"
            >
              Что мы делаем
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-border/60 pt-10 sm:mt-20 sm:grid-cols-2 sm:pt-12 md:grid-cols-3">
            <div>
              <dt className="text-base text-muted-foreground sm:text-sm">Лет на рынке</dt>
              <dd className="mt-2 text-5xl font-semibold tracking-tight sm:text-4xl md:text-5xl">15</dd>
            </div>
            <div>
              <dt className="text-base text-muted-foreground sm:text-sm">Специалистов в команде</dt>
              <dd className="mt-2 text-5xl font-semibold tracking-tight sm:text-4xl md:text-5xl">10</dd>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <dt className="text-base text-muted-foreground sm:text-sm">Регион присутствия</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl md:text-5xl">
                Пермский край
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
              О компании
            </p>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Сильная репутация, проверенная годами.
            </h2>
          </div>
          <div className="space-y-6 text-xl leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Beeff — компания с пятнадцатилетним опытом внедрения информационных систем 1С
              различного масштаба и сложности. Мы работаем под конкретные требования клиента, а не
              продаём типовые решения.
            </p>
            <p>
              За эти годы мы заработали сильную репутацию в Перми и Пермском крае. К нам
              обращаются, когда нужно надёжно — и когда другие подрядчики уже не справились.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
            Экспертиза
          </p>
          <h2 className="mt-4 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Полный цикл внедрения 1С под бизнес.
          </h2>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-px sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:bg-border md:grid-cols-3">
            {[
              {
                icon: Award,
                title: "Внедрение под требования",
                text: "Анализируем процессы, проектируем архитектуру и адаптируем 1С под конкретные задачи вашего бизнеса.",
              },
              {
                icon: Code2,
                title: "Разработка и доработки",
                text: "Кастомные конфигурации, интеграции, отчётность. Решаем задачи любого масштаба и сложности.",
              },
              {
                icon: Users,
                title: "Сопровождение",
                text: "Поддержка, обновления, обучение пользователей. Долгосрочное партнёрство, а не разовый проект.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-background p-6 sm:rounded-none sm:border-0 sm:p-8"
              >
                <Icon className="h-7 w-7 text-primary sm:h-6 sm:w-6" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl font-semibold sm:mt-6 sm:text-lg">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
            Команда
          </p>
          <h2 className="mt-4 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Высококлассные специалисты — аналитики и программисты, в том числе:
          </h2>

          <div className="mt-10 space-y-5 sm:mt-16 sm:space-y-6">
            <TeamMemberCard
              icon={Briefcase}
              role="Ключевой эксперт · Директор"
              name="Райс Сергей Владимирович"
              text="Человек, который знает в 1С всё. Решает задачи, с которыми не справились другие. Личное участие в сложных проектах — гарантия результата."
              featured
            />

            <div className="grid gap-6 md:grid-cols-3">
              <TeamMemberCard
                icon={Layers}
                role="эксперт по 1С ERP"
                name="Мехоношин Евгений Николаевич"
                text="точно знает как сделать лучше."
              />
              <TeamMemberCard
                icon={Wrench}
                role="технический эксперт"
                name="Порсев Иван Александрович"
                text="решает вопросы по 1с и не только по 1с."
              />
              <TeamMemberCard
                icon={Bot}
                role="специалист в области ИИ"
                name="Бормотов Илья Михайлович"
                text="приучает агентов ИИ для работы с задачами 1с."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] opacity-70 sm:text-xs sm:tracking-[0.25em]">
              Контакты
            </p>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Расскажите о задаче — ответим в течение рабочего дня.
            </h2>
          </div>
          <div className="space-y-2 text-xl sm:space-y-6 sm:text-lg">
            <a
              href="mailto:rice@beeff.ru"
              className="flex min-h-14 items-center gap-4 rounded-lg border-b border-primary-foreground/20 py-4 transition-opacity hover:opacity-80 sm:min-h-0 sm:rounded-none sm:pb-6"
            >
              <Mail className="h-6 w-6 shrink-0 opacity-70 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span>rice@beeff.ru</span>
            </a>
            <a
              href="tel:83422719655"
              className="flex min-h-14 items-center gap-4 rounded-lg border-b border-primary-foreground/20 py-4 transition-opacity hover:opacity-80 sm:min-h-0 sm:rounded-none sm:pb-6"
            >
              <Phone className="h-6 w-6 shrink-0 opacity-70 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span>8 (342) 2719655</span>
            </a>
            <div className="flex items-start gap-4 py-2 sm:py-0">
              <MapPin className="mt-1 h-6 w-6 shrink-0 opacity-70 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span className="text-lg leading-relaxed opacity-90 sm:text-base">
                614022, Пермский край, г. Пермь,
                <br />
                ул. Карпинского, д. 77, кв. 97
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Requisites / Footer */}
      <footer className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
            Реквизиты
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-2xl md:text-3xl">ООО «БИФ»</h2>

          <dl className="mt-8 grid gap-x-12 gap-y-6 text-base sm:mt-10 sm:text-sm md:grid-cols-2">
            {[
              ["Юридический адрес", "614022, Пермский край, г. Пермь, ул. Карпинского, д. 77, кв. 97"],
              ["ИНН", "5905040023"],
              ["КПП", "590501001"],
              ["Расчётный счёт", "40702810729200000545"],
              ["Банк", 'ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК", г. Нижний Новгород'],
              ["БИК", "042202824"],
              ["E-mail", "rice@beeff.ru"],
              ["Телефон", "8 (342) 2719655"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5 border-b border-border/60 pb-5 sm:gap-1 sm:pb-4">
                <dt className="text-sm uppercase tracking-wider text-muted-foreground sm:text-xs">{label}</dt>
                <dd className="leading-relaxed text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:mt-16 sm:text-xs md:flex-row">
            <span>© {new Date().getFullYear()} ООО «БИФ» (Beeff). Все права защищены.</span>
            <span>Пермь · 1С с 2010 года</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
