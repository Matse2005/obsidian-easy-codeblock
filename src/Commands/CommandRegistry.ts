import type EasyCodeBlock from "../../main";
import { InsertCodeBlock } from "./InsertCodeBlock";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockNoLanguage } from "./InsertCodeBlockNoLanguage";
import { ChangeCodeBlockLanguage } from "./ChangeCodeBlockLanguage";
import { RemoveCodeBlock } from "./RemoveCodeBlock";
import { PasteAsCodeBlock } from "./PasteAsCodeBlock";

export class CommandRegistry {
  constructor(private plugin: EasyCodeBlock) { }

  registerAll() {
    this.registerCommand(new InsertCodeBlock(this.plugin));
    this.registerCommand(new InsertCodeBlockNoLanguage(this.plugin.app));
    this.registerCommand(new ChangeCodeBlockLanguage(this.plugin));
    this.registerCommand(new RemoveCodeBlock());
    this.registerCommand(new PasteAsCodeBlock(this.plugin));
  }

  private registerCommand(command: ICommand) {
    this.plugin.addCommand(command.getCommandDefinition());
  }
}