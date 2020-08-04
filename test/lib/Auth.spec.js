import bceSdk from 'bce-sdk-js';
import Auth from '../../lib/Auth';

const ak = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const sk = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const theirAuth = new bceSdk.Auth(ak, sk);
const myAuth = new Auth(ak, sk);

const uri = '/v1/test/myfolder/readme.txt';

const params = {
    partNumber: 9,
    uploadId: 'a44cc9bab11cbd156984767aad637851',
    test3test: 'hhhh!$^&*'
};

const headers = {
    'content-length': 8,
    'content-md5': 'NFzcPqhviddjRNnSOGo4rw==',
    'content-type': 'text/plain',
    'host': 'bj.bcebos.com',
    'x-bce-date': '2015-04-27T08:23:49Z',
};

test('uriCanonicalization', () => {
    expect(myAuth.uriCanonicalization(uri))
        .toBe(theirAuth.uriCanonicalization(uri));
});

test('queryStringCanonicalization', () => {
    expect(myAuth.queryStringCanonicalization(params))
        .toBe(theirAuth.queryStringCanonicalization(params));
});

test('headersCanonicalization', () => {
    let myRv = myAuth.headersCanonicalization(headers);
    let theirRv = theirAuth.headersCanonicalization(headers);
    expect(myRv[0]).toBe(theirRv[0]);
    expect(myRv[1]).toEqual(theirRv[1]);
});

test('generateAuthorization', () => {
    let args = ['PUT', uri, params, headers];
    expect(myAuth.generateAuthorization(...args))
        .toBe(theirAuth.generateAuthorization(...args));
});

