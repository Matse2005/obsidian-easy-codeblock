import { Editor } from "obsidian";
import { ICommand } from "./BaseCommand";
import { findCodeBlock, innerText } from "src/Helpers/CodeBlockParser";

export class RemoveCodeBlock implements ICommand {
  getCommandDefinition() {
    return {
      id: 'remove-code-block',
      name: 'Remove code block (keep code)',
      icon: "eraser",
      editorCheckCallback: (checking: boolean, editor: Editor) => {
        const lines = editor.getValue().split("\n");
        const block = findCodeBlock(lines, editor.getCursor().line);
        if (!block) return false;

        if (!checking) {
          editor.replaceRange(
            innerText(lines, block),
            { line: block.start, ch: 0 },
            { line: block.end, ch: lines[block.end].length }
          );
        }
        return true;
      }
    };
  }
}
