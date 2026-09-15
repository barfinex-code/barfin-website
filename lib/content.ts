import type { Metadata } from "next";

export type Locale = "kk" | "ru" | "en";

export type ContactCopy = {
  eyebrow: string;
  title: string;
  body: string;
  name: string;
  namePlaceholder: string;
  contact: string;
  contactPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  action: string;
  sending: string;
  success: string;
  error: string;
  rateLimited: string;
  response: string;
};

type Copy = {
  skip: string;
  nav: { services: string; method: string; company: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    primary: string;
    secondary: string;
    systemLabel: string;
    live: string;
    telemetry: [string, string][];
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    items: { number: string; title: string; body: string; tags: string[] }[];
  };
  method: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { number: string; title: string; body: string }[];
  };
  company: {
    eyebrow: string;
    quote: string;
    body: string;
    facts: { value: string; label: string }[];
  };
  contact: ContactCopy;
  footer: { descriptor: string; registration: string; location: string };
};

export const content: Record<Locale, Copy> = {
  kk: {
    skip: "Негізгі мазмұнға өту",
    nav: {
      services: "Қызметтер",
      method: "Тәсіл",
      company: "Компания",
      contact: "Байланыс",
    },
    hero: {
      eyebrow: "Қазақстанда жасалған · Жаһанға арналған",
      title: "Идеяны сенімді",
      titleAccent: "цифрлық жүйеге айналдырамыз.",
      body: "Barfin Network Limited бизнеске арналған бағдарламалық жасақтаманы жобалайды, әзірлейді және іске қосады — өнім стратегиясынан тұрақты өндірістік инфрақұрылымға дейін.",
      primary: "Жобаны талқылау",
      secondary: "Біздің тәсіл",
      systemLabel: "BARFIN · DIGITAL CORE",
      live: "ЖҮЙЕ ҚАЛЫПТЫ",
      telemetry: [
        ["Бағыт", "Software engineering"],
        ["Орналасу", "Astana · KZ"],
        ["Жұмыс форматы", "End-to-end"],
      ],
    },
    services: {
      eyebrow: "01 · Құзыреттер",
      title: "Өнімнің бүкіл өмірлік циклі — бір инженерлік командада.",
      body: "Біз интерфейсті, серверлік логиканы және инфрақұрылымды біртұтас жүйе ретінде құрып, оны нақты бизнес міндетіне бағындырамыз.",
      items: [
        {
          number: "01",
          title: "Web және mobile өнімдер",
          body: "Жылдам, қолжетімді және масштабтауға дайын интерфейстер. Прототиптен App Store мен Google Play-дегі жұмыс істейтін өнімге дейін.",
          tags: ["Web apps", "iOS / Android", "Product UI"],
        },
        {
          number: "02",
          title: "Backend және API",
          body: "Қауіпсіз авторизация, деректер модельдері, интеграциялар және бизнес ережелері — бақыланатын әрі құжатталған архитектурада.",
          tags: ["API", "Auth", "Data"],
        },
        {
          number: "03",
          title: "Cloud және операциялар",
          body: "Автоматты жеткізу, мониторинг және өндірістік ортаны басқару. Жүйе іске қосылғаннан кейін де тұрақты жұмыс істеуі тиіс.",
          tags: ["Cloud", "CI/CD", "Observability"],
        },
      ],
    },
    method: {
      eyebrow: "02 · Жұмыс тәсілі",
      title: "Айқындықты жоғалтпай, күрделі жүйелер жасаймыз.",
      body: "Әр кезең нақты шешіммен, өлшенетін нәтижемен және келесі қадамға дайын жүйемен аяқталады.",
      steps: [
        { number: "01", title: "Мәселені түсіну", body: "Мақсатты, пайдаланушыны және шектеулерді анықтаймыз." },
        { number: "02", title: "Архитектура", body: "Өнім құрылымын, деректерді және тәуекелдерді жобалаймыз." },
        { number: "03", title: "Жеткізу", body: "Қысқа циклдермен әзірлеп, тексеріп, production-ға шығарамыз." },
        { number: "04", title: "Даму", body: "Метрикаларға сүйеніп, тұрақтылық пен мүмкіндіктерді арттырамыз." },
      ],
    },
    company: {
      eyebrow: "03 · Компания",
      quote: "Бағдарлама тек іске қосылып қана қоймай, бизнес өскен сайын сенімді жұмыс істеуі керек.",
      body: "Barfin Network Limited — Астанада тіркелген технологиялық компания. Біз өнімдік ойлауды терең инженериямен біріктіріп, ұзақ мерзімге есептелген цифрлық өнімдер жасаймыз.",
      facts: [
        { value: "2022", label: "Құрылған жыл" },
        { value: "Astana", label: "Штаб-пәтер" },
        { value: "3 тіл", label: "Қазақ · Русский · English" },
      ],
    },
    contact: {
      eyebrow: "04 · Байланыс",
      title: "Келесі өнімді бірге жасайық.",
      body: "Міндетіңізді қысқаша сипаттаңыз. Біз контекстті зерттеп, орынды келесі қадамды ұсынамыз.",
      name: "Атыңыз",
      namePlaceholder: "Атыңызды енгізіңіз",
      contact: "Қалай байланысқан дұрыс",
      contactPlaceholder: "Телефон, Telegram немесе басқа байланыс",
      message: "Жоба туралы",
      messagePlaceholder: "Міндет, мерзім және күтілетін нәтиже туралы қысқаша жазыңыз",
      action: "Хабарлама жіберу",
      sending: "Жіберілуде…",
      success: "Хабарлама жіберілді. Жақын арада сізбен байланысамыз.",
      error: "Хабарлама жіберілмеді. Сәл кейінірек қайталап көріңіз.",
      rateLimited: "Сұраулар тым жиі жіберілуде. Бір минуттан кейін қайталап көріңіз.",
      response: "Жауап: 1–2 жұмыс күні",
    },
    footer: {
      descriptor: "Software systems for meaningful progress.",
      registration: "БСН 221040900321",
      location: "Астана, Қазақстан",
    },
  },
  ru: {
    skip: "Перейти к содержанию",
    nav: { services: "Услуги", method: "Подход", company: "Компания", contact: "Контакты" },
    hero: {
      eyebrow: "Создано в Казахстане · Для глобального рынка",
      title: "Превращаем идеи в",
      titleAccent: "надёжные цифровые системы.",
      body: "Barfin Network Limited проектирует, разрабатывает и запускает программное обеспечение для бизнеса — от продуктовой стратегии до устойчивой production-инфраструктуры.",
      primary: "Обсудить проект",
      secondary: "Наш подход",
      systemLabel: "BARFIN · DIGITAL CORE",
      live: "СИСТЕМА В НОРМЕ",
      telemetry: [
        ["Направление", "Software engineering"],
        ["Локация", "Astana · KZ"],
        ["Формат работы", "End-to-end"],
      ],
    },
    services: {
      eyebrow: "01 · Компетенции",
      title: "Весь жизненный цикл продукта — в одной инженерной команде.",
      body: "Мы создаём интерфейс, серверную логику и инфраструктуру как единую систему, подчинённую реальной задаче бизнеса.",
      items: [
        { number: "01", title: "Web и mobile продукты", body: "Быстрые, доступные и готовые к росту интерфейсы. От прототипа до рабочего продукта в App Store и Google Play.", tags: ["Web apps", "iOS / Android", "Product UI"] },
        { number: "02", title: "Backend и API", body: "Безопасная авторизация, модели данных, интеграции и бизнес-правила в наблюдаемой, документированной архитектуре.", tags: ["API", "Auth", "Data"] },
        { number: "03", title: "Cloud и эксплуатация", body: "Автоматическая доставка, мониторинг и управление production-средой. Система должна оставаться надёжной после запуска.", tags: ["Cloud", "CI/CD", "Observability"] },
      ],
    },
    method: {
      eyebrow: "02 · Метод",
      title: "Создаём сложные системы, сохраняя ясность.",
      body: "Каждый этап заканчивается конкретным решением, проверяемым результатом и системой, готовой к следующему шагу.",
      steps: [
        { number: "01", title: "Понимание задачи", body: "Определяем цель, пользователя и реальные ограничения." },
        { number: "02", title: "Архитектура", body: "Проектируем структуру продукта, данные и управление рисками." },
        { number: "03", title: "Поставка", body: "Разрабатываем короткими циклами, проверяем и выводим в production." },
        { number: "04", title: "Развитие", body: "Улучшаем надёжность и возможности, опираясь на метрики." },
      ],
    },
    company: {
      eyebrow: "03 · Компания",
      quote: "Программа должна не просто запуститься, а надёжно работать по мере роста бизнеса.",
      body: "Barfin Network Limited — технологическая компания, зарегистрированная в Астане. Мы соединяем продуктовое мышление с глубокой инженерией и создаём цифровые продукты с расчётом на долгую дистанцию.",
      facts: [
        { value: "2022", label: "Год основания" },
        { value: "Astana", label: "Штаб-квартира" },
        { value: "3 языка", label: "Қазақ · Русский · English" },
      ],
    },
    contact: {
      eyebrow: "04 · Контакты",
      title: "Давайте создадим следующий продукт вместе.",
      body: "Коротко опишите задачу. Мы изучим контекст и предложим содержательный следующий шаг.",
      name: "Ваше имя",
      namePlaceholder: "Как к вам обращаться",
      contact: "Как с вами связаться",
      contactPlaceholder: "Телефон, Telegram или другой контакт",
      message: "О проекте",
      messagePlaceholder: "Коротко опишите задачу, сроки и ожидаемый результат",
      action: "Отправить сообщение",
      sending: "Отправляем…",
      success: "Сообщение отправлено. Мы скоро свяжемся с вами.",
      error: "Не удалось отправить сообщение. Попробуйте ещё раз позже.",
      rateLimited: "Слишком много запросов. Попробуйте ещё раз через минуту.",
      response: "Ответим за 1–2 рабочих дня",
    },
    footer: { descriptor: "Software systems for meaningful progress.", registration: "БИН 221040900321", location: "Астана, Казахстан" },
  },
  en: {
    skip: "Skip to content",
    nav: { services: "Services", method: "Method", company: "Company", contact: "Contact" },
    hero: {
      eyebrow: "Built in Kazakhstan · Designed for the world",
      title: "We turn ideas into",
      titleAccent: "dependable digital systems.",
      body: "Barfin Network Limited designs, builds and launches software for businesses — from product strategy to resilient production infrastructure.",
      primary: "Discuss a project",
      secondary: "Our method",
      systemLabel: "BARFIN · DIGITAL CORE",
      live: "SYSTEM NOMINAL",
      telemetry: [
        ["Discipline", "Software engineering"],
        ["Location", "Astana · KZ"],
        ["Delivery", "End-to-end"],
      ],
    },
    services: {
      eyebrow: "01 · Capabilities",
      title: "One engineering team for the complete product lifecycle.",
      body: "We build the interface, application logic and infrastructure as one coherent system aligned with a real business outcome.",
      items: [
        { number: "01", title: "Web & mobile products", body: "Fast, accessible interfaces designed to grow. From first prototype to a production product in the App Store and Google Play.", tags: ["Web apps", "iOS / Android", "Product UI"] },
        { number: "02", title: "Backend & APIs", body: "Secure identity, data models, integrations and business logic in an observable, well-documented architecture.", tags: ["API", "Auth", "Data"] },
        { number: "03", title: "Cloud & operations", body: "Automated delivery, monitoring and production environment management. Reliability continues well beyond launch.", tags: ["Cloud", "CI/CD", "Observability"] },
      ],
    },
    method: {
      eyebrow: "02 · Method",
      title: "Complex systems, built without losing clarity.",
      body: "Every phase ends with a decision, a verifiable outcome and a system ready for the next step.",
      steps: [
        { number: "01", title: "Frame the problem", body: "We define the outcome, the user and the real constraints." },
        { number: "02", title: "Design the system", body: "We map product structure, data and risk before complexity grows." },
        { number: "03", title: "Ship deliberately", body: "We build in short cycles, verify continuously and deploy to production." },
        { number: "04", title: "Evolve", body: "We improve reliability and capability using evidence from real operation." },
      ],
    },
    company: {
      eyebrow: "03 · Company",
      quote: "Software should not merely launch. It should remain dependable as the business grows.",
      body: "Barfin Network Limited is a technology company registered in Astana. We combine product thinking with deep engineering to build digital products for the long term.",
      facts: [
        { value: "2022", label: "Established" },
        { value: "Astana", label: "Headquarters" },
        { value: "3 languages", label: "Қазақ · Русский · English" },
      ],
    },
    contact: {
      eyebrow: "04 · Contact",
      title: "Let’s build what comes next.",
      body: "Tell us briefly what you are working on. We will study the context and suggest a useful next step.",
      name: "Your name",
      namePlaceholder: "How should we address you?",
      contact: "How to reach you",
      contactPlaceholder: "Phone, Telegram, or another contact",
      message: "About the project",
      messagePlaceholder: "Briefly describe the challenge, timing, and expected outcome",
      action: "Send message",
      sending: "Sending…",
      success: "Message sent. We will get back to you shortly.",
      error: "We could not send your message. Please try again later.",
      rateLimited: "Too many requests. Please try again in a minute.",
      response: "Response within 1–2 business days",
    },
    footer: { descriptor: "Software systems for meaningful progress.", registration: "BIN 221040900321", location: "Astana, Kazakhstan" },
  },
};

const pageMeta: Record<Locale, { title: string; description: string }> = {
  kk: {
    title: "Бағдарламалық жасақтама әзірлеу",
    description: "Barfin Network Limited: бизнеске арналған web, mobile, backend және cloud жүйелерін жобалау және әзірлеу.",
  },
  ru: {
    title: "Разработка программного обеспечения",
    description: "Barfin Network Limited: проектирование и разработка web, mobile, backend и cloud-систем для бизнеса.",
  },
  en: {
    title: "Software engineering",
    description: "Barfin Network Limited designs and builds web, mobile, backend and cloud systems for businesses.",
  },
};

export function metadataFor(locale: Locale, path: string): Metadata {
  const meta = pageMeta[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: { kk: "/", ru: "/ru", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: `${meta.title} · Barfin Network Limited`,
      description: meta.description,
      url: path,
      locale: locale === "kk" ? "kk_KZ" : locale === "ru" ? "ru_RU" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
