export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  takeaways: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "data-modeling-best-practices",
    title: "Data Modeling Best Practices for Analytics Teams",
    excerpt:
      "Grain first, keys second, columns last. The dimensional modelling habits that keep warehouses simple for users and fast for engines.",
    date: "2026-09-18",
    readingTime: "7 min read",
    category: "Data Modeling",
    tags: ["Kimball", "Star Schema", "Power BI"],
    sections: [
      {
        heading: "Declare the grain before anything else",
        paragraphs: [
          "Every modelling mistake I have had to undo started with an unclear grain. Before choosing a single column, write one sentence that says what a row in the fact table represents — 'one row per order line per day', 'one row per product per store per day'. If the team cannot agree on that sentence, the model is not ready to build.",
          "A declared grain tells you which dimensions are valid, which measures are additive and how to handle late-arriving data. It is also the first thing to check when two reports disagree.",
        ],
      },
      {
        heading: "Use surrogate keys and keep dimensions wide",
        paragraphs: [
          "Integer surrogate keys decouple the warehouse from source system keys, make SCD Type 2 history possible and keep fact tables narrow. Dimensions, on the other hand, should be wide and descriptive: users filter and group by attributes, so flatten hierarchies into the dimension instead of forcing extra joins.",
        ],
        bullets: [
          "Add an 'Unknown' member (key -1) to every dimension so facts never fail to load",
          "Store both the surrogate key and the business key",
          "Use role-playing date dimensions instead of multiple date tables",
        ],
      },
      {
        heading: "Model for the semantic layer you will use",
        paragraphs: [
          "Power BI's VertiPaq engine rewards star schemas: one-to-many relationships from dimensions to facts, single-direction filters, and measures defined once in DAX. Snowflaked dimensions usually get flattened again in Power Query anyway — so do it in the warehouse where it can be tested and reused.",
        ],
      },
    ],
    takeaways: [
      "Write the grain down as a sentence and get sign-off",
      "Surrogate keys on every dimension, Unknown members included",
      "Wide dimensions, narrow facts, star over snowflake for BI",
    ],
  },
  {
    slug: "enterprise-etl-design",
    title: "Enterprise ETL Design: Metadata, Idempotency and Observability",
    excerpt:
      "Why the hundredth pipeline should be configuration, not code — and the three properties every production load needs.",
    date: "2026-08-27",
    readingTime: "8 min read",
    category: "Data Engineering",
    tags: ["Azure Data Factory", "ETL", "Reliability"],
    sections: [
      {
        heading: "Metadata-driven over hand-built",
        paragraphs: [
          "Hand-built pipelines scale linearly with effort: every new table is new code, new testing and new maintenance. A metadata-driven framework reverses that. A control table describes each source — connection, object, load type, watermark column, target path — and a small set of parameterised pipelines reads it and does the work.",
          "The first source takes longer. The second and the hundredth take minutes, and they all behave the same way.",
        ],
      },
      {
        heading: "Idempotency is non-negotiable",
        paragraphs: [
          "An idempotent load produces the same result whether it runs once or five times. That property turns incident recovery from a careful manual procedure into a rerun button.",
        ],
        bullets: [
          "Use MERGE or delete-insert by partition instead of blind inserts",
          "Advance watermarks only after a confirmed successful load",
          "Make every step safe to restart from the beginning",
        ],
      },
      {
        heading: "Observability built in",
        paragraphs: [
          "Every run should record what it read, what it wrote, how long it took and which watermark it reached. With that log table you can build SLA reporting, detect slow drift in runtimes and answer 'did yesterday's data load?' without opening the orchestration tool.",
        ],
      },
    ],
    takeaways: [
      "Invest once in a framework; onboard sources through configuration",
      "Design every load to be safely re-runnable",
      "Log rows, duration and watermark for every run",
    ],
  },
  {
    slug: "microsoft-fabric-architecture",
    title: "Designing a Microsoft Fabric Architecture That Scales",
    excerpt:
      "Workspaces, lakehouses, warehouses and Direct Lake — practical decisions for building on OneLake without creating a new mess.",
    date: "2026-07-30",
    readingTime: "9 min read",
    category: "Microsoft Fabric",
    tags: ["Fabric", "OneLake", "Direct Lake"],
    sections: [
      {
        heading: "Lakehouse or warehouse? Often both",
        paragraphs: [
          "Fabric gives you two first-class engines over the same Delta tables in OneLake. The lakehouse suits Spark-based ingestion and transformation of semi-structured data; the warehouse suits T-SQL teams building dimensional gold layers with full DML support.",
          "A pattern that works well: bronze and silver in a lakehouse processed with notebooks, gold in a warehouse built with T-SQL, and shortcuts instead of copies wherever data needs to be shared.",
        ],
      },
      {
        heading: "Design gold for Direct Lake",
        paragraphs: [
          "Direct Lake reads Delta files directly into the VertiPaq engine, removing scheduled import refreshes. It works best with materialised, narrow tables. SQL views in the model force a fallback to DirectQuery, which quietly erases the performance benefit.",
        ],
        bullets: [
          "Materialise gold tables rather than exposing views",
          "Run OPTIMIZE with V-Order to keep files large and few",
          "Keep high-cardinality text columns out of fact tables",
        ],
      },
      {
        heading: "Workspaces and deployment",
        paragraphs: [
          "Separate workspaces per environment, connect them to Git from day one and promote with deployment pipelines. Retrofitting source control onto a workspace that has grown organically is far more painful than starting with it.",
        ],
      },
    ],
    takeaways: [
      "Use lakehouse and warehouse together over OneLake",
      "Materialise gold tables so Direct Lake stays in Direct Lake",
      "Git integration and per-environment workspaces from day one",
    ],
  },
  {
    slug: "databricks-optimization-techniques",
    title: "Databricks Optimization Techniques That Actually Move the Needle",
    excerpt:
      "File sizing, clustering, incremental processing and cluster policies — the changes that cut cost and runtime in real workloads.",
    date: "2026-06-24",
    readingTime: "8 min read",
    category: "Databricks",
    tags: ["Databricks", "Delta Lake", "PySpark"],
    sections: [
      {
        heading: "Fix the files first",
        paragraphs: [
          "Most slow Delta tables are suffering from small files. Thousands of tiny files mean thousands of tasks and a lot of metadata overhead. OPTIMIZE compacts them, and liquid clustering (or Z-ORDER on older runtimes) co-locates data so queries skip files they do not need.",
        ],
        bullets: [
          "Target file sizes in the low hundreds of MB for analytical tables",
          "Cluster by the columns used most in filters and joins",
          "Let predictive optimisation handle maintenance where available",
        ],
      },
      {
        heading: "Process incrementally",
        paragraphs: [
          "The cheapest data to process is data you have already processed. Auto Loader and checkpointed streams with availableNow triggers pick up only new files and then shut down. For gold tables, INSERT … REPLACE WHERE rebuilds just the affected date range instead of the whole table.",
        ],
      },
      {
        heading: "Right-size compute",
        paragraphs: [
          "Use job clusters rather than all-purpose clusters for scheduled work, enforce cluster policies, and read the Spark UI before adding nodes. Skewed joins and unnecessary shuffles are fixed by changing code, not by buying more workers.",
        ],
      },
    ],
    takeaways: [
      "Compact and cluster before scaling compute",
      "Make incremental processing the default",
      "Job clusters, policies and the Spark UI beat bigger clusters",
    ],
  },
  {
    slug: "data-warehouse-performance-engineering",
    title: "Data Warehouse Performance Engineering on SQL Server",
    excerpt:
      "Execution plans, columnstore, partition switching and set-based SQL — how a 48-second report query became a 3-second one.",
    date: "2026-05-29",
    readingTime: "10 min read",
    category: "Performance",
    tags: ["SQL Server", "Columnstore", "Query Tuning"],
    sections: [
      {
        heading: "Start with the execution plan",
        paragraphs: [
          "Tuning without reading the plan is guessing. Look for the expensive operators: large scans where a seek was expected, key lookups repeated millions of times, spills to tempdb, and estimates that differ wildly from actual row counts — usually a sign of stale statistics or non-sargable predicates.",
        ],
      },
      {
        heading: "Columnstore for facts",
        paragraphs: [
          "Clustered columnstore indexes compress fact tables dramatically and enable batch-mode execution. On one warehouse, a 212 GB rowstore fact became 31 GB, and the main sales report went from 48 seconds to just over 3.",
        ],
        bullets: [
          "Load in batches of at least ~100K rows to create compressed rowgroups",
          "Rebuild or reorganise to remove deleted rows and open delta stores",
          "Keep a rowstore nonclustered index only where point lookups need it",
        ],
      },
      {
        heading: "Load without blocking readers",
        paragraphs: [
          "Partition switching lets you load a staging table with the same structure, build its indexes, then switch it into the fact table as a metadata-only operation. Reports keep reading the old data until the switch completes in milliseconds.",
        ],
      },
    ],
    takeaways: [
      "Read the plan before changing anything",
      "Clustered columnstore is the default for large facts",
      "Partition switching makes loads invisible to users",
    ],
  },
  {
    slug: "modern-data-platform-design",
    title: "Modern Data Platform Design: Principles Over Products",
    excerpt:
      "Tools change every year. The principles behind a platform that stays reliable, governable and affordable do not.",
    date: "2026-04-30",
    readingTime: "7 min read",
    category: "Architecture",
    tags: ["Architecture", "Lakehouse", "Governance"],
    sections: [
      {
        heading: "Separate storage, compute and semantics",
        paragraphs: [
          "Open table formats like Delta Lake let several engines read the same data. Keeping storage independent of compute means you can change or add engines without migrating data, and a semantic layer on top keeps business definitions independent of both.",
        ],
      },
      {
        heading: "Treat data as a product",
        paragraphs: [
          "Each gold dataset should have an owner, a documented contract, quality metrics and a support path. Consumers should be able to discover it in a catalog, understand what it means and trust that it will not silently change shape.",
        ],
        bullets: [
          "Named owner and steward",
          "Schema contract and versioning",
          "Published freshness and quality metrics",
        ],
      },
      {
        heading: "Automate everything that repeats",
        paragraphs: [
          "Infrastructure, pipelines, schemas and permissions all belong in source control and are deployed through CI/CD. Manual changes in production are the most common source of drift between environments — and of incidents nobody can explain.",
        ],
      },
    ],
    takeaways: [
      "Open formats keep the platform portable",
      "Gold datasets are products with owners and contracts",
      "Everything as code, deployed through pipelines",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
