// Case studies are written with anonymised clients. Align figures and details with your real work
// before publishing — interviewers will ask about every number here.

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  domain: string;
  duration: string;
  role: string;
  highlights: { label: string; value: string }[];
  executiveSummary: string;
  businessProblem: { context: string; painPoints: string[] };
  architecture: { overview: string; layers: { name: string; description: string }[] };
  sourceSystems: { name: string; type: string; volume: string; cadence: string }[];
  dataFlow: { step: string; description: string }[];
  dataModel: {
    overview: string;
    facts: { name: string; grain: string }[];
    dimensions: { name: string; note: string }[];
  };
  etlProcess: { phase: string; description: string }[];
  techStack: { category: string; items: string[] }[];
  sqlExample: { title: string; code: string };
  pythonExample: { title: string; code: string };
  challenges: { challenge: string; solution: string }[];
  performance: { metric: string; before: string; after: string; improvement: string }[];
  businessImpact: string[];
  lessonsLearned: string[];
  successMetrics: { label: string; value: string; description: string }[];
};

export const projects: Project[] = [
  // ───────────────────────────────────────────── 1
  {
    slug: "enterprise-data-warehouse",
    index: "01",
    title: "Enterprise Data Warehouse",
    tagline: "A Kimball-modelled warehouse that replaced 30+ conflicting spreadsheets with one trusted source of truth.",
    domain: "Retail & Distribution",
    duration: "5 months",
    role: "Data Engineer — modelling, ETL development, reconciliation",
    highlights: [
      { label: "Nightly load", value: "4h10m → 1h25m" },
      { label: "Report query", value: "48s → 3s" },
      { label: "Reports retired", value: "30+" },
    ],
    executiveSummary:
      "Designed and delivered an enterprise data warehouse for a multi-store retail and distribution business. The solution consolidates ERP, point-of-sale, CRM and supplier data into a Kimball star schema with full SCD Type 2 history, automated reconciliation and a certified Power BI semantic model — giving finance, sales and operations one agreed version of revenue, margin and stock.",
    businessProblem: {
      context:
        "Each department produced its own numbers from direct ERP extracts and Excel workbooks. Monthly revenue differed by up to 4% between finance and sales, and month-end reporting took four working days of manual consolidation.",
      painPoints: [
        "No single definition of net revenue, margin or active customer",
        "Heavy reporting queries running directly against the production ERP",
        "No history of customer or product attribute changes for trend analysis",
        "Manual Excel consolidation with no audit trail",
      ],
    },
    architecture: {
      overview:
        "A classic three-layer warehouse on SQL Server, orchestrated by Azure Data Factory with a self-hosted integration runtime for on-premises sources.",
      layers: [
        { name: "Staging (stg)", description: "1:1 copies of source tables, truncated and reloaded or incrementally appended per load. No business logic." },
        { name: "Integration (int)", description: "Cleansed, typed and conformed data; business keys mapped, row hashes computed for change detection." },
        { name: "Presentation (dw)", description: "Kimball star schemas with surrogate keys, SCD Type 2 dimensions and partitioned columnstore facts." },
        { name: "Semantic (Power BI)", description: "A certified dataset with governed measures, row-level security by region and incremental refresh." },
      ],
    },
    sourceSystems: [
      { name: "Oracle ERP", type: "Oracle 19c", volume: "~2.5M order lines / month", cadence: "Nightly incremental" },
      { name: "Point of Sale", type: "SQL Server", volume: "~6M receipts lines / month", cadence: "Nightly incremental" },
      { name: "CRM", type: "REST API (JSON)", volume: "~180K customers", cadence: "Nightly full" },
      { name: "Supplier feeds", type: "CSV via SFTP", volume: "40+ files / week", cadence: "Event-based" },
    ],
    dataFlow: [
      { step: "Extract", description: "ADF copies changed rows using a LastModified watermark per table into stg." },
      { step: "Validate", description: "Row counts, null checks on business keys and schema drift checks run before any transformation." },
      { step: "Integrate", description: "Stored procedures standardise codes, map business keys and compute SHA-256 row hashes." },
      { step: "Load dimensions", description: "SCD Type 2 MERGE logic versions changed customers and products." },
      { step: "Load facts", description: "Facts resolve surrogate keys and switch into monthly partitions." },
      { step: "Reconcile & publish", description: "Source-to-warehouse totals are compared; on success the Power BI dataset refresh is triggered." },
    ],
    dataModel: {
      overview:
        "A bus-matrix driven design with conformed Date, Product, Store and Customer dimensions shared by sales and inventory processes.",
      facts: [
        { name: "FactSales", grain: "One row per order line per day" },
        { name: "FactInventorySnapshot", grain: "One row per product per store per day" },
        { name: "FactPurchaseOrders", grain: "One row per purchase order line" },
      ],
      dimensions: [
        { name: "DimDate", note: "Role-playing for order, ship and invoice dates" },
        { name: "DimCustomer", note: "SCD Type 2 on segment, city and country" },
        { name: "DimProduct", note: "SCD Type 2 on category and list price" },
        { name: "DimStore", note: "SCD Type 1 with region hierarchy" },
        { name: "DimSupplier", note: "SCD Type 1" },
      ],
    },
    etlProcess: [
      { phase: "Metadata-driven extraction", description: "A control table lists every source object, its load type and watermark column; one parameterised pipeline handles all of them." },
      { phase: "Change detection", description: "HASHBYTES over business attributes avoids column-by-column comparisons and makes SCD logic generic." },
      { phase: "Late-arriving dimensions", description: "Unknown members (-1) are inserted as inferred rows and enriched when the dimension record arrives." },
      { phase: "Audit & logging", description: "Every procedure writes rows read/inserted/updated, duration and run ID to etl.LoadLog." },
    ],
    techStack: [
      { category: "Storage & compute", items: ["SQL Server 2019", "Clustered columnstore", "Table partitioning"] },
      { category: "Orchestration", items: ["Azure Data Factory", "Self-hosted IR", "Stored procedures"] },
      { category: "Quality", items: ["Python reconciliation", "pandas", "Azure Monitor alerts"] },
      { category: "Consumption", items: ["Power BI", "DAX", "Row-level security"] },
      { category: "DevOps", items: ["Git", "Azure DevOps", "SQL Database Projects"] },
    ],
    sqlExample: {
      title: "SCD Type 2 load for DimCustomer (T-SQL)",
      code: `-- RowHash is computed in staging:
-- HASHBYTES('SHA2_256', CONCAT_WS('|', CustomerName, Segment, City, Country))
DECLARE @LoadDate DATETIME2(0) = SYSUTCDATETIME();

BEGIN TRANSACTION;

-- 1. Expire current rows whose attributes changed
UPDATE d
SET    d.ValidTo   = @LoadDate,
       d.IsCurrent = 0
FROM   dw.DimCustomer AS d
JOIN   stg.Customer   AS s
       ON s.CustomerCode = d.CustomerCode
WHERE  d.IsCurrent = 1
  AND  d.RowHash <> s.RowHash;

-- 2. Insert new customers and new versions of changed customers
INSERT INTO dw.DimCustomer
       (CustomerCode, CustomerName, Segment, City, Country,
        RowHash, ValidFrom, ValidTo, IsCurrent)
SELECT s.CustomerCode, s.CustomerName, s.Segment, s.City, s.Country,
       s.RowHash, @LoadDate, '9999-12-31', 1
FROM   stg.Customer AS s
LEFT JOIN dw.DimCustomer AS d
       ON d.CustomerCode = s.CustomerCode
      AND d.IsCurrent = 1
WHERE  d.CustomerKey IS NULL;

COMMIT TRANSACTION;`,
    },
    pythonExample: {
      title: "Source-to-warehouse reconciliation after every load",
      code: `"""Compares daily sales totals between Oracle ERP and the warehouse."""
import os

import oracledb
import pandas as pd
import pyodbc

CHECKS = [
    {
        "name": "daily_net_sales",
        "source_sql": """
            SELECT TRUNC(order_date) AS d, SUM(net_amount) AS v
            FROM erp.sales_order_lines
            WHERE order_date >= TRUNC(SYSDATE) - 7
            GROUP BY TRUNC(order_date)""",
        "target_sql": """
            SELECT dd.FullDate AS d, SUM(f.NetAmount) AS v
            FROM dw.FactSales f
            JOIN dw.DimDate dd ON dd.DateKey = f.OrderDateKey
            WHERE dd.FullDate >= DATEADD(day, -7, CAST(GETDATE() AS date))
            GROUP BY dd.FullDate""",
        "tolerance": 0.001,  # 0.1 %
    },
]


def fetch(conn, sql: str) -> pd.DataFrame:
    df = pd.read_sql(sql, conn)
    df.columns = [c.lower() for c in df.columns]
    df["d"] = pd.to_datetime(df["d"]).dt.date
    return df.set_index("d")


def reconcile() -> list[dict]:
    source = oracledb.connect(
        user=os.environ["ERP_USER"],
        password=os.environ["ERP_PASSWORD"],
        dsn=os.environ["ERP_DSN"],
    )
    target = pyodbc.connect(os.environ["DW_CONNECTION_STRING"])
    failures = []

    for check in CHECKS:
        joined = (
            fetch(source, check["source_sql"])
            .join(fetch(target, check["target_sql"]), lsuffix="_src", rsuffix="_dw", how="outer")
            .fillna(0)
        )
        base = joined["v_src"].where(joined["v_src"] != 0, 1)
        joined["diff_pct"] = (joined["v_src"] - joined["v_dw"]).abs() / base

        for day, row in joined[joined["diff_pct"] > check["tolerance"]].iterrows():
            failures.append({
                "check": check["name"],
                "date": str(day),
                "source": float(row["v_src"]),
                "warehouse": float(row["v_dw"]),
            })
    return failures


if __name__ == "__main__":
    issues = reconcile()
    if issues:
        raise SystemExit(f"Reconciliation failed: {issues}")
    print("All reconciliation checks passed.")`,
    },
    challenges: [
      {
        challenge: "Finance and sales used different definitions of net revenue.",
        solution: "Ran definition workshops, documented each KPI in a business glossary and implemented one governed measure in the semantic model.",
      },
      {
        challenge: "Fact loads blocked reporting for hours during the nightly window.",
        solution: "Loaded into a staging partition and used ALTER TABLE … SWITCH so the published fact is replaced in milliseconds.",
      },
      {
        challenge: "Orders arrived before their customer records existed in the CRM.",
        solution: "Inferred-member pattern: insert a placeholder dimension row, then update it in place when the real record arrives.",
      },
    ],
    performance: [
      { metric: "Nightly end-to-end load", before: "4h 10m", after: "1h 25m", improvement: "−66%" },
      { metric: "Sales report query (P95)", before: "48 s", after: "3.1 s", improvement: "−94%" },
      { metric: "FactSales storage", before: "212 GB rowstore", after: "31 GB columnstore", improvement: "−85%" },
      { metric: "Month-end close reporting", before: "4 days", after: "Same day", improvement: "−3 days" },
    ],
    businessImpact: [
      "One governed definition of revenue, margin and active customer used by every department",
      "Month-end reporting delivered on day one instead of day four",
      "ERP production load reduced by moving reporting queries to the warehouse",
      "Full attribute history enabled customer-segment migration analysis for the first time",
    ],
    lessonsLearned: [
      "Agree on the grain and KPI definitions before writing a single line of ETL.",
      "Reconciliation is a feature: business trust grew fastest once totals were visibly checked every day.",
      "Partition switching and columnstore are the two highest-leverage SQL Server techniques for warehouses.",
    ],
    successMetrics: [
      { label: "Reconciliation pass rate", value: "99.8%", description: "Daily source-to-warehouse checks" },
      { label: "Reports consolidated", value: "30+", description: "Legacy Excel and ad-hoc extracts retired" },
      { label: "Certified dataset users", value: "140", description: "Across finance, sales and operations" },
      { label: "Revenue variance", value: "< 0.1%", description: "Between departments, down from 4%" },
    ],
  },

  // ───────────────────────────────────────────── 2
  {
    slug: "azure-data-factory-enterprise-pipeline",
    index: "02",
    title: "Azure Data Factory Enterprise Pipeline",
    tagline: "A metadata-driven ingestion framework that onboards a new source table in minutes instead of days.",
    domain: "Financial Services",
    duration: "3 months",
    role: "Data Engineer — framework design, pipeline development, monitoring",
    highlights: [
      { label: "Sources onboarded", value: "60+ tables" },
      { label: "Onboarding time", value: "3 days → 30 min" },
      { label: "Success rate", value: "99.4%" },
    ],
    executiveSummary:
      "Built a reusable, metadata-driven ingestion framework in Azure Data Factory that lands data from Oracle, SQL Server, REST APIs and SFTP into ADLS Gen2 as Parquet. One set of parameterised pipelines, driven by a SQL control table, replaced dozens of hand-built copy pipelines and introduced consistent logging, watermarking and alerting.",
    businessProblem: {
      context:
        "Each new data request produced a new hand-built pipeline. After two years the factory contained more than 70 near-identical pipelines with inconsistent naming, no shared logging and no reliable way to tell what had loaded.",
      painPoints: [
        "Three days of development and testing to onboard each new source table",
        "Failures discovered by report users rather than by the data team",
        "Full reloads of large tables because incremental logic was implemented inconsistently",
        "Credentials stored in linked services instead of a central vault",
      ],
    },
    architecture: {
      overview:
        "A parent/child pipeline pattern: a master pipeline reads active sources from the control table and fans out to typed child pipelines per connector, all landing into a date-partitioned raw zone.",
      layers: [
        { name: "Control plane", description: "Azure SQL control and log tables define what to load, how, and record every outcome." },
        { name: "Orchestration", description: "Master pipeline → ForEach (batch count 8) → connector-specific child pipelines." },
        { name: "Landing (ADLS Gen2)", description: "raw/<system>/<table>/load_date=YYYY-MM-DD/ in Parquet with Snappy compression." },
        { name: "Security", description: "Managed identity everywhere; secrets resolved at runtime from Azure Key Vault." },
        { name: "Observability", description: "Log Analytics diagnostics, alert rules and a Python health report delivered every morning." },
      ],
    },
    sourceSystems: [
      { name: "Core banking", type: "Oracle 19c (self-hosted IR)", volume: "34 tables · ~40M rows/day", cadence: "Hourly incremental" },
      { name: "Operational DBs", type: "SQL Server", volume: "21 tables", cadence: "Nightly incremental" },
      { name: "Market data", type: "REST API (paginated JSON)", volume: "~2M records/day", cadence: "Every 4 hours" },
      { name: "Partner files", type: "SFTP (CSV, fixed-width)", volume: "15 file types", cadence: "Event-based" },
    ],
    dataFlow: [
      { step: "Trigger", description: "Schedule and storage-event triggers start the master pipeline with a run context." },
      { step: "Lookup", description: "Active sources for the run's priority group are read from etl.IngestionControl." },
      { step: "Fan-out", description: "ForEach executes the matching child pipeline per source in parallel." },
      { step: "Copy", description: "Incremental sources query WHERE watermark > LastWatermark; output lands as Parquet." },
      { step: "Log & advance", description: "A stored procedure records row counts and advances the watermark only on success." },
      { step: "Alert", description: "Failures route to Teams and email with pipeline, activity and error message." },
    ],
    dataModel: {
      overview:
        "The framework's own model is operational: a control table describing sources and a log table capturing every run — the basis for SLA reporting.",
      facts: [
        { name: "etl.IngestionLog", grain: "One row per source table per pipeline run" },
        { name: "etl.PipelineRunSummary", grain: "One row per master pipeline run" },
      ],
      dimensions: [
        { name: "etl.IngestionControl", note: "Source, load type, watermark column, target path, priority" },
        { name: "etl.SourceSystem", note: "Connection metadata and owning team" },
        { name: "etl.LoadPriority", note: "Priority groups mapped to schedules and SLAs" },
      ],
    },
    etlProcess: [
      { phase: "Parameterised datasets", description: "One dataset per connector type with schema, table and path parameters — no per-table datasets." },
      { phase: "Watermark safety", description: "The new watermark is captured before the copy and only committed after success, so failures never skip data." },
      { phase: "Schema drift", description: "Parquet with schema captured per load; a nightly job compares schemas and flags added or removed columns." },
      { phase: "Retry policy", description: "Copy activities retry 3× with a 2-minute interval for transient network failures." },
    ],
    techStack: [
      { category: "Orchestration", items: ["Azure Data Factory", "Self-hosted IR", "Triggers"] },
      { category: "Storage", items: ["ADLS Gen2", "Parquet", "Azure SQL Database"] },
      { category: "Security", items: ["Managed identity", "Azure Key Vault", "RBAC"] },
      { category: "Monitoring", items: ["Log Analytics", "Azure Monitor", "Python SDK"] },
      { category: "DevOps", items: ["Git integration", "Azure DevOps YAML", "ARM templates"] },
    ],
    sqlExample: {
      title: "Control table and safe watermark advance (T-SQL)",
      code: `CREATE TABLE etl.IngestionControl (
    SourceId         INT IDENTITY(1,1) PRIMARY KEY,
    SourceSystem     VARCHAR(50)   NOT NULL,
    SourceSchema     VARCHAR(128)  NOT NULL,
    SourceTable      VARCHAR(128)  NOT NULL,
    LoadType         VARCHAR(12)   NOT NULL
                     CHECK (LoadType IN ('FULL', 'INCREMENTAL')),
    WatermarkColumn  VARCHAR(128)  NULL,
    LastWatermark    DATETIME2(3)  NULL,
    TargetPath       VARCHAR(400)  NOT NULL,
    PriorityGroup    TINYINT       NOT NULL DEFAULT 5,
    IsActive         BIT           NOT NULL DEFAULT 1
);
GO

-- Called by the final Stored Procedure activity of each child pipeline
CREATE OR ALTER PROCEDURE etl.usp_CompleteIngestion
    @SourceId       INT,
    @NewWatermark   DATETIME2(3),
    @RowsCopied     BIGINT,
    @PipelineRunId  UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRANSACTION;

        UPDATE etl.IngestionControl
        SET    LastWatermark = @NewWatermark
        WHERE  SourceId = @SourceId
          AND (LastWatermark IS NULL OR LastWatermark < @NewWatermark);

        INSERT INTO etl.IngestionLog
               (SourceId, PipelineRunId, RowsCopied, Watermark, Status, LoggedAt)
        VALUES (@SourceId, @PipelineRunId, @RowsCopied, @NewWatermark,
                'Succeeded', SYSUTCDATETIME());

    COMMIT TRANSACTION;
END;`,
    },
    pythonExample: {
      title: "Morning pipeline health report with the ADF SDK",
      code: `"""Lists failed and slow ADF pipeline runs from the last 24 hours."""
import os
from datetime import datetime, timedelta, timezone

from azure.identity import DefaultAzureCredential
from azure.mgmt.datafactory import DataFactoryManagementClient
from azure.mgmt.datafactory.models import RunFilterParameters

RESOURCE_GROUP = os.environ["ADF_RESOURCE_GROUP"]
FACTORY = os.environ["ADF_NAME"]
SLOW_THRESHOLD_MS = 30 * 60 * 1000

client = DataFactoryManagementClient(
    DefaultAzureCredential(), os.environ["AZURE_SUBSCRIPTION_ID"]
)

now = datetime.now(timezone.utc)
window = RunFilterParameters(
    last_updated_after=now - timedelta(hours=24),
    last_updated_before=now,
)

runs = client.pipeline_runs.query_by_factory(RESOURCE_GROUP, FACTORY, window).value
failed = [r for r in runs if r.status == "Failed"]
slow = [
    r for r in runs
    if r.status == "Succeeded" and (r.duration_in_ms or 0) > SLOW_THRESHOLD_MS
]

for run in failed:
    activities = client.activity_runs.query_by_pipeline_run(
        RESOURCE_GROUP, FACTORY, run.run_id, window
    ).value
    step = next((a for a in activities if a.status == "Failed"), None)
    message = (step.error or {}).get("message", "") if step else ""
    print(f"[FAILED] {run.pipeline_name} | activity={step.activity_name if step else 'n/a'}"
          f" | {message[:200]}")

for run in slow:
    print(f"[SLOW]   {run.pipeline_name} | {run.duration_in_ms / 60000:.1f} min")

success_rate = 1 - len(failed) / max(len(runs), 1)
print(f"Runs: {len(runs)} | Success rate: {success_rate:.2%}")`,
    },
    challenges: [
      {
        challenge: "Oracle extracts through the self-hosted IR saturated the gateway during peak hours.",
        solution: "Introduced priority groups and capped ForEach concurrency per group; heavy tables moved to an off-peak schedule.",
      },
      {
        challenge: "A failed copy previously advanced the watermark and silently skipped rows.",
        solution: "Captured the new watermark before the copy and committed it in the same transaction as the success log entry.",
      },
      {
        challenge: "The REST API returned inconsistent page sizes and occasional HTTP 429s.",
        solution: "Used ADF pagination rules with an end condition and a retry policy with back-off.",
      },
    ],
    performance: [
      { metric: "New source onboarding", before: "~3 days", after: "~30 min", improvement: "−98%" },
      { metric: "Pipelines to maintain", before: "70+", after: "6", improvement: "−91%" },
      { metric: "Hourly batch duration", before: "41 min", after: "14 min", improvement: "−66%" },
      { metric: "Mean time to detect failure", before: "Next business day", after: "< 5 min", improvement: "Real-time alerts" },
    ],
    businessImpact: [
      "Data requests delivered in the same sprint instead of queuing for weeks",
      "Every load is auditable: row counts, watermark and duration per table per run",
      "Incidents detected by the data team before report users notice",
      "Credentials removed from pipeline definitions — a finding closed in the security audit",
    ],
    lessonsLearned: [
      "Invest in the framework once; the second and hundredth source should be configuration, not code.",
      "Watermarks must only advance after a confirmed success — ordering matters.",
      "Monitoring is part of the product. A pipeline without alerting is not finished.",
    ],
    successMetrics: [
      { label: "Tables under framework", value: "60+", description: "Across four source types" },
      { label: "Pipeline success rate", value: "99.4%", description: "Trailing 12 months" },
      { label: "Daily rows ingested", value: "~45M", description: "Incremental, not full reloads" },
      { label: "Alert to triage", value: "< 15 min", description: "Median during business hours" },
    ],
  },

  // ───────────────────────────────────────────── 3
  {
    slug: "microsoft-fabric-lakehouse",
    index: "03",
    title: "Microsoft Fabric Lakehouse Solution",
    tagline: "A OneLake lakehouse with Direct Lake reporting that removed slow imports and duplicated datasets.",
    domain: "Manufacturing",
    duration: "4 months",
    role: "Data Engineer — lakehouse build, notebooks, semantic model",
    highlights: [
      { label: "Report refresh", value: "45 min → seconds" },
      { label: "Datasets merged", value: "9 → 1" },
      { label: "Capacity cost", value: "−28%" },
    ],
    executiveSummary:
      "Implemented a Microsoft Fabric lakehouse that unifies ERP, production and spreadsheet-based planning data in OneLake using a bronze/silver/gold layout. Gold Delta tables feed a single Direct Lake semantic model, so reports read the lakehouse directly with no scheduled import refreshes.",
    businessProblem: {
      context:
        "Nine Power BI import datasets each pulled the same ERP tables with their own Power Query logic. Refreshes took up to 45 minutes, frequently timed out, and margin figures differed between reports.",
      painPoints: [
        "Duplicated transformation logic across nine datasets",
        "Refresh failures every week during month-end",
        "Planning data maintained in SharePoint Excel files with no validation",
        "No reusable, queryable layer for analysts outside Power BI",
      ],
    },
    architecture: {
      overview:
        "A single Fabric workspace per environment with a lakehouse for bronze/silver, a warehouse for gold serving tables, and a Direct Lake semantic model on top.",
      layers: [
        { name: "Ingestion", description: "Fabric Data pipelines copy ERP and Azure SQL data; Dataflows Gen2 ingest SharePoint planning files." },
        { name: "Bronze (Files)", description: "Raw extracts in OneLake Files, partitioned by load date — immutable and replayable." },
        { name: "Silver (Delta tables)", description: "PySpark notebooks type, cleanse, deduplicate and MERGE into Delta tables." },
        { name: "Gold (Warehouse)", description: "T-SQL builds conformed dimensions and aggregated facts as Delta tables in the Fabric Warehouse." },
        { name: "Semantic (Direct Lake)", description: "One semantic model reads gold Delta tables directly — no import, no duplicate copies." },
      ],
    },
    sourceSystems: [
      { name: "ERP", type: "Azure SQL Database", volume: "~12M invoice lines", cadence: "Every 2 hours" },
      { name: "Production (MES)", type: "SQL Server via gateway", volume: "~3M events / month", cadence: "Nightly" },
      { name: "Planning", type: "SharePoint Excel", volume: "24 workbooks", cadence: "On change" },
      { name: "Reference data", type: "CSV in OneLake", volume: "Currencies, plants, calendars", cadence: "Weekly" },
    ],
    dataFlow: [
      { step: "Land", description: "Pipelines copy changed records to Files/bronze/<source>/<load_date>/." },
      { step: "Standardise", description: "Notebooks apply explicit schemas, cast types and reject malformed rows to a quarantine table." },
      { step: "Merge", description: "Delta MERGE upserts into silver tables keyed on business keys." },
      { step: "Model", description: "Warehouse T-SQL builds gold dimensions and facts with CTAS." },
      { step: "Serve", description: "Direct Lake semantic model picks up new data on framing — no refresh window." },
    ],
    dataModel: {
      overview: "A gold star schema designed specifically for Direct Lake: narrow fact tables, integer keys and pre-aggregated profitability.",
      facts: [
        { name: "fact_sales", grain: "One row per invoice line" },
        { name: "fact_customer_profitability", grain: "One row per customer per month" },
        { name: "fact_production_output", grain: "One row per work order per day" },
      ],
      dimensions: [
        { name: "dim_customer", note: "SCD Type 2, current-row flag for reporting" },
        { name: "dim_product", note: "Product → family → category hierarchy" },
        { name: "dim_plant", note: "Plant, region and capacity attributes" },
        { name: "dim_date", note: "Fiscal calendar with working-day flags" },
      ],
    },
    etlProcess: [
      { phase: "Notebook parameters", description: "A parameter cell receives the load date from the pipeline, making every run replayable for any date." },
      { phase: "Quarantine pattern", description: "Rows failing schema or business rules are written to a quarantine table with a reason code rather than dropped." },
      { phase: "Table maintenance", description: "Weekly OPTIMIZE and V-Order keep file counts low for fast Direct Lake reads." },
      { phase: "Deployment", description: "Fabric Git integration and deployment pipelines promote dev → test → prod." },
    ],
    techStack: [
      { category: "Platform", items: ["Microsoft Fabric", "OneLake", "Lakehouse", "Warehouse"] },
      { category: "Processing", items: ["PySpark notebooks", "Delta Lake", "Dataflows Gen2", "T-SQL"] },
      { category: "Orchestration", items: ["Fabric Data pipelines", "On-premises data gateway"] },
      { category: "Consumption", items: ["Direct Lake semantic model", "Power BI", "DAX"] },
      { category: "DevOps", items: ["Fabric Git integration", "Deployment pipelines"] },
    ],
    sqlExample: {
      title: "Gold profitability fact with CTAS (Fabric Warehouse T-SQL)",
      code: `-- Materialised as a Delta table so the Direct Lake model reads it natively.
-- (Views would force a DirectQuery fallback.)
DROP TABLE IF EXISTS gold.fact_customer_profitability;

CREATE TABLE gold.fact_customer_profitability
AS
SELECT  c.customer_key,
        CAST(FORMAT(s.invoice_date, 'yyyyMM') AS INT)   AS month_key,
        SUM(s.net_revenue)                              AS net_revenue,
        SUM(s.cost_of_goods)                            AS cost_of_goods,
        SUM(s.net_revenue) - SUM(s.cost_of_goods)       AS gross_margin,
        CAST((SUM(s.net_revenue) - SUM(s.cost_of_goods))
             / NULLIF(SUM(s.net_revenue), 0) AS DECIMAL(9, 4)) AS gross_margin_pct,
        COUNT(DISTINCT s.invoice_id)                    AS invoices
FROM    lh_silver.dbo.sales_invoice_lines AS s
JOIN    gold.dim_customer                 AS c
        ON  c.customer_id = s.customer_id
        AND s.invoice_date >= c.valid_from
        AND s.invoice_date <  c.valid_to
GROUP BY c.customer_key,
         CAST(FORMAT(s.invoice_date, 'yyyyMM') AS INT);`,
    },
    pythonExample: {
      title: "Bronze → silver MERGE in a Fabric PySpark notebook",
      code: `# Parameter cell — overridden by the Fabric pipeline at run time
load_date = "2026-10-01"

from delta.tables import DeltaTable
from pyspark.sql import functions as F, types as T

schema = T.StructType([
    T.StructField("InvoiceId", T.LongType()),
    T.StructField("LineNo", T.IntegerType()),
    T.StructField("CustomerId", T.IntegerType()),
    T.StructField("InvoiceDate", T.DateType()),
    T.StructField("NetRevenue", T.DecimalType(18, 2)),
    T.StructField("CostOfGoods", T.DecimalType(18, 2)),
])

raw = (spark.read
       .option("header", True)
       .option("dateFormat", "yyyy-MM-dd")
       .schema(schema)
       .csv(f"Files/bronze/erp/invoice_lines/{load_date}/"))

is_valid = (F.col("InvoiceId").isNotNull()
            & F.col("InvoiceDate").isNotNull()
            & (F.col("NetRevenue") >= 0))

valid = (raw.where(is_valid)
            .dropDuplicates(["InvoiceId", "LineNo"])
            .withColumn("_load_date", F.lit(load_date).cast("date"))
            .withColumn("_ingested_at", F.current_timestamp()))

(raw.where(~is_valid)
    .withColumn("_reason", F.lit("failed_validation"))
    .withColumn("_load_date", F.lit(load_date).cast("date"))
    .write.mode("append").saveAsTable("quarantine_invoice_lines"))

(DeltaTable.forName(spark, "sales_invoice_lines").alias("t")
    .merge(valid.alias("s"), "t.InvoiceId = s.InvoiceId AND t.LineNo = s.LineNo")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute())

print(f"Merged {valid.count():,} rows for {load_date}")`,
    },
    challenges: [
      {
        challenge: "The first gold layer used SQL views, and Direct Lake fell back to DirectQuery.",
        solution: "Materialised gold as Delta tables with CTAS so the semantic model stays in Direct Lake mode.",
      },
      {
        challenge: "Excel planning files changed structure without notice.",
        solution: "Dataflows Gen2 with explicit column mapping plus a schema-check notebook that fails fast with a clear message.",
      },
      {
        challenge: "Many small files from frequent loads slowed queries.",
        solution: "Scheduled OPTIMIZE with V-Order and tuned load frequency to produce fewer, larger files.",
      },
    ],
    performance: [
      { metric: "Report data latency", before: "45 min refresh", after: "Seconds (Direct Lake)", improvement: "No refresh window" },
      { metric: "Semantic models", before: "9", after: "1", improvement: "−89%" },
      { metric: "Silver notebook runtime", before: "18 min", after: "6 min", improvement: "−67%" },
      { metric: "Fabric capacity usage", before: "Baseline", after: "−28%", improvement: "−28%" },
    ],
    businessImpact: [
      "One margin definition used by every report, ending month-end disputes",
      "Planning data validated and joined to actuals for the first time",
      "Analysts can query gold tables with SQL — not only through Power BI",
      "Month-end refresh failures eliminated",
    ],
    lessonsLearned: [
      "Design gold for the consumer: Direct Lake rewards narrow tables and materialised outputs.",
      "Quarantine, don't drop — rejected rows are evidence for the data owner.",
      "Fabric Git integration from day one avoids painful manual promotion later.",
    ],
    successMetrics: [
      { label: "Refresh failures / month", value: "0", description: "Down from 4–6" },
      { label: "Report users onboarded", value: "95", description: "Across 3 plants" },
      { label: "Quarantined rows", value: "< 0.2%", description: "Each with a reason code" },
      { label: "Time to new KPI", value: "1 day", description: "Previously 1–2 weeks" },
    ],
  },

  // ───────────────────────────────────────────── 4
  {
    slug: "databricks-medallion-architecture",
    index: "04",
    title: "Databricks Medallion Architecture",
    tagline: "Bronze, silver and gold Delta Lake layers on Databricks with Auto Loader, Unity Catalog and liquid clustering.",
    domain: "E-commerce",
    duration: "4 months",
    role: "Data Engineer — PySpark development, Delta optimisation, governance",
    highlights: [
      { label: "Events / day", value: "~25M" },
      { label: "Compute cost", value: "−38%" },
      { label: "Gold freshness", value: "24h → 1h" },
    ],
    executiveSummary:
      "Delivered a medallion lakehouse on Azure Databricks for clickstream and order data. Auto Loader ingests JSON events incrementally into bronze, PySpark streams cleanse and deduplicate into silver, and gold tables power product, funnel and marketing analytics — all governed in Unity Catalog.",
    businessProblem: {
      context:
        "Clickstream data was processed by a nightly batch job that re-read the entire raw folder every run. Costs grew with data volume, analytics were a day behind, and nobody could say which tables were safe to use.",
      painPoints: [
        "Full reprocessing of raw files every night",
        "Duplicate events inflating conversion metrics",
        "Small-file problem slowing every downstream query",
        "No access control or lineage across 200+ tables",
      ],
    },
    architecture: {
      overview:
        "A Unity Catalog metastore with bronze, silver and gold schemas per domain; Databricks Workflows orchestrate incremental streaming jobs with availableNow triggers.",
      layers: [
        { name: "Bronze", description: "Auto Loader ingests raw JSON with schema evolution; adds file path and ingestion timestamp. Append-only." },
        { name: "Silver", description: "Typed, deduplicated, conformed events via foreachBatch MERGE; data expectations enforced." },
        { name: "Gold", description: "Business aggregates — product performance, funnel, cohort — with liquid clustering." },
        { name: "Governance", description: "Unity Catalog grants by group, column masks on PII, automatic lineage." },
        { name: "Serving", description: "Databricks SQL Warehouse for Power BI and analysts." },
      ],
    },
    sourceSystems: [
      { name: "Web & app events", type: "JSON files in ADLS Gen2", volume: "~25M events / day", cadence: "Continuous landing" },
      { name: "Orders", type: "PostgreSQL CDC export", volume: "~120K orders / day", cadence: "Every 15 min" },
      { name: "Product catalogue", type: "REST API", volume: "~80K SKUs", cadence: "Hourly" },
      { name: "Marketing spend", type: "CSV exports", volume: "6 channels", cadence: "Daily" },
    ],
    dataFlow: [
      { step: "Auto Loader", description: "New files discovered incrementally; schema inferred and evolved safely." },
      { step: "Bronze append", description: "Raw payload stored with lineage columns for replay and audit." },
      { step: "Silver MERGE", description: "foreachBatch deduplicates on event_id and upserts typed records." },
      { step: "Gold refresh", description: "INSERT … REPLACE WHERE rebuilds only the affected recent dates." },
      { step: "Maintain", description: "Predictive optimisation and OPTIMIZE keep file sizes healthy." },
      { step: "Serve", description: "SQL Warehouse endpoints back Power BI and ad-hoc analysis." },
    ],
    dataModel: {
      overview: "Silver is modelled as clean, conformed entities; gold is modelled for consumption as aggregates and star schemas.",
      facts: [
        { name: "gold.daily_product_performance", grain: "One row per product per day" },
        { name: "gold.funnel_sessions", grain: "One row per session" },
        { name: "silver.events", grain: "One row per unique event" },
      ],
      dimensions: [
        { name: "gold.dim_product", note: "From catalogue API, SCD Type 2" },
        { name: "gold.dim_channel", note: "Marketing channel and campaign" },
        { name: "gold.dim_date", note: "Shared calendar" },
      ],
    },
    etlProcess: [
      { phase: "Incremental by default", description: "Checkpointed streams with availableNow triggers process only new data, then shut down to save cost." },
      { phase: "Idempotent silver", description: "MERGE on event_id makes reprocessing safe after a failure or a replay." },
      { phase: "Targeted gold rebuilds", description: "REPLACE WHERE overwrites only the last three days, absorbing late events cheaply." },
      { phase: "Job clusters & policies", description: "Workflows run on job clusters with cluster policies and spot instances for workers." },
    ],
    techStack: [
      { category: "Platform", items: ["Azure Databricks", "Unity Catalog", "Workflows"] },
      { category: "Processing", items: ["PySpark", "Auto Loader", "Structured Streaming", "Spark SQL"] },
      { category: "Storage", items: ["Delta Lake", "ADLS Gen2", "Liquid clustering"] },
      { category: "Serving", items: ["Databricks SQL Warehouse", "Power BI"] },
      { category: "DevOps", items: ["Databricks Asset Bundles", "Git folders", "Azure DevOps"] },
    ],
    sqlExample: {
      title: "Incremental gold table with REPLACE WHERE (Databricks SQL)",
      code: `CREATE TABLE IF NOT EXISTS lakehouse.gold.daily_product_performance (
  event_date       DATE,
  product_id       STRING,
  sessions         BIGINT,
  add_to_cart      BIGINT,
  purchases        BIGINT,
  revenue          DECIMAL(18, 2),
  conversion_rate  DOUBLE
)
CLUSTER BY (event_date, product_id);

-- Rebuild only the last 3 days so late-arriving events are absorbed
INSERT INTO lakehouse.gold.daily_product_performance
REPLACE WHERE event_date >= date_sub(current_date(), 3)
SELECT  event_date,
        product_id,
        COUNT(DISTINCT session_id)                                   AS sessions,
        COUNT_IF(event_type = 'add_to_cart')                         AS add_to_cart,
        COUNT_IF(event_type = 'purchase')                            AS purchases,
        CAST(SUM(IF(event_type = 'purchase', amount, 0)) AS DECIMAL(18, 2)) AS revenue,
        COUNT_IF(event_type = 'purchase')
          / NULLIF(COUNT(DISTINCT session_id), 0)                    AS conversion_rate
FROM    lakehouse.silver.events
WHERE   event_date >= date_sub(current_date(), 3)
  AND   product_id IS NOT NULL
GROUP BY event_date, product_id;

OPTIMIZE lakehouse.gold.daily_product_performance;`,
    },
    pythonExample: {
      title: "Auto Loader to bronze, idempotent MERGE to silver (PySpark)",
      code: `from delta.tables import DeltaTable
from pyspark.sql import functions as F

CATALOG = "lakehouse"
RAW = "abfss://raw@stlakehouseprod.dfs.core.windows.net/app_events/"
CHK = "abfss://checkpoints@stlakehouseprod.dfs.core.windows.net/app_events"

# ── Bronze: incremental file ingestion with schema evolution
(spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", f"{CHK}/schema")
    .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
    .load(RAW)
    .withColumn("_source_file", F.col("_metadata.file_path"))
    .withColumn("_ingested_at", F.current_timestamp())
    .writeStream
    .option("checkpointLocation", f"{CHK}/bronze")
    .trigger(availableNow=True)
    .toTable(f"{CATALOG}.bronze.app_events")
    .awaitTermination())


# ── Silver: typed, deduplicated, idempotent upsert
def upsert_events(batch_df, batch_id: int) -> None:
    events = (batch_df
        .where(F.col("event_id").isNotNull())
        .select(
            "event_id", "session_id", "event_type", "product_id",
            F.to_timestamp("event_time").alias("event_ts"),
            F.to_date(F.to_timestamp("event_time")).alias("event_date"),
            F.col("amount").cast("decimal(18,2)").alias("amount"),
        )
        .dropDuplicates(["event_id"]))

    (DeltaTable.forName(spark, f"{CATALOG}.silver.events").alias("t")
        .merge(events.alias("s"), "t.event_id = s.event_id")
        .whenNotMatchedInsertAll()
        .execute())


(spark.readStream.table(f"{CATALOG}.bronze.app_events")
    .writeStream
    .foreachBatch(upsert_events)
    .option("checkpointLocation", f"{CHK}/silver")
    .trigger(availableNow=True)
    .start()
    .awaitTermination())`,
    },
    challenges: [
      {
        challenge: "Mobile clients retried requests, producing duplicate events and inflated conversion.",
        solution: "Deduplicated on event_id within each micro-batch and with a MERGE against silver, making the pipeline idempotent.",
      },
      {
        challenge: "Millions of small JSON files slowed both ingestion and queries.",
        solution: "Auto Loader with file notification mode for discovery, plus OPTIMIZE and liquid clustering on silver and gold.",
      },
      {
        challenge: "Analysts had broad access to tables containing email addresses.",
        solution: "Unity Catalog column masks on PII and group-based grants per schema, with lineage used to find every downstream copy.",
      },
    ],
    performance: [
      { metric: "Daily compute cost", before: "Baseline", after: "−38%", improvement: "−38%" },
      { metric: "Gold data freshness", before: "24 h", after: "1 h", improvement: "24× fresher" },
      { metric: "Funnel query (P95)", before: "52 s", after: "6 s", improvement: "−88%" },
      { metric: "Average file size (silver)", before: "1.8 MB", after: "~250 MB", improvement: "Healthy" },
    ],
    businessImpact: [
      "Conversion metrics corrected by removing duplicate events (previously overstated by ~3%)",
      "Merchandising sees product performance hourly instead of the next day",
      "PII exposure removed for analyst groups without blocking their work",
      "Lower cost per processed event even as volume doubled",
    ],
    lessonsLearned: [
      "Incremental processing is a design decision, not an optimisation to add later.",
      "Idempotency is what makes streaming operable — make every write safe to replay.",
      "Unity Catalog lineage pays for itself the first time you need to answer 'where is this column used?'.",
    ],
    successMetrics: [
      { label: "Events processed / day", value: "~25M", description: "Bronze to gold" },
      { label: "Duplicate rate in silver", value: "0%", description: "Enforced by MERGE on event_id" },
      { label: "Tables governed", value: "200+", description: "Under Unity Catalog" },
      { label: "Job success rate", value: "99.6%", description: "Workflows, trailing 90 days" },
    ],
  },

  // ───────────────────────────────────────────── 5
  {
    slug: "real-time-analytics-platform",
    index: "05",
    title: "Real-Time Analytics Platform",
    tagline: "Streaming order telemetry from Event Hubs to live operational dashboards in under a minute.",
    domain: "Logistics & Fulfilment",
    duration: "3 months",
    role: "Data Engineer — streaming pipeline, serving layer, alerting",
    highlights: [
      { label: "Latency", value: "T+1 day → < 60s" },
      { label: "Events / sec", value: "~1,500 peak" },
      { label: "SLA breaches", value: "−31%" },
    ],
    executiveSummary:
      "Built a streaming analytics platform for a fulfilment operation: order and warehouse events flow through Azure Event Hubs into Databricks Structured Streaming, are aggregated into one-minute windows in Delta Lake, and power a live Power BI operations dashboard with threshold alerts.",
    businessProblem: {
      context:
        "Operations managers saw yesterday's order backlog in a morning report. By the time a fulfilment bottleneck was visible, delivery SLAs had already been missed.",
      painPoints: [
        "No intraday visibility of order throughput or backlog",
        "Bottlenecks discovered after SLAs were breached",
        "Batch reports unable to show per-region trends within the day",
        "No historical event store for root-cause analysis",
      ],
    },
    architecture: {
      overview:
        "A hot path for real-time aggregates and a cold path that archives every raw event, both fed by the same Event Hubs stream.",
      layers: [
        { name: "Producers", description: "Order service and warehouse scanners publish JSON events to Event Hubs." },
        { name: "Event broker", description: "Azure Event Hubs (Kafka endpoint), 8 partitions, Capture to ADLS for the cold path." },
        { name: "Stream processing", description: "Structured Streaming parses, deduplicates within a watermark and aggregates 1-minute windows." },
        { name: "Hot store", description: "Delta tables for per-minute metrics, served through a Databricks SQL Warehouse." },
        { name: "Consumption", description: "Power BI dashboard on a 30-second page refresh, plus threshold alerts to Teams." },
      ],
    },
    sourceSystems: [
      { name: "Order service", type: "Event Hubs (JSON)", volume: "~1,500 events/sec peak", cadence: "Streaming" },
      { name: "Warehouse scanners", type: "Event Hubs (JSON)", volume: "~600 events/sec", cadence: "Streaming" },
      { name: "Carrier status", type: "Webhook → Event Hubs", volume: "~90K updates/day", cadence: "Streaming" },
      { name: "Region & SLA reference", type: "Delta table", volume: "Small", cadence: "Daily" },
    ],
    dataFlow: [
      { step: "Publish", description: "Services publish events with order_id, region and timestamps." },
      { step: "Ingest", description: "Spark reads Event Hubs through its Kafka-compatible endpoint." },
      { step: "Parse & dedupe", description: "JSON parsed against a fixed schema; duplicates removed within a 2-minute watermark." },
      { step: "Aggregate", description: "Tumbling one-minute windows per region: orders, revenue, fulfilment time." },
      { step: "Serve", description: "Append to a Delta metrics table; a view adds rolling baselines." },
      { step: "Alert", description: "A scheduled query flags regions whose throughput drops below baseline." },
    ],
    dataModel: {
      overview: "A narrow time-series model optimised for 'last two hours' queries, plus the raw archive for replay.",
      facts: [
        { name: "gold.order_metrics_1m", grain: "One row per region per minute" },
        { name: "silver.order_events", grain: "One row per unique event" },
        { name: "bronze.order_events_archive", grain: "Raw Event Hubs Capture (Avro)" },
      ],
      dimensions: [
        { name: "dim_region", note: "Region, warehouse and SLA thresholds" },
        { name: "dim_carrier", note: "Carrier and service level" },
      ],
    },
    etlProcess: [
      { phase: "Exactly-once sinks", description: "Checkpointed Delta writes give end-to-end exactly-once semantics for the aggregates." },
      { phase: "Late data handling", description: "A 2-minute watermark balances completeness and latency; later events land in the cold path." },
      { phase: "Backfill", description: "Captured Avro files can be replayed through the same transformation code in batch mode." },
      { phase: "Operational guardrails", description: "Streaming query listener metrics (input rate, batch duration) are logged and alerted on." },
    ],
    techStack: [
      { category: "Streaming", items: ["Azure Event Hubs", "Kafka protocol", "Event Hubs Capture"] },
      { category: "Processing", items: ["Databricks", "Structured Streaming", "PySpark"] },
      { category: "Storage", items: ["Delta Lake", "ADLS Gen2"] },
      { category: "Serving", items: ["Databricks SQL Warehouse", "Power BI", "Teams alerts"] },
      { category: "Security", items: ["Databricks secret scopes", "Key Vault", "Private endpoints"] },
    ],
    sqlExample: {
      title: "Live KPI view with a rolling baseline (Databricks SQL)",
      code: `CREATE OR REPLACE VIEW lakehouse.gold.v_live_order_kpis AS
SELECT  m.window_start,
        m.region,
        m.orders,
        m.revenue,
        m.avg_fulfilment_sec,
        AVG(m.orders) OVER (
            PARTITION BY m.region
            ORDER BY m.window_start
            ROWS BETWEEN 15 PRECEDING AND 1 PRECEDING
        )                                               AS orders_baseline_15m,
        r.sla_fulfilment_sec,
        m.avg_fulfilment_sec > r.sla_fulfilment_sec     AS sla_at_risk
FROM    lakehouse.gold.order_metrics_1m AS m
JOIN    lakehouse.gold.dim_region       AS r
        ON r.region = m.region
WHERE   m.window_start >= current_timestamp() - INTERVAL 2 HOURS;`,
    },
    pythonExample: {
      title: "Event Hubs → 1-minute windowed metrics (Structured Streaming)",
      code: `from pyspark.sql import functions as F, types as T

NAMESPACE = "evhns-orders-prod"
TOPIC = "orders"
connection = dbutils.secrets.get(scope="streaming", key="eventhub-orders-listen")

kafka_options = {
    "kafka.bootstrap.servers": f"{NAMESPACE}.servicebus.windows.net:9093",
    "subscribe": TOPIC,
    "kafka.security.protocol": "SASL_SSL",
    "kafka.sasl.mechanism": "PLAIN",
    "kafka.sasl.jaas.config": (
        "kafkashaded.org.apache.kafka.common.security.plain.PlainLoginModule required "
        f'username="$ConnectionString" password="{connection}";'
    ),
    "startingOffsets": "latest",
    "failOnDataLoss": "false",
}

schema = T.StructType([
    T.StructField("order_id", T.StringType()),
    T.StructField("region", T.StringType()),
    T.StructField("amount", T.DecimalType(18, 2)),
    T.StructField("created_at", T.TimestampType()),
    T.StructField("fulfilled_at", T.TimestampType()),
])

orders = (spark.readStream.format("kafka").options(**kafka_options).load()
    .select(F.from_json(F.col("value").cast("string"), schema).alias("o"))
    .select("o.*")
    .withWatermark("created_at", "2 minutes")
    .dropDuplicatesWithinWatermark(["order_id"]))

fulfilment_sec = F.col("fulfilled_at").cast("long") - F.col("created_at").cast("long")

metrics = (orders
    .groupBy(F.window("created_at", "1 minute"), "region")
    .agg(F.count("*").alias("orders"),
         F.sum("amount").alias("revenue"),
         F.avg(fulfilment_sec).alias("avg_fulfilment_sec"))
    .select(F.col("window.start").alias("window_start"),
            "region", "orders", "revenue", "avg_fulfilment_sec"))

(metrics.writeStream
    .outputMode("append")
    .option("checkpointLocation", "/Volumes/lakehouse/ops/checkpoints/order_metrics_1m")
    .trigger(processingTime="10 seconds")
    .toTable("lakehouse.gold.order_metrics_1m"))`,
    },
    challenges: [
      {
        challenge: "Choosing a watermark: too short dropped late events, too long delayed every window.",
        solution: "Measured event lateness for two weeks; 2 minutes covered 99.7% of events, with the cold path catching the rest.",
      },
      {
        challenge: "Producers retried on timeouts and sent duplicate events.",
        solution: "dropDuplicatesWithinWatermark on order_id keeps state bounded while removing retries.",
      },
      {
        challenge: "Dashboard queries competed with streaming writes for resources.",
        solution: "Separated compute: streaming on a dedicated job cluster, reads on a serverless SQL Warehouse.",
      },
    ],
    performance: [
      { metric: "Data latency to dashboard", before: "T+1 day", after: "< 60 s", improvement: "Real-time" },
      { metric: "Micro-batch duration (P95)", before: "22 s", after: "7 s", improvement: "−68%" },
      { metric: "Dashboard query (P95)", before: "9 s", after: "1.4 s", improvement: "−84%" },
      { metric: "Streaming state size", before: "Unbounded", after: "Bounded by watermark", improvement: "Stable" },
    ],
    businessImpact: [
      "Operations react to bottlenecks within minutes instead of the next morning",
      "Delivery SLA breaches reduced by 31% in the first quarter after launch",
      "Every raw event archived and replayable for root-cause analysis",
      "Foundation reused for carrier performance and warehouse labour planning",
    ],
    lessonsLearned: [
      "Measure lateness in your actual data before choosing a watermark.",
      "Keep a cold path — real-time systems still need replay and backfill.",
      "Separate streaming and serving compute so neither degrades the other.",
    ],
    successMetrics: [
      { label: "End-to-end latency", value: "< 60 s", description: "Event to dashboard" },
      { label: "Stream uptime", value: "99.9%", description: "Trailing 90 days" },
      { label: "SLA breaches", value: "−31%", description: "Quarter after launch" },
      { label: "Events retained", value: "100%", description: "Via Event Hubs Capture" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
