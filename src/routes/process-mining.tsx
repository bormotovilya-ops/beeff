import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Search,
  Brain,
  Layers,
  CheckCircle2,
  Shield,
  Clock3,
  Briefcase,
  Wrench,
  Bot,
  GitBranch,
  Route as RouteIcon,
  Target,
  Database,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ClientLogo = {
  name: string;
  domain: string;
  category: "business" | "public";
  website?: string;
  logo?: string;
};

const CLIENT_LOGOS: readonly ClientLogo[] = [
  { name: "ПКНМ", domain: "pknm.ru", category: "business" },
  { name: "Рост Интек", domain: "rostintec.ru", category: "business" },
  { name: "Лента", domain: "lenta.com", category: "business" },
  { name: "ГК Технология", domain: "prosolvent.ru", category: "business" },
  { name: "ПРО ТКО", domain: "tkopro.ru", category: "business" },
  { name: "АСУ Инжиниринг", domain: "asu-engineering.com", category: "business" },
  { name: "Промобот", domain: "promo-bot.ru", category: "business" },
  {
    name: "Избирательная комиссия Пермского края",
    domain: "permkrai.izbirkom.ru",
    website: "http://permkrai.izbirkom.ru/",
    logo: `${import.meta.env.BASE_URL}materials/clients/izbirkom.png`,
    category: "public",
  },
  {
    name: "Министерство финансов Пермского края",
    domain: "mfin.permkrai.ru",
    logo: `${import.meta.env.BASE_URL}materials/clients/mfin.png`,
    category: "public",
  },
  { name: "Администрация города Перми", domain: "gorodperm.ru", category: "public" },
  {
    name: "Законодательное собрание Пермского края",
    domain: "zsperm.ru",
    logo: `${import.meta.env.BASE_URL}materials/clients/zsperm.png`,
    category: "public",
  },
];

export const Route = createFileRoute("/process-mining")({
  head: () => ({
    meta: [
      { title: "Анализ эффективности процессов в 1С | БИФ" },
      {
        name: "description",
        content:
          "Оценка эффективности процессов в существующих системах 1С: сроки, артефакты результата и формат внедрения.",
      },
      { property: "og:title", content: "Анализ эффективности процессов в 1С | БИФ" },
      {
        property: "og:description",
        content:
          "Анализ эффективности работы текущих процессов в 1С: карта процесса, KPI, узкие места и практический план улучшений.",
      },
      { property: "og:url", content: "https://beeff.ru/process-mining" },
    ],
    links: [{ rel: "canonical", href: "https://beeff.ru/process-mining" }],
  }),
  component: ProcessMiningPage,
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
      className={`flex flex-col rounded-lg border border-border bg-card p-6 sm:p-8 ${
        featured ? "border-primary/30 bg-muted/30 md:p-12" : ""
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

function ProcessMiningPage() {
  const aiVideoSrc = `${import.meta.env.BASE_URL}materials/AI.mp4`;
  const processVideoSrc = `${import.meta.env.BASE_URL}materials/process.mp4`;
  const processVideoBlockRef = useRef<HTMLDivElement | null>(null);
  const processVideoRef = useRef<HTMLVideoElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [manualVideoMode, setManualVideoMode] = useState(false);
  const businessClients = CLIENT_LOGOS.filter((client) => client.category === "business");
  const publicClients = CLIENT_LOGOS.filter((client) => client.category === "public");
  const deliverables = [
    "Карта фактического процесса в BPMN с вариантами прохождения.",
    "Дашборд PM-метрик по этапам, ролям и подразделениям.",
    "Рейтинг узких мест с оценкой влияния на cycle time.",
    "План улучшений с приоритетами, владельцами и ожидаемым эффектом.",
  ] as const;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const blockEl = processVideoBlockRef.current;
    const videoEl = processVideoRef.current;
    if (!blockEl || !videoEl || typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion || manualVideoMode) {
      return;
    }

    let rafId = 0;
    let metadataReady = videoEl.readyState >= 1;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const syncVideoToScroll = () => {
      rafId = 0;

      if (!metadataReady || !Number.isFinite(videoEl.duration) || videoEl.duration <= 0) {
        return;
      }

      const rect = blockEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const blockHeight = Math.max(rect.height, 1);

      // Desired behavior:
      // 0%  -> when the video block becomes fully visible
      // 100% -> when the block starts leaving through the top edge
      // (i.e. its top reaches viewport top and then goes above it)
      let rawProgress: number;

      if (blockHeight < viewportHeight) {
        const startTop = viewportHeight - blockHeight; // fully visible moment
        const endTop = 0; // starts leaving at top edge
        rawProgress = (startTop - rect.top) / Math.max(startTop - endTop, 1);
      } else {
        // Fallback for very tall blocks that cannot be fully visible at once.
        rawProgress = (viewportHeight - rect.top) / viewportHeight;
      }

      const progress = clamp(rawProgress, 0, 1);
      const targetTime = progress * videoEl.duration;

      if (Math.abs(videoEl.currentTime - targetTime) > 0.033) {
        videoEl.currentTime = targetTime;
      }
    };

    const requestSync = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(syncVideoToScroll);
      }
    };

    const handleMetadata = () => {
      metadataReady = true;
      requestSync();
    };

    videoEl.pause();
    videoEl.addEventListener("loadedmetadata", handleMetadata);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    requestSync();

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      videoEl.removeEventListener("loadedmetadata", handleMetadata);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [manualVideoMode, prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const rootEl = document.documentElement;
    if (prefersReducedMotion) {
      rootEl.classList.remove("has-scroll-reveal");
      return;
    }
    rootEl.classList.add("has-scroll-reveal");

    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-section"),
    );
    if (!revealNodes.length) {
      return;
    }

    revealNodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${Math.min((index % 4) * 70, 210)}ms`);
    });

    if (typeof IntersectionObserver === "undefined") {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return () => {
        rootEl.classList.remove("has-scroll-reveal");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      rootEl.classList.remove("has-scroll-reveal");
    };
  }, [prefersReducedMotion]);

  const handleManualVideoToggle = () => {
    const videoEl = processVideoRef.current;
    if (!manualVideoMode) {
      setManualVideoMode(true);
      requestAnimationFrame(() => {
        void videoEl?.play().catch(() => {
          // ignore autoplay errors; controls stay available for manual start
        });
      });
      return;
    }

    setManualVideoMode(false);
    videoEl?.pause();
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader />

      <section id="top" className="reveal-section border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.25fr_0.9fr] md:gap-10 md:py-14">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Анализ процессов 1С
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Повышаем эффективность процессов работы в 1С:
              <span className="text-primary"> находим что можно оптимизировать и даем четкий план улучшений.</span>
            </h1>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-primary/80" />
            <p className="mt-3 text-base font-medium text-foreground/90 md:max-w-3xl">
              Предложение по анализу для <span className="text-primary">ЛУКОЙЛ Пермь</span>.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              По цифровым следам в 1С показываем реальную картину работы: где задержки,
              возвраты и лишние действия, и что менять в первую очередь.
            </p>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">
              При необходимости добавляем ИИ-ассистента для интерпретации метрик и
              управленческих рекомендаций.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#next-step"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Согласовать формат работ <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#scope"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Объем и результаты
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-primary/20 bg-card p-6 md:p-7">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Краткое резюме
            </h2>
            <dl className="mt-5 space-y-4 border-l-2 border-primary/35 pl-4">
              {[
                [
                  "Задача",
                  "Понять фактический путь документов, задержки между этапами и причины отклонений.",
                ],
                [
                  "Формат",
                  "Анализ всех ключевых цепочек в выбранном контуре 1С с приоритизацией по бизнес-эффекту.",
                ],
                [
                  "Срок",
                  "Рабочий цикл без спешки: 4-8 недель на качественный анализ, проверку выводов и согласование плана действий.",
                ],
                [
                  "Критерий успеха",
                  "Согласованы 3-5 инициатив с владельцами, сроками и ожидаемым эффектом.",
                ],
                [
                  "ИИ (опционально)",
                  "Подключаем слой ИИ для быстрых вопросов по результатам анализа и сценариев действий.",
                ],
              ].map(([term, value]) => (
                <div key={term} className="space-y-1">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {term}
                  </dt>
                  <dd className="text-sm leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="reveal-section border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Демонстрация обработки
          </p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
            Пример работы инструмента анализа на реальных данных процесса.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Видеофрагмент показывает, как формируется аналитическая картина и как
            быстро перейти от данных к управленческим действиям.
          </p>

          <div
            ref={processVideoBlockRef}
            className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-lg border border-primary/20 bg-background p-4 md:p-6"
          >
            <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-border bg-black/5 md:min-h-[480px]">
              <video
                ref={processVideoRef}
                src={processVideoSrc}
                className="max-h-[620px] w-auto max-w-full rounded-lg border border-border"
                controls={prefersReducedMotion || manualVideoMode}
                muted
                playsInline
                preload="metadata"
              >
                Ваш браузер не поддерживает встроенное видео.
              </video>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="text-xs text-muted-foreground">
                {prefersReducedMotion
                  ? "У вас включено уменьшение движения, поэтому доступен обычный режим просмотра видео."
                  : manualVideoMode
                    ? "Ручной режим просмотра включен. Вы можете смотреть видео обычным способом."
                    : "Видео синхронизировано с прокруткой: вниз - вперед, вверх - назад."}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={handleManualVideoToggle}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {manualVideoMode ? "Вернуть scroll-режим" : "Смотреть видео вручную"}
                </button>
                <button
                  type="button"
                  onClick={() => window.open(processVideoSrc, "_blank", "noopener,noreferrer")}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Открыть видео в отдельном окне
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="scope" className="reveal-section border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Объем анализа
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Что входит в этап анализа и как подтверждаем эффект.
          </h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Что анализируем",
                text: "Все ключевые процессные цепочки в 1С за выбранный период с детализацией по этапам, ролям и переходам.",
              },
              {
                icon: Layers,
                title: "Что считаем",
                text: "По каждой цепочке считаем время цикла, конверсии, долю отклонений, возвратов и повторных действий.",
              },
              {
                icon: CheckCircle2,
                title: "Как подтверждаем эффект",
                text: "Показываем влияние узких мест на цикл и стоимость, а также фиксируем приоритет мер с ожидаемым эффектом.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-background p-8">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-border bg-muted/20 p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Итоговые материалы для руководства
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="reveal-section border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Метод Process Mining
          </p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
            От event log в 1С до управленческих решений — end-to-end.
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground">
            Работаем по industry-практике Process Mining: восстанавливаем фактическую
            модель процесса, проверяем соответствие регламенту и формируем сценарии
            улучшения. Не заменяем отчетность 1С, а строим аналитику на цифровых следах
            каждого кейса.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: GitBranch,
                title: "Process Discovery",
                text: "Автоматически восстанавливаем карту процесса из event log: статусы, переходы, согласования, возвраты.",
              },
              {
                icon: RouteIcon,
                title: "Conformance Checking",
                text: "Сравниваем фактический маршрут с эталонной BPMN и регламентом, считаем долю отклонений и типовые нарушения.",
              },
              {
                icon: Target,
                title: "Process Enhancement",
                text: "Приоритизируем узкие места, сравниваем варианты прохождения и формируем план улучшений с оценкой эффекта.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border border-border bg-background p-6">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6 md:p-7">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" strokeWidth={1.7} />
                <h3 className="text-lg font-semibold">Как готовим данные из 1С</h3>
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>1. Формируем event log: case ID, activity, timestamp, resource.</li>
                <li>2. Сопоставляем события с этапами процесса и ролями исполнителей.</li>
                <li>3. Очищаем и валидируем данные: дубли, разрывы цепочек, аномалии.</li>
                <li>4. Строим process model и рассчитываем PM-метрики по каждому варианту.</li>
              </ol>
            </div>

            <div className="rounded-lg border border-border bg-background p-6 md:p-7">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" strokeWidth={1.7} />
                <h3 className="text-lg font-semibold">Метрики экспертного анализа</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Cycle time и waiting time — где теряются часы и дни в цикле.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Rework rate — доля возвратов, повторных согласований и петель rework.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Conformance rate — насколько процесс следует регламенту на практике.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Variant analysis — какие маршруты доминируют и какие дают максимальные потери.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Bottleneck ranking — узкие места с количественной оценкой влияния на throughput.
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-4xl text-base leading-relaxed text-foreground/90">
            Это тот же подход, который используют enterprise-платформы Process Mining,
            но адаптированный под ваш контур 1С: без лишней инфраструктуры, с фокусом на
            проверяемый результат для руководства.
          </p>
        </div>
      </section>

      <section className="reveal-section border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Слой ИИ для руководителя
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                ИИ помогает быстрее принимать решения по результатам анализа.
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                После расчета метрик руководитель может сразу получить разбор причин и приоритетов действий.
              </p>

              <div className="rounded-lg border border-primary/20 bg-background p-7">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-primary" strokeWidth={1.7} />
                  <h3 className="text-lg font-semibold">Как ИИ помогает руководителю</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Быстрые ответы по метрикам: где теряется время и почему.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Приоритеты действий: что менять в первую очередь.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Рекомендации на основе данных анализа, а не предположений.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Подключение в формате, согласованном с требованиями ИБ.
                  </li>
                </ul>
              </div>
            </div>

            <figure className="rounded-lg border border-border bg-background p-3 lg:p-4">
              <div className="overflow-hidden rounded-lg border border-border bg-secondary/30">
                <video
                  src={aiVideoSrc}
                  className="mx-auto h-auto max-h-[500px] w-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  Ваш браузер не поддерживает встроенное видео.
                </video>
              </div>
              <figcaption className="px-2 pb-1 pt-3 text-xs text-muted-foreground">
                Демонстрация ИИ-интерфейса на основе данных анализа процессов.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="reveal-section border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Сроки и условия
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Этап анализа запускается без изменения базовой логики 1С.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Работаем в спокойном темпе, с фокусом на качество данных, проверяемость выводов и согласование результата с вашей командой.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-7">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-primary" strokeWidth={1.7} />
                <h3 className="text-lg font-semibold">Этапы и длительность</h3>
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>1. Согласование контура, доступов и KPI: 1-2 недели.</li>
                <li>2. Сбор, очистка и валидация данных: 1-2 недели.</li>
                <li>3. Анализ процессов и экспертная интерпретация: 2-3 недели.</li>
                <li>4. Презентация и согласование плана улучшений: 3-5 рабочих дней.</li>
              </ol>
            </div>

            <div className="rounded-lg border border-border bg-background p-7">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" strokeWidth={1.7} />
                <h3 className="text-lg font-semibold">Работа с данными</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Анализ проводится в контуре 1С, без обязательной выгрузки в сторонние системы.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Доступы и роли настраиваются по внутренним правилам информационной безопасности.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  По итогам этапа анализа обсуждается сценарий внедрения улучшений и мониторинга.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="reveal-section border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Команда
          </p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
            Высококлассные специалисты — аналитики и программисты, в том числе:
          </h2>

          <div className="mt-10 space-y-5 md:mt-14 md:space-y-6">
            <TeamMemberCard
              icon={Briefcase}
              role="Ключевой эксперт · Директор"
              name="Райс Сергей Владимирович"
              text="Человек, который знает в 1С все. Решает задачи, с которыми не справились другие. Личное участие в сложных проектах - гарантия результата."
              featured
            />

            <div className="grid gap-6 md:grid-cols-3">
              <TeamMemberCard
                icon={Layers}
                role="Эксперт по 1С ERP"
                name="Мехоношин Евгений Николаевич"
                text="Точно знает, как сделать лучше."
              />
              <TeamMemberCard
                icon={Wrench}
                role="Технический эксперт"
                name="Порсев Иван Александрович"
                text="Решает вопросы по 1С и не только по 1С."
              />
              <TeamMemberCard
                icon={Bot}
                role="Специалист в области ИИ"
                name="Бормотов Илья Михайлович"
                text="Настраивает ИИ-агентов для работы с задачами 1С."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Нам доверяют
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Клиенты из промышленности, бизнеса и госсектора Пермского края.
          </h2>

          <div className="mt-6 p-2 md:p-3">
            <div className="space-y-6 md:hidden">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Бизнес и промышленность
                </h3>
                <div className="mt-3 grid gap-2">
                  {businessClients.map((client) => (
                    <ClientLogoCard key={`mobile-business-${client.domain}`} client={client} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Государственный сектор
                </h3>
                <div className="mt-3 grid gap-2">
                  {publicClients.map((client) => (
                    <ClientLogoCard key={`mobile-public-${client.domain}`} client={client} />
                  ))}
                </div>
              </div>
            </div>

            <div className="logo-cloud-wrap relative hidden overflow-hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
              <div className="space-y-4">
                <div className="logo-cloud-track flex w-max gap-4">
                  {[...businessClients, ...businessClients].map((client, index) => (
                    <ClientLogoCard
                      key={`top-${client.domain}-${index}`}
                      client={client}
                      minWidthClass="min-w-[230px]"
                      eagerLoad
                    />
                  ))}
                </div>
                <div className="logo-cloud-track-reverse flex w-max gap-4">
                  {[...publicClients, ...publicClients].map((client, index) => (
                    <ClientLogoCard
                      key={`bottom-${client.domain}-${index}`}
                      client={client}
                      minWidthClass="min-w-[230px]"
                      eagerLoad
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground md:hidden">
              На мобильной версии клиенты показаны списком для лучшей читаемости. По
              клику на карточку откроется сайт клиента в новой вкладке.
            </div>
            <div className="mt-4 hidden text-xs text-muted-foreground md:block">
              Верхняя и нижняя ленты показывают разные группы клиентов. По клику на
              карточку откроется сайт клиента в новой вкладке.
            </div>
          </div>
        </div>
      </section>

      <section
        id="next-step"
        className="reveal-section border-b border-border/60 bg-primary text-primary-foreground"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] opacity-70">Следующий шаг</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Согласуем формат взаимодействия и запустим анализ.
          </h2>

          <div className="mt-12 grid gap-14 md:grid-cols-2">
            <ContactStartCard />

            <div className="space-y-6 text-lg">
              <a
                href="mailto:rice@beeff.ru"
                className="flex items-center gap-4 border-b border-primary-foreground/20 pb-6 transition-opacity hover:opacity-80"
              >
                <Mail className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                <span>rice@beeff.ru</span>
              </a>
              <a
                href="tel:+79991237788"
                className="flex items-center gap-4 border-b border-primary-foreground/20 pb-6 transition-opacity hover:opacity-80"
              >
                <Phone className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                <span>+7-999-123-77-88</span>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                <span className="text-base leading-relaxed opacity-90">
                  Пермь, ул. Карпинского, 77
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-10 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} ООО «БИФ». Все права защищены.</span>
          <Link to="/" className="hover:text-foreground transition-colors">
            ← На главную
          </Link>
        </div>
      </footer>

      <style>{`
        .reveal-section {
          opacity: 1;
          transform: none;
          filter: none;
        }
        .has-scroll-reveal .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          filter: blur(3px);
          transition:
            opacity 680ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 680ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 680ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform, filter;
        }
        .has-scroll-reveal .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 120s linear infinite;
          will-change: transform;
        }
        .logo-cloud-track-reverse {
          animation: logo-cloud-marquee-reverse 132s linear infinite;
          will-change: transform;
        }
        .logo-cloud-wrap:hover .logo-cloud-track,
        .logo-cloud-wrap:hover .logo-cloud-track-reverse {
          animation-play-state: paused;
        }
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes logo-cloud-marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
          .logo-cloud-track,
          .logo-cloud-track-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ClientLogoCard({
  client,
  minWidthClass,
  eagerLoad = false,
}: {
  client: (typeof CLIENT_LOGOS)[number];
  minWidthClass?: string;
  eagerLoad?: boolean;
}) {
  const { name, domain, website, logo } = client;
  const href = website ?? `https://${domain}`;
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const clearbitSrc = `https://logo.clearbit.com/${domain}`;
  const primarySrc = logo ?? faviconSrc;
  const [logoSrc, setLogoSrc] = useState(primarySrc);
  const [fallbackStep, setFallbackStep] = useState<0 | 1 | 2>(0);
  const [showLogo, setShowLogo] = useState(true);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors hover:bg-muted/40 ${minWidthClass ?? ""}`}
    >
      {showLogo ? (
        <img
          src={logoSrc}
          alt={`Логотип клиента: ${name}`}
          className="h-9 w-9 shrink-0 rounded-sm object-contain"
          loading={eagerLoad ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (fallbackStep === 0 && logoSrc !== clearbitSrc) {
              setFallbackStep(1);
              setLogoSrc(clearbitSrc);
              return;
            }
            if (fallbackStep <= 1 && logoSrc !== faviconSrc) {
              setFallbackStep(2);
              setLogoSrc(faviconSrc);
              return;
            }
            setShowLogo(false);
          }}
        />
      ) : (
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-[11px] font-semibold text-primary"
        >
          {initials}
        </span>
      )}
      <span className="text-sm font-medium leading-snug">{name}</span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/92 shadow-[0_8px_30px_-25px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="h-0.5 bg-primary/80" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6">
        <Link to="/" className="group flex min-w-0 flex-col items-start">
          <span className="block text-[1.65rem] font-black leading-none tracking-tight text-foreground sm:text-[1.9rem]">
            БИФ
          </span>
          <span className="mt-1 hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:block sm:text-[11px]">
            Интегратор 1С · Пермь
          </span>
        </Link>
        <a
          href="#next-step"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-primary/30 bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95 sm:px-4 sm:text-sm"
        >
          <span className="sm:hidden">Связаться</span>
          <span className="hidden sm:inline">Связаться по предложению</span>
        </a>
      </div>
    </header>
  );
}

function ContactStartCard() {
  const email = "rice@beeff.ru";
  const phoneHref = "tel:+79991237788";
  const phoneLabel = "+7-999-123-77-88";
  const subject = encodeURIComponent("Обсуждение предложения по анализу процессов 1С");
  const body = encodeURIComponent(
    "Добрый день!\nГотовы обсудить предложение по анализу процессов в 1С.\nПросьба предложить удобные слоты для встречи.",
  );
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const copyToClipboard = async (value: string, kind: "email" | "phone") => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.focus();
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }
      setCopied(kind);
      window.setTimeout(() => setCopied((prev) => (prev === kind ? null : prev)), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6 rounded-lg bg-primary-foreground/5 p-6 ring-1 ring-primary-foreground/15">
      <h3 className="text-xl font-semibold">Как обычно запускаем проект</h3>
      <ol className="space-y-3 text-sm leading-relaxed opacity-90">
        <li>1. Короткая установочная встреча (30-45 минут).</li>
        <li>2. Согласование контура процессов и ответственных.</li>
        <li>3. Подтверждение сроков и состава итоговых материалов.</li>
      </ol>
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${email}?subject=${subject}&body=${body}`}
          className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-opacity hover:opacity-90"
        >
          Назначить встречу <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={phoneHref}
          className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
        >
          Позвонить
        </a>
        <button
          type="button"
          onClick={() => copyToClipboard(email, "email")}
          className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
        >
          Скопировать почту
        </button>
        <button
          type="button"
          onClick={() => copyToClipboard(phoneLabel, "phone")}
          className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
        >
          Скопировать телефон
        </button>
      </div>
      <p className="text-xs opacity-75">
        Без анкет и лишних полей: можно сразу назначить встречу, позвонить или скопировать контакты.
      </p>
      {copied && (
        <p className="text-xs font-medium opacity-90">
          {copied === "email" ? "Почта скопирована." : "Телефон скопирован."}
        </p>
      )}
    </div>
  );
}
