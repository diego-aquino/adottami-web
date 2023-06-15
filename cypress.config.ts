import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
  env: {
    NEXT_PUBLIC_ADOTTAMI_URL: 'http://localhost:3333',
  },
});
