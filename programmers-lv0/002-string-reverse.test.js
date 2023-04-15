const solution = require('./002-string-reverse')

describe('string-reverse', () => {
    it('should return "" when given string is empty string', () => {
        expect(solution('')).toEqual('');
    });

    it('should return "a" when given string is "a"', () => {
        expect(solution('a')).toEqual('a');
    });

    it('should return "ba" when given string is "ab"', () => {
        expect(solution('ab')).toEqual('ba');
    });

    it('should return "noraj" when given string is "jaron"', () => {
        expect(solution('noraj')).toEqual('jaron');
    });

    it('should return "Long live the king!!" when given string is "!!gnik eht evil gnoL"', () => {
        expect(solution('Long live the king!!')).toEqual('!!gnik eht evil gnoL');
    });
})