# Git Diff

Get commits and commit deltas from remote GitHub repos.

## Usage 

```
const GitDiff = require('git-diff');
const gitdiff = new GitDiff(process.env.TOKEN);
gitdiff.getCommits('crunchbase', 'client_app').then(commits => {
    // do something
});
```

OR

```
// assuming since and until are ISO 8601 strings
gitdiff.getCommits('crunchbase', 'client_app', since, until).then(commits => {
    // do something
});
```
