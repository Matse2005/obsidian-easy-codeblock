import { test } from "node:test";
import assert from "node:assert/strict";
import { findCodeBlock, openingLineWithLanguage, innerText } from "../src/Helpers/CodeBlockParser.ts";

const doc = [
  "intro",        // 0
  "```js",        // 1
  "let a = 1;",   // 2
  "```",          // 3
  "between",      // 4
  "~~~~ python title=x", // 5
  "```",          // 6 (shorter, different char: not a close)
  "~~~~",         // 7
  "end",          // 8
];

test("finds the block around a line inside it", () => {
  assert.deepEqual(findCodeBlock(doc, 2), {
    start: 1, end: 3, closed: true, indent: "", fence: "```", info: "js",
  });
});

test("counts the fence lines as part of the block", () => {
  assert.equal(findCodeBlock(doc, 1)?.start, 1);
  assert.equal(findCodeBlock(doc, 3)?.start, 1);
});

test("returns null outside any block", () => {
  assert.equal(findCodeBlock(doc, 0), null);
  assert.equal(findCodeBlock(doc, 4), null);
});

test("only closes on a fence of the same character and at least the same length", () => {
  assert.deepEqual(findCodeBlock(doc, 6), {
    start: 5, end: 7, closed: true, indent: "", fence: "~~~~", info: "python title=x",
  });
});

test("an unclosed block runs to the end of the document", () => {
  const block = findCodeBlock(["text", "```", "code"], 2);
  assert.deepEqual(block, { start: 1, end: 2, closed: false, indent: "", fence: "```", info: "" });
});

test("keeps indentation of fences inside lists", () => {
  const block = findCodeBlock(["- item", "    ```sh", "    ls", "    ```"], 2);
  assert.equal(block?.indent, "    ");
  assert.equal(block?.end, 3);
});

test("replaces only the language and keeps the rest of the info string", () => {
  const block = findCodeBlock(doc, 6)!;
  assert.equal(openingLineWithLanguage(block, "rust"), "~~~~rust title=x");
});

test("sets a language on a block that had none", () => {
  const block = findCodeBlock(["```", "x", "```"], 1)!;
  assert.equal(openingLineWithLanguage(block, "bash"), "```bash");
});

test("innerText returns the code without the fences", () => {
  assert.equal(innerText(doc, findCodeBlock(doc, 2)!), "let a = 1;");
  assert.equal(innerText(["```", "a", "b"], findCodeBlock(["```", "a", "b"], 1)!), "a\nb");
});

test("a fence indented by four spaces outside a list is indented code, not a fence", () => {
  const lines = ["para", "", "    ```js", "    x", "", "after"];
  assert.equal(findCodeBlock(lines, 5), null);
  assert.equal(findCodeBlock(lines, 3), null);
});

test("an empty block has empty inner text", () => {
  const lines = ["```", "```"];
  assert.equal(innerText(lines, findCodeBlock(lines, 0)!), "");
});

test("a backtick fence with a backtick in its info string is not a fence", () => {
  assert.equal(findCodeBlock(["```a`b", "x"], 1), null);
});

test("a fence with a language inside an open block does not close it", () => {
  const lines = ["```", "```ts inside", "```"];
  assert.equal(findCodeBlock(lines, 1)?.end, 2);
});
