const { solution } = require('./leet853-차 무리');

describe('Car Fleet', () => {
	[
		// 차가 한 대뿐이라면 만들 수 있는 차 무리는 무조건 1:
		{ target: 12, position: [0], speed: [1], result: 1, },

		// 차가 전부 같은 속도를 갖는다면 결과 무리는 무조건 차량 개수만큼이다: 
		{ target: 100, position: [0, 2], speed: [1, 1], result: 2, },
		{ target: 100, position: [0, 2, 99, 3, 8, 50], speed: [2, 2, 2, 2, 2, 2], result: 6, },
		
		// 무조건 언젠가는 따라잡히는 조합:
		{ target: 100, position: [0, 5, 99], speed: [2, 1, 1], result: 2, },
		// { target: 100, position: [0, 2, 4], speed: [4, 2, 1], result: 1, },

	].forEach(({ target, position, speed, result }) => {
		it(`Result(car fleets): ${result}
		target: ${target},
		position: [${position}],
		speed:    [${speed}]`, () => {
			expect(solution(target, position, speed)).toBe(result);
		});
	});
});