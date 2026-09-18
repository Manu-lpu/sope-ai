const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || "openai";
    this.model = process.env.AI_MODEL || "gpt-5.6-luna";
  }

  async analyzeSop(sopText) {
    const response = await client.responses.create({
      model: this.model,

      input: [
        {
          role: "system",
          content: `
You are SOPE, an AI-powered Statement of Purpose reviewer.

Your job is to evaluate an SOP as an admissions-focused writing reviewer.

Do NOT rewrite the entire SOP.

Evaluate the submitted SOP based on:
1. Specificity
2. Program fit
3. Clarity
4. Structure
5. Personality

Also identify clichés, strengths, weaknesses, and practical recommendations.

Be honest and evidence-based. Do not give an artificially high score just because the SOP is well written.

For clichés, only flag sentences that are genuinely generic, overused, vague, or unnecessarily formulaic.

For recommendations, give specific actions the student can take to improve the SOP.
          `,
        },
        {
          role: "user",
          content: `Analyze the following SOP:

${sopText}`,
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "sop_review",
          strict: true,
          schema: {
            type: "object",
            properties: {
              overallScore: {
                type: "number",
                minimum: 0,
                maximum: 100,
              },

              scores: {
                type: "object",
                properties: {
                  specificity: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                  },
                  programFit: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                  },
                  clarity: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                  },
                  structure: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                  },
                  personality: {
                    type: "number",
                    minimum: 0,
                    maximum: 100,
                  },
                },
                required: [
                  "specificity",
                  "programFit",
                  "clarity",
                  "structure",
                  "personality",
                ],
                additionalProperties: false,
              },

              cliches: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    sentence: {
                      type: "string",
                    },
                    reason: {
                      type: "string",
                    },
                    suggestion: {
                      type: "string",
                    },
                  },
                  required: [
                    "sentence",
                    "reason",
                    "suggestion",
                  ],
                  additionalProperties: false,
                },
              },

              strengths: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              weaknesses: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              recommendations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },

            required: [
              "overallScore",
              "scores",
              "cliches",
              "strengths",
              "weaknesses",
              "recommendations",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response.output_text);
  }
}

module.exports = new AIService();