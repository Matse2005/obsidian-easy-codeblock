import { SuggestModal, prepareFuzzySearch } from "obsidian";
import languages from '../../prismjs-supported-languages.json';
import { Language, searchLanguages } from "src/Helpers/LanguageSearch";
import type EasyCodeBlock from "../../main";

const fuzzyScorer = (query: string) => {
  const match = prepareFuzzySearch(query);
  return (text: string) => match(text)?.score ?? null;
};

export class InsertCodeBlockModel extends SuggestModal<Language> {
  private plugin: EasyCodeBlock;
  private onChoose: (language: string) => void;

  constructor(plugin: EasyCodeBlock, onChoose: (language: string) => void) {
    super(plugin.app);
    this.plugin = plugin;
    this.onChoose = onChoose;
    this.setPlaceholder("Type a language name...");
  }

  getSuggestions(query: string): Language[] {
    return searchLanguages(languages, query, this.plugin.recentLanguages, fuzzyScorer);
  }

  renderSuggestion(language: Language, el: HTMLElement) {
    const isRecent = this.plugin.recentLanguages.includes(language.language);

    const container = el.createDiv({ cls: 'code-language-suggestion' });
    const titleEl = container.createDiv({ text: language.title });

    if (isRecent) {
      titleEl.createSpan({
        text: ' ⭐',
        cls: 'recent-indicator'
      });
    }

    container.createEl('small', { text: language.language });
  }

  onChooseSuggestion(item: Language) {
    this.onChoose(item.language);
    void this.plugin.addRecentLanguage(item.language);
  }
}
