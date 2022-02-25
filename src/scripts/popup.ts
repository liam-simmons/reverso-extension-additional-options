import helpers from './helpers';
import settings from './settings';

const settingsInputIds = ['subtitles-font-size', 'subtitles-distance', 'subtitles-colour', 'subtitles-background-colour', 'subtitles-background-transparency'];

const settingsInputs = [];

for(const inputId of settingsInputIds) {
  let input = document.getElementById(inputId);

  if (input) {
    settingsInputs.push(input);

    settings.get(helpers.slugToCamelCase(String(input.id))).then(setting => {
      if (setting !== null) {
        // @ts-ignore TODO
        input.value = setting;
      }
    });

    input.addEventListener('change', e => {
      const target = e.target;

      // if ('nodeName' in target) {
        // @ts-ignore TODO
        settings.set(helpers.slugToCamelCase(String(target.id)), target.value)
      // }
    });
  }
}