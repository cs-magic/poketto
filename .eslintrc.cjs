/** @type {import("eslint").Linter.Config} */
const config = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
	],
	rules: {
		// These opinionated rules are enabled in stylistic-type-checked above.
		// Feel free to reconfigure them to your own preference.
		"@typescript-eslint/array-type": "off",
		"@typescript-eslint/consistent-type-definitions": "off",
		
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
		"@typescript-eslint/ban-ts-comment": ["warn"],
		'@typescript-eslint/no-unsafe-assignment': ['warn'],
		'@typescript-eslint/no-explicit-any': ['warn'],
		'react/display-name': ['warn'],
		'@next/next/no-html-link-for-pages': ['warn'],
		'@typescript-eslint/no-unsafe-call': ['warn'],
		'@typescript-eslint/no-unsafe-argument': ['warn'],
		'@typescript-eslint/no-unsafe-member-access': ['warn'],// zustand slice immer
		'react/no-children-prop': ['warn'],
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/no-unsafe-return': ['warn'],
		'@typescript-eslint/no-empty-interface': ['off'],
		'prefer-const': ['warn'],
		'@typescript-eslint/prefer-nullish-coalescing': ['warn'],
	},
};

module.exports = config;
