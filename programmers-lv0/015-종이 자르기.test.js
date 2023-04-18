const { solution } = require('./015-종이 자르기');

describe('Cut paper', () => {

	// 한 변이 1인 경우
	it('should return 0 when given size is (1 x 1)', () => {
		expect(solution(1, 1)).toBe(0);
	})

	it('should return 1 when given size is (1 x 2)', () => {
		expect(solution(1, 2)).toBe(1);
	})

	it('should return 3 when given size is (4 x 1)', () => {
		expect(solution(4, 1)).toBe(3);
	})

	// 양 변이 같은 경우
	it('should return 3 when given size is (2 x 2)', () => {
		expect(solution(2, 2)).toBe(3);
	})
	
	// 양 변 길이가 다른 경우
	it('should return 9 when given size is (2 x 5)', () => {
		expect(solution(2, 5)).toBe(9);
	})
	
	it('should return 19 when given size is (4 x 5)', () => {
		expect(solution(4, 5)).toBe(19);
	})
	
})