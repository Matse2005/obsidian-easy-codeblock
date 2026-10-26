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
		const data = (await this.loadData()) as Partial<EasyCodeBlockData> | null;
		const recent: unknown = data?.recentLanguages;
		this.recentLanguages = Array.isArray(recent)
			? recent.filter((code): code is string => typeof code === "string")
			: [];

		const registry = new CommandRegistry(this);
		registry.registerAll();
	}

	async addRecentLanguage(language: string) {
		this.recentLanguages = pushRecent(this.recentLanguages, language, MAX_RECENT);
		await this.saveData({ recentLanguages: this.recentLanguages });
	}
}
