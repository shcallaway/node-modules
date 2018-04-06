const assert = require('assert');
const GitDiff = require('./main.js');

const gitdiff = new GitDiff(process.env.TOKEN);

const timestamp = (new Date(2017, 9, 5)).toISOString();

gitdiff.getCommits('shcallaway', 'git-diff')
.then(function(commits) {
  assert(Array.isArray(commits), 'getCommits responds with an array');
  assert(commits.length > 0, 'commits array is not empty');
});

gitdiff.getCommits('shcallaway', 'git-diff', { before: timestamp })
.then(function(commits) {
  assert(commits.length === 1, 'before option filters commits correctly');
});

gitdiff.getCommits('shcallaway', 'git-diff', { after: timestamp })
.then(function(commits) {
  assert(commits.length >= 8, 'after option filters commits correctly');
});
