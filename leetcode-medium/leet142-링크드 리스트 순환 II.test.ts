import source from './leet142-링크드 리스트 순환 II';
const { solution, ListNode } = source;
/*
방법1.  let head; 라고만 정의하면 noimplicitany 옵션에 걸려서 에러가 나고,
방법2. let head: ListNode; 라고 정의하면 "'ListNode'은(는) 값을 참조하지만, 여기서는 형식으로 사용되고 있습니다. 'typeof ListNode'을(를) 사용하시겠습니까?ts(2749)" 에러가 나고,
방법3. let head: ListNodeType; 이라고 정의하면 head = new ListNode(0); 코드에서 "'prototype' 속성이 'ListNode' 형식에 없지만 'typeof ListNode' 형식에서 필수입니다.ts(2741)" 이런 에러가 뜰 때,
이런 배타적인 3중 에러를 해결하는 방법을 해결하는 방법은 못 찾았지만 ChatGPT와의 대화를 통해...
(=> 그냥 let head: any 로 '명시적'으로 명시해주기로 하였다... )
*/
// const { solution, ListNode: ListNodeClass } = source; 라고 '다른 이름'으로 명명할 수 있다는 사실을 하나 건져내었다. 굳이 export default로 묶어서 안 내보내도 되겠다!
type ListNodeType = typeof source.ListNode;

describe('Linked List Cycle II', () => {
	describe('The number of the nodes check: should be in the range [0, 10^4]', () => {
		it(`should return null when 0 node exist`, () => {
			let head = null;
			expect(solution(head)).toBe(null);
		});

		it(`should return null when 1 node exists`, () => {
			let head = new ListNode(-100000);
			expect(solution(head)).toBe(null);
		});

		it(`should return null when 2 node exists`, () => {
			let head = new ListNode(-100000, new ListNode(100000));
			expect(solution(head)).toBe(null);
		});

		// how to check 10^4 nodes?
	});

	describe('When given list is [0,1] and there is a cycle', () => {
		let head: any;
		beforeEach(() => {
			head = new ListNode(0);
			head.next = new ListNode(1);
			head.next.next = head;
		})
		it(`should return 0th node`, () => {
			expect(solution(head)).toEqual(head);
		})
	})

	describe('when given list is [0,1,2,3] and there is a cycle', () => {
		let head: any;
		beforeEach(() => {
			head = new ListNode(0);
			head.next = new ListNode(1);
			head.next.next = new ListNode(2);
			head.next.next.next = new ListNode(3);
		});
		it(`should return 0th node when tail node points to 0th node`, () => {
			head.next.next.next.next = head;
			expect(solution(head)).toEqual(head);
		});
		it(`should return 1th node when tail node points to 1th node`, () => {
			head.next.next.next.next = head.next;
			expect(solution(head)).toEqual(head.next);
		});
		it(`should return 2th node when tail node points to 2th node`, () => {
			head.next.next.next.next = head.next.next;
			expect(solution(head)).toEqual(head.next.next);
		});
	});
	
	describe('when given list is [0,1,2,3] and there is no cycle', () => {
		let head: any;
		beforeEach(() => {
			head = new ListNode(0);
			head.next = new ListNode(1);
			head.next.next = new ListNode(2);
			head.next.next.next = new ListNode(3);
		});
		it(`should return null`, () => {
			expect(solution(head)).toEqual(null);
		});
	});
	
	describe('when given list is [3,2,0,-4] and there is a cycle', () => {
		let head: any;
		beforeEach(() => {
			head = new ListNode(3);
			head.next = new ListNode(2);
			head.next.next = new ListNode(0);
			head.next.next.next = new ListNode(-4);
		});
		it(`should return 0th node when tail node points to 0th node`, () => {
			head.next.next.next.next = head;
			expect(solution(head)).toEqual(head);
		});
		it(`should return 1th node when tail node points to 1th node`, () => {
			head.next.next.next.next = head.next;
			expect(solution(head)).toEqual(head.next);
		});
		it(`should return 2th node when tail node points to 2th node`, () => {
			head.next.next.next.next = head.next.next;
			expect(solution(head)).toEqual(head.next.next);
		});
	});

	describe(`for a very long list [0,1,2,3, ..., 98,99]`, () => {
		let head: any;
		let pointer: any;
		let fifthNode: any;
		let fiftiethNode: any;
		let ninetyEighthNode: any;
		beforeAll(() => {
			head = new ListNode(0);
			pointer = head;
			for (let i = 1; i < 100; i++) {
				pointer.next = new ListNode(i);
				pointer = pointer.next;
				if (i === 5) fifthNode = pointer;
				if (i === 50) fiftiethNode = pointer;
				if (i === 98) ninetyEighthNode = pointer;
			}
		});
		it(`should return 0th node when tail node points to 0th node`, () => {
			pointer.next = head;
			expect(solution(head)).toEqual(head);
		});
		it(`should return 5th node when tail node points to 5th node`, () => {
			pointer.next = fifthNode;
			expect(solution(head)).toEqual(fifthNode);
		});
		it(`should return 50th node when tail node points to 50th node`, () => {
			pointer.next = fiftiethNode;
			expect(solution(head)).toEqual(fiftiethNode);
		});
		it(`should return 98th node when tail(99th) node points to 98th node`, () => {
			pointer.next = ninetyEighthNode;
			expect(solution(head)).toEqual(ninetyEighthNode);
		});
	});

	describe(`for a very very long list [0,1,2,3, ..., 98,99, ..., 9998,9999]`, () => {
		let head: any;
		let pointer: any;
		let fifthNode: any;
		let fiveHundredthNode: any;
		let nineThousandthNode: any;
		beforeAll(() => {
			head = new ListNode(0);
			pointer = head;
			for (let i = 1; i < 10000; i++) {
				pointer.next = new ListNode(i);
				pointer = pointer.next;
				if (i === 5) fifthNode = pointer;
				if (i === 500) fiveHundredthNode = pointer;
				if (i === 9000) nineThousandthNode = pointer;
			}
		});
		it(`should return 0th node when tail node points to 0th node`, () => {
			pointer.next = head;
			expect(solution(head)).toEqual(head);
		});
		it(`should return 5th node when tail node points to 5th node`, () => {
			pointer.next = fifthNode;
			expect(solution(head)).toEqual(fifthNode);
		});
		it(`should return 500th node when tail node points to 500th node`, () => {
			pointer.next = fiveHundredthNode;
			expect(solution(head)).toEqual(fiveHundredthNode);
		});
		it(`should return 9000th node when tail(9999th) node points to 9000th node`, () => {
			pointer.next = nineThousandthNode;
			expect(solution(head)).toEqual(nineThousandthNode);
		});
	});
});
