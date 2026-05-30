# Развёртывание Beeff на IIS (Windows Server)

Инструкция для публикации проекта **Beeff** на **Internet Information Services (IIS)** — типичный сценарий для Windows Server в организации или на VPS.

---

## О проекте

| Параметр | Значение |
|----------|----------|
| **Назначение** | Одностраничный сайт (лендинг) компании по внедрению 1С в Перми и Пермском крае |
| **Репозиторий** | [github.com/bormotovilya-ops/beeff](https://github.com/bormotovilya-ops/beeff) |
| **Тип приложения** | SPA с предрендером (SSG): HTML генерируется при сборке |
| **Маршруты** | Одна страница `/` (якорные ссылки `#about`, `#contacts` и т.д.) |

### Стек технологий

| Слой | Технологии |
|------|------------|
| **Язык** | TypeScript 5.x |
| **UI** | React 19, компоненты [shadcn/ui](https://ui.shadcn.com/) на базе Radix UI |
| **Фреймворк** | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| **Сборка** | Vite 7, конфиг [@lovable.dev/vite-tanstack-config](https://www.npmjs.com/package/@lovable.dev/vite-tanstack-config) |
| **Стили** | Tailwind CSS 4 |
| **Данные на клиенте** | TanStack React Query (заготовка; лендинг без API) |
| **Валидация форм** | React Hook Form + Zod (заготовка в UI-компонентах) |
| **Серверная часть (опционально)** | Node.js-модуль SSR в `dist/server` (для IIS обычно **не нужен**) |

### Структура исходников

```
beeff/
├── src/
│   ├── routes/          # Страницы (file-based routing)
│   │   ├── index.tsx    # Главная страница лендинга
│   │   └── __root.tsx   # Оболочка приложения
│   ├── components/ui/   # UI-компоненты (shadcn)
│   ├── server.ts        # Обёртка SSR (для режима с Node.js)
│   └── styles.css
├── public/              # Статические файлы (копируются в сборку)
├── vite.config.ts       # Vite + prerender
├── package.json
└── bun.lock             # Зависимости (Bun); можно собирать и через npm
```

### Что получается после сборки

Команда `bun run build` или `npm run build`:

| Каталог | Назначение | Нужен для IIS (статика) |
|---------|------------|-------------------------|
| **`dist/client/`** | Готовый сайт: `index.html`, CSS, JS | **Да** — копируете только его |
| `dist/server/` | Серверный бандл для SSR / Node | Нет (если не используете прокси на Node) |

В `vite.config.ts` включён **prerender**: маршрут `/` собирается в статический HTML — IIS может отдавать файлы без Node.js.

---

## Какой способ выбрать

| Способ | Когда использовать | Node.js на сервере |
|--------|-------------------|-------------------|
| **A. Статический сайт** (рекомендуется) | Лендинг Beeff, одна страница, без серверных API | Не нужен |
| **B. Обратный прокси на Node.js** | Нужен полный SSR, `createServerFn`, динамика на сервере | Обязателен |

Для текущего Beeff достаточно **способа A**.

---

## Требования

### Сервер

- **ОС:** Windows Server 2016+ или Windows 10/11 Pro (для IIS)
- **IIS:** 10.x с ролью **Web Server (IIS)**
- Компоненты IIS:
  - **Static Content**
  - **Default Document**
  - **HTTP Errors** (по желанию)
  - **URL Rewrite** — для SPA-fallback (рекомендуется установить [модуль URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite))

### Машина сборки (может совпадать с сервером)

- **Node.js** 20 LTS или 22+ **или** [Bun](https://bun.sh/) 1.x
- Git (чтобы клонировать репозиторий)
- 2–4 ГБ RAM на время `npm install` / `bun install`

### Сеть

- Порты **80** (HTTP) и **443** (HTTPS)
- Сертификат SSL (Let's Encrypt через win-acme, корпоративный CA или импорт `.pfx` в IIS)

---

## Способ A: статический сайт на IIS (рекомендуется)

### Шаг 1. Клонирование и зависимости

```powershell
cd C:\inetpub
git clone https://github.com/bormotovilya-ops/beeff.git
cd beeff
```

Установка зависимостей (один из вариантов):

```powershell
# Вариант 1: Bun (как в CI проекта)
bun install --frozen-lockfile

# Вариант 2: npm
npm install
```

### Шаг 2. Базовый путь (`base`) в Vite

В `vite.config.ts` параметр `vite.base` должен совпадать с URL сайта в IIS:

| Сайт в IIS | Значение `base` |
|------------|-----------------|
| Корень домена `https://beeff.ru/` | `"/"` |
| Виртуальный каталог `https://server/beeff/` | `"/beeff/"` |

Пример для корня домена:

```ts
vite: {
  base: "/",
},
```

Сохраните файл перед сборкой.

### Шаг 3. Сборка

```powershell
bun run build
# или
npm run build
```

Проверка:

```powershell
Test-Path .\dist\client\index.html
# Должно вернуть True
```

### Шаг 4. Копирование файлов на сайт

```powershell
$sitePath = "C:\inetpub\wwwroot\beeff"
New-Item -ItemType Directory -Force -Path $sitePath
Copy-Item -Path .\dist\client\* -Destination $sitePath -Recurse -Force
```

При обновлении версии — снова `bun run build` и копирование поверх (или скрипт деплоя ниже).

### Шаг 5. Создание сайта в IIS

1. **Диспетчер служб IIS** → **Сайты** → **Добавить веб-сайт** (или используйте **существующий** сайт `beeff.ru`, если базы 1С уже там).
2. **Имя сайта:** `Beeff` (или текущее имя сайта).
3. **Физический путь:** каталог **только для лендинга** (например `C:\inetpub\wwwroot\beeff`) — содержимое `dist/client`.
4. **Привязка:** хост `beeff.ru` (или IP + порт 80/443).
5. **Пул приложений:** для корня можно **DefaultAppPool** / **No Managed Code** (статика). Для `/ACC` оставьте **тот же пул, что был** у публикации 1С (часто отдельный пул с .NET).

> **Важно:** публикации баз (`/ACC`, `/BUH` и т.д.) не кладите в папку лендинга. Они остаются **отдельными приложениями** IIS со своим физическим каталогом (как сейчас).

### Шаг 5.1. Лендинг и базы 1С на одном домене

Типичная схема на одном сайте `beeff.ru`:

| URL | Что отдаёт | Где в IIS |
|-----|------------|-----------|
| `https://beeff.ru/` | Лендинг Beeff (статика) | Корень сайта |
| `https://beeff.ru/ACC` | Веб-клиент / тонкий клиент 1С (как сейчас) | **Приложение** `/ACC` |
| `https://beeff.ru/ИмяБазы` | Другие опубликованные базы | Отдельные **приложения** |

**Перед деплоем лендинга** в IIS Manager откройте сайт → убедитесь, что `/ACC` есть в дереве как **Application** (значок шестерёнки), а не просто папка.

**После копирования лендинга в корень:**

1. **Не удаляйте** приложение `/ACC` в IIS (это настройка сайта, не только файлы на диске).
2. При `Copy-Item` **не затирайте** каталог, на который указывает `/ACC`, если он лежит внутри корня — лучше физически разделить пути (см. ниже).
3. В `vite.config.ts` для корня домена: `base: "/"` (не `/beeff/`).

**Добавление / проверка приложения `/ACC` (если переносите сайт):**

1. Сайт `beeff.ru` → правый клик → **Add Application…**
2. **Alias:** `ACC` (в URL будет `/ACC`)
3. **Physical path:** каталог публикации 1С (как было: `C:\...\www\ACC` или путь веб-расширения)
4. **Application pool:** тот же, что использовался для 1С раньше (часто с поддержкой .NET)

Повторите для каждой базы (`/BUH`, `/TRADE` и т.д.).

**Структура на диске (рекомендуется):**

```
C:\inetpub\wwwroot\beeff\          ← только лендинг (index.html, assets\)
C:\inetpub\wwwroot\1c\ACC\         ← публикация 1С (пример; путь может быть другим)
```

В IIS: корень сайта → `beeff`, приложение `/ACC` → `C:\inetpub\wwwroot\1c\ACC`.

### Шаг 6. `web.config` (MIME + fallback без захвата `/ACC`)

Корневой `web.config` **не должен** отправлять запросы к `/ACC` на `index.html` лендинга.

Создайте `C:\inetpub\wwwroot\beeff\web.config` (подставьте свои имена баз в список исключений):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
    <defaultDocument>
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>
    <rewrite>
      <rules>
        <!-- SPA fallback только для лендинга; пути баз 1С не трогаем -->
        <rule name="SPA fallback" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <!-- Исключения: опубликованные базы (добавьте свои alias) -->
            <add input="{REQUEST_URI}" pattern="^/ACC(/|$)" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/BUH(/|$)" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

Для каждой базы добавьте строку (замените `ACC` на alias из IIS):

```xml
<add input="{REQUEST_URI}" pattern="^/ИмяБазы(/|$)" negate="true" />
```

Если `/ACC` оформлен как **отдельное Application** в IIS, запросы обычно обрабатываются дочерним приложением до срабатывания правил корня — исключения в `web.config` всё равно рекомендуются как страховка.

**Проверка после деплоя:**

- `https://beeff.ru/` — лендинг Beeff  
- `https://beeff.ru/ACC` — вход в 1С, как раньше  
- `https://beeff.ru/ACC/` — без 404 на `index.html` лендинга  

Для лендинга с одной страницей `/` правило rewrite почти не используется; исключения для `/ACC` обязательны при включённом SPA fallback.

### Шаг 7. HTTPS

1. Привязка сайта → **https**, порт **443**, выберите сертификат.
2. Рекомендуется редирект HTTP → HTTPS (отдельное правило URL Rewrite или настройка **HSTS** на уровне балансировщика).

### Шаг 8. Проверка

- Откройте `https://beeff.ru/` (или ваш хост).
- Убедитесь, что загружаются стили и скрипты (F12 → Network, нет 404 на `/assets/*`).
- Если CSS/JS отдают 404 — проверьте `base` в `vite.config.ts` и пересоберите проект.

---

## Скрипт обновления (PowerShell)

Сохраните как `deploy-iis.ps1` в корне репозитория:

```powershell
param(
  [string]$SitePath = "C:\inetpub\wwwroot\beeff"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (Get-Command bun -ErrorAction SilentlyContinue) {
  bun install --frozen-lockfile
  bun run build
} else {
  npm install
  npm run build
}

if (-not (Test-Path ".\dist\client\index.html")) {
  throw "Сборка не создала dist\client\index.html"
}

New-Item -ItemType Directory -Force -Path $SitePath | Out-Null
Copy-Item -Path .\dist\client\* -Destination $SitePath -Recurse -Force

Write-Host "Готово: файлы скопированы в $SitePath"
```

Запуск от имени администратора (при необходимости):

```powershell
.\deploy-iis.ps1 -SitePath "C:\inetpub\wwwroot\beeff"
```

---

## Способ B: IIS как прокси к Node.js (SSR)

Используйте, если нужны серверные функции TanStack Start (`createServerFn`), динамический SSR без prerender.

### Дополнительно

- **Node.js** 20+ на сервере
- Модуль IIS **Application Request Routing (ARR)** и **URL Rewrite**
- Процесс, держащий Node (служба Windows, PM2, `nssm`)

### Схема

```
Клиент → IIS (443) → reverse proxy → http://127.0.0.1:3000 → Node (dist/server)
```

### Запуск Node (пример)

После `npm run build` уточните команду preview в документации TanStack Start для вашей версии, например:

```powershell
cd C:\apps\beeff
npm run preview
# или node с точкой входа из dist/server — зависит от версии пакетов
```

Порт и команда могут отличаться — проверьте `package.json` и логи сборки.

### Правило прокси в `web.config` (шаблон)

```xml
<rewrite>
  <rules>
    <rule name="ReverseProxyToNode" stopProcessing="true">
      <match url="(.*)" />
      <action type="Rewrite" url="http://127.0.0.1:3000/{R:1}" />
    </rule>
  </rules>
</rewrite>
```

В диспетчере IIS для сервера включите **Proxy** в настройках ARR.

> Для лендинга Beeff режим B избыточен; предпочтителен способ A.

---

## Переменные окружения

| Переменная | Где | Зачем |
|------------|-----|--------|
| `NODE_ENV=production` | Сборка / Node | Режим production |
| `VITE_*` | Только на этапе **сборки** | Публичные настройки для клиента (префикс `VITE_`) |
| `DATABASE_URL`, секреты | Сервер (способ B) | Только если появятся server functions; **не** с префиксом `VITE_` |

Секреты в IIS для Node можно задать через переменные среды пула приложений или службы Windows — не храните их в репозитории.

---

## Частые проблемы

| Симптом | Причина | Решение |
|---------|---------|---------|
| Белая страница, 404 на `/assets/...` | Неверный `base` в `vite.config.ts` | `base: "/"` для корня сайта или `"/имя-папки/"` для виртуального каталога; пересборка |
| 403 Forbidden | Нет прав у `IIS_IUSRS` на папку сайта | Выдать чтение на `C:\inetpub\wwwroot\beeff` |
| 404 на все URL кроме `/` | Нет URL Rewrite / `web.config` | Установить модуль Rewrite, добавить SPA fallback |
| `/ACC` открывает лендинг вместо 1С | SPA fallback перехватывает `/ACC` | Исключения в `web.config`; `/ACC` как Application в IIS |
| После деплоя 1С не работает | Затёрли каталог публикации | Лендинг и 1С — разные физические пути; не копировать dist в папку `/ACC` |
| Старый контент после деплоя | Кэш браузера или CDN | Ctrl+F5; сброс кэша IIS (при необходимости) |
| Сборка падает на Windows | Нет Node/Bun | Установить Node 22 LTS или Bun |
| `npm install` долго / ошибки | Нет lock для npm | Использовать `bun install` или сгенерировать `package-lock.json` |

---

## Сравнение с GitHub Pages

| | GitHub Pages | IIS |
|--|--------------|-----|
| Сборка | GitHub Actions (Bun) | Локально или CI, копирование `dist/client` |
| HTTPS | Let's Encrypt (GitHub) | Сертификат на Windows |
| `base` | `/beeff/` для project pages | `/` для своего домена |
| Node на хостинге | Не нужен | Не нужен (способ A) |

Подробнее про DNS и домен: [nic-ru-dns-github-pages.md](./nic-ru-dns-github-pages.md).

---

## Чеклист развёртывания

- [ ] Установлены IIS, Static Content, URL Rewrite
- [ ] Установлены Node.js или Bun на машине сборки
- [ ] Клонирован репозиторий, выполнен `install` и `build`
- [ ] В `vite.config.ts` задан правильный `base`
- [ ] Содержимое `dist/client` скопировано в каталог сайта IIS
- [ ] Добавлен `web.config` (при необходимости)
- [ ] Настроены привязки 80/443 и сертификат
- [ ] Сайт открывается, стили и скрипты загружаются без 404
- [ ] Приложения `/ACC` (и др. базы) в IIS сохранены, в `web.config` есть исключения
- [ ] `https://beeff.ru/ACC` открывает 1С, корень `/` — лендинг

---

## Полезные ссылки

- [Документация IIS](https://learn.microsoft.com/iis/)
- [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite)
- [TanStack Start — Static Prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- [Vite — Public Base Path](https://vite.dev/config/shared-options.html#base)
