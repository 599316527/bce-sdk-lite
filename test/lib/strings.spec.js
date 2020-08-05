import {normalizePath} from '../../lib/strings';

test('normalizePath', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('../')).toBe('/');
    expect(normalizePath('../../a')).toBe('/a');
    expect(normalizePath('../a')).toBe('/a');
    expect(normalizePath('/a')).toBe('/a');
    expect(normalizePath('a')).toBe('/a');
    expect(normalizePath('/a/b/')).toBe('/a/b');
    expect(normalizePath('/a/b/')).toBe('/a/b');
    expect(normalizePath('/a//b//')).toBe('/a/b');
    expect(normalizePath('/a/b/../c')).toBe('/a/c');
    expect(normalizePath('/a/b/.././c')).toBe('/a/c');
    expect(normalizePath('/a/b/../../c')).toBe('/c');
    expect(normalizePath('/a/b/../../../c')).toBe('/c');
});