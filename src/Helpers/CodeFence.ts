export function fenceFor(text: string): string {
  const longestRun = Math.max(0, ...(text.match(/`+/g) ?? []).map(run => run.length));
  return "`".repeat(Math.max(3, longestRun + 1));
}
