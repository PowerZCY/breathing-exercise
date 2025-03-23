# AI编辑器问题集锦

## 编码类问题

### eslint未使用包报错
- 安装检查插件
```bash
pnpm add -D eslint-plugin-unused-imports
```
- 配置根目录**/.eslintrc.json**
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "unused-imports"
  ],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```
- 修改**package.json**，让本地dev环境执行时就会进行`eslint --fix . && next lint`命令，清除未使用的导入
- 生产环境不要使用，因为这是本地代码提交前就要保证的

```json
{
    "scripts": {
        "predev": "pnpm run lint",
        "dev": "next dev",
        "lint": "eslint --fix . && next lint"
    }
}
```

### 国际化语言翻译键值完整性检查
- 安装所需的依赖
```bash
pnpm add -D ts-node glob @types/glob typescript
```
- 创建**tsconfig.node.json**文件
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "CommonJS",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020"],
    "esModuleInterop": true
  },
  "include": ["scripts/**/*"]
}
```
- 创建**appConfig.ts**文件, 定义项目支持的语言列表
```ts
export const appConfig = {
  // 国际化配置
  i18n: {
    locales: ["en", "zh", "ja", "ko", "fr", "de", "es", "it", "pt", "ru", "ar", "hi", "tr", "pl", "uk"] as const,
    defaultLocale: "en" as const,
    localeLabels: {
      en: "English",
      zh: "简体中文",
      ja: "日本語",
      ko: "한국어",
      fr: "Français",
      de: "Deutsch",
      es: "Español",
      it: "Italiano",
      pt: "Português",
      ru: "Русский",
      ar: "العربية",
      hi: "हिन्दी",
      tr: "Türkçe",
      pl: "Polski",
      uk: "Українська"
    }
  }
}
```
- 创建国际化翻译目录**messages**及每种语言的翻译文件**XX.json**

- 在**package.json**中添加脚本
```json
{
  "scripts": {
    "check-translations": "ts-node scripts/check-translations.ts"
  }
}
```
- 运行脚本
```bash
pnpm check-translations
```


### eslint关于使用any类型的问题
- 尽量遵循规范，不要使用any类型
- 询问AI时，制定生成代码的规则，明确要求它遵守TS的强类型规范
- 对于历史代码，禁用改检查项

```text
1. 特定行禁用该规则，可以使用注释：
// eslint-disable-next-line @typescript-eslint/no-explicit-any

2. 特定文件禁用该规则，可以在文件顶部添加注释：
/* eslint-disable @typescript-eslint/no-explicit-any */

3. 特定函数禁用该规则，可以在 ESLint 配置文件（如 .eslintrc.json ）中进行配置：

module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

## PNPM 依赖常用检查命令
### 1. 检查安全漏洞
```bash
pnpm audit
```

### 2. 检查过时依赖
```bash
pnpm outdated
```

### 3. 验证依赖存储完整性
```bash
pnpm list
```

### 4. 检查特定包的依赖关系
```bash
pnpm why <package-name>
```

### 5. 自动修复依赖问题
```bash
pnpm audit fix
```

### 6. 删除重复依赖
```bash
pnpm dedupe
```

### 建议检查流程
1. 首先运行 pnpm audit 检查安全漏洞
2. 使用 pnpm outdated 查看是否有过时的包
3. 如果发现问题，可以尝试使用 pnpm audit fix 进行修复
4. 对于特定包的问题，使用 pnpm why 命令进行深入分析
这些命令可以帮助你全面检查和解决项目中的依赖问题。