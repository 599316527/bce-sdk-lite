import {createHmac} from 'crypto';
import {nanoid} from 'nanoid';
import {sha256hmac} from '../../lib/crypto';

test('sha256hmac', () => {
    for (let i = 0; i < 100; i++) {
        let key = nanoid().repeat(4);
        let data = nanoid().repeat(3);
        expect(sha256hmac(key, data)).toBe(nativeSha256Hmac(key, data));
    }
});

function nativeSha256Hmac(key, data) {
    let sha256Hmac = createHmac('sha256', key);
    sha256Hmac.update(data);
    return sha256Hmac.digest('hex');
}

