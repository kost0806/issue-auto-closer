import NotImplementedError from './errors/NotImplementedError';

type JiraCredential = {
  username?: string;
  password?: string;
  apiKey?: string;
};

class JiraAgent {
  private jiraUrl: string;
  private jiraCredential: JiraCredential;
  private jiraProjectKey: string;

  constructor(
    jiraUrl: string,
    jiraCredential: JiraCredential,
    jiraProjectKey: string
  ) {
    this.jiraUrl = jiraUrl;
    this.jiraCredential = jiraCredential;
    this.jiraProjectKey = jiraProjectKey;
  }

  public closeIssue(issueKey: string): void {
    throw new NotImplementedError();
  }
}

export default JiraAgent;
