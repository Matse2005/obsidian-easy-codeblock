import { App, Editor, Modifier } from "obsidian";
import { ICommand } from "./BaseCommand";
import { CreateCodeBlockHelper } from "src/Helpers/CreateCodeBlockHelper";

export class InsertCodeBlockNoLanguage implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block-no-language',
      name: 'Insert code block (no language)',
      icon: "message-square",
      editorCallback: (editor: Editor) => {
        CreateCodeBlockHelper.generate(editor);
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