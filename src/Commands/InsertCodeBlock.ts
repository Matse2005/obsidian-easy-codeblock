import { App, Editor, Modifier } from "obsidian";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockModel } from "../Modals/InsertCodeBlockModel";

export class InsertCodeBlock implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block',
      name: 'Insert code block',
      icon: "message-square-code",
      editorCallback: (editor: Editor) => {
        new InsertCodeBlockModel(this.app, editor).open();
      },
      hotkeys: [
        {
          modifiers: ["Alt"] as Modifier[],
          key: "l"
        }
      ]
    };
  }
}