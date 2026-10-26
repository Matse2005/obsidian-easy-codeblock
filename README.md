# Easy Codeblock

> Lightning-fast code block insertion with language selection and smart recents tracking

Stop fumbling with triple backticks and language names! This plugin makes inserting code blocks in Obsidian as easy as pressing two keys.

## ✨ Features

### 🚀 Smart Language Picker

-   **Instant search** through 200+ programming languages
-   **Recently used languages** automatically pinned to the top (last 5)
-   **Visual indicators** show your favorite languages with ⭐
-   **Fuzzy search** matches both language names and codes

### ⚡ Lightning-Fast Hotkeys

-   **Alt + L** (Mac: **Ctrl + L**) → Insert code block with **Language** picker
-   **Alt + P** (Mac: **Ctrl + J**) → Insert **Plain** code block (no syntax highlighting)

### 💡 Intelligent Behavior

-   Wraps selected text automatically, even when it already contains code fences
-   Empty search shows your recent languages first
-   Search puts an exact match first, then your recent matches
-   Type any language that isn't listed (like `dataview`) and pick **Use "dataview"**
-   Recent languages are remembered after restarting Obsidian

## 🎯 Usage

### Insert Code Block with Language

1. Press **Alt + L** on Windows/Linux or **Ctrl + L** on Mac (or use Command Palette: "Insert code block")
2. Start typing a language name (e.g., "python", "javascript", "rust")
3. Hit Enter to insert

**Example:**

````
# Before (with "hello world" selected)
hello world

# After selecting "python"
```python
hello world
```
````

### Insert Plain Code Block

Press **Alt + P** (Mac: **Ctrl + J**) for instant plain code blocks - perfect for pseudocode, terminal output, or quick snippets.

````
```
your code here
```
````

## 🎪 Smart Recents in Action

First time using the plugin? You'll see all languages alphabetically.

After using Python, JavaScript, and TypeScript a few times:

```

[Search for a language...]

⭐ Python
⭐ TypeScript
⭐ JavaScript

---

ActionScript
Bash
C
C++
...
```

Start typing "script"? Recent matches jump to the top:

```

Search: script

⭐ TypeScript
⭐ JavaScript

---

ActionScript
CoffeeScript
...
```

## 🛠️ Installation

### From Obsidian Community Plugins

1. Open Settings → Community Plugins
2. Search for "Easy Codeblock"
3. Click Install, then Enable

### Manual Installation

1. Download the latest release
2. Extract to `.obsidian/plugins/easy-codeblock/`
3. Reload Obsidian
4. Enable in Settings → Community Plugins

## ⌨️ Keyboard Usage

### Adding to toolbar

1. Open a note and tap inside the editing area to show the toolbar.
2. Tap the `configure mobile toolbar (wrench icon)` button.
3. Find `Easy Code Block: Insert code block` and/or `Easy Code Block: Insert code block (no language)` and add it to `Manage toolbar options` by clicking the plus icon.
4. If you can't find it, scroll to the bottom. In the `Add global command` section, search for `Easy Code Block: Insert code block` and/or `Easy Code Block: Insert code block (no language)`.

### Customizing Hotkeys

Don't like the default hotkeys?

1. Go to Settings → Hotkeys
2. Search for "Easy Codeblock"
3. Set your preferred shortcuts

## 🎨 Supported Languages

Over 200 languages including:

**Popular:** JavaScript, TypeScript, Python, Java, C++, Rust, Go, PHP, Ruby, Swift

**Web:** HTML, CSS, SCSS, Vue, React (JSX/TSX)

**Markup:** Markdown, YAML, JSON, XML, TOML

**Systems:** Bash, PowerShell, Dockerfile, SQL

**And many more!** The full list is powered by Prism.js syntax highlighting.

## 🤝 Contributing

Found a bug? Have an idea? Contributions welcome!

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## 📝 License

MIT License - feel free to use this in your own projects!

## 💬 Support

-   🐛 [Report bugs](https://github.com/Matse2005/obsidian-easy-codeblock/issues)
-   💡 [Request features](https://github.com/Matse2005/obsidian-easy-codeblock/issues)
-   ⭐ [Star on GitHub](https://github.com/Matse2005/obsidian-easy-codeblock) if you find this useful!

---

**Made with ❤️ for the Obsidian community**

_Stop typing backticks. Start writing faster._
