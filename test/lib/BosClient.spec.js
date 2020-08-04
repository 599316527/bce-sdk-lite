import bceSdk from 'bce-sdk-js';
import BosClient from '../../lib/BosClient';

const ak = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const sk = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const config = {
    sessionToken: 'ccccccccccccccccccccc',
    endpoint: 'https://bj.bcebos.com',
    credentials: {ak, sk},
};
const theirClient = new bceSdk.BosClient(config);
const myClient = new BosClient(config);

test('putObjectFromBlob', () => {
    let params = ['testBucket', '/adtets/hahah/42_das.jpg', new Blob(['fasofsdao']), {
        'content-type': 'image/jpeg'
    }];
    let [method1, url1, {headers: headers1, params: params1}] = getPutObjectFromBlob(myClient)(...params);
    let [method2, url2, {headers: headers2, params: params2}] = getPutObjectFromBlob(theirClient)(...params);

    expect(method1).toBe(method2);
    expect(url1).toBe(url2);
    expect(headers1).toEqual(headers2);
    expect(params1).toEqual(params2);
});


function getPutObjectFromBlob(client) {
    return function (...args) {
        let ret;
        client.sendHTTPRequest = function (...args) {
            ret = args;
        };
        client.putObjectFromBlob(...args);
        return ret;
    };
}
