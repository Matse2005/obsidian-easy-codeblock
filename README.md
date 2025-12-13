# 🎨 Code Block Inserter for Obsidian

> Lightning-fast code block insertion with language selection and smart recents tracking

Stop fumbling with triple backticks and language names! This plugin makes inserting code blocks in Obsidian as easy as pressing two keys.

## ✨ Features

### 🚀 Smart Language Picker

-   **Instant search** through 200+ programming languages
-   **Recently used languages** automatically pinned to the top (last 5)
-   **Visual indicators** show your favorite languages with ⭐
-   **Fuzzy search** matches both language names and codes

### ⚡ Lightning-Fast Hotkeys

-   **Alt + L** → Insert code block with **Language** picker
-   **Alt + P** → Insert **Plain** code block (no syntax highlighting)

### 💡 Intelligent Behavior

-   Wraps selected text automatically
-   Empty search shows your recent languages first
-   Search prioritizes recent matches at the top
-   Recent languages persist across your session

## 🎯 Usage

### Insert Code Block with Language

1. Press **Alt + L** (or use Command Palette: "Insert code block")
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

Press **Alt + P** for instant plain code blocks - perfect for pseudocode, terminal output, or quick snippets.

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

## ⌨️ Customizing Hotkeys

Don't like Alt + L and Alt + P?

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
