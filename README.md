# Git Diff

Get commits and commit deltas from remote GitHub repos.

## Usage 

List recent commits:

```javascript
gitdiff
.getCommits('my_username', 'my_repo')
.then(commits => {});
```

Or list commits before/after a given ISO 8601 string:

```javascript
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

1. Download: `npm install @shcallaway/git-diff --save`
2. Create a [personal access token](https://github.com/blog/1509-personal-api-tokens) on GitHub.
3. Require: `const GitDiff = require('git-diff')`
4. Instantiate: `const gitdiff = new GitDiff(process.env.TOKEN)`

## Contributing

There is a pre-commit hook that runs the tests. In order for the tests to pass, you must export your GitHub access token as `TOKEN`.
