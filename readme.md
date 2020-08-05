bce-sdk-lite
====================

The sdk is migrated from [bce-sdk-js](https://github.com/baidubce/bce-sdk-js) and rewrited partial codes.

1. Browser only. Without nodejs APIs and browserify for less filesize.
2. ESModule. For better tree-shaking.
3. Modern JS.
4. `BosClient.putObjectFromBlob` only for now.

For project based on webpack, import will load the untranspiled ES Module version. Please make sure to add the correct config to produce compatible codes.

## How to use?

```
npm i -s bce-sdk-lite
```

```js
import {BosClient} from 'bce-sdk-lite';

let client = new BosClient({
    endpoint: 'https://bj.bcebos.com',
    credentials: {ak, sk},
    sessionToken,
});

try {
    await client.putObjectFromBlob(bucketName, objectKey, blob);
}
catch(err) {
    // handle error
}

let url = client.generateUrl(bucketName, objectKey);
console.log(url);
```

## How to run the demo?

```
cd demo
npm i
npm run serve
```

You need to fulfill your own ak/sk with enviroment variables.

```
export BCE_AK=xxxxxx
export BCE_SK=xxxxxx
export BCE_ST=xxxxxx  # SessionToken if needed
export BOS_BUCKET=xxxxxx  # Bucket Name
```




