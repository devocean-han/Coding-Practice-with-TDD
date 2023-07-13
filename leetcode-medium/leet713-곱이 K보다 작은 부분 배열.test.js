const { solution } = require('./leet713-곱이 K보다 작은 부분 배열');

describe('Subarray Product Less Than K', () => {
	[
		// k <= 1이면 answer는 반드시 0임 (nums의 요소가 반드시 >0 이므로).
		{ nums: [1], k: 0, answer: 0 },
		{ nums: [1], k: 1, answer: 0 },
		{ nums: [1, 10, 100, 1000], k: 1, answer: 0 },

		// 
		{ nums: [1], k: 2, answer: 1 },
		// 이런 경우에는 정답이 2인가, 3인가?
		{ nums: [1, 1], k: 2, answer: 3 },

		{ nums: [1, 10, 2, 3], k: 10, answer: 4 },
		{ nums: [10,5,2,6], k: 100, answer: 8 },
		{ nums: [1,2,3], k: 0, answer: 0 },
		
		// 내 sliding window 해답 에러 케이스: 
		{ nums: [10,9,10,4,3,8,3,3,6,2,10,10,9,3], k: 19, answer: 18 },


	].forEach(({ nums, k, answer }) => {
		const output = solution(nums, k);
		it(`should return ${answer} and(but) the output is ${output}. Given nums and number K: [${nums}], ${k}`, () => {
			expect(output).toBe(answer);
		});
	});
});