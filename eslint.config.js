import { defineConfig, globalIgnores } from "eslint/config";

import eslintConigIamnapo from "eslint-config-iamnapo";

const config = defineConfig([
	{
		files: [eslintConigIamnapo.filePatterns.typescript],
		extends: eslintConigIamnapo.configs.typescript,
	},
	globalIgnores(["distribution"]),
]);

export default config;
