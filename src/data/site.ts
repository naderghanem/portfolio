export const profile = {
  name: "Nader Ghanem",
  role: "Backend Software Engineer",
  location: "Apeldoorn, Netherlands",
  email: "naderghanem@outlook.com",
  linkedin: "https://www.linkedin.com/in/naderghanem/",
  github: "https://github.com/naderghanem",
  statement:
    "I build the parts of a product nobody sees: the queues, APIs and data flows that have to keep running.",
  intro: [
    "Backend engineer on systems where failure is expensive, a European SaaS platform, a high-volume logistics operation. PHP and Symfony are where I've gone deepest, with production work in Python and JavaScript alongside it. The problems that take the time are the same in any language: queues that recover, queries that hold up under load, and enough observability that someone other than me can find the fault.",
    "I care about clean code and practical solutions over clever ones. I'm a PSM II certified Scrum Master, so I'm comfortable leading technical decisions and unblocking the people around me.",
  ],
};

/* Each item carries either `icon` — a Simple Icons slug, resolved to a path at
   build time — or `mark`, a short lettered stand-in. Eleven of these have no
   mark in the set: AWS and OpenAI were withdrawn over trademark requests, and
   the Grafana satellites, the PHP test runners and plain SQL never had one. */
type StackItem = { name: string; icon?: string; mark?: string };

export const stack: { layer: string; items: StackItem[] }[] = [
  {
    layer: "Languages",
    items: [
      { name: "PHP", icon: "php" },
      { name: "SQL", mark: "SQL" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    layer: "Frameworks",
    items: [
      { name: "Symfony", icon: "symfony" },
      { name: "Laravel", icon: "laravel" },
      { name: "Doctrine ORM", icon: "doctrine" },
    ],
  },
  {
    layer: "Frontend",
    items: [
      { name: "Vue.js", icon: "vuedotjs" },
      { name: "Inertia.js", icon: "inertia" },
      { name: "Angular", icon: "angular" },
    ],
  },
  {
    layer: "Data",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    layer: "Messaging",
    items: [
      { name: "RabbitMQ", icon: "rabbitmq" },
      // A Symfony component, so it carries the Symfony mark on purpose.
      { name: "Symfony Messenger", icon: "symfony" },
    ],
  },
  {
    layer: "Infrastructure",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "CircleCI", icon: "circleci" },
      { name: "AWS Lambda", mark: "AWS" },
    ],
  },
  {
    layer: "Observability",
    items: [
      { name: "Grafana", icon: "grafana" },
      { name: "Loki", mark: "LK" },
      { name: "Mimir", mark: "MM" },
      { name: "CloudWatch", mark: "CW" },
    ],
  },
  {
    layer: "Storage",
    items: [
      { name: "MinIO", icon: "minio" },
      { name: "S3", mark: "S3" },
    ],
  },
  {
    layer: "Testing",
    items: [
      { name: "Pest", mark: "PT" },
      { name: "PHPUnit", mark: "PU" },
      { name: "Zenstruck Foundry", mark: "ZF" },
    ],
  },
  {
    layer: "AI",
    items: [
      { name: "OpenAI API", mark: "AI" },
      { name: "LangChain", icon: "langchain" },
      { name: "Prompt engineering", mark: "PE" },
    ],
  },
];

export const roles = [
  {
    company: "Awaretrain",
    // Decimal years, for the hero axis.
    from: 2023.67,
    to: 2026.75,
    title: "Software Engineer",
    place: "Nijmegen",
    start: 2023,
    end: null,
    period: "Sep 2023 — present",
    summary:
      "SaaS platform for security awareness training and phishing simulation, used by companies across Europe.",
  },
  {
    company: "CEVA Logistics",
    // Decimal years, for the hero axis.
    from: 2021.50,
    to: 2023.50,
    title: "Software Engineer",
    place: "Waalwijk",
    start: 2021,
    end: 2023,
    period: "Jul 2021 — Jul 2023",
    summary: "High-volume logistics platform where a slow query is a delayed shipment.",
  },
  {
    company: "GIMtransfer",
    // Decimal years, for the hero axis.
    from: 2020.00,
    to: 2021.00,
    title: "Web Developer",
    place: "Arnhem",
    start: 2020,
    end: 2021,
    period: "Jan 2020 — Jan 2021",
    summary: "Web platforms glued to a set of older internal services.",
  },
  {
    company: "DATABIZ",
    // Decimal years, for the hero axis.
    from: 2019.58,
    to: 2019.92,
    title: "Python Developer",
    place: "Tunisia",
    start: 2019,
    end: 2019,
    period: "Aug 2019 — Dec 2019",
    summary: "Data collection at scale from public sources.",
  },
  {
    company: "CIEG+",
    // Decimal years, for the hero axis.
    from: 2016.42,
    to: 2019.50,
    title: "Full-stack Web Developer",
    place: "Tunisia",
    start: 2016,
    end: 2019,
    period: "Jun 2016 — Jul 2019",
    summary: "Where the PHP and Symfony started.",
  },
];

export const credentials = [
  {
    title: "Professional Scrum Master II",
    issuer: "Scrum.org",
    note: "PSM II, advanced Scrum Master certification covering servant leadership, team dynamics and evidence-based delivery.",
    url: "https://www.credly.com/badges/48b66abc-ca64-40b6-90ad-9607a902c6c7/public_url",
  },
];

export const education = [
  {
    title: "MSc, Big Data Science",
    school: "Central University, Tunis",
    period: "2019 — 2021",
  },
  {
    title: "BSc, Computer Science",
    school: "University of Tunis El Manar",
    period: "2011 — 2014",
  },
];

export const languages = ["English", "French", "Dutch", "Arabic"];
