import { profile } from "@/data/profile";

// Status is honest by design: "Earned" only for credentials held (as listed on the CV / LinkedIn).
// To make a card link straight to the verifier, paste the badge URL (Credly, Databricks, Microsoft Learn…)
// into `credentialUrl`. Without it, Earned cards link to the LinkedIn certifications page.
export const linkedinCertsUrl = `${profile.socials.linkedin}/details/certifications/`;

export type CertStatus = "Earned" | "In Progress" | "Planned";

export type Certification = {
  name: string;
  code: string;
  issuer: "Microsoft" | "Databricks" | "ICK";
  status: CertStatus;
  target?: string;
  description: string;
  skills: string[];
  examUrl: string;
  credentialUrl?: string;
  note?: string;
};

export const certifications: Certification[] = [
  {
    name: "Databricks Certified Data Engineer Associate",
    code: "Professional",
    issuer: "Databricks",
    status: "Earned",
    description: "Building ETL pipelines with Spark SQL and PySpark, Delta Lake, the Medallion architecture and production workflows on the Databricks platform.",
    skills: ["PySpark", "Delta Lake", "Medallion", "ETL"],
    examUrl: linkedinCertsUrl,
  },
  {
    name: "Databricks Partner Training",
    code: "Partner Academy",
    issuer: "Databricks",
    status: "Earned",
    description: "Lakehouse advantages, Data & AI governance, Gen AI with Data Intelligence, Financial Services and Healthcare specialisations, Spark and ETL migration.",
    skills: ["Lakehouse", "Governance", "Gen AI", "Migration"],
    examUrl: linkedinCertsUrl,
  },
  {
    name: "Python",
    code: "Course",
    issuer: "ICK",
    status: "Earned",
    description: "Python programming fundamentals applied to data processing and automation.",
    skills: ["Python", "Automation"],
    examUrl: linkedinCertsUrl,
  },
  {
    name: "Machine Learning",
    code: "Course",
    issuer: "ICK",
    status: "Earned",
    description: "Machine learning foundations and model building, complementing the MSc in Data Science & AI.",
    skills: ["Machine learning", "Modelling"],
    examUrl: linkedinCertsUrl,
  },
  {
    name: "Microsoft Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    status: "In Progress",
    target: "Q4 2026",
    description: "Core cloud concepts, Azure architecture, services, security, governance and cost management.",
    skills: ["Cloud concepts", "Azure services", "Governance", "Pricing"],
    examUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
  },
  {
    name: "Microsoft Fabric Analytics Engineer Associate",
    code: "DP-600",
    issuer: "Microsoft",
    status: "In Progress",
    target: "Q1 2027",
    description: "Planning, implementing and managing analytics solutions with Fabric lakehouses, warehouses and semantic models.",
    skills: ["Lakehouse", "Warehouse", "Semantic models", "Direct Lake"],
    examUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/",
  },
  {
    name: "Fabric Data Engineer Associate",
    code: "DP-700",
    issuer: "Microsoft",
    status: "Planned",
    target: "2027",
    description: "Designing and implementing data ingestion, transformation, security and monitoring across Microsoft Fabric.",
    skills: ["Data Factory", "Spark", "Real-time", "Security"],
    examUrl: "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/",
    note: "DP-203 retired on 31 March 2025; DP-700 is its successor.",
  },
  {
    name: "Power BI Data Analyst Associate",
    code: "PL-300",
    issuer: "Microsoft",
    status: "Planned",
    target: "2027",
    description: "Preparing, modelling, visualising and analysing data with Power BI, and managing secure deployments.",
    skills: ["Data modelling", "DAX", "Power Query", "Row-level security"],
    examUrl: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/",
  },
];
