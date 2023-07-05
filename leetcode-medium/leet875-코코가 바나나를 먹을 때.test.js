const { solution } = require('./leet875-코코가 바나나를 먹을 때');

describe('Koko Eating Bananas', () => {
	[
		{ piles: [1], h: 1, answer: 1 },
		{ piles: [10], h: 2, answer: 5 },
		{ piles: [10], h: 3, answer: 4 },

		// piles 길이(무더기 개수)와 h가 같을 때: piles 중 가장 큰 수가 k가 되어야 함. 
		{ piles: [1, 10], h: 2, answer: 10 },
		{ piles: [1, 10, 3, 12], h: 4, answer: 12 },
		
		// 무더기 개수보다 여유시간이 더 많을 때(piles.length < h): 
		{ piles: [1, 2, 4, 10], h: 5, answer: 5 },
		{ piles: [3, 6, 7, 11], h: 8, answer: 4 },
		{ piles: [3, 4, 6, 7, 11], h: 9, answer: 4 },
		{ piles: [3, 6, 6, 6, 7, 11], h: 8, answer: 6 },

		{ piles: [30,11,23,4,20], h: 5, answer: 30 },
		{ piles: [30,11,23,4,20], h: 6, answer: 23 },

		// 에러 케이스
		{ piles: [332484035,524908576,855865114,632922376,222257295,690155293,112677673,679580077,337406589,290818316,877337160,901728858,679284947,688210097,692137887,718203285,629455728,941802184], h: 823855818, answer: 14 },
		
	]
		.forEach(({ piles, h, answer }) => {
			const output = solution(piles, h);
			it(`piles: [${piles}], h: ${h}, answer: ${answer}, output: ${output}`, () => {
				expect(output).toBe(answer);
			});
		});
});