const { areCorrectlyClosed } = require('./correctly-closed-parentheses')

describe('correctly closed parentheses test', () => {
    it('should return true for an empty string', () => {
        expect(areCorrectlyClosed('')).toEqual(true);
    });

    it('should return false if the length of the given string is odd', () => {
        expect(areCorrectlyClosed('(')).toEqual(false);
        expect(areCorrectlyClosed(')')).toEqual(false);
        expect(areCorrectlyClosed('())')).toEqual(false);
        expect(areCorrectlyClosed('())((')).toEqual(false);
    });

    it('should return false yet if the length is even but "(" and ")" number are not equal', () => {
        expect(areCorrectlyClosed('((')).toEqual(false);
        expect(areCorrectlyClosed('))()')).toEqual(false);
        expect(areCorrectlyClosed('()()(()(')).toEqual(false);
    });

    it('should return false if the length is even, "(" and ")" numbers are equal, but ends with opening parentheses, "("', () => {
        expect(areCorrectlyClosed('())(')).toEqual(false);
        expect(areCorrectlyClosed('))()((')).toEqual(false);
        expect(areCorrectlyClosed('())(())(')).toEqual(false);
    });

    // true cases
    it('should return true for a given string "()()()"', () => {
        expect(areCorrectlyClosed('()()()')).toEqual(true);
    });

    it('should return true for a given string "(())"', () => {
        expect(areCorrectlyClosed('(())')).toEqual(true);
    });

    it('should return true for a given string "()(()()((())()))"', () => {
        expect(areCorrectlyClosed('()(()()((())()))')).toEqual(true);
    });

    // false cases
    it('should return false for a given string "()(()"', () => {
        expect(areCorrectlyClosed('()(()')).toEqual(false);
    });

    it('should return false for a given string "()()))"', () => {
        expect(areCorrectlyClosed('()()))')).toEqual(false);
    });
})