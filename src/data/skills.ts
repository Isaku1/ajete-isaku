// Proficiency is a self-assessment on a 0–100 scale:
// 80+ Advanced · 70–79 Proficient · 60–69 Working knowledge · <60 Developing

export type Skill = { name: string; level: number; context: string };
export type SkillCategory = {
  id: "programming" | "engineering" | "cloud" | "database" | "analytics" | "architecture" | "practices";
  title: string;
  short: string;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    short: "Code",
    description: "The languages every pipeline, model and check is written in.",
    skills: [
      { name: "SQL", level: 86, context: "T-SQL, PL/SQL, window functions, CTEs, MERGE, query tuning" },
      { name: "Python", level: 72, context: "pandas, PySpark, automation, API ingestion, data validation" },
    ],
  },
  {
    id: "engineering",
    title: "Data Engineering",
    short: "Pipelines",
    description: "Moving, transforming and serving data at production reliability.",
    skills: [
      { name: "ETL", level: 82, context: "Incremental loads, staging patterns, SCD handling, error logging" },
      { name: "ELT", level: 76, context: "Load-then-transform in warehouse and lakehouse engines" },
      { name: "Apache Spark", level: 62, context: "DataFrames, partitioning, joins, caching, Spark UI analysis" },
      { name: "PySpark", level: 65, context: "Transformations, Delta MERGE, Structured Streaming basics" },
      { name: "Databricks", level: 62, context: "Notebooks, Workflows, Auto Loader, Delta Lake, Unity Catalog" },
      { name: "Microsoft Fabric", level: 66, context: "Lakehouse, Warehouse, pipelines, notebooks, Direct Lake" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    short: "Azure",
    description: "Building on the Azure data platform end to end.",
    skills: [
      { name: "Azure", level: 70, context: "ADLS Gen2, Key Vault, managed identities, resource organisation" },
      { name: "Azure Data Factory", level: 78, context: "Metadata-driven pipelines, ForEach, triggers, monitoring" },
      { name: "Azure Synapse Analytics", level: 58, context: "Dedicated & serverless SQL pools, distribution strategy" },
    ],
  },
  {
    id: "database",
    title: "Databases",
    short: "Storage",
    description: "Relational engines and analytical warehouses.",
    skills: [
      { name: "SQL Server", level: 84, context: "Stored procedures, indexing, columnstore, execution plans" },
      { name: "Oracle SQL", level: 78, context: "Source extraction, PL/SQL, analytic functions" },
      { name: "Data Warehousing", level: 80, context: "Staging → integration → presentation layer design" },
      { name: "Snowflake", level: 56, context: "Virtual warehouses, stages, COPY INTO, time travel" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    short: "BI",
    description: "Where data becomes decisions.",
    skills: [
      { name: "Power BI", level: 80, context: "Star-schema semantic models, DAX measures, RLS, incremental refresh" },
    ],
  },
  {
    id: "architecture",
    title: "Data Architecture",
    short: "Design",
    description: "Patterns that keep platforms understandable as they grow.",
    skills: [
      { name: "Kimball Methodology", level: 80, context: "Bus matrix, grain declaration, conformed dimensions" },
      { name: "Star Schema", level: 84, context: "Fact/dimension design, surrogate keys, role-playing dates" },
      { name: "Snowflake Schema", level: 75, context: "Normalised hierarchies and when not to use them" },
      { name: "Delta Lake", level: 64, context: "ACID tables, MERGE, time travel, OPTIMIZE, clustering" },
      { name: "Medallion Architecture", level: 72, context: "Bronze / Silver / Gold contracts and ownership" },
    ],
  },
  {
    id: "practices",
    title: "Engineering Practices",
    short: "Ops",
    description: "What keeps a platform healthy after go-live.",
    skills: [
      { name: "Git", level: 74, context: "Branching, pull requests, code review, versioned SQL" },
      { name: "Azure DevOps", level: 62, context: "Repos, boards, YAML pipelines for ADF and database deploys" },
      { name: "Data Quality", level: 76, context: "Rule frameworks, reconciliation, anomaly checks, scorecards" },
      { name: "Data Governance", level: 62, context: "Ownership, lineage, access control, PII handling" },
      { name: "Performance Optimization", level: 74, context: "Plans, indexing, partitioning, file sizing, cost tuning" },
    ],
  },
];

export const toolkitCount = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);
