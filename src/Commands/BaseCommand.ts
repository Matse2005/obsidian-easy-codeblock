import { Command } from "obsidian";

export interface ICommand {
  getCommandDefinition(): Command;
}