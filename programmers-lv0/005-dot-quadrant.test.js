const { solution } = require('./005-dot-quadrant')

describe('Dot Quadrant', () => {
    it('should return 1 for given point [1, 1]', () => {
        expect(solution([1, 1])).toBe(1);
    });
    
    it('should return 2 for given point [-1, 1]', () => {
        expect(solution([-1, 1])).toBe(2);
    });

    it('should return 3 for given point [-1, -11]', () => {
        expect(solution([-1, -11])).toBe(3);
    });

    it('should return 4 for given point [1, -11]', () => {
        expect(solution([1, -11])).toBe(4);
    });

    it('should return 3 for given point [-500, -500]', () => {
        expect(solution([-500, -500])).toBe(3);
    });

    it('should return 1 for given point [500, 500]', () => {
        expect(solution([500, 500])).toBe(1);
    });
});