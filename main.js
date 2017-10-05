const request = require('request-promise');

class GitDiffError extends Error {
  constructor(...params) {
    super(...params);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, GitDiffError);
  }
}

class GitDiff {
  constructor(token) {
    if (!token) throw new GitDiffError('Missing required param \'token\' in GitHub constructor.')
    this.token = token;
  }

  getCommits(user, repo, since=null, until=null) {
    const baseUrl = `https://${this.token}@api.github.com`;
    const path = `/repos/${user}/${repo}/commits`;
    const queryString = this._createQueryString(since, until);

    const options = this._formRequestOptions('GET', baseUrl + path + queryString);

    return request(options)
    .then(res => {
      const commits = [];

      res.body.forEach(rawCommit => {
        commits.push(Commit.fromRaw(rawCommit));
      });

      return commits;
    }, this._handleBadResponse);
  }

  _createQueryString(since, until) {
    if (since && until) {
      return `?since=${since},until=${until}`;
    } else if (since) {
      return `?since=${since}`;
    } else if (until) {
      return `?until=${until}`;
    } else {
      return '';
    }
  }
  
  _formRequestOptions(method, url) {
    return {
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        // github requires this
        // https://developer.github.com/v3/#user-agent-required
        'user-agent': 'git-diff'
      },
      uri: url,
      method: method
    }
  }

  _handleBadResponse(res) {
    let err;
    switch (res.statusCode) {
      case 401:
        err = new GitDiffError(
          'GitHub access token is missing or invalid.');
        break;
      case 403:
        err = new GitDiffError(
          'Request forbidden. Did you forget to include \'user-agent\'?');
        break;
      case 404:
        const path = res.response.request.path;
        err = new GitDiffError(`GitHub could not find path ${path}`);
        break;
      default:
        err = new GitDiffError('Unexpected response code: ' + res.statusCode);
    }
    return Promise.reject(err);
  }
}

class Commit {
  constructor(sha, author, url) {
    this.sha = sha;
    this.author = author;
    this.url = url;
  }

  // equivalent of overriding toString in Node
  inspect() {
    return `<${this.url}|${this.sha}> ${this.author}`;
  }

  static fromRaw(rawCommit) {
    return new Commit(
      rawCommit.sha, rawCommit.author.login, rawCommit.url
    );
  }
};

module.exports = GitDiff;
