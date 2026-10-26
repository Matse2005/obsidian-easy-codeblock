import { test } from "node:test";
import assert from "node:assert/strict";
import { searchLanguages, pushRecent, type Language } from "../src/Helpers/LanguageSearch.ts";

const languages: Language[] = [
  { title: "C", language: "c" },
  { title: "C#", language: "csharp" },
  { title: "Clojure", language: "clojure" },
  { title: "JavaScript", language: "javascript" },
  { title: "Python", language: "python" },
];

// Stand-in for Obsidian's fuzzy matcher: subsequence match, shorter text scores higher
const fuzzy = (query: string) => (text: string): number | null => {
  let i = 0;
  for (const ch of text.toLowerCase()) if (ch === query[i]) i++;
  return i === query.length ? -text.length : null;
};

const codes = (result: Language[]) => result.map(l => l.language);

test("empty query lists recent languages first, then the rest", () => {
  const result = searchLanguages(languages, "", ["python"], fuzzy);
  assert.deepEqual(codes(result), ["python", "c", "csharp", "clojure", "javascript"]);
});

test("empty query also lists recent custom languages", () => {
  const result = searchLanguages(languages, "", ["dataview"], fuzzy);
  assert.deepEqual(result[0], { title: "dataview", language: "dataview" });
});

test("exact match on code or title comes first", () => {
  const result = searchLanguages(languages, "c", ["clojure"], fuzzy);
  assert.equal(result[0].language, "c");
});

test("recent matches come before other matches", () => {
  const result = searchLanguages(languages, "cl", ["clojure"], fuzzy);
  assert.equal(result[0].language, "clojure");
});

test("matches are fuzzy and ordered by score", () => {
  const result = searchLanguages(languages, "js", [], fuzzy);
  assert.equal(result[0].language, "javascript");
});

test("offers the typed text as a custom language when nothing matches it exactly", () => {
  const result = searchLanguages(languages, "dataview", [], fuzzy);
  assert.deepEqual(result[result.length - 1], { title: "Use \"dataview\"", language: "dataview" });
});

test("does not offer a custom language when the query is an exact match", () => {
  const result = searchLanguages(languages, "C", [], fuzzy);
  assert.deepEqual(codes(result).slice(0, 3), ["c", "csharp", "clojure"]);
  assert.ok(!result.some(l => l.title.startsWith("Use ")));
});

test("custom language keeps the casing the user typed but trims spaces", () => {
  const result = searchLanguages(languages, " dataviewJS ", [], fuzzy);
  assert.equal(result[result.length - 1].language, "dataviewJS");
});

test("does not offer a custom language containing a backtick", () => {
  const result = searchLanguages(languages, "a`b", [], fuzzy);
  assert.ok(!result.some(l => l.language.includes("`")));
});

test("pushRecent moves the language to the front without duplicates", () => {
  assert.deepEqual(pushRecent(["a", "b", "c"], "b", 5), ["b", "a", "c"]);
});

test("pushRecent drops the oldest entry beyond the limit", () => {
  assert.deepEqual(pushRecent(["a", "b"], "c", 2), ["c", "a"]);
});
