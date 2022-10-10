import GitHubAgent from './GitHubAgent';
import JiraAgent from './JiraAgent';

class IssueAutoCloser {
  private readonly issueRegExp: RegExp;

  private githubAgent: GitHubAgent;
  private jiraAgent: JiraAgent;

  constructor() {
    this.githubAgent = new GitHubAgent();
    this.jiraAgent = new JiraAgent(this.githubAgent.getInputValue('jira-url'), {
      username: this.githubAgent.getInputValue('jira-username'),
      password: this.githubAgent.getInputValue('jira-password'),
    });
    const jiraProjectKey = this.githubAgent.getInputValue('jira-project-key');

    this.issueRegExp = new RegExp(
      `close issue\s*:\s*(${jiraProjectKey}-\d+)`,
      'ig'
    );
  }

  public async run() {
    const pullRequestMessage = this.githubAgent.getPullRequestDescription();
    const commitMessages = await this.githubAgent.getCommitMessages();

    const contents = [pullRequestMessage, ...commitMessages];
    const issueKeys = this.extractIssueKeys(contents);
    await this.closeAllIssues(issueKeys);
  }

  private extractIssueKeys(contents: Array<string>): Array<string> {
    let foundKeys: Array<string> = [];
    for (const content of contents) {
      const result = content.match(this.issueRegExp);
      if (result) {
        foundKeys = foundKeys.concat(
          result.map((closeSentence: string) =>
            closeSentence.split(':')[1].trim()
          )
        );
      }
    }

    return foundKeys;
  }

  private async closeAllIssues(issueKeys: Array<string>): Promise<void> {
    for (const issueKey of issueKeys) {
      await this.jiraAgent.closeIssue(issueKey);
    }
  }
}

export default IssueAutoCloser;
