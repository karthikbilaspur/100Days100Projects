class ErrorHandler {
    constructor() {
      this.errorCount = 0;
    }
  
    async handleError(error) {
      this.errorCount++;
      console.error(`Error ${this.errorCount}: ${error.message}`);
      // Send error report to developers
    }
  }
  
  module.exports = ErrorHandler;