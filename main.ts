import { Plugin } from 'obsidian';
import { CommandRegistry } from 'src/Commands/CommandRegistry';
import { pushRecent } from 'src/Helpers/LanguageSearch';

const MAX_RECENT = 5;

interface EasyCodeBlockData {
	recentLanguages: string[];
}

export default class EasyCodeBlock extends Plugin {
	recentLanguages: string[] = [];

	async onload() {
		const data: Partial<EasyCodeBlockData> | null = await this.loadData();
		this.recentLanguages = data?.recentLanguages ?? [];

		const registry = new CommandRegistry(this);
		registry.registerAll();
	}

	async addRecentLanguage(language: string) {
		this.recentLanguages = pushRecent(this.recentLanguages, language, MAX_RECENT);
		await this.saveData({ recentLanguages: this.recentLanguages });
	}
}
