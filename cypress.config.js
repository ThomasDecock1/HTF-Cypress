import { defineConfig } from 'cypress';
import cypressFailFast from 'cypress-fail-fast/plugin.js';
import cypressLocalstorageCommands from 'cypress-localstorage-commands/plugin.js';


export default defineConfig({
  scrollBehavior: false,
  defaultCommandTimeout: 25000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  failOnStatusCode: false,
  e2e: {
    setupNodeEvents(on, config) {
      cypressLocalstorageCommands(on, config);
      cypressFailFast(on, config);
    },
  },
});
