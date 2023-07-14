module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier"
    ],
    "overrides": [
        {
            "files": ["*.test.ts"],
            "rules": {
                "@typescript-eslint/no-floating-promises": "off",
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json", "./packages/*/tsconfig.json"]
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
    }
}
