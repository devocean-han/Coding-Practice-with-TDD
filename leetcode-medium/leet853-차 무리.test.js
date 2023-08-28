const { solution } = require('./leet853-차 무리');

const itDescriptionFormat = (target, position, speed, answer, outcome) => {
	return `
	Expected Result(car fleets) : Outcome
				${answer} : ${outcome} 
	target: ${target},
	position: [${position}],
	speed:    [${speed}]`
}

const itExpectFormat = (itArray) => {
	itArray.forEach(({ target, position, speed, result }) => {
		const outcome = solution(target, position, speed);
		it(itDescriptionFormat(target, position, speed, result, outcome), () => {
			expect(outcome).toBe(result);
		});
	})
}

describe('Car Fleet', () => {

	describe('차가 한 대뿐이라면 만들 수 있는 차 무리는 무조건 1', () => {
		itExpectFormat(
			[
				// 차가 한 대뿐이라면 만들 수 있는 차 무리는 무조건 1:
				{ target: 12, position: [0], speed: [1], result: 1, description: "차가 한 대뿐이라면 만들 수 있는 차 무리는 무조건 1이다: " },
		
			]
		);
	});
	describe('차가 전부 같은 속도를 갖는다면 결과 무리는 무조건 차량 개수만큼이다', () => {
		itExpectFormat(
			[
				// 차가 전부 같은 속도를 갖는다면 결과 무리는 무조건 차량 개수만큼이다: 
				{ target: 100, position: [0, 2], speed: [1, 1], result: 2, },
				{ target: 100, position: [0, 2, 99, 3, 8, 50], speed: [2, 2, 2, 2, 2, 2], result: 6, },
				
			]
		);
	});
	describe('병목이 일어나는 조합', () => {
		itExpectFormat(
			[
				// 무조건 언젠가는 따라잡히는 조합:
				{ target: 100, position: [0, 99, 5], speed: [2, 1, 1], result: 2, },
				{ target: 100, position: [0, 2, 4], speed: [4, 2, 1], result: 1, },
				
			]
		);
	});
	describe('문제 예제', () => {
		itExpectFormat(
			[
				// 문제 예제
				{ target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3], result: 3, },
				// { target: 100, position: [0, 2, 4], speed: [4, 2, 1], result: 1, },
			]
		);
	});	
	describe('테스트 케이스', () => {
		itExpectFormat(
			[
				// 문제 예제
				{ target: 10, position: [0,4,2], speed: [2,1,3], result: 1, },
			]
		);
	});	
});