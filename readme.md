bce-sdk-lite
====================

The sdk is migrated from [bce-sdk-js](https://github.com/baidubce/bce-sdk-js) and rewrited partial codes.

1. Browser only. Without nodejs APIs and browserify for less filesize.
2. ESModule. For better tree-shaking.
3. Modern JS.

-----------------

How to run the demo?

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
```




