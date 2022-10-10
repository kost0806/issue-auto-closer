import NotImplementedError from './errors/NotImplementedError';
import GitHubAgent from './GitHubAgent';
import JiraAgent from './JiraAgent';
import gitHubAgent from './GitHubAgent';

class IssueAutoCloser {
  private githubAgent: GitHubAgent;
  private jiraAgent: JiraAgent;

  constructor() {
    this.githubAgent = new GitHubAgent();
    this.jiraAgent = new JiraAgent(
      this.githubAgent.getInputValue('jira-url'),
      {
        username: this.githubAgent.getInputValue('jira-username'),
        password: this.githubAgent.getInputValue('jira-password'),
      },
      this.githubAgent.getInputValue('jira-project-key')
    );
  }

  public async run() {
    const pullRequestMessage =
      await this.githubAgent.getPullRequestDescription();
    const commitMessages = await this.githubAgent.getCommitMessages();

    const contents = [pullRequestMessage, ...commitMessages];
    const issueKeys = this.extractIssueKeys(contents);
    this.closeAllIssues(issueKeys);
  }

  private extractIssueKeys(contents: Array<string>): Array<string> {
    throw new NotImplementedError();
  }

  private closeAllIssues(keys: Array<string>): void {
    throw new NotImplementedError();
  }
}

export default IssueAutoCloser;