# EZ-S3

Simple module for reading from and writing to S3.

## Usage

Download an object to memory:

```
client
.download('my-bucket', 'my-object')
.then(data => {
    // yay
});
```

Or to drive, by passing a boolean flag:

```
client
.download('my-bucket', 'my-object', true)
.then(data => {
    // yay
});
```

Upload a new object:

```
client
.upload('my-bucket', 'new-file.txt', 'hello world')
.then(() => {
    // yay
});
```

Or append data to an existing object:

```
client
.append('my-bucket', 'my-object', 'hello world')
.then(() => {
    // yay
});
```

### Authorization

_This module assumes you have [configured the AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) on the host machine._

### Data Types

On `upload` and `append`, EZ-S3 attempts to convert your data to a binary buffer. On `download`, it attempts to convert the downloaded object data to a string.

## Installation

1. Downlaod the module: `npm install @shcallaway/ez-s3 --save`
2. Require the module: `const EasyS3 = require('ez-s3)`
3. Instantiate a new client: `const client = new EasyS3();`
