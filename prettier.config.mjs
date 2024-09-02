import styleGuide from '@vercel/style-guide/prettier';

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...styleGuide,
  tabWidth: 2,
  printWidth: 120,
  semi: true,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  plugins: [...styleGuide.plugins, 'prettier-plugin-tailwindcss']
};

export default config;
