# vue-facebook-ui

A feature-rich, beautiful UI component library for Vue 3 that faithfully reproduces Facebook's modern design aesthetic. Designed with TypeScript, built with Vite, and fully ready to be published to NPM.

## Features

- ⚛️ **Vue 3** ecosystem standard
- 🛡️ **TypeScript** definitions generated dynamically
- 🎨 **Facebook Authentic Design**: Pixel-perfect Facebook primary colors, styling, and interactions
- ⚡️ **Vite** powered library bundling

## Installation

Install the library in your Vue 3 project using npm or yarn:

```bash
npm install vue-facebook-ui
```

## Setup

in your `main.ts` or `main.js`, import the library and its CSS:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import FacebookUI from 'vue-facebook-ui'
import 'vue-facebook-ui/style.css' // Import the bundled CSS

const app = createApp(App)

app.use(FacebookUI)
app.mount('#app')
```

## Usage

You can use the components directly in your Vue templates since they are registered globally by the plugin:

### FbButton

```vue
<template>
  <FbButton variant="primary" size="medium" @click="handleClick">
    Like
  </FbButton>
  
  <FbButton variant="secondary" size="small">
    Comment
  </FbButton>
  
  <FbButton variant="danger" disabled>
    Delete Post
  </FbButton>
</template>
```

### FbAvatar

```vue
<template>
  <FbAvatar 
    src="https://github.com/vuejs.png" 
    alt="User Profile" 
    :size="48" 
  />
</template>
```

## Publishing to NPM

This project is fully configured and ready to be published.

1. Increase the version in `package.json`
2. Run the build command:
   ```bash
   npm run build
   ```
3. Publish to NPM:
   ```bash
   npm publish
   ```
# IUui
