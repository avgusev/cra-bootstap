# SKDF Bootstrap

## Prettier

```shell
npm install --save-dev --save-exact prettier

cat <<END > .prettierrc.json
{
  "singleQuote": true,
  "printWidth": 120
}
END

cat <<END > .prettierignore
node_modules
package-lock.json
coverage
.parcel-cache
dist
.idea
.vscode
build
END

mkdir .vscode
cat <<END > .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
END
```

```
# package.json
# scripts:
+ "format:check": "prettier --check .",
+ "format": "prettier --write .",
```

## ESLint

```shell
npm init @eslint/config
# problems esm react TypeScript browser JSON
npm i -D eslint-config-prettier eslint-plugin-prettier
```

## Use React 17

```shell
rm -rf node_modules
npm i react@17 react-dom@17 @types/react@17 @types/react-dom@17
```

## Bootstrap

```shell
npm i bootstrap@5.2.0-beta1
npm i react-bootstrap
npm i sass
```

## Router

```shell
npm i react-router-dom@5 @types/react-router-dom@5
```
