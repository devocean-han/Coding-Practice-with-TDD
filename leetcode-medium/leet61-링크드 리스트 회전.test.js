const { solution, ListNode } = require('./leet61-링크드 리스트 회전');

describe('Rotate List', () => {
	[
		// 노드가 없고 k도 0인 경우:
		{ head: null, k: 0, answer: null },
		// 노드가 없는데 k가 큰 수일 수도 있다:
		{ head: null, k: 2000000000, answer: null },
		// 노드가 하나뿐이면 k가 어떤 값이든 원래 head 그대로 반환한다.
		{ head: new ListNode(-100), k: 2000000000, answer: new ListNode(-100) },

		// 노드가 2개인데 k가 2의 배수면 회전시켜도 원래 head 그대로가 된다.
		{ head: new ListNode(-100, new ListNode(0)), k: 2, answer: new ListNode(-100, new ListNode(0)) },
		{ head: new ListNode(-100, new ListNode(0)), k: 2000000000, answer: new ListNode(-100, new ListNode(0)) },
		// k가 노드 총 개수의 배수라면 회전시켜도 원래 head 그대로가 된다. 
		{ head: new ListNode(-100, new ListNode(0, new ListNode(1))), k: 3000, answer: new ListNode(-100, new ListNode(0, new ListNode(1))) },

		{ head: new ListNode(-100, new ListNode(0, new ListNode(1))), k: 1, answer: new ListNode(1, new ListNode(-100, new ListNode(0))) },
		
		// 예제 케이스
		{ head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))), k: 2, answer: new ListNode(4, new ListNode(5, new ListNode(1, new ListNode(2, new ListNode(3))))) },
		{ head: new ListNode(0, new ListNode(1, new ListNode(2))), k: 4, answer: new ListNode(2, new ListNode(0, new ListNode(1))) },
		

	].forEach(({ head, k, answer }) => {
		const copyHead = head?.deepCopy();
		const output = solution(head, k);
		it(`should return [${answer?.printVals()}], and(but) the output is [${output?.printVals()}. 
		Given: head: [${head?.printVals()}], k: ${k}`, () => {
			expect(output?.printVals()).toEqual(answer?.printVals());
		});
	});
});

// 아래는 ChatGPT가 추천해준 테스트 코드이다: 
describe("arraySolution", () => {
	it("should handle empty list", () => {
		const result = solution(null, 3);
		expect(result).toBe(null);
	});

	it("should handle single node", () => {
		const head = new ListNode(1);
		const result = solution(head, 2);
		expect(result).toBe(head);
	});

	it("should rotate linked list correctly", () => {
		const head = new ListNode(1);
		head.next = new ListNode(2);
		head.next.next = new ListNode(3);
		head.next.next.next = new ListNode(4);
		head.next.next.next.next = new ListNode(5);

		const result = solution(head, 2);

		// Check if the list is correctly rotated
		expect(result.val).toBe(4);
		expect(result.next.val).toBe(5);
		expect(result.next.next.val).toBe(1);
		expect(result.next.next.next.val).toBe(2);
		expect(result.next.next.next.next.val).toBe(3);
		expect(result.next.next.next.next.next).toBe(null);
	});

	// 처음에 테스트 코드 작성할 때 ListNode를 어떻게 연결지어서 만드나 고민이 많았는데 이렇게도 작성하는구나 새로운 방법을 알았다. 
});