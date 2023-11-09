import source from './leet846-스트레이트 그룹으로 나누기';
const { solution } = source;

describe('Hand of Straights', () => {
	describe('Example 1: hand=[1,2,3,6,2,3,4,7,8]', () => {
		let hand: number[] = [1, 2, 3, 6, 2, 3, 4, 7, 8];
		let groupSize: number;
		// 1,2,2,3,3,4,6,7,8
		it(`groupSize=3: should return true`, () => {
			groupSize = 3;
			expect(solution(hand, groupSize)).toBeTruthy();
		});
		it(`groupSize=2: should return false`, () => {
			groupSize = 2;
			expect(solution(hand, groupSize)).toBeFalsy();
		});
		it(`groupSize=1: should return true`, () => {
			groupSize = 1;
			expect(solution(hand, groupSize)).toBeTruthy();
		});
	});

	describe('Example 2: hand=[1,2,3,4,5]', () => {
		let hand: number[] = [1,2,3,4,5];
		let groupSize: number;
		it(`groupSize=3: should return false`, () => {
			groupSize = 3;
			expect(solution(hand, groupSize)).toBeFalsy();
		});
		it(`groupSize=4: should return false`, () => {
			groupSize = 4;
			expect(solution(hand, groupSize)).toBeFalsy();
		});
		it(`groupSize=5: should return true`, () => {
			groupSize = 5;
			expect(solution(hand, groupSize)).toBeTruthy();
		});
	});
});