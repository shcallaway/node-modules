# Git Diff

Get commits and commit deltas from remote GitHub repos.

## Usage 

List recent commits:

```
gitdiff
.getCommits('my_username', 'my_repo')
.then(commits => {
    // yay
});
```

Or list commits before/after a given ISO 8601 string:

```
const before = (new Date()).toISOString();
const after = (new Date(1994, 6, 21)).toISOString();

gitdiff
.getCommits('my_username', 'my_repo', { before, after })
.then(commits => {
    // yay
});
```

Commit objects have the following properties: sha, url and author. Note that, as of this writing, GitHub returns a maximum of 30 commits per request.

## Installation

1. Download the module: `npm install @shcallaway/git-diff --save`
2. Create a [personal access token](https://github.com/blog/1509-personal-api-tokens) on GitHub.
3. Require the module: `const GitDiff = require('git-diff')`
4. Pass your token to the constructor: `const gitdiff = new GitDiff(process.env.TOKEN)`
