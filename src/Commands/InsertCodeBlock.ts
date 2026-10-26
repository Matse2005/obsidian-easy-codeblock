import { Editor, Modifier, Platform } from "obsidian";
import type EasyCodeBlock from "../../main";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockModel } from "../Modals/InsertCodeBlockModel";
import { CreateCodeBlockHelper } from "src/Helpers/CreateCodeBlockHelper";

export class InsertCodeBlock implements ICommand {
  constructor(private plugin: EasyCodeBlock) { }

  getCommandDefinition() {
    return {
      id: 'insert-code-block',
      name: 'Insert code block',
      icon: "message-square-code",
      editorCallback: (editor: Editor) => {
        new InsertCodeBlockModel(this.plugin, language => CreateCodeBlockHelper.generate(editor, language)).open();
      },
      hotkeys: [
        {
          // Option+letter types special characters on macOS (Option+L is "¬")
          modifiers: [Platform.isMacOS ? "Ctrl" : "Alt"] as Modifier[],
          key: "l"
        }
      ]
    };
  }
}