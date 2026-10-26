import { Editor, Notice } from "obsidian";
import type EasyCodeBlock from "../../main";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockModel } from "../Modals/InsertCodeBlockModel";
import { CreateCodeBlockHelper } from "src/Helpers/CreateCodeBlockHelper";

export class PasteAsCodeBlock implements ICommand {
  constructor(private plugin: EasyCodeBlock) { }

  getCommandDefinition() {
    return {
      id: 'paste-as-code-block',
      name: 'Paste as code block',
      icon: "clipboard-paste",
      editorCallback: async (editor: Editor) => {
        const text = await navigator.clipboard.readText().catch(() => null);
        if (text === null) {
          new Notice("Could not read the clipboard");
          return;
        }
        if (!text) {
          new Notice("Clipboard is empty");
          return;
        }
        new InsertCodeBlockModel(this.plugin, language =>
          CreateCodeBlockHelper.generate(editor, language, text)
        ).open();
      }
    };
  }
}
