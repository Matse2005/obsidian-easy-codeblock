import { Plugin } from 'obsidian';
import { CommandRegistry } from 'src/Commands/CommandRegistry';

export default class MyPlugin extends Plugin {

	async onload() {
		const registry = new CommandRegistry(this);
		registry.registerAll();
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}
}