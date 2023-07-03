const { solution } = require('./leet74-행렬에서 수 찾기');

describe('Search a 2D Matrix', () => {
	[
		{ matrix: [[1]], target: 1, answer: true, },
		{ matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3, answer: true, },
		{ matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13, answer: false, },
		
	].forEach(({ matrix, target, answer }) => {
		const output = solution(matrix, target);
		it(`matrix: [${matrix}], target: ${target}, answer: ${answer}, output: ${output}`, () => {
			expect(output).toEqual(answer);
		});
	});
});
