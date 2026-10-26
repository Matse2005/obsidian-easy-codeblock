import { test } from "node:test";
import assert from "node:assert/strict";
import { fenceFor } from "../src/Helpers/CodeFence.ts";

test("uses three backticks for text without backticks", () => {
  assert.equal(fenceFor("hello world"), "```");
});

test("uses a fence longer than the longest backtick run inside the text", () => {
  assert.equal(fenceFor("```js\ncode\n```"), "````");
  assert.equal(fenceFor("a ````` b"), "``````");
});

test("ignores short inline backtick runs", () => {
  assert.equal(fenceFor("use `x` or ``y``"), "```");
});
