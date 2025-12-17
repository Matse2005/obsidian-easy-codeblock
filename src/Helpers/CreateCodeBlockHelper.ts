import { Editor } from "obsidian";

export class CreateCodeBlockHelper {
  static generate(editor: Editor, language = ""): void {
    const selection = editor.getSelection();
    const hasSelection = selection.length > 0;

    editor.replaceSelection([
      "",
      "```" + language,
      selection,
      "```",
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