import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
  docs: {
    autodocs: true,   // generate Docs page for every story with tags: ['autodocs']
  }
};

export default config;