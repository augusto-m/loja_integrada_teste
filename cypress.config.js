const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qastoredesafio.lojaintegrada.com.br/',

    env: {
      usuario: 'sikoga7510@eoilup.com',
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
