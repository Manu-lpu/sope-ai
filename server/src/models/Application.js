class Application {
  constructor({ id, userId, title, organization, status, sopText, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.organization = organization;
    this.status = status;
    this.sopText = sopText;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Application;
