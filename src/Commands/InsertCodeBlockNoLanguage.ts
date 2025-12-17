import { App, Editor, Modifier } from "obsidian";
import { ICommand } from "./BaseCommand";

export class InsertCodeBlockNoLanguage implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block-no-language',
      name: 'Insert code block (no language)',
      icon: "message-square",
      editorCallback: (editor: Editor) => {
        const selection = editor.getSelection();
        const hasSelection = selection.length > 0;

        editor.replaceSelection([
          "",
          "```",
          selection,
          "```",
          "",
          hasSelection ? "" : null
        ].join("\n"));

        editor.setCursor(
          !hasSelection
            ? editor.getCursor().line - 3
            : editor.getCursor()
        );
      },

      hotkeys: [
        {
          modifiers: ["Alt"] as Modifier[],
          key: "p"
        }
      ]
    };
  }
}