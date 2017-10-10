const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

class EasyS3Error extends Error {
  constructor(...params) {
    super(...params);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, EasyS3Error);
  }
}

function isRequired(param) {
  throw new EasyS3Error(`Missing required parameter '${param}'.`);
}

class EasyS3 {
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  constructor(apiVersion='2006-03-01') {
    this.client = new S3({
      apiVersion: apiVersion
    });
  }

  static _convertStringToBinaryBuffer(str) {
    return new Buffer(str, 'binary');
  }

  append(bucket=isRequired('bucket'), 
         object=isRequired('object'), 
         newData=isRequired('newData')) {

    this.download(bucket, object)
    .then(oldData => {
      return this.upload(bucket, object, (oldData + newData));
    });

  }

  upload(bucket=isRequired('bucket'), 
         object=isRequired('object'), 
         data=isRequired('data')) {

    const options = {
      Bucket: bucket,
      Key: object,
      Body: EasyS3Client._convertStringToBinaryBuffer(data)
    }

    return new Promise((resolve, reject) => {

      // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
      this.client.putObject(options, (error, data) => {

        if (error) {
          reject(new EasyS3Error('AWS error when uploading object: ' + error.message));
        } else {
          resolve();
        }

      });
    });

  }

  download(bucket=isRequired('bucket'), 
           object=isRequired('object'),
           save=false) {

    return new Promise((resolve, reject) => {

      const options = {
        Bucket: bucket,
        Key: object
      }

      this.client.getObject(options, (error, data) => {

        if (error) {
          reject(new EasyS3Error('AWS error when downloading object: ' + error.message));
        } else {

          // convert buffer to string
          data = data.Body.toString();

          // save to drive, if necessary
          if (save) fs.writeFileSync(object, data);
          resolve(data);
        }

      });
    });
  }
}

module.exports = EasyS3;
