declare var browser: any;

import helpers from './helpers';

export default {
  async get(key: string) {
    const settingObject = await browser.storage.local.get(helpers.prefix(key));

    return settingObject && helpers.prefix(key) in settingObject ? settingObject[helpers.prefix(key)] : null;
  },

  async set(key: string, value: string) {
    return await browser.storage.local.set({[helpers.prefix(key)]: value});
  },

  async getAll() {
    const allSettings = await browser.storage.local.get();
    const ours = {};

    for (const key of Object.keys(allSettings)) {
      if (typeof key === 'string' && key.startsWith(helpers.getPrefix())) {
        ours[helpers.unprefix(key)] = allSettings[key];
      }
    }

    return ours
  }
}