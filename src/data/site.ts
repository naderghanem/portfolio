export const profile = {
  name: "Nader Ghanem",
  role: "Backend Software Engineer",
  location: "Apeldoorn, Netherlands",
  email: "naderghanem@outlook.com",
  linkedin: "https://www.linkedin.com/in/naderghanem/",
  // TODO: replace with your GitHub username, or delete this line to hide the link.
  github: "https://github.com/naderghanem",
  statement:
    "I build the parts of a product nobody sees: the queues, APIs and data flows that have to keep running.",
  intro: [
    "Backend engineer with ten years in the field, most of it in PHP and Symfony, and most of that spent on systems where failure is expensive — a European SaaS platform and a high-volume logistics operation.",
    "I care about clean code and practical solutions over clever ones. I'm a PSM II certified Scrum Master, so I'm comfortable leading technical decisions and unblocking the people around me.",
  ],
};

export const stack = [
  { layer: "Languages", items: ["PHP", "SQL", "JavaScript", "Python"] },
  { layer: "Frameworks", items: ["Symfony", "Laravel", "Doctrine ORM"] },
  { layer: "Frontend", items: ["Vue.js", "Inertia.js", "Angular"] },
  { layer: "Data", items: ["MySQL", "PostgreSQL", "Redis"] },
  { layer: "Messaging", items: ["RabbitMQ", "Symfony Messenger"] },
  { layer: "Infrastructure", items: ["Docker", "Kubernetes", "CircleCI", "AWS Lambda"] },
  { layer: "Observability", items: ["Grafana", "Loki", "Mimir", "CloudWatch"] },
  { layer: "Storage", items: ["MinIO", "S3"] },
  { layer: "Testing", items: ["Pest", "PHPUnit", "Zenstruck Foundry"] },
  { layer: "AI", items: ["OpenAI API", "LangChain", "Prompt engineering"] },
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
    points: [
      "Build and maintain backend services in PHP and Symfony, including REST APIs and Doctrine migrations.",
      "Designed a custom SMTP retry strategy that stops endless retries on permanent failures, cutting queue noise and false alerts.",
      "Led a PDF summary export feature end to end, from planning through release.",
      "Built Grafana and Loki dashboards so the support team can see errors and failures without asking engineering.",
      "Work alongside front-end developers, designers and product managers to ship features people actually use.",
    ],
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
    points: [
      "Built modular backend components in PHP and Symfony for high-volume logistics applications.",
      "Improved SQL queries and data flow, reducing latency in time-sensitive operations.",
      "Worked closely with QA to validate features and catch edge cases before release.",
      "Shipped in an Agile Scrum team with frequent production releases.",
    ],
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
    points: [
      "Integrated third-party APIs into web platforms.",
      "Wrote Python scripts connecting Java-based services to internal database systems.",
      "Handled support tickets and user-reported issues.",
    ],
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
    points: [
      "Built Python applications for web data extraction using Scrapy, Selenium and BeautifulSoup.",
      "Maintained the database systems storing and serving the collected data.",
    ],
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
    points: [
      "Built and maintained web applications in PHP, Symfony, JavaScript and MySQL.",
      "Took part in planning and prototyping new products with the team.",
    ],
  },
];

export const credentials = [
  {
    title: "Professional Scrum Master II",
    issuer: "Scrum.org",
    note: "PSM II — advanced Scrum Master certification covering servant leadership, team dynamics and evidence-based delivery.",
    // TODO: paste your Scrum.org credential URL here to make this a link, or leave empty.
    url: "",
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

export const languages = ["English", "French", "Arabic"];
