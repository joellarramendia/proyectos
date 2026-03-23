import { createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

/** @type {import("jest").Config} **/
export default {
  verbose: true,
  preset: 'ts-jest/presets/default-esm', // Usa el preset específico para ESM
  testEnvironment: 'node',
  transform: {
    ...defaultPreset.transform,
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Esto ayuda a Jest a entender los imports que terminan en .js
  },
};