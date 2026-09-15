class Review {
  constructor({ id, applicationId, score, summary, feedback, createdAt }) {
    this.id = id;
    this.applicationId = applicationId;
    this.score = score;
    this.summary = summary;
    this.feedback = feedback || [];
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Review;
