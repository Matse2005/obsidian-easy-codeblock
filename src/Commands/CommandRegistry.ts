import { Plugin } from "obsidian";
import { InsertCodeBlock } from "./InsertCodeBlock";
import { ICommand } from "./BaseCommand";
import { InsertCodeBlockNoLanguage } from "./InsertCodeBlockNoLanguage";

export class CommandRegistry {
  constructor(private plugin: Plugin) { }

  registerAll() {
    this.registerCommand(new InsertCodeBlock(this.plugin.app));
    this.registerCommand(new InsertCodeBlockNoLanguage(this.plugin.app));
  }

  private registerCommand(command: ICommand) {
    this.plugin.addCommand(command.getCommandDefinition());
  }
}