import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
	{ ignores: ["node_modules/", "main.js"] },
	js.configs.recommended,
	...tseslint.configs["flat/recommended"],
	{
		languageOptions: {
			globals: globals.node,
			sourceType: "module",
		},
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
			"@typescript-eslint/ban-ts-comment": "off",
			"no-prototype-builtins": "off",
			"@typescript-eslint/no-empty-function": "off",
		},
	},
];
