import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const defaultExports = [...compat.extends('next/core-web-vitals', 'plugin:@next/next/recommended', 'next', 'prettier')];
export default defaultExports;
