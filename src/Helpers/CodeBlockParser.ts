export interface CodeBlock {
  start: number;
  end: number;
  closed: boolean;
  indent: string;
  fence: string;
  info: string;
}

const OPENING = /^(\s*)(`{3,}|~{3,})(.*)$/;
const LIST_ITEM = /^\s*([-*+]|\d+[.)])\s/;

const indentWidth = (indent: string) => indent.replace(/\t/g, "    ").length;

// Four or more spaces of indent is an indented code block, unless the fence belongs to a list item
function isInsideList(lines: string[], index: number, indent: number): boolean {
  for (let i = index - 1; i >= 0; i--) {
    if (!lines[i].trim()) continue;
    const lineIndent = indentWidth(lines[i].match(/^\s*/)![0]);
    if (lineIndent < indent) return LIST_ITEM.test(lines[i]);
  }
  return false;
}

function isOpening(line: string): RegExpMatchArray | null {
  const match = line.match(OPENING);
  // A backtick fence whose info string contains a backtick is inline code, not a fence
  return match && !(match[2][0] === "`" && match[3].includes("`")) ? match : null;
}

function isClosing(line: string, fence: string): boolean {
  const trimmed = line.trim();
  return trimmed.length >= fence.length && trimmed === fence[0].repeat(trimmed.length);
}

// Scans from the top because a fence line alone does not say whether it opens or closes
export function findCodeBlock(lines: string[], line: number): CodeBlock | null {
  for (let i = 0; i < lines.length && i <= line; i++) {
    const open = isOpening(lines[i]);
    if (!open) continue;
    if (indentWidth(open[1]) >= 4 && !isInsideList(lines, i, indentWidth(open[1]))) continue;

    let end = i + 1;
    while (end < lines.length && !isClosing(lines[end], open[2])) end++;
    const closed = end < lines.length;
    if (!closed) end = lines.length - 1;

    if (line <= end) {
      return { start: i, end, closed, indent: open[1], fence: open[2], info: open[3].trim() };
    }
    i = end;
  }
  return null;
}

export function openingLineWithLanguage(block: CodeBlock, language: string): string {
  const rest = block.info.replace(/^\S*/, "");
  return block.indent + block.fence + language + rest;
}

export function innerText(lines: string[], block: CodeBlock): string {
  return lines.slice(block.start + 1, block.closed ? block.end : block.end + 1).join("\n");
}
