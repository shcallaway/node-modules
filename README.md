# EZ-S3

Simple module for reading from and writing to S3.

## Usage

Download an object to memory:

```javascript
client
.download('my-bucket', 'my-object')
.then(data => {});
```

Download an object to drive:

```
client
.download('my-bucket', 'my-object', true)
.then(data => {});
```

Upload a new object:

```
client.upload('my-bucket', 'new-file.txt', 'hello world');
```

Append data to an existing object:

```
client.append('my-bucket', 'my-object', 'hello world');
```

### Authorization

This module assumes you have [configured the AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) on the host machine.

### Data Types

On `upload` and `append`, EZ-S3 attempts to convert your data to a binary buffer. On `download`, it attempts to convert the downloaded object data to a string.

## Installation

1. Download: `npm install @shcallaway/ez-s3 --save`
2. Require: `const EasyS3 = require('ez-s3)`
3. Instantiate: `const client = new EasyS3();`
