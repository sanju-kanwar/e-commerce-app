// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite default
    setupNodeEvents(on, config) {
      // optional node events
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: false // or use 'cypress/support/e2e.ts' if needed
  },
});
