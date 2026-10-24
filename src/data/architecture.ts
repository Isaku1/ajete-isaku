export type Tone = "source" | "bronze" | "silver" | "gold" | "cyan" | "blue" | "violet" | "emerald";

export type FlowStep = { title: string; items: string[]; detail: string; tone: Tone };
export type FlowLane = { label?: string; steps: FlowStep[] };
export type SchemaTable = { name: string; columns: string[]; children?: SchemaTable[] };

export type Diagram =
  | { kind: "flow"; lanes: FlowLane[] }
  | { kind: "schema"; fact: SchemaTable; dimensions: SchemaTable[] };

export type ArchitecturePattern = {
  id: string;
  title: string;
  summary: string;
  description: string;
  principles: string[];
  whenToUse: string;
  diagram: Diagram;
};

export const architectures: ArchitecturePattern[] = [
  {
    id: "medallion",
    title: "Medallion Architecture",
    summary: "Progressive refinement: raw → cleansed → business-ready.",
    description:
      "Data moves through bronze, silver and gold layers, each with a clear contract. Bronze preserves the raw truth for replay, silver delivers clean conformed entities, and gold serves business-shaped tables to BI and ML.",
    principles: [
      "Bronze is append-only and replayable",
      "Silver owns typing, deduplication and conformance",
      "Gold is modelled for its consumers",
      "Every layer is a Delta table with ACID guarantees",
    ],
    whenToUse: "Lakehouse platforms on Databricks or Microsoft Fabric with multiple sources and consumers.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          steps: [
            { title: "Sources", items: ["ERP / CRM", "Files & APIs", "Event streams"], tone: "source", detail: "Operational systems, files and events — landed without modification." },
            { title: "Bronze", items: ["Raw, append-only", "Schema-on-read", "Full history"], tone: "bronze", detail: "Exact copy of source data plus lineage columns (source file, ingestion time). Enables replay of any downstream layer." },
            { title: "Silver", items: ["Cleansed & typed", "Deduplicated", "Quality rules"], tone: "silver", detail: "Validated, conformed entities keyed on business keys. Data quality expectations are enforced here." },
            { title: "Gold", items: ["Star schemas", "Aggregates", "KPIs"], tone: "gold", detail: "Consumption-ready tables: dimensional models, aggregates and feature tables designed for specific use cases." },
            { title: "Consume", items: ["Power BI", "ML models", "APIs & apps"], tone: "cyan", detail: "Semantic models, data science and applications read from gold through governed access." },
          ],
        },
      ],
    },
  },
  {
    id: "modern-dw",
    title: "Modern Data Warehouse",
    summary: "Layered warehouse with cloud orchestration and a semantic layer.",
    description:
      "Data is extracted by cloud pipelines into staging, integrated and historised, then published as star schemas. A semantic layer defines governed measures once for every report.",
    principles: [
      "Separate staging, integration and presentation",
      "Surrogate keys and SCD history in dimensions",
      "Metadata-driven, incremental extraction",
      "Single semantic layer for KPI definitions",
    ],
    whenToUse: "Structured enterprise data with strong reporting and audit requirements.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          steps: [
            { title: "Sources", items: ["Oracle ERP", "SQL Server", "SaaS APIs"], tone: "source", detail: "Transactional systems of record." },
            { title: "Ingestion", items: ["Azure Data Factory", "Fabric pipelines", "Watermarks"], tone: "blue", detail: "Parameterised pipelines copy only changed rows, driven by a control table." },
            { title: "Staging", items: ["1:1 source copies", "No logic", "Truncate / append"], tone: "bronze", detail: "A landing area that isolates source extraction from transformation." },
            { title: "Integration", items: ["Cleansing", "Conformed keys", "SCD Type 2"], tone: "silver", detail: "Business rules, key mapping and change detection with row hashes." },
            { title: "Presentation", items: ["Facts & dimensions", "Columnstore", "Partitions"], tone: "gold", detail: "Kimball star schemas optimised for analytical queries." },
            { title: "Semantic", items: ["Power BI model", "DAX measures", "RLS"], tone: "cyan", detail: "Governed measures and security defined once and reused by every report." },
          ],
        },
      ],
    },
  },
  {
    id: "data-lake",
    title: "Data Lake Architecture",
    summary: "Zoned storage on ADLS Gen2 with compute separated from storage.",
    description:
      "A data lake stores any data format at low cost and separates storage from compute. Zones organise data by trust level, and a catalog provides discovery, lineage and access control.",
    principles: [
      "Zones by trust level, not by team",
      "Open formats: Parquet and Delta",
      "Compute engines are interchangeable",
      "Catalog and access control from day one",
    ],
    whenToUse: "Large, varied or semi-structured data; data science workloads; cost-sensitive long-term retention.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          steps: [
            { title: "Ingest", items: ["Batch copy", "Streaming", "CDC"], tone: "source", detail: "Multiple ingestion modes land into the raw zone." },
            { title: "Raw zone", items: ["Original format", "Immutable", "Partitioned by date"], tone: "bronze", detail: "Exactly as received. Never modified, only appended." },
            { title: "Curated zone", items: ["Parquet / Delta", "Validated", "Business-aligned"], tone: "silver", detail: "Cleansed, typed and modelled data ready for wide use." },
            { title: "Process", items: ["Spark", "Databricks", "Serverless SQL"], tone: "violet", detail: "Compute scales independently and reads the same open files." },
            { title: "Govern", items: ["Unity Catalog", "Microsoft Purview", "RBAC & ACLs"], tone: "emerald", detail: "Discovery, lineage, classification and fine-grained access." },
            { title: "Serve", items: ["BI", "Data science", "Sandboxes"], tone: "cyan", detail: "Consumers read curated data; sandboxes allow safe exploration." },
          ],
        },
      ],
    },
  },
  {
    id: "star-schema",
    title: "Star Schema",
    summary: "A central fact surrounded by denormalised dimensions.",
    description:
      "The Kimball star schema places measurable events in a fact table at a declared grain, surrounded by wide, denormalised dimensions. It is simple for users, fast for engines and the preferred shape for Power BI.",
    principles: [
      "Declare the grain before choosing columns",
      "Integer surrogate keys on every dimension",
      "Facts hold additive measures and foreign keys",
      "Dimensions are wide, descriptive and denormalised",
    ],
    whenToUse: "Almost every BI and reporting workload — the default for Power BI semantic models.",
    diagram: {
      kind: "schema",
      fact: {
        name: "FactSales",
        columns: ["DateKey", "ProductKey", "CustomerKey", "StoreKey", "PromotionKey", "Quantity", "NetAmount", "Discount", "CostAmount"],
      },
      dimensions: [
        { name: "DimDate", columns: ["DateKey", "Date", "Month", "Quarter", "FiscalYear", "IsWorkingDay"] },
        { name: "DimProduct", columns: ["ProductKey", "SKU", "ProductName", "Subcategory", "Category", "Brand"] },
        { name: "DimCustomer", columns: ["CustomerKey", "CustomerCode", "Segment", "City", "Country", "ValidFrom"] },
        { name: "DimStore", columns: ["StoreKey", "StoreCode", "StoreName", "City", "Region"] },
        { name: "DimPromotion", columns: ["PromotionKey", "PromotionName", "Channel", "DiscountType"] },
      ],
    },
  },
  {
    id: "snowflake-schema",
    title: "Snowflake Schema",
    summary: "Dimensions normalised into hierarchies of related tables.",
    description:
      "A snowflake schema normalises dimension hierarchies into separate tables. It reduces redundancy and suits shared reference hierarchies, at the cost of more joins and a harder model for report authors.",
    principles: [
      "Normalise only stable, shared hierarchies",
      "Expect more joins and more complex queries",
      "Often flattened again in the semantic layer",
      "Useful when hierarchies are maintained independently",
    ],
    whenToUse: "Shared hierarchies managed by different teams, or storage-constrained warehouses.",
    diagram: {
      kind: "schema",
      fact: {
        name: "FactSales",
        columns: ["DateKey", "ProductKey", "CustomerKey", "StoreKey", "Quantity", "NetAmount", "CostAmount"],
      },
      dimensions: [
        { name: "DimDate", columns: ["DateKey", "Date", "MonthKey"], children: [{ name: "DimMonth", columns: ["MonthKey", "Month", "Quarter", "Year"] }] },
        { name: "DimProduct", columns: ["ProductKey", "SKU", "ProductName", "SubcategoryKey"], children: [{ name: "DimSubcategory", columns: ["SubcategoryKey", "Subcategory", "CategoryKey"] }, { name: "DimCategory", columns: ["CategoryKey", "Category"] }] },
        { name: "DimCustomer", columns: ["CustomerKey", "CustomerName", "SegmentKey"], children: [{ name: "DimSegment", columns: ["SegmentKey", "Segment"] }] },
        { name: "DimStore", columns: ["StoreKey", "StoreName", "CityKey"], children: [{ name: "DimCity", columns: ["CityKey", "City", "RegionKey"] }, { name: "DimRegion", columns: ["RegionKey", "Region", "Country"] }] },
      ],
    },
  },
  {
    id: "etl-vs-elt",
    title: "ETL vs ELT",
    summary: "Where the transformation happens — and why it matters.",
    description:
      "ETL transforms data before loading, on a separate engine. ELT loads raw data first and transforms it inside a scalable warehouse or lakehouse engine. Modern platforms favour ELT for flexibility and replay; ETL still fits strict, well-defined targets.",
    principles: [
      "ETL: smaller target footprint, transformation before load",
      "ELT: raw data retained, transformations re-runnable",
      "ELT leverages MPP and Spark engines",
      "Choose per workload — many platforms use both",
    ],
    whenToUse: "ELT for lakehouse and cloud warehouses; ETL for sensitive data that must be masked before landing.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          label: "ETL — transform before load",
          steps: [
            { title: "Extract", items: ["Source queries", "Incremental"], tone: "source", detail: "Read changed data from source systems." },
            { title: "Transform", items: ["ETL engine", "ADF data flows / SSIS"], tone: "violet", detail: "Cleansing and business logic on a dedicated engine before data reaches the target." },
            { title: "Load", items: ["Warehouse", "Modelled tables"], tone: "gold", detail: "Only transformed, conformed data is written to the warehouse." },
          ],
        },
        {
          label: "ELT — load, then transform in-engine",
          steps: [
            { title: "Extract", items: ["Source queries", "CDC / files"], tone: "source", detail: "Read data from source systems." },
            { title: "Load", items: ["Lake / warehouse raw", "Bronze layer"], tone: "bronze", detail: "Raw data is stored first, preserving history and enabling replay." },
            { title: "Transform", items: ["SQL / Spark in-engine", "Silver → Gold"], tone: "cyan", detail: "Transformations run where the data lives, using the platform's scalable compute." },
          ],
        },
      ],
    },
  },
  {
    id: "batch",
    title: "Batch Processing",
    summary: "Scheduled, incremental, idempotent loads.",
    description:
      "Batch pipelines process bounded sets of data on a schedule. Done well they are incremental (watermarks or CDC), idempotent (safe to re-run) and observable (every run logged and validated before publishing).",
    principles: [
      "Process only what changed",
      "Re-runs must not duplicate or skip data",
      "Validate before publishing to consumers",
      "Log rows, duration and watermark per run",
    ],
    whenToUse: "Daily or hourly reporting, warehouse loads, and anything where minutes of latency are acceptable.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          steps: [
            { title: "Trigger", items: ["Schedule", "Storage event", "Dependency"], tone: "source", detail: "A schedule or upstream event starts the run with a run context." },
            { title: "Extract", items: ["Watermark / CDC", "Parallel copies"], tone: "blue", detail: "Only rows changed since the last successful watermark are read." },
            { title: "Transform", items: ["SQL procedures", "Spark jobs"], tone: "violet", detail: "Set-based transformations into the target model." },
            { title: "Validate", items: ["Row counts", "Reconciliation", "Rules"], tone: "emerald", detail: "Quality gates stop bad data before consumers see it." },
            { title: "Publish", items: ["Partition switch", "Model refresh"], tone: "gold", detail: "Atomically expose new data and refresh downstream models." },
            { title: "Monitor", items: ["Run logs", "Alerts", "SLA tracking"], tone: "cyan", detail: "Failures and slow runs raise alerts; history feeds SLA reporting." },
          ],
        },
      ],
    },
  },
  {
    id: "stream",
    title: "Stream Processing",
    summary: "Continuous events with a hot path and a cold path.",
    description:
      "Streaming pipelines process unbounded event streams continuously. Event-time windows and watermarks handle out-of-order data, while a cold path archives raw events for replay and backfill.",
    principles: [
      "Use event time, not processing time",
      "Watermarks bound state and lateness",
      "Checkpoints give exactly-once sinks",
      "Always keep a replayable raw archive",
    ],
    whenToUse: "Operational monitoring, alerting, fraud detection and anything that loses value with latency.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          label: "Hot path — seconds",
          steps: [
            { title: "Producers", items: ["Apps & services", "IoT / scanners"], tone: "source", detail: "Systems publish events as they happen." },
            { title: "Event broker", items: ["Azure Event Hubs", "Kafka"], tone: "blue", detail: "Durable, partitioned log that decouples producers from consumers." },
            { title: "Stream processing", items: ["Structured Streaming", "Windows & watermarks"], tone: "violet", detail: "Parse, deduplicate and aggregate events in event-time windows." },
            { title: "Hot store", items: ["Delta tables", "Eventhouse / KQL"], tone: "gold", detail: "Low-latency tables optimised for recent-time queries." },
            { title: "Act", items: ["Live dashboards", "Alerts"], tone: "cyan", detail: "Dashboards and alerts react within seconds." },
          ],
        },
        {
          label: "Cold path — replay & history",
          steps: [
            { title: "Capture", items: ["Event Hubs Capture"], tone: "blue", detail: "Every event is written to storage automatically." },
            { title: "Raw archive", items: ["ADLS Gen2 (Avro)"], tone: "bronze", detail: "Cheap, complete history of the stream." },
            { title: "Batch reprocess", items: ["Backfill", "Model training"], tone: "silver", detail: "The same logic re-runs in batch for corrections and analysis." },
          ],
        },
      ],
    },
  },
  {
    id: "governance",
    title: "Data Governance Framework",
    summary: "Ownership, quality, security and lineage as one system.",
    description:
      "Governance makes data trustworthy and safe at scale. It combines clear ownership, documented standards, a searchable catalog with lineage, measurable quality, and security controls — embedded in pipelines rather than added as paperwork.",
    principles: [
      "Every dataset has a named owner and steward",
      "Quality is measured and published",
      "Least-privilege access with PII masking",
      "Lineage answers 'where did this come from?'",
    ],
    whenToUse: "Any platform beyond a single team — and before regulators or auditors ask.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          steps: [
            { title: "Ownership", items: ["Data owners", "Stewards", "RACI"], tone: "violet", detail: "Accountability for definitions, quality and access decisions." },
            { title: "Standards", items: ["Naming", "Glossary", "Classification"], tone: "blue", detail: "Shared definitions and conventions applied across the platform." },
            { title: "Catalog & lineage", items: ["Microsoft Purview", "Unity Catalog"], tone: "cyan", detail: "Discover datasets and trace columns from source to report." },
            { title: "Quality", items: ["Rules & tests", "Scorecards", "SLAs"], tone: "emerald", detail: "Completeness, validity, uniqueness and timeliness — measured and visible." },
            { title: "Security & privacy", items: ["RBAC", "RLS & masking", "PII handling"], tone: "gold", detail: "Least-privilege access with protection for sensitive data." },
            { title: "Lifecycle", items: ["Retention", "Audit", "Archival"], tone: "silver", detail: "Data kept only as long as needed, with an audit trail." },
          ],
        },
      ],
    },
  },
  {
    id: "end-to-end",
    title: "End-to-End Analytics Platform",
    summary: "From source systems to decisions, with platform services underneath.",
    description:
      "A complete analytics platform connects ingestion, a lakehouse, a serving layer and consumption — supported by shared services for orchestration, CI/CD, monitoring and governance that keep it reliable as it grows.",
    principles: [
      "One platform, layered responsibilities",
      "Everything as code and deployed through CI/CD",
      "Observability across every layer",
      "Governance embedded, not bolted on",
    ],
    whenToUse: "The target state for an enterprise data platform on Azure, Fabric or Databricks.",
    diagram: {
      kind: "flow",
      lanes: [
        {
          label: "Data flow",
          steps: [
            { title: "Sources", items: ["ERP · CRM", "Files · APIs", "Events"], tone: "source", detail: "All operational systems and external data." },
            { title: "Ingestion", items: ["ADF / Fabric pipelines", "Event Hubs"], tone: "blue", detail: "Batch and streaming ingestion into the lakehouse." },
            { title: "Lakehouse", items: ["Bronze", "Silver", "Gold"], tone: "gold", detail: "Delta Lake medallion layers on OneLake or ADLS Gen2." },
            { title: "Serving", items: ["Warehouse", "Semantic models", "SQL endpoints"], tone: "violet", detail: "Governed, performant access for every consumer." },
            { title: "Consumption", items: ["Power BI", "ML & AI", "Apps"], tone: "cyan", detail: "Reports, models and applications that drive decisions." },
          ],
        },
        {
          label: "Platform services",
          steps: [
            { title: "Orchestration", items: ["Pipelines", "Workflows"], tone: "blue", detail: "Dependencies, schedules and retries across all jobs." },
            { title: "CI/CD", items: ["Git", "Azure DevOps"], tone: "violet", detail: "Versioned code with automated, repeatable deployments." },
            { title: "Monitoring", items: ["Run logs", "Alerts", "Cost"], tone: "emerald", detail: "Health, SLA and cost visibility across the platform." },
            { title: "Governance", items: ["Catalog", "Security", "Quality"], tone: "silver", detail: "Ownership, lineage, access control and quality scorecards." },
          ],
        },
      ],
    },
  },
];
