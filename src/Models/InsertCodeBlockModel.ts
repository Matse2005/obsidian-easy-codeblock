import { App, Editor, SuggestModal } from "obsidian";
import languages from '../../prismjs-supported-languages.json';

interface Language { title: string; language: string; }

export class InsertCodeBlockModel extends SuggestModal<Language> {
  private editor: Editor;

  constructor(app: App, editor: Editor) {
    super(app);
    this.editor = editor;
    this.setPlaceholder("Type a language name...");
  }

  getSuggestions(query: string): Language[] {
    return languages.filter((language) =>
      language.title.toLowerCase().includes(query.toLowerCase()) ||
      language.language.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderSuggestion(language: Language, el: HTMLElement) {
    el.createEl('div', { text: language.title });
    el.createEl('small', { text: language.language });
  }

  private insertCodeBlock(language: string): void {
    this.editor.replaceSelection(["",
      "```" + language,
      this.editor.getSelection(),
      "```", "",].join("\n"));
  }

  onChooseSuggestion(item: Language, evt: MouseEvent | KeyboardEvent) {
    this.insertCodeBlock(item.language);
  }
}