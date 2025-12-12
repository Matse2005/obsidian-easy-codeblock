import { App, Editor, FuzzySuggestModal } from "obsidian";
import languages from '../../prismjs-supported-languages.json';

interface Language {
  title: string;
  language: string;
}

export class InsertCodeBlockModel extends FuzzySuggestModal<Language> {
  private editor: Editor;

  constructor(app: App, editor: Editor) {
    super(app);
    this.editor = editor;
  }

  getItems(): Language[] {
    return languages;
  }

  getItemText(book: Language): string {
    return book.title;
  }
  // Perform action on the selected suggestion.
  onChooseItem(book: Language, evt: MouseEvent | KeyboardEvent) {
    this.editor.replaceSelection(
      [
        "",
        "```" + book.language,
        this.editor.getSelection(),
        "```",
        "",
      ].join("\n")
    );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}