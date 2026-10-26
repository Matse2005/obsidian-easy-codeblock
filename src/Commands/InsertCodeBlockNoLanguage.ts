import { App, Editor, Modifier, Platform } from "obsidian";
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
          // Option+letter types special characters on macOS, and Ctrl+P is
          // the editor's "cursor up" binding there, so the Mac default uses J
          modifiers: [Platform.isMacOS ? "Ctrl" : "Alt"] as Modifier[],
          key: Platform.isMacOS ? "j" : "p"
        }
      ]
    };
  }
}