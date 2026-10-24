// Single source of truth for personal details.
// Review every value here before publishing — especially links, email and numbers.

export type Stat = { label: string; value: number; suffix?: string; decimals?: number };

export const profile = {
  name: "Ajete Isaku",
  firstName: "Ajete",
  initials: "AI",
  role: "Data Engineer",
  level: "Junior Data Engineer",
  location: "Kosovo",
  timezone: "CET · UTC+1",

  headline: {
    lead: "Building",
    highlight: "Scalable Data Platforms",
    tail: "and Intelligent Analytics Solutions",
  },
  subheadline:
    "Databricks-certified Data Engineer turning complex data into trusted business insights — open to remote roles worldwide.",

  mission:
    "Design scalable, reliable, and business-driven data solutions that transform raw data into actionable insights.",
  careerGoal:
    "Grow into a Senior Data Engineer and Data Architect specialising in Microsoft Fabric, the Azure Data Platform, Databricks, Big Data and Enterprise Data Architecture.",

  focusAreas: [
    "Data Engineering",
    "Data Warehousing",
    "ETL / ELT",
    "Analytics Engineering",
    "Cloud Data Platforms",
    "Data Architecture",
    "Business Intelligence",
  ],
  currentlyLearning: ["Delta Lake internals", "Unity Catalog", "Fabric Real-Time Intelligence"],

  availability: {
    status: "Open to opportunities",
    roles: ["Data Engineer", "Databricks / Lakehouse Engineer", "Analytics Engineer", "BI Engineer"],
    modes: ["Remote (worldwide)", "Hybrid", "Open to relocation"],
    responseTime: "Replies within 24 hours",
  },

  // Leave email empty to hide every email button; LinkedIn then becomes the primary contact.
  email: "isakuajete123@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/ajete-isaku",
    github: "https://github.com/ajeteisaku",
  },

  stats: [
    { label: "Architecture Patterns", value: 10 },
    { label: "Technologies in Toolkit", value: 25, suffix: "+" },
    { label: "Projects Completed", value: 12 },
    { label: "Pipelines Built", value: 45, suffix: "+" },
  ] as Stat[],

  about: {
    story: [
      "I came to data engineering through the questions a business asks every morning — what did we sell, what is running low, which customers are we losing — and the realisation that every answer is only as good as the pipeline behind it. Early on I spent more time reconciling numbers that disagreed across reports than analysing them, and that pulled me upstream: into source systems, SQL, data models and the pipelines that connect them.",
      "Since October 2026 I have been a Junior Data Engineer at Aralytiks, building warehouse loads, ingestion pipelines and Power BI-ready data models on the Microsoft data platform. My day-to-day is SQL Server and Oracle SQL, Azure Data Factory orchestration, Python for automation and validation, and a growing amount of Spark on Databricks and Microsoft Fabric. I care about the unglamorous parts — idempotent loads, reconciliation checks, clear naming, documentation — because that is what makes a number trustworthy.",
      "What drives me is the moment a stakeholder stops exporting to Excel and starts trusting the dashboard. I am deliberately building depth in lakehouse architecture, Delta Lake and dimensional modelling, with a clear goal: to become a Senior Data Engineer and, ultimately, a Data Architect who designs enterprise platforms on Fabric, Azure and Databricks.",
    ],
    strengths: [
      {
        title: "Dimensional modelling",
        description: "Kimball star schemas, conformed dimensions and SCD Type 2 history that analysts can actually use.",
      },
      {
        title: "SQL performance tuning",
        description: "Execution plans, indexing, columnstore and set-based rewrites that turn minutes into seconds.",
      },
      {
        title: "Reliable pipelines",
        description: "Metadata-driven, idempotent loads with logging, alerting and reruns that do not need heroics.",
      },
      {
        title: "Quality by design",
        description: "Validation and reconciliation built into the pipeline, not bolted on after an incident.",
      },
      {
        title: "Business translation",
        description: "Turning stakeholder questions into data requirements, grains and measurable KPIs.",
      },
      {
        title: "Relentless learning",
        description: "A structured certification and lab roadmap across Azure, Fabric and Databricks.",
      },
    ],
  },
};
