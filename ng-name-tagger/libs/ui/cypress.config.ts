import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

const nxGenerated = nxComponentTestingPreset(__filename);
nxGenerated.devServer.options.projectConfig.buildOptions.tsConfig = './../../cypress/tsconfig.json';

export default defineConfig({
  component: {
    ...nxGenerated,
    specPattern: '**/*.cy.ts',
    video: false
  },
});