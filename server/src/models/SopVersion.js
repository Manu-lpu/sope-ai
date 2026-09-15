class SopVersion {
  constructor({
    id,
    applicationId,
    versionNumber,
    content,
    createdAt,
    summary,
  }) {
    this.id = id;
    this.applicationId = applicationId;
    this.versionNumber = versionNumber;
    this.content = content;
    this.createdAt = createdAt || new Date().toISOString();
    this.summary = summary || "";
  }
}

module.exports = SopVersion;
