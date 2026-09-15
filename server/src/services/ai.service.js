class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || "mock";
  }

  async analyzeSop(sopText) {
    return {
      provider: this.provider,
      score: 92,
      summary: "This SOP is strong and well structured.",
      feedback: [
        "Add more measurable impact statements.",
        "Clarify leadership responsibilities where possible.",
        "Highlight outcomes with concrete examples.",
      ],
      sopText,
    };
  }
}

module.exports = new AIService();
