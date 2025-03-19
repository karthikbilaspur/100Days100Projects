const natural = require('natural');

class Chatbot {
  constructor() {
    this.language = 'EN';
    this.tokenizer = new natural.WordTokenizer();
  }

  async processMessage(message) {
    const tokens = this.tokenizer.tokenize(message);
    const intent = await this.determineIntent(tokens);
    return intent;
  }

  async determineIntent(tokens) {
    const intent = await this.classifyTokens(tokens);
    return intent;
  }

  async classifyTokens(tokens) {
    const classifier = new natural.BayesClassifier();
    classifier.addDocument(['hello', 'how', 'are', 'you'], 'greeting');
    classifier.addDocument(['what', 'is', 'your', 'name'], 'question');
    classifier.train();
    const classification = classifier.categorize(tokens.join(' '));
    return classification;
  }
}

module.exports = Chatbot;