import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["Azure", "Microsoft Fabric", "Databricks", "Data Warehousing", "ETL / ELT"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#05070d",
          backgroundImage: "radial-gradient(circle at 20% 0%, #0e3a4a 0%, #05070d 55%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              background: "linear-gradient(135deg, #22d3ee, #3b82f6 50%, #8b5cf6)",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{profile.name}</div>
            <div style={{ fontSize: 22, color: "#94a3b8" }}>{`${profile.role} · ${profile.location}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>
            {`${profile.headline.lead} ${profile.headline.highlight} ${profile.headline.tail}`}
          </div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#94a3b8" }}>{profile.subheadline}</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(34,211,238,0.35)",
                background: "rgba(34,211,238,0.08)",
                color: "#a5f3fc",
                fontSize: 20,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
