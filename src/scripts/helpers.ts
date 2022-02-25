const prefix = 'reverso_styles_extension_';

export default {
  getPrefix() {
    return prefix;
  },

  prefix(toPrefix: string) {
    return prefix + toPrefix;
  },
  
  unprefix(toUnprefix: string) {
    return toUnprefix.replace(prefix, '');
  },

  setVariableCss(variable: string, value: string): string {
    return `:root {
      --${variable}: ${value};
    }`
  },

  slugToCamelCase(slug: string): string {
    return slug.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  },

  isObject(variable: unknown): boolean {
      return typeof variable === 'object' && !Array.isArray(variable) && variable !== null
  },

  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  isNumeric(str: string) {
    if (typeof str != 'string') {
      return false;
    }
    
    return !isNaN(parseInt(str)) && !isNaN(parseFloat(str));
  }
}