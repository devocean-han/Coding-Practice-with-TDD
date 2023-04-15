const {solution} = require('./003-babbling')

describe('baby babbling', () => {
    it('should return 0 when given array is ["a"]', () => {
        expect(solution(['a'])).toEqual(0);
    });

    it('should return 1 when given array is ["ma"]', () => {
        expect(solution(['ma'])).toEqual(1);
    });

    it('should return 2 when given array is ["ma", "ye", "wooo"]', () => {
        expect(solution(["ma", "ye", "wooo"])).toEqual(2);
    });

    it('should return 1 when given array is ["aya", "yee", "u", "maa", "wyeoo"]', () => {
        expect(solution(["aya", "yee", "u", "maa", "wyeoo"])).toEqual(1);
    });

    it('should return 3 when given array is ["ayaye", "uuuma", "ye", "yemawoo", "ayaa"]', () => {
        expect(solution(["ayaye", "uuuma", "ye", "yemawoo", "ayaa"])).toEqual(3);
    });
});
