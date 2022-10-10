import * as GitHub from '@actions/github';
import * as Core from '@actions/core';

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

  public getPullRequestDescription(): string {
    return GitHub.context.payload.pull_request?.body || '';
  }

  public async getCommitMessages(): Promise<Array<string>> {
    try {
      const { data } = await this.octokit.rest.pulls.listCommits({
        owner: GitHub.context.repo.owner,
        repo: GitHub.context.repo.repo,
        pull_number: GitHub.context.payload.pull_request?.number || 0,
      });

      return data.map((commitData: any) => commitData.commit.message);
    } catch (e) {}

    return [];
  }
}

export default GitHubAgent;
