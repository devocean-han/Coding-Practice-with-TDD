const { solution } = require('./leet713-곱이 K보다 작은 부분 배열');

describe('Subarray Product Less Than K', () => {
	[
		// k <= 1이면 answer는 반드시 0임 (nums의 요소가 반드시 >0 이므로).
		{ nums: [1], k: 0, answer: 0 },
		{ nums: [1], k: 1, answer: 0 },
		{ nums: [1, 10, 100, 1000], k: 1, answer: 0 },

		// 
		{ nums: [1], k: 2, answer: 1 },
		// 이런 경우에는 정답이 2인가, 3인가? 3이라고 본다. 
		{ nums: [1, 1], k: 2, answer: 3 },

		{ nums: [10,5,2,6], k: 100, answer: 8 },
		{ nums: [1,2,3], k: 0, answer: 0 },
		
		// right이 한 칸 전진할 때마다 answer에 더해주지 않으면 left가 뭉텅이로 전진할 때 아예 무시되는 요소가 생겨 셈이 어그러지는 케이스: 왼 창문이 한 번에 몇 칸씩 닫혀야 하는 경우가 있는 모든 케이스가 이에 속함. 
		// => right이 한 칸 전진할 때마다 answer에 계산하여 더해지게 만들어야 해결된다.
		{ nums: [10, 9, 10, 4, 3, 8, 3, 3, 6, 2, 10, 10, 9, 3], k: 19, answer: 18 },
		
		// sliding window 기법에서 창문이 '뒤집어질 수 있는(left > right)' 케이스: K 이상인 단일 요소가 있는 모든 케이스가 이에 속함. 
		// => 마지막 solutio 대로 while 조건문 등등을 조합하면 '뒤집어져도 안전한' 풀이가 되어 해결된다. 
		{ nums: [1, 10, 2, 3], k: 10, answer: 4 },
		


	].forEach(({ nums, k, answer }) => {
		const output = solution(nums, k);
		it(`should return ${answer} and(but) the output is ${output}. Given nums and number K: [${nums}], ${k}`, () => {
			expect(output).toBe(answer);
		});
	});
});