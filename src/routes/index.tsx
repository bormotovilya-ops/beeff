import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Users, Award, Code2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beeff — Внедрение 1С в Перми | 15 лет опыта" },
      {
        name: "description",
        content:
          "ООО «БИФ» — 15 лет внедрения информационных систем 1С в Перми и Пермском крае. Команда из 10 специалистов. Решаем задачи любой сложности.",
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">Beeff</span>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
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
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Связаться
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            ООО «БИФ» · с 2010 года
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Внедряем 1С под задачи бизнеса —{" "}
            <span className="text-primary">15 лет в Перми</span> и Пермском крае.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Информационные системы 1С любого масштаба и сложности. Аналитика, разработка,
            сопровождение — под требования вашего бизнеса.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Обсудить проект <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#expertise"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Что мы делаем
            </a>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-border/60 pt-12 md:grid-cols-3">
            <div>
              <dt className="text-sm text-muted-foreground">Лет на рынке</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">15</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Специалистов в команде</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">10</dd>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dt className="text-sm text-muted-foreground">Регион присутствия</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                Пермский край
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">О компании</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Сильная репутация, проверенная годами.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
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
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Экспертиза</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Полный цикл внедрения 1С под бизнес.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
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
              <div key={title} className="bg-background p-8">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section id="team" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Команда</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            10 высококлассных специалистов — аналитики и программисты.
          </h2>

          <div className="mt-16 grid gap-12 rounded-2xl border border-border bg-card p-8 md:grid-cols-[auto_1fr] md:p-12">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-accent text-3xl font-semibold text-accent-foreground md:h-40 md:w-40 md:text-4xl">
              РСВ
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">
                Ключевой эксперт · Собственник
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Райс Сергей Владимирович
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Человек, который знает в 1С всё. Решает задачи, с которыми не справились другие.
                Личное участие в сложных проектах — гарантия результата.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] opacity-70">Контакты</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Расскажите о задаче — ответим в течение рабочего дня.
            </h2>
          </div>
          <div className="space-y-6 text-lg">
            <a
              href="mailto:rice@beeff.ru"
              className="flex items-center gap-4 border-b border-primary-foreground/20 pb-6 transition-opacity hover:opacity-80"
            >
              <Mail className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
              <span>rice@beeff.ru</span>
            </a>
            <a
              href="tel:83422719655"
              className="flex items-center gap-4 border-b border-primary-foreground/20 pb-6 transition-opacity hover:opacity-80"
            >
              <Phone className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
              <span>8 (342) 2719655</span>
            </a>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
              <span className="text-base leading-relaxed opacity-90">
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
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Реквизиты</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">ООО «БИФ»</h2>

          <dl className="mt-10 grid gap-x-12 gap-y-6 text-sm md:grid-cols-2">
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
              <div key={label} className="flex flex-col gap-1 border-b border-border/60 pb-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} ООО «БИФ» (Beeff). Все права защищены.</span>
            <span>Пермь · 1С с 2010 года</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
