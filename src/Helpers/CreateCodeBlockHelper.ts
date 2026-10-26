import { Editor } from "obsidian";
import { fenceFor } from "./CodeFence";

export class CreateCodeBlockHelper {
  static generate(editor: Editor, language = ""): void {
    const selection = editor.getSelection();
    const hasSelection = selection.length > 0;
    const fence = fenceFor(selection);

    editor.replaceSelection([
      "",
      fence + language,
      selection,
      fence,
      "",
      hasSelection ? "" : null
    ].join("\n"));

    editor.setCursor(
      !hasSelection
        ? editor.getCursor().line - 3
        : editor.getCursor()
    );
  }
}