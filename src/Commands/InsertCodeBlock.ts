import { App, Editor } from "obsidian";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockModel } from "../Modals/InsertCodeBlockModel";

export class InsertCodeBlock implements ICommand {
  constructor(private app: App) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block',
      name: 'Insert code block',
      editorCallback: (editor: Editor) => {
        new InsertCodeBlockModel(this.app, editor).open();
      }
    };
  }
}