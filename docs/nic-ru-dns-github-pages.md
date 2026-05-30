# Настройка DNS в Nic.ru для beeff.ru (GitHub Pages)

Домен **beeff.ru** на [Nic.ru](https://www.nic.ru/) нужно направить на **GitHub Pages**. Сертификат HTTPS выдаёт GitHub (Let's Encrypt); в Nic.ru отдельно HTTPS покупать не нужно.

Сайт в репозитории: [bormotovilya-ops/beeff](https://github.com/bormotovilya-ops/beeff)

---

## Шаг 0. Проверьте, что домен на DNS Nic.ru

1. Зайдите на [nic.ru](https://www.nic.ru/) → **Войти** → личный кабинет.
2. Откройте домен **beeff.ru**.
3. Раздел **DNS-серверы** (или «Делегирование»): должны быть серверы RU-CENTER, например:
   - `ns1.nic.ru`
   - `ns2.nic.ru`

   (или `ns3-l2.nic.ru` и т.п. — главное, не чужие NS вроде Cloudflare, если DNS не переносили туда.)

Если DNS ведётся не в Nic.ru — записи ниже добавляют там, где сейчас указаны NS.

---

## Шаг 1. Откройте редактор DNS

1. **Услуги** (или **Активные услуги**).
2. **DNS-хостинг** → **Управление DNS-зонами**.
3. Выберите **beeff.ru** (если домена нет в списке — **Добавить домен** → `beeff.ru`).
4. Откроется список **Ресурсные записи**.

Если пункта «DNS-хостинг» нет — подключите **DNS-хостинг** / **DNS-master** для домена (часто входит в регистрацию).

---

## Шаг 2. Удалите лишнее (если есть)

Проверьте старые записи для сайта:

- **A** на `@` или `www` с IP хостинга Nic.ru / другого сервера — **удалите**, если сайт только на GitHub.
- **CNAME** на `www`, если ведёт не на GitHub — уберите или замените.

**Не трогайте** записи **MX** (почта), если почта на `@beeff.ru` уже настроена.

---

## Шаг 3. Добавьте записи для GitHub Pages

Нажимайте **«Добавить новую запись»** для каждой строки ниже.

### 1) Поддомен `www` — одна запись CNAME

| Поле | Значение |
|------|----------|
| **Type** | `CNAME` |
| **Alias** / **Name** | `www` |
| **Canonical name** | `bormotovilya-ops.github.io.` |

В конце **обязательно точка**: `bormotovilya-ops.github.io.` — так требует Nic.ru.

TTL: по умолчанию (например `3600`) или `300` для быстрого обновления.

### 2) Корень `beeff.ru` — четыре записи A

Добавьте **4 отдельные** записи типа **A**:

| Type | Name | IP address |
|------|------|------------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

В Nic.ru поле имени может называться **Name** = `@` или пусто — для корневого домена.

---

## Шаг 4. Сохраните зону (обязательно)

После всех записей нажмите **«Выгрузить зону»** (или **«Применить»** / **«Сохранить»**).

Без **выгрузки зоны** в Nic.ru изменения часто **не начинают работать**.

---

## Итог в Nic.ru

| Тип | Имя | Куда |
|-----|-----|------|
| CNAME | `www` | `bormotovilya-ops.github.io.` |
| A | `@` | 4 IP GitHub (см. таблицу выше) |

---

## После Nic.ru (на GitHub)

1. Репозиторий **beeff** → **Settings** → **Pages**.
2. **Custom domain** → `beeff.ru` или `www.beeff.ru` (тот же, что основной в DNS).
3. Дождаться проверки DNS (зелёная галочка).
4. Включить **Enforce HTTPS**, когда станет доступно.
5. Источник деплоя: **GitHub Actions** (не «Deploy from a branch»).

### Изменения в коде проекта

Для своего домена (не `github.io/beeff/`):

- В `vite.config.ts`: `base: "/"` (не `"/beeff/"`).
- Файл `public/CNAME` с одной строкой: `beeff.ru` или `www.beeff.ru`.
- Push в `master` → дождаться workflow **Deploy to GitHub Pages**.

---

## Проверка DNS

Обновление: от 15–60 минут, иногда до 24–48 часов.

Проверка CNAME для www: [whatsmydns.net — CNAME www.beeff.ru](https://www.whatsmydns.net/#CNAME/www.beeff.ru)

---

## Справка по полям Nic.ru

| Поле в панели | Значение |
|---------------|----------|
| **Alias** | поддомен (`www`) |
| **Canonical name** | `bormotovilya-ops.github.io.` |
| **Name** `@` | корень домена `beeff.ru` |

---

## Полезные ссылки

- [GitHub: настройка пользовательского домена для Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: apex-домен (A-записи)](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
