const AWS = require('aws-sdk');

const BUCKET_NAME = process.env['BUCKET_NAME'];

const s3 = new AWS.S3();

exports.handler = async event => {
  try {
    // const email = requestContext.authorizer.jwt.claims.email
    const key = JSON.parse(event.body).key
    let params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: 3600,
    };

    let data = await createSignedUrl(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  }
  catch (error) {
    return {
      statusCode: 400,
    }

  }
};

function createSignedUrl(params) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  });
}

