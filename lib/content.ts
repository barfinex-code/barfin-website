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
  nav: { label: string; company: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    action: string;
    scroll: string;
    imageAlt: string;
  };
  manifest: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    imageAlt: string;
  };
  contact: ContactCopy;
  footer: { descriptor: string; registration: string; location: string };
};

export const content: Record<Locale, Copy> = {
  kk: {
    skip: "Негізгі мазмұнға өту",
    nav: { label: "Негізгі навигация", company: "Біз туралы", contact: "Байланыс" },
    hero: {
      eyebrow: "Астанада жасалған · Болашаққа арналған",
      title: "Біз мүмкін еместі жасаймыз.",
      titleAccent: "Және оны жүйелі етеміз.",
      body: "Өзімізді дамытамыз. Өнімдерді дамытамыз. Адамзатты алға жылжытамыз.",
      action: "Әңгіме бастау",
      scroll: "Әрі қарай",
      imageAlt: "Қараңғылықтағы алтын және көгілдір технологиялық архитектура",
    },
    manifest: {
      eyebrow: "Ниет",
      title: "Болашақ алдымен ғажайып сияқты көрінеді.",
      body: "Barfin Network Limited идея мен шындықтың арасында технология жасайды.",
      note: "Қалғанын бірге ашамыз.",
      imageAlt: "Мөлдір есептеу қабаттарынан құралған технологиялық жүйе",
    },
    contact: {
      eyebrow: "Байланыс",
      title: "Сізде идея бар ма?",
      body: "Бізге аздап айтыңыз. Келесі қадамды бірге табамыз.",
      name: "Атыңыз",
      namePlaceholder: "Атыңызды енгізіңіз",
      contact: "Қалай байланысқан дұрыс",
      contactPlaceholder: "Телефон, Telegram немесе басқа байланыс",
      message: "Бірнеше сөз",
      messagePlaceholder: "Не жасағыңыз келеді?",
      action: "Жіберу",
      sending: "Жіберілуде…",
      success: "Хабарлама жіберілді. Жақын арада байланысамыз.",
      error: "Хабарлама жіберілмеді. Кейінірек қайталап көріңіз.",
      rateLimited: "Сұраулар тым жиі. Бір минуттан кейін қайталап көріңіз.",
      response: "Әдетте 1–2 жұмыс күнінде жауап береміз",
    },
    footer: { descriptor: "Болашақты жақындатамыз.", registration: "БСН 221040900321", location: "Астана, Қазақстан" },
  },
  ru: {
    skip: "Перейти к содержанию",
    nav: { label: "Основная навигация", company: "О нас", contact: "Связаться" },
    hero: {
      eyebrow: "Создано в Астане · Для будущего",
      title: "Создаём невозможное.",
      titleAccent: "И превращаем в системное.",
      body: "Развиваемся сами. Развиваем продукты. Двигаем человечество вперёд.",
      action: "Начать разговор",
      scroll: "Дальше",
      imageAlt: "Золотая и голубая технологическая архитектура в темноте",
    },
    manifest: {
      eyebrow: "Намерение",
      title: "Будущее сначала выглядит как чудо.",
      body: "Barfin Network Limited создаёт технологии между идеей и реальностью.",
      note: "Остальное откроем вместе.",
      imageAlt: "Технологическая система из прозрачных вычислительных слоёв",
    },
    contact: {
      eyebrow: "Контакт",
      title: "Есть идея?",
      body: "Расскажите немного. Вместе найдём следующий шаг.",
      name: "Ваше имя",
      namePlaceholder: "Как к вам обращаться",
      contact: "Как с вами связаться",
      contactPlaceholder: "Телефон, Telegram или другой контакт",
      message: "Пара слов",
      messagePlaceholder: "Что вы хотите создать?",
      action: "Отправить",
      sending: "Отправляем…",
      success: "Сообщение отправлено. Скоро свяжемся.",
      error: "Не удалось отправить. Попробуйте позже.",
      rateLimited: "Слишком много запросов. Попробуйте через минуту.",
      response: "Обычно отвечаем за 1–2 рабочих дня",
    },
    footer: { descriptor: "Приближаем будущее.", registration: "БИН 221040900321", location: "Астана, Казахстан" },
  },
  en: {
    skip: "Skip to content",
    nav: { label: "Primary navigation", company: "About", contact: "Contact" },
    hero: {
      eyebrow: "Made in Astana · Built for what comes next",
      title: "We create the impossible.",
      titleAccent: "And make it systemic.",
      body: "We evolve ourselves. We evolve products. We move humanity forward.",
      action: "Start a conversation",
      scroll: "Explore",
      imageAlt: "Golden and cyan computational architecture in darkness",
    },
    manifest: {
      eyebrow: "Intent",
      title: "The future looks like magic at first.",
      body: "Barfin Network Limited builds technology between an idea and reality.",
      note: "We will discover the rest together.",
      imageAlt: "A technological system built from translucent computing layers",
    },
    contact: {
      eyebrow: "Contact",
      title: "Have an idea?",
      body: "Tell us a little. We will find the next step together.",
      name: "Your name",
      namePlaceholder: "How should we address you?",
      contact: "How to reach you",
      contactPlaceholder: "Phone, Telegram, or another contact",
      message: "A few words",
      messagePlaceholder: "What do you want to create?",
      action: "Send",
      sending: "Sending…",
      success: "Message sent. We will be in touch soon.",
      error: "Could not send. Please try again later.",
      rateLimited: "Too many requests. Please try again in a minute.",
      response: "We usually reply within 1–2 business days",
    },
    footer: { descriptor: "Bringing the future closer.", registration: "BIN 221040900321", location: "Astana, Kazakhstan" },
  },
};

// Preserve the old import surface while keeping metadata in one source.
export { metadataFor } from "./seo";
