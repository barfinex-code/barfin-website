import type { Locale } from "./content";

export type Project = {
  id: "barfinex" | "banibanani";
  name: string;
  category: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  note?: string;
};

type Overview = {
  nav: { label: string; focus: string; projects: string; approach: string; contact: string };
  focus: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: { title: string; body: string }[];
  };
  projects: { eyebrow: string; title: string; intro: string; items: Project[] };
  approach: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { title: string; body: string }[];
    invitation: string;
    action: string;
  };
};

// Public, high-level descriptions only. No private architecture, commercial
// metrics, store-availability claims or promises about investment returns.
export const overview: Record<Locale, Overview> = {
  ru: {
    nav: { label: "Разделы о компании", focus: "Направления", projects: "Проекты", approach: "Подход", contact: "Связаться" },
    focus: {
      eyebrow: "Что мы создаём",
      title: "Цифровые продукты. Системный подход.",
      intro: "Barfin Network Limited — технологическая компания из Астаны, Казахстан. Мы развиваем цифровые продукты на пересечении искусственного интеллекта, финансовых технологий и образования. Соединяем исследование, разработку программного обеспечения и автоматизацию, чтобы сложные идеи становились понятными инструментами.",
      cards: [
        { title: "Искусственный интеллект и автоматизация", body: "Исследуем, как ИИ помогает работать с информацией, проверять гипотезы и сокращать рутинные действия. Встраиваем интеллектуальные инструменты в продуктовые процессы, сохраняя возможность проверить результат и управлять решением." },
        { title: "Финтех и работа с данными", body: "Развиваем инструменты для рыночных данных, алгоритмических исследований и поддержки решений. Наш фокус — связать информацию, аналитику и автоматизацию в систему, где важны контекст, проверяемость и контроль рисков." },
        { title: "Цифровое образование", body: "Создаём образовательные продукты, в которых обучение начинается с любопытства. Соединяем истории, игровые задания и понятные интерфейсы, чтобы знакомство с новыми знаниями было увлекательным для детей и удобным для семьи." },
      ],
    },
    projects: {
      eyebrow: "Наши проекты",
      title: "Идеи обретают форму.",
      intro: "Разные задачи — общий принцип: технология должна становиться полезным продуктом. Эти направления развиваются в проектах Barfinex и BaniBanani.",
      items: [
        { id: "barfinex", name: "Barfinex", category: "Финтех · Данные · Автоматизация", title: "От рыночных данных к осмысленным решениям.", body: "Экосистема для алгоритмических исследований и торговой инфраструктуры. Barfinex объединяет работу с рыночными данными, анализ сигналов, поддержку решений и контроль рисков. Для разработчиков и команд, которым важен прозрачный путь от гипотезы к проверке.", href: "https://barfinex.com/", linkLabel: "Подробнее о Barfinex", note: "Информационные и технологические инструменты, а не инвестиционная рекомендация. Торговля связана с риском; доходность не гарантируется." },
        { id: "banibanani", name: "BaniBanani", category: "Образование · Истории · Игра", title: "Большие открытия начинаются с любопытства.", body: "Образовательный проект для детей и родителей: математика, логика, чтение и знакомство с окружающим миром через игру и добрые истории. На сайте можно познакомиться с Бани, прочитать иллюстрированные истории на разных языках и попробовать мини-урок.", href: "https://banibanani.com/ru", linkLabel: "Открыть мир BaniBanani" },
      ],
    },
    approach: {
      eyebrow: "Как мы мыслим",
      title: "Не просто запустить. Дать идее продолжение.",
      body: "Для нас продукт — это не отдельная функция и не красивый прототип. Это связь между задачей человека, удобным взаимодействием и технологической основой, которую можно развивать. Поэтому мы смотрим на весь путь: от первого вопроса до следующих версий.",
      steps: [
        { title: "Понять задачу", body: "Начинаем с того, кому нужен продукт и какую проблему он должен решить. Отделяем полезную идею от технологии ради технологии." },
        { title: "Проверить на практике", body: "Переводим гипотезу в прототип, проверяем сценарии и уточняем решение. Смотрим не только на возможности, но и на ограничения." },
        { title: "Развивать системно", body: "Соединяем веб- и мобильные интерфейсы, данные и автоматизацию. Уделяем внимание качеству, понятности и дальнейшему развитию продукта." },
      ],
      invitation: "Развиваете цифровой продукт, исследуете применение ИИ или ищете технологического партнёра? Начнём с задачи, которую стоит решить.",
      action: "Обсудить идею",
    },
  },
  en: {
    nav: { label: "About the company", focus: "Focus", projects: "Projects", approach: "Approach", contact: "Contact" },
    focus: {
      eyebrow: "What we build",
      title: "Digital products. A systemic approach.",
      intro: "Barfin Network Limited is a technology company based in Astana, Kazakhstan. We develop digital products at the intersection of artificial intelligence, financial technology and education. We bring research, software development and automation together to turn complex ideas into tools people can understand and use.",
      cards: [
        { title: "Artificial intelligence and automation", body: "We explore how AI can help people work with information, test ideas and reduce repetitive tasks. We integrate intelligent tools into product workflows while keeping results open to review and decisions under human control." },
        { title: "Fintech and data", body: "We develop tools for market data, algorithmic research and decision support. Our focus is on connecting information, analytics and automation in systems where context, traceability and risk controls matter." },
        { title: "Digital education", body: "We create educational products that begin with curiosity. Stories, playful activities and clear interfaces come together to make discovering new ideas engaging for children and approachable for families." },
      ],
    },
    projects: {
      eyebrow: "Our projects",
      title: "Ideas taking shape.",
      intro: "Different challenges, one shared principle: technology should become a useful product. We put these ideas into practice through Barfinex and BaniBanani.",
      items: [
        { id: "barfinex", name: "Barfinex", category: "Fintech · Data · Automation", title: "From market data to informed decisions.", body: "An ecosystem for algorithmic research and trading infrastructure. Barfinex brings market data, signal analysis, decision support and risk controls together. It is built for developers and teams who need a traceable path from a hypothesis to its evaluation.", href: "https://barfinex.com/", linkLabel: "Explore Barfinex", note: "Information and technology tools, not investment advice. Trading involves risk; returns are not guaranteed." },
        { id: "banibanani", name: "BaniBanani", category: "Education · Stories · Play", title: "Big discoveries begin with curiosity.", body: "An educational project for children and parents: mathematics, logic, reading and discovering the world through play and kind-hearted stories. Meet Bani on the website, read illustrated stories in several languages and try a mini lesson.", href: "https://banibanani.com/en", linkLabel: "Discover BaniBanani" },
      ],
    },
    approach: {
      eyebrow: "How we think",
      title: "Beyond the launch. Built to keep evolving.",
      body: "To us, a product is more than a feature or an attractive prototype. It connects a real human need, an accessible experience and a technical foundation that can evolve. That is why we consider the whole journey, from the first question to the versions that come next.",
      steps: [
        { title: "Understand the problem", body: "We start with who the product is for and the problem it should solve. A useful idea comes before technology for its own sake." },
        { title: "Test it in practice", body: "We turn a hypothesis into a prototype, test scenarios and refine the solution. We examine limitations as well as possibilities." },
        { title: "Build for what comes next", body: "We connect web and mobile experiences, data and automation, with attention to quality, clarity and the product's continued development." },
      ],
      invitation: "Developing a digital product, exploring AI or looking for a technology partner? Let us start with a problem worth solving.",
      action: "Discuss an idea",
    },
  },
  kk: {
    nav: { label: "Компания туралы бөлімдер", focus: "Бағыттар", projects: "Жобалар", approach: "Тәсіл", contact: "Байланыс" },
    focus: {
      eyebrow: "Біз не жасаймыз",
      title: "Цифрлық өнімдер. Жүйелі тәсіл.",
      intro: "Barfin Network Limited — Қазақстанның Астана қаласындағы технологиялық компания. Біз жасанды интеллект, қаржы технологиялары және білім беру тоғысындағы цифрлық өнімдерді дамытамыз. Күрделі идеяларды түсінікті құралдарға айналдыру үшін зерттеуді, бағдарламалық жасақтаманы әзірлеуді және автоматтандыруды біріктіреміз.",
      cards: [
        { title: "Жасанды интеллект және автоматтандыру", body: "Жасанды интеллекттің ақпаратпен жұмыс істеуге, болжамдарды тексеруге және қайталанатын әрекеттерді азайтуға қалай көмектесетінін зерттейміз. Нәтижені тексеру мен шешімді адам бақылауында ұстау мүмкіндігін сақтай отырып, интеллектуалды құралдарды өнімнің жұмыс үдерістеріне енгіземіз." },
        { title: "Финтех және деректер", body: "Нарық деректерімен жұмыс істеуге, алгоритмдік зерттеулерге және шешім қабылдауды қолдауға арналған құралдарды дамытамыз. Ақпаратты, талдауды және автоматтандыруды контексті, тексеру мүмкіндігі мен тәуекелді бақылауы бар жүйеге біріктіреміз." },
        { title: "Цифрлық білім беру", body: "Оқуға деген қызығушылықтан басталатын білім беру өнімдерін жасаймыз. Жаңа білімді ашу балалар үшін қызықты, ал отбасы үшін ыңғайлы болуы үшін әңгімелерді, ойын тапсырмаларын және түсінікті интерфейстерді біріктіреміз." },
      ],
    },
    projects: {
      eyebrow: "Біздің жобалар",
      title: "Идеялар іске асады.",
      intro: "Міндеттер әртүрлі, қағида ортақ: технология пайдалы өнімге айналуы керек. Бұл бағыттарды Barfinex және BaniBanani жобаларында дамытамыз.",
      items: [
        { id: "barfinex", name: "Barfinex", category: "Финтех · Деректер · Автоматтандыру", title: "Нарық деректерінен негізделген шешімдерге.", body: "Алгоритмдік зерттеулер мен сауда инфрақұрылымына арналған экожүйе. Barfinex нарық деректерімен жұмысты, сигналдарды талдауды, шешім қабылдауды қолдауды және тәуекелдерді бақылауды біріктіреді. Болжамнан оны тексеруге дейінгі жолдың айқын болуын қалайтын әзірлеушілер мен командаларға арналған.", href: "https://barfinex.com/", linkLabel: "Barfinex туралы толығырақ", note: "Бұл инвестициялық кеңес емес, ақпараттық және технологиялық құралдар. Сауда тәуекелмен байланысты; табысқа кепілдік берілмейді." },
        { id: "banibanani", name: "BaniBanani", category: "Білім · Әңгімелер · Ойын", title: "Үлкен жаңалықтар қызығушылықтан басталады.", body: "Балалар мен ата-аналарға арналған білім беру жобасы: математика, логика, оқу және қоршаған әлемді ойын мен мейірімді әңгімелер арқылы тану. Сайтта Банимен танысып, әртүрлі тілдегі суретті әңгімелерді оқуға және шағын сабақты байқап көруге болады.", href: "https://banibanani.com/en", linkLabel: "BaniBanani әлемін ашу" },
      ],
    },
    approach: {
      eyebrow: "Біздің тәсіл",
      title: "Іске қосумен шектелмейміз. Идеяны дамытамыз.",
      body: "Біз үшін өнім — жеке мүмкіндік немесе әдемі прототип қана емес. Ол адамның қажеттілігін, ыңғайлы өзара әрекеттесуді және дамыта алатын технологиялық негізді байланыстырады. Сондықтан алғашқы сұрақтан бастап кейінгі нұсқаларға дейінгі бүкіл жолды қарастырамыз.",
      steps: [
        { title: "Міндетті түсіну", body: "Өнім кімге қажет және қандай мәселені шешуі керек деген сұрақтардан бастаймыз. Пайдалы идеяны тек технология үшін жасалған шешімнен ажыратамыз." },
        { title: "Іс жүзінде тексеру", body: "Болжамды прототипке айналдырып, сценарийлерді тексереміз және шешімді нақтылаймыз. Мүмкіндіктермен қатар шектеулерге де назар аударамыз." },
        { title: "Жүйелі дамыту", body: "Веб және мобильді интерфейстерді, деректер мен автоматтандыруды біріктіреміз. Өнімнің сапасына, түсініктілігіне және әрі қарай дамуына мән береміз." },
      ],
      invitation: "Цифрлық өнім жасап жүрсіз бе, жасанды интеллект мүмкіндіктерін зерттеп жүрсіз бе, әлде технологиялық серіктес іздеп жүрсіз бе? Шешуге тұрарлық міндеттен бастайық.",
      action: "Идеяны талқылау",
    },
  },
};
