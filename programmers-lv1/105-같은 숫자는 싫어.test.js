const { solution } = require('./105-같은 숫자는 싫어');

const itDescribeFormat = (arr, answer, outcome) => {
	return `given: [${arr}], mulst be: [${answer}], current outcome: [${outcome}]`;
}

function expectForeach(inputArray) {
	inputArray.forEach(({ arr, answer }) => {
		const outcome = solution(arr);
		it(itDescribeFormat(arr, answer, outcome), () => {
			expect(outcome).toEqual(answer);
		});
	});
}

describe('같은 숫자는 싫어', () => {
	describe('초기 조건 테스트', () => {
		expectForeach(
			[
				{ arr: [0], answer: [0] },
				{ arr: [0, 1], answer: [0, 1] },
				{ arr: [0, 0], answer: [0] },
			]
		)
	});
	describe('중복되는 숫자들', () => {
		expectForeach(
			[
				{ arr: [0, 0, 0], answer: [0] },
				{ arr: [1,1,3,3,0,1,1], answer: [1,3,0,1] },
				{ arr: [4,4,4,3,3], answer: [4,3] },
			]
		)
	});
});