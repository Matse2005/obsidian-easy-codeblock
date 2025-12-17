import { App, Editor, SuggestModal } from "obsidian";
import languages from '../../prismjs-supported-languages.json';

interface Language {
  title: string;
  language: string;
}

export class InsertCodeBlockModel extends SuggestModal<Language> {
  private editor: Editor;
  private static recentLanguages: string[] = [];
  private static readonly MAX_RECENT = 5;

  constructor(app: App, editor: Editor) {
    super(app);
    this.editor = editor;
    this.setPlaceholder("Type a language name...");
  }

  getSuggestions(query: string): Language[] {
    const filtered = languages.filter((language) =>
      language.title.toLowerCase().includes(query.toLowerCase()) ||
      language.language.toLowerCase().includes(query.toLowerCase())
    );

    if (!query.trim()) {
      const recent = InsertCodeBlockModel.recentLanguages
        .map(code => languages.find(l => l.language === code))
        .filter((l): l is Language => l !== undefined);

      const remaining = filtered.filter(
        l => !InsertCodeBlockModel.recentLanguages.includes(l.language)
      );

      return [...recent, ...remaining];
    }

    const recentMatches = filtered.filter(l =>
      InsertCodeBlockModel.recentLanguages.includes(l.language)
    );
    const otherMatches = filtered.filter(l =>
      !InsertCodeBlockModel.recentLanguages.includes(l.language)
    );

    return [...recentMatches, ...otherMatches];
  }

  renderSuggestion(language: Language, el: HTMLElement) {
    const isRecent = InsertCodeBlockModel.recentLanguages.includes(language.language);

    const container = el.createEl('div', { cls: 'code-language-suggestion' });
    const titleEl = container.createEl('div', { text: language.title });

    if (isRecent) {
      titleEl.createEl('span', {
        text: ' ⭐',
        cls: 'recent-indicator'
      });
    }

    container.createEl('small', { text: language.language });
  }

  private insertCodeBlock(language: string): void {
    this.addToRecent(language);

    const selection = this.editor.getSelection();
    const hasSelection = selection.length > 0;

    this.editor.replaceSelection([
      "",
      "```" + language,
      selection,
      "```",
      "",
      hasSelection ? "" : null
    ].join("\n"));

    this.editor.setCursor(
      !hasSelection
        ? this.editor.getCursor().line - 3
        : this.editor.getCursor()
    );
  }

  private addToRecent(languageCode: string): void {
    const recent = InsertCodeBlockModel.recentLanguages;
    const index = recent.indexOf(languageCode);
    if (index > -1) {
      recent.splice(index, 1);
    }
    recent.unshift(languageCode);
    if (recent.length > InsertCodeBlockModel.MAX_RECENT) {
      recent.pop();
    }
  }

  onChooseSuggestion(item: Language, evt: MouseEvent | KeyboardEvent) {
    this.insertCodeBlock(item.language);
  }
}