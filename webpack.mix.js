const mix = require('laravel-mix');

mix.disableNotifications();

mix.ts('src/scripts/index.ts', '')
  .ts('src/scripts/popup.ts', '')
  .sass('src/styles/index.scss', '')
  .sass('src/styles/popup.scss', '')
  .setPublicPath('build');
