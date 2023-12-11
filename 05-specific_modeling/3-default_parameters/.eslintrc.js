module.exports = {
	extends: ["eslint-config-codely/typescript"],
	plugins: ["no-default-parameters"],
	rules: {
		"no-default-parameters/enforce": "error",
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: __dirname,
			},
		},
	],
};
