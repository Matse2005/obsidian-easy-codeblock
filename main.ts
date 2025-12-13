import { Plugin } from 'obsidian';
import { CommandRegistry } from 'src/Commands/CommandRegistry';

export default class EasyCodeBlock extends Plugin {

	onload() {
		const registry = new CommandRegistry(this);
		registry.registerAll();
	}

	onunload() {

	}
}