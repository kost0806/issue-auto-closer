import axios from 'axios';

type JiraCredential = {
  username?: string;
  password?: string;
  apiKey?: string;
};

class JiraAgent {
  private readonly jiraUrl: string;
  private readonly jiraCredential: JiraCredential;

  constructor(jiraUrl: string, jiraCredential: JiraCredential) {
    this.jiraUrl = jiraUrl;
    this.jiraCredential = jiraCredential;
  }

  public async closeIssue(issueKey: string): Promise<void> {
    await axios.post(
      `${this.jiraUrl}/rest/api/2/issue/${issueKey}/transitions`,
      {
        transition: { name: 'Done' },
      },
      {
        auth: {
          username: this.jiraCredential.username || '',
          password: this.jiraCredential.password || '',
        },
      }
    );
  }
}

export default JiraAgent;
