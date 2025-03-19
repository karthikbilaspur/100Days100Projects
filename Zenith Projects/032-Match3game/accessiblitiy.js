class Accessibility {
    constructor() {
      this.settings = {
        highContrast: false,
        largeFont: false,
        colorblind: false
      };
    }
  
    async updateSettings(settings) {
      this.settings = settings;
    }
  
    async applySettings() {
      if (this.settings.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
  
      if (this.settings.largeFont) {
        document.body.classList.add('large-font');
      } else {
        document.body.classList.remove('large-font');
      }
  
      if (this.settings.colorblind) {
        document.body.classList.add('colorblind');
      } else {
        document.body.classList.remove('colorblind');
      }
    }
  }
  
  module.exports = Accessibility;