import { Editor } from "obsidian";
import type EasyCodeBlock from "../../main";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockModel } from "../Modals/InsertCodeBlockModel";
import { findCodeBlock, openingLineWithLanguage } from "src/Helpers/CodeBlockParser";

export class ChangeCodeBlockLanguage implements ICommand {
  constructor(private plugin: EasyCodeBlock) { }

  getCommandDefinition() {
    return {
      id: 'change-code-block-language',
      name: 'Change code block language',
      icon: "languages",
      editorCheckCallback: (checking: boolean, editor: Editor) => {
        const block = findCodeBlock(editor.getValue().split("\n"), editor.getCursor().line);
        if (!block) return false;

        if (!checking) {
          new InsertCodeBlockModel(this.plugin, language =>
            editor.setLine(block.start, openingLineWithLanguage(block, language))
          ).open();
        }
        return true;
      }
    };
  }
}
