import { App, Editor, Modifier } from "obsidian";
import { ICommand } from "./BaseCommand";

export class InsertCodeBlockNoLanguage implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block-no-language',
      name: 'Insert code block (no language)',
      editorCallback: (editor: Editor) => {
        const selection = editor.getSelection();
        const hasSelection = selection.length > 0;

        const cursor = editor.getCursor();
        const currentLine = editor.getLine(cursor.line) ?? "";
        const prevLine =
          cursor.line > 0 ? editor.getLine(cursor.line - 1) ?? "" : "";

        const currentEmpty = currentLine.trim().length === 0;
        const prevEmpty = prevLine.trim().length === 0;

        let prefixNewlines: string[] = [];

        if (!currentEmpty) {
          prefixNewlines = prevEmpty ? [""] : ["", ""];
        }

        editor.replaceSelection([
          ...prefixNewlines,
          "```",
          selection,
          "```",
          ""
        ].join("\n"));

        editor.setCursor(
          !hasSelection
            ? editor.getCursor().line - 2
            : editor.getCursor().line + 1
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