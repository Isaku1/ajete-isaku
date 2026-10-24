export type Responsibility = {
  title: string;
  icon: "code" | "workflow" | "activity" | "warehouse" | "shield" | "gauge" | "chart" | "users";
  description: string;
  outcome: string;
};

export const experience = {
  role: "Junior Data Engineer",
  company: "Aralytiks",
  location: "Kosovo",
  period: "Oct 2026 — Present",
  summary:
    "Joined Aralytiks in October 2026 to build data warehouse, ingestion and reporting solutions on the Microsoft data platform — from source analysis and SQL development through pipeline operations and Power BI enablement.",
  // `outcome` is the standard each responsibility is held to. Replace with measured results as they accumulate.
  responsibilities: [
    {
      title: "SQL Development",
      icon: "code",
      description:
        "Write and review T-SQL and Oracle SQL: stored procedures, MERGE-based loads, window-function analytics and reporting views.",
      outcome: "Readable, set-based SQL that passes code review",
    },
    {
      title: "ETL Development",
      icon: "workflow",
      description:
        "Build Azure Data Factory and Fabric pipelines with incremental watermarks, parameterised datasets and reusable templates.",
      outcome: "Reusable, parameterised pipelines over one-off builds",
    },
    {
      title: "Pipeline Monitoring",
      icon: "activity",
      description:
        "Support daily run health: failure triage, reruns, alerting rules and run logs that make root causes visible.",
      outcome: "Failures caught before report users notice",
    },
    {
      title: "Data Warehouse Development",
      icon: "warehouse",
      description:
        "Model and load Kimball star schemas — conformed dimensions, SCD Type 2 history, snapshot and transaction facts.",
      outcome: "Grain declared and agreed before any ETL is written",
    },
    {
      title: "Data Quality Management",
      icon: "shield",
      description:
        "Implement validation rules, source-to-target reconciliation and quality checks shared with data owners.",
      outcome: "Reconciliation built into every load",
    },
    {
      title: "Performance Tuning",
      icon: "gauge",
      description:
        "Analyse execution plans, apply columnstore and covering indexes, rewrite row-by-row logic as set-based SQL.",
      outcome: "Every change measured before and after",
    },
    {
      title: "Reporting Support",
      icon: "chart",
      description:
        "Build star-schema semantic models, DAX measures and row-level security for Power BI report developers.",
      outcome: "Models report developers can use without workarounds",
    },
    {
      title: "Stakeholder Collaboration",
      icon: "users",
      description:
        "Join requirement sessions and translate business questions into grains, KPIs and acceptance tests.",
      outcome: "KPI definitions agreed and documented up front",
    },
  ] satisfies Responsibility[],
  stack: ["SQL Server", "Oracle", "Azure Data Factory", "Microsoft Fabric", "Databricks", "Python", "Power BI", "Azure DevOps", "Git"],
};

export const workPrinciples = [
  { title: "Idempotent by default", description: "Every load can be re-run safely. Reruns are a button, not a war room." },
  { title: "Reconcile before you publish", description: "Numbers are checked against source before anyone sees them." },
  { title: "Model the business, not the source", description: "Grains and dimensions follow how the business thinks." },
  { title: "Observable pipelines", description: "Every run logs rows, duration and watermark — so issues are found, not reported." },
];

export const previousRoles = [
  {
    role: "Junior Data Engineer",
    company: "Genpact",
    period: "Feb 2026 — Sep 2026",
    points: [
      "Built and maintained scalable pipelines on Azure Databricks, PySpark, Python and SQL for enterprise analytics and reporting.",
      "Implemented Medallion Architecture (Bronze, Silver, Gold) to deliver business-ready datasets.",
      "Owned data documentation, metadata and governance standards; configured Databricks Genie Spaces for natural-language self-service analytics.",
    ],
  },
  {
    role: "Onboarding, Data Management & BI",
    company: "ProCredit Bank",
    period: "Nov 2025 — Jan 2026",
    points: [
      "Translated reporting requirements into BI solutions; built and maintained MIS reports and dashboards for operational and strategic decisions.",
      "Analysed performance and financial aspects of banking products, monitoring trends and key metrics.",
    ],
  },
  {
    role: "Investment Analyst Intern (Reporting & Data Analyst)",
    company: "Deloitte Switzerland",
    period: "Jul 2025 — Oct 2025",
    points: [
      "Prepared investment and financial reports; consolidated and cleaned financial data from multiple sources.",
      "Tracked key metrics and presented findings to senior colleagues.",
    ],
  },
];
