// Fails if any public link in the portfolio data is dead (credential, exam and social URLs).
// LinkedIn blocks bots (HTTP 999), so it is skipped. Run: npm run check:links
import { readFileSync } from "node:fs";

const files = ["src/data/certifications.ts", "src/data/profile.ts", "src/data/site.ts"];
const skip = /linkedin\.com|localhost|vercel\.app/;
const urls = new Set();
for (const f of files) {
  for (const m of readFileSync(f, "utf8").matchAll(/https?:\/\/[^\s"'`)\\]+/g)) urls.add(m[0].replace(/[.,;]+$/, ""));
}

let failed = 0;
for (const url of [...urls].filter((u) => !skip.test(u))) {
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
    if (res.status === 405 || res.status === 403) res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const ok = res.status < 400 || res.status === 429;
    console.log(`${ok ? "OK  " : "FAIL"} ${res.status} ${url}`);
    if (!ok) failed++;
  } catch (err) {
    console.log(`FAIL ERR ${url} (${err.message})`);
    failed++;
  }
}
if (failed) {
  console.error(`\n${failed} broken link(s).`);
  process.exit(1);
}
