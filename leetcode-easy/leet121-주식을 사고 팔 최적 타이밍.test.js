const { solution } = require('./leet121-주식을 사고 팔 최적 타이밍');

describe('Best Time to Buy and Sell Stock', () => {
	[
		{ prices: [0], answer: 0 },

		{ prices: [1, 0], answer: 0 },
		{ prices: [1, 10000], answer: 9999 },
		
		{ prices: [1, 2, 10000], answer: 9999 },
		{ prices: [1, 2, 10000, 10000, 10000, 3], answer: 9999 },
		{ prices: [2, 10000, 3], answer: 9998 },
		{ prices: [2, 10, 3, 1, 10], answer: 9 },

		{ prices: [7,1,5,3,6,4], answer: 5 },
		{ prices: [7,1,7,6,4,3,15,3,6,4], answer: 14 },
		{ prices: [7,6,4,3,1], answer: 0 },

	].forEach(({ prices, answer }) => {
		const output = solution(prices);
		it(`should return ${answer} and(but) the output is ${output}. Given prices: [${prices}]`, () => {
			expect(output).toBe(answer);
		});
	});
});