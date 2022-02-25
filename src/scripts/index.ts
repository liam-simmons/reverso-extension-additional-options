import helpers from './helpers';
import settings from './settings';

declare var browser: any;

const style = document.createElement('style');
document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area: string) => {
  if (area === 'local') {
    for (const changeKey of Object.keys(changes)) {
      if (typeof changeKey === 'string' && changeKey.startsWith(helpers.getPrefix())) {
        applySetting(helpers.unprefix(changeKey), changes[changeKey].newValue);
      }
    }
  }
});

function applySetting(setting: string, value: string) {
  switch(setting) {
    case 'subtitlesFontSize':
      style.innerText = style.innerText + helpers.setVariableCss(setting, value + 'px');
      break;
    case 'subtitlesDistance':
      style.innerText = style.innerText + helpers.setVariableCss('subtitlesFromBottom', value + '%');
      break;
    case 'subtitlesBackgroundTransparency':
      if (helpers.isNumeric(value)) {
        style.innerText = style.innerText + helpers.setVariableCss(setting, (100 - parseInt(value)) + '%');
      }
      break;
    case 'subtitlesColour':
    case 'subtitlesBackgroundColour':
      if (typeof value === 'string') {
        const rgb = helpers.hexToRgb(value);

        if (rgb) {
          style.innerText = style.innerText + helpers.setVariableCss(setting + 'Red', String(rgb.r));
          style.innerText = style.innerText + helpers.setVariableCss(setting + 'Green', String(rgb.b));
          style.innerText = style.innerText + helpers.setVariableCss(setting + 'Blue', String(rgb.g));
        }
      }
      break;
  }
}

async function init() {
  const ourSettings = await settings.getAll();

  if (ourSettings) {
    for(const settingName of Object.keys(ourSettings)) {
      applySetting(settingName, String(ourSettings[settingName]));
    }
  }
}

init().catch(e => console.log(e));