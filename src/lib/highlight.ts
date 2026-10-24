// Minimal, dependency-free tokenizer for SQL and Python code samples.

export type TokenKind = "keyword" | "string" | "comment" | "number" | "function" | "plain";
export type Token = { text: string; kind: TokenKind };
export type CodeLanguage = "sql" | "python";

const SQL_KEYWORDS = new Set(
  `select from where join left right inner outer full cross on and or not null is in as case when then else end
  group by order having distinct union all insert into values update set delete merge using matched create alter
  drop table view procedure begin commit transaction rollback declare exists if or replace with over partition
  rows between preceding following current row primary key default check identity go cast nullif coalesce
  interval cluster optimize nocount xact_abort asc desc limit top truncate`
    .split(/\s+/)
    .filter(Boolean),
);

const PY_KEYWORDS = new Set(
  `def return import from as if elif else for in while with try except finally raise class pass break continue
  lambda yield not and or is None True False async await global nonlocal assert del`
    .split(/\s+/)
    .filter(Boolean),
);

const SQL_RE =
  /(--[^\n]*)|('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()|([A-Za-z_@][A-Za-z0-9_]*)/g;

const PY_RE =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:[^"\\\n]|\\.)*"|f?'(?:[^'\\\n]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()|([A-Za-z_][A-Za-z0-9_]*)/g;

export function tokenize(code: string, lang: CodeLanguage): Token[] {
  const re = new RegExp(lang === "sql" ? SQL_RE.source : PY_RE.source, "g");
  const isKeyword = (word: string) =>
    lang === "sql" ? SQL_KEYWORDS.has(word.toLowerCase()) : PY_KEYWORDS.has(word);

  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(code)) !== null) {
    if (match.index > last) tokens.push({ text: code.slice(last, match.index), kind: "plain" });
    const [text, comment, str, num, fn, word] = match;

    if (comment) tokens.push({ text, kind: "comment" });
    else if (str) tokens.push({ text, kind: "string" });
    else if (num) tokens.push({ text, kind: "number" });
    else if (fn) tokens.push({ text, kind: isKeyword(fn) ? "keyword" : "function" });
    else if (word) tokens.push({ text, kind: isKeyword(word) ? "keyword" : "plain" });
    else tokens.push({ text, kind: "plain" });

    last = re.lastIndex;
  }
  if (last < code.length) tokens.push({ text: code.slice(last), kind: "plain" });
  return tokens;
}
