import { App, Editor, Modifier } from "obsidian";
import { ICommand } from "./BaseCommand";

export class InsertCodeBlockNoLanguage implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block-no-language',
      name: 'Insert Code Block (No Language)',
      editorCallback: (editor: Editor) => {
        editor.replaceSelection([
          "",
          "```",
          editor.getSelection(),
          "```",
          ""
        ].join("\n"));
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