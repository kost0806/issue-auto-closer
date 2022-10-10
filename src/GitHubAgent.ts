import * as GitHub from '@actions/github';
import * as Core from '@actions/core';
import NotImplementedError from './errors/NotImplementedError';

type OctokitType = ReturnType<typeof GitHub.getOctokit>;
class GitHubAgent {
  octokit: OctokitType;

  constructor() {
    const token = this.getInputValue('repo-token');
    this.octokit = GitHub.getOctokit(token);
  }

  getInputValue(key: string): string {
    return Core.getInput(key, { required: true });
  }

  public async getPullRequestDescription(): Promise<string> {
    throw new NotImplementedError();
  }

  public async getCommitMessages(): Promise<Array<string>> {
    throw new NotImplementedError();
  }
}

export default GitHubAgent;
