const { defineConfig } = require("cypress");
import cypressFailFast from "cypress-fail-fast/plugin.js";


module.exports = defineConfig({
  scrollBehavior: false,
  defaultCommandTimeout: 25000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  failOnStatusCode: false,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      cypressFailFast(on, config);
      return config;
    },
  },
});
