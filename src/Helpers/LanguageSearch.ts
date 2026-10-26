export interface Language {
  title: string;
  language: string;
}

// Returns a score (higher is better) or null when the text does not match
export type Scorer = (query: string) => (text: string) => number | null;

export function searchLanguages(
  languages: Language[],
  query: string,
  recent: string[],
  scorer: Scorer
): Language[] {
  const trimmed = query.trim();

  if (!trimmed) {
    const recentLanguages = recent.map(
      code => languages.find(l => l.language === code) ?? { title: code, language: code }
    );
    return [...recentLanguages, ...languages.filter(l => !recent.includes(l.language))];
  }

  const lower = trimmed.toLowerCase();
  const score = scorer(lower);
  const isExact = (l: Language) => l.language.toLowerCase() === lower || l.title.toLowerCase() === lower;
  const rank = (l: Language) => (isExact(l) ? 2 : recent.includes(l.language) ? 1 : 0);

  const matches = languages
    .map(l => ({ l, score: Math.max(score(l.title) ?? -Infinity, score(l.language) ?? -Infinity) }))
    .filter(m => m.score > -Infinity)
    .sort((a, b) => rank(b.l) - rank(a.l) || b.score - a.score)
    .map(m => m.l);

  // A backtick in the info string would turn the opening fence into inline code
  return matches.some(isExact) || trimmed.includes("`")
    ? matches
    : [...matches, { title: `Use "${trimmed}"`, language: trimmed }];
}

export function pushRecent(recent: string[], code: string, max: number): string[] {
  return [code, ...recent.filter(c => c !== code)].slice(0, max);
}
