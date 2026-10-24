// Dashboard figures. Replace with your own tracked numbers — every value here is shown publicly.

export type Kpi = {
  id: "projects" | "pipelines" | "queries" | "data" | "performance" | "quality" | "reliability" | "adoption";
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  caption: string;
  trend: number[];
};

export const kpis: Kpi[] = [
  {
    id: "projects",
    label: "Projects Delivered",
    value: 12,
    delta: "+5 in the last 12 months",
    caption: "Warehouse, pipeline and reporting deliveries",
    trend: [7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
  },
  {
    id: "pipelines",
    label: "ETL Pipelines Built",
    value: 45,
    suffix: "+",
    delta: "+19 in the last 12 months",
    caption: "Batch and incremental pipelines in production",
    trend: [26, 28, 29, 31, 33, 35, 36, 38, 40, 42, 44, 45],
  },
  {
    id: "queries",
    label: "SQL Queries Optimized",
    value: 120,
    suffix: "+",
    delta: "+48 in the last 12 months",
    caption: "Procedures, views and report queries tuned",
    trend: [72, 76, 80, 84, 88, 93, 98, 103, 108, 112, 117, 120],
  },
  {
    id: "data",
    label: "Data Processed",
    value: 1.8,
    decimals: 1,
    suffix: " TB/mo",
    delta: "2× vs. a year ago",
    caption: "Across warehouse and lakehouse loads",
    trend: [0.9, 1.0, 1.05, 1.1, 1.2, 1.3, 1.35, 1.45, 1.5, 1.6, 1.7, 1.8],
  },
  {
    id: "performance",
    label: "Performance Improvement",
    value: 62,
    suffix: "%",
    delta: "Avg. runtime reduction",
    caption: "Measured before vs. after tuning",
    trend: [31, 35, 38, 42, 45, 48, 51, 54, 56, 58, 60, 62],
  },
  {
    id: "quality",
    label: "Data Quality Score",
    value: 98.7,
    decimals: 1,
    suffix: "%",
    delta: "+7.7 pts since baseline",
    caption: "Rules passed across monitored tables",
    trend: [91.0, 92.4, 93.5, 94.6, 95.3, 96.1, 96.8, 97.4, 97.9, 98.3, 98.5, 98.7],
  },
  {
    id: "reliability",
    label: "Pipeline Reliability",
    value: 99.4,
    decimals: 1,
    suffix: "%",
    delta: "Above 99% SLA target",
    caption: "Successful runs, trailing 12 months",
    trend: [98.1, 98.4, 98.2, 98.9, 99.0, 99.1, 99.3, 99.2, 99.5, 99.4, 99.6, 99.4],
  },
  {
    id: "adoption",
    label: "Dashboard Adoption",
    value: 85,
    suffix: "%",
    delta: "+23 pts after model redesign",
    caption: "Weekly active vs. licensed report users",
    trend: [62, 64, 66, 69, 71, 74, 76, 78, 80, 82, 84, 85],
  },
];

export const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export const monthlyOps = months.map((month, i) => ({
  month,
  reliability: kpis[6].trend[i],
  dataTb: kpis[3].trend[i],
}));

export const queryTuning = [
  { workload: "Sales reporting", before: 48, after: 3.1 },
  { workload: "Customer 360", before: 64, after: 9.5 },
  { workload: "Ops dashboard", before: 35, after: 4.2 },
  { workload: "Inventory snapshot", before: 126, after: 22 },
  { workload: "Finance close", before: 210, after: 41 },
];

export const qualityDimensions = [
  { dimension: "Uniqueness", score: 99.8 },
  { dimension: "Completeness", score: 99.2 },
  { dimension: "Consistency", score: 98.5 },
  { dimension: "Validity", score: 98.4 },
  { dimension: "Timeliness", score: 97.6 },
];

export const slaTarget = 99;
