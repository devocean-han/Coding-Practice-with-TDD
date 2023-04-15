const solution = require('./001-pizza')

describe('pizza division (3)', () => {
    it('should return 2 when slice=7, n=10', () => {
        expect(solution(7, 10)).toBe(2);
    });

    it('should return 3 when slice=4, n=12', () => {
        expect(solution(4, 12)).toBe(3);
    });

    it('should return 1 with minimum restricts, slice=2 and n=1', () => {
        expect(solution(2, 1)).toBe(1);
    });

    it('should return 10 with maximum restricts, slice=10 and n=100', () => {
        expect(solution(10, 100)).toBe(10);
    });
})