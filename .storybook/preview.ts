import '../src/style.css';
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    // Show the source code panel on every story by default
    docs: {
      source: {
        // 'dynamic' renders the actual live source of the story template
        type: 'dynamic',
      },
    },
    // Show the "Show code" toolbar button on canvas view too
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
