/* 


*/

/**
 * 주어진 singly-linked list의 정의는 다음과 같다:
*/
class ListNode {
	constructor(val, next) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}

	// (이 아래부터는 편의를 위해 내가 추가한 메소드)
	// 이 노드부터 이어진 노드 끝까지의 값들을 배열로 반환
	printVals() {
		const vals = [];
		let pointer = this;
		while (pointer.next !== null) {
			vals.push(pointer.val);
			pointer = pointer.next;
		}
		vals.push(pointer.val);
		return vals;
	}

	// 이 노드와 이어진 노드들을 깊은 복사하여 반환
	deepCopy() {
		const copiedHead = new ListNode(this.val);
		let originalPointer = this;
		let copyPointer = copiedHead;
		while (originalPointer.next) {
			originalPointer = originalPointer.next;
			copyPointer.next = new ListNode(originalPointer.val);
			copyPointer = copyPointer.next;
		}
		return copiedHead;
	}
}

// => 주어진 (정렬된) 링크드 리스트에서 중복되는 수가 발생하면 그 수 자체를 하나도 남겨놓지 않고 삭제한 결과를 반환하기
// ex) [1,1,2,3] => [2,3]







// 1. 제일 처음 노드가 셋 이상 중복되는 경우를 생각해야 한다. ㅊ음 생각처럼 '처음 두 개가 중복이야? 그럼 둘 다 지워서 head를 next.next로 옮겨' 하면 다음 세 번째 노드가 여전히 같을 때 알아볼 방법이 없다. => 첫 노드 값을 기억하는 '-1번째 노드'를 임시로 만들어서 하면 이후 노드 논리와도 일관성이 있겠다!
// 		=> 1-1. 첫 노드 값을 가지는 '임시 -1번 노드'를 만들어 left로 지정한다.
// 1-2. right은 '2번 노드'를 가리키게 만든다.
// 1-3. right이 처음부터 2번 노드를 가리켜야 하므로 최소 2개의 노드가 있음은 확인해야 한다. 즉,
// 		0. 노드가 없거나 하나밖에 없으면 head 그대로 조기 반환해준다.
// 2. right으로 순회하면서 left.next와 right의 값을 비교해나간다.
// 		2-0. 매 반복마다 right을 한 칸 전진시킨다.
// 		2-1. 만약 둘이 같으면 left.next를 지운다. 다음 순회에서 여전히 비교가 가능하게 된다.
// 		2-2. 만약 둘이 같지 않다면 left를 한 칸 전진시킨다. 그 전에 만약 중복되었어서 지우는 괒어을 거쳤다면 전진하기 전에 마지막으로 left.next를 지워야 한다. 이걸 어떻게 체크하지? thisIsDuplicateNum이라고 꼬리표라도 달아놔야 할까... 더 깔끔한 방법은... 그냥 'left를 left.next로 옮긴 그 때'에 isNewNum = true로 설정해놓자. 그리고 left를 옮기지 않은 채로 한 텀이 끝나서 돌아오면 isNewNum = false로 설정하는 것이다. 그렇게 하면 left를 left.next로 옮길 때 isNewNum인지 검사해서 false라면 left.next를 마지막으로 지우고 넘어가도록 하면 된다.
// 			=> 즉, left.next와 right의 값이 같지 않으면 left를 옮기는데, 이 때 isNewNum인지 검사해서 false라면 먼저 left.next를 left.next.next로 연결하고(=left.next를 지우고) left를 한 칸 전진하고, true라면 그냥 (left.next로) 전진하도록 한다.
// 			=> 잠깐만... left를 두 칸 옮기게 되는 때도 right은 한 칸씩 전진하는 게 맞나? (left)[1,1(right),2,3] => (left)[1,2(right),3] =>
// 			=> 이 때, isNewNum=true였다면 (left)[1,2(right),3] => [1(left),2,3(right)]이 되어 다음에 2와 3비교하면 되고,
// 			=> 		isNewNum=false였다면 (left)[1,2(right),3] => [2(left),3(right)]이 되어 다음에 3과 3을 비교해야 된다. 이건 맞지 않다. 만약 isNewNum이 false라면 left.next를 지우기만 하고 left를 한 칸 전진하지는 말아야 할 것 같다.
// 	=> 떼잉, 그렇다면 그냥 left 포인터도 필요 없이 '기억하고 있는 값'만 저장해서 쓰는 게 훨씬 간편하겠다! 처음에 1번째 노드 값을 저장하고 newVal인지도 저장한다. 다음 노드를 비교한다. 값이 다르고 newVal=true면 pointer를 다만 한 칸 옮기기만 한다. 값이 다르고 newVal=false라면 이미 중복이 있어서 지워진 값이 있다는 얘기다. 이 땐 현재 pointer 노드를 지우고 pointer를 한 칸 옮긴다. 마지막으로 값이 같다면, newVal을 false로 업데이트하고 pointer 노드를 지우고서 한 칸 옮긴다.
// => 여기서 'pointer 노드를 지운다'는 게 생각해봐야 할 문제인데... 먼저 1번째 노드와 값이 같은 -1번째 노드를 임시로 생성해서 pointer라고 해두자. 값을 비교할 땐 pointer.next와 저장된 값 currentVal을 비교한다. 둘이 같거나 newVal=false라서 노드를 지워야 할 때는 pointer.next가 지워야 하는 대상이다. 이렇게 하다가 pointer.next가 null이 되는 순간까지, 즉 pointer.next가 null이 아닌 동안 반복하면 된다. pointer를 옮기는 건 매 번 마지막에 하자.

// (left 포인터 말고) '값 기억하기' 방법 정리:
// 0. 주어진 리스트가 노드를 안 가지거나 하나만 가지면 head를 조기 반환한다.
// 1. 값이 중복되는지를 비교할 수 있는 '저장한 값' currentVal을 만들고 첫 번째 노드의 값으로 초기화한다.
// 2. 첫 노드와 같은 값을 가지고 다음 노드로 head를 가리키는 pointer를 만든다.
// 3. currentVal이 처음 나온(하나뿐인) 값인지를 기억하는 변수 isNewVal을 만들고 true로 초기화한다.
// 4. pointer.next가 존재하는 동안,
// 		4-1. pointer.next와 currentVal 값이 같으면 pointer.next 노드를 지운다. currentVal은 그대로 두고 isNewVal을 false로 업데이트한다.
// 		4-2. 둘의 값이 다르고 isNewVal이 참이면 pointer.next를 보존해야 한다. pointer를 그냥 next로 옮기기만 한다. pointer를 옮기기 전에 currentVal값을 현재 pointer.next값으로 업데이트하고 isNewVal도 true로 업데이트한다.
// 		4-3. 둘의 값이 다른데 isNewVal이 거짓이면 이미 중복이 일어났다는 얘기이므로 pointer.next를 마지막으로 지워야 한다. currentVal을 pointer.next 값으로 업데이트하고 isNewVal도 true로 업데이트한 후 pointer.next를 지우도록 한다.
// 		=> 정리하자면 4-1과 4-3은 '지운다'이고 4-2만 '옮긴다'이다.
// 5. head를 반환한다. 
function solution2(head) {
	// 0. 
	if (!head || !head.next) return head;
	// 1 ~ 3. 
	let pointer = new ListNode(head.val, head);
	// let pointer = new ListNode(-101, head);
	let returnHead = pointer;
	let currentVal = pointer.val;
	// pointer = pointer.next;
	let isNewVal = true;
	// let returnHead = new ListNode(head.val, pointer);
	// 첫 두 개 노드 검사는 따로 하는 게 좋겠다... 첫 두 노드가 같은 값이면 pointer를 -1번째 노드로 두는 게 맞다. 근데 첫 둘이 다른 값이면 pointer를 -1번째 노드로 두고 pointer.next와 비교하게 할 시 첫 노드끼리 비교하게 된다. 아. 그러니까 첫 두 노드를 비교해서 pointer를 '-1번째 노드가 아닌 첫 번째 노드로 두고 시작'하도록 하는 게 중요하다.  
	if (head.val !== head.next.val) {
		pointer = pointer.next;
	}
	// 4. 
	// 고민중: pointer를 head 이전 노드로 설정하는 건 좋았는데(첫 노드를 지워야 할 수도 있으니까) 그러면 pointer.next.val을 비교하는 게 아니라 어떻게 해야 하지? 반환은 저렇게 returnHead를 지정해두고 그냥 returnHead.next를 하면 될까? 
	while (pointer.next) {
		// pointer = pointer.next;
		if (pointer.next.val === currentVal) {
			pointer.next = pointer.next.next; // 지운다
			isNewVal = false;
			console.log('같아서 지움', returnHead.printVals())
		} else if (isNewVal) {
		// } else {
			currentVal = pointer.next.val;
			isNewVal = true;
			// if ()
			pointer = pointer.next; // 옮긴다
			console.log('다르고 안 지움', returnHead.printVals())
		// }
		} else {
			currentVal = pointer.next.val;
			isNewVal = true;
			pointer.next = pointer.next.next; // 지운다
			console.log('다르고 지움', returnHead.printVals())
		}
	}

	if (!isNewVal) 
	console.log('---------------------');

	// return head;
	return returnHead.next;
}

// 어째서인지 left와 right이 언제나 두 칸 이상 차이나지 않는 듯하므로 포인터를 하나만 사용해도 될 것 같다. 

// 첫 풀이(생각 몽땅)
/**
 * @param {ListNode} head 
 * @returns {ListNode}
 */
function solution(head) {
	// 노드가 없거나 하나밖에 없을 경우 head 그대로 반환
	if (!head || !head.next) return head;
	
	// 앞에서부터 탐색하며 다음 노드가 이전 값과 같은 경우 기억하고 있던 이전 값 노드도 전부 삭제하기. => '기억하고 있는(비교하는) 값' 이전의 노드를 저장해둬야 한다 => 투 포인터 left와 right으로 처리하자
	// => left와 right은 [left, _, right]이렇게 한 칸을 띄운 간격으로 놓고 left.next와 right의 값을 비교하는 식으로 해야 한다. 따라서 처음 2개 노드까지를 따로 먼저 비교하고, 그 이후부터 'right.next가 있으면~'하고 반복해야 한다.
	let left = right = head;
	// 처음 두 개 노드는 따로 비교한다: [left, right, _?_, _?_, ...]
	console.log('바깥', left?.printVals())
	while (left == right && right) {
		console.log('while 직후', left?.printVals())
		if (right.next) {
			right = right.next;
			if (left.val === right.val) { // 둘 다 지운다
				head = head.next.next;
				left = head;
				right = head;
			} else { // right을 한 칸 옮겨둔다
				// right = right.next;
				// left = left.next;
			}
		} else break;
	}
	// console.log('이후', left?.printVals())

	// => [_, left, right, _, _, ...]가 되든지,
	//    [X, X, left(right), _, _, ...] => [left(right), _, ...]가 되든지. 
	
	// 시나리오1: [1, 1] : [] => right=null인 상태에서 right.next를 할 수 없으므로 
	if (!head) return head;
	//
	// 시나리오2: [1, 2] : [1(left), 2], null(right)
	// => 이정도면 그냥 포인터들을 설정하기 전에 첫 두 개 노드를 따로 비교하는 게 나을 것 같다....
	// => 역시나 right=null인 상태에서 right.next를 할 수 없음로
	if (!right) return head;
	//
	// 시나리오3: [1, 1, 2] : => [2] => [2(head,left,right)].
	// => right.next도 호출할 수 있고 양호하다. 
	//
	// 시나리오4: [1, 2, 3] : [1(left), 2, 3(right)]
	//
	// 시나리오5: [1, 2, 2] : => [1(left), 2, 2(right)] 
	//
	/* 만약 'right을 한 칸 옮겨두기'를 행하지 않는다면? 
		[1, 1] => []
		[1, 2] => [1(left), 2(right)]
		[1, 1, 2] => [2(head,left,right)]
		[1, 2, 3] => [1(left), 2(right), 3]
		[1, 2, 2] => [1(left), 2(right), 2]
		[1, 1, 1] => [1(head,left,right)] => 
	*/ 
	while (right.next) {
		right = right.next;
		// left의 val 자체와 비교한다는 것은 left가 처음 노드일 때라는 의미. 즉, 만약 두 값이 같다면 head를 움직여야 하는 상황이라는 뜻이다.
		if (left.val === right.val) {
			head = head.next;
		// 그렇지 않다면 원래 의도대로 left.next의 값과 right의 값을 비교하여 같으면 둘 다 지운다.
		} else if (left.next.val === right.val) {
			left.next = left.next.next;
			// [1(left), 2, 2(right), 2, 3, 3]
			// => [1(left), 2, 2(right), 3, 3]
			// => [1(left), 2, 3(right), 3]
			// => [1, 2(left), 3, 3(right)]
			// => [1, 2(left), 3(right)]
			// 끝

		// 그렇지 않다면 두 수가 다르다는 뜻이므로 left 포인터도 한 칸 옮긴다
		} else {
			left = left.next;
		}
	}

	return head;
}

module.exports = {
	solution: solution3,
	ListNode,
}	

// 다른 해답: 
function solution3(head) {
	// 0. 주어진 리스트가 노드를 안 가지거나 하나만 가지면 head를 조기 반환한다.
	if (!head || !head.next) return head;

	// 1. head 이전에 임시 노드를 하나 더 만들고 pointer도 이 노드를 가리키도록 초기화하고,
	let prevHead = new ListNode(0, head);
	let pointer = prevHead;

	// 2. pointer의 다음과 다음다음 노드를 비교한다. pointer의 다음 두 노드가 존재하는 동안 pointer를 전진시키는 순회를 계속한다. (조기 반환 덕분에 주어진 링크드 리스트에 최소 2개의 노드가 있음이 보장되므로 반복 조건문에서 에러가 발생하지 않는다.) 
	while (pointer.next && pointer.next.next) {
		// 2-1. 만약 다음 두 노드가 값이 같다면 중복이 발생한 것이다. 지금 발견한 (중복되는) 두 개 노드를 시작으로 같은 값을 가진 노드 전부를 삭제해야 한다. 즉, 현재 pointer의 다음 노드가 첫 번째 삭제 대상이 되고 이후로 pointer.next의 값이 '중복 값'과 달라지거나 아예 존재하지 않게 될 때(=pointer가 마지막 노드가 되었을 때)까지 계속 삭제한다.   
		if (pointer.next.val === pointer.next.next.val) {
			// pointer 다음 노드를 '중복 값'으로 저장해두고,
			let duplicate = pointer.next.val;
			// 먼저 pointer의 다음 노드를 삭제한다. 즉 pointer가 다음다음 노드를 next로 가지도록 '스킵'하기를 pointer의 다음 노드가 존재하지 않을 때까지 반복한다(물론 pointer의 다음 노드값이 미리 저장된 '중복 값'과 같을 때만).
			while (pointer.next && pointer.next.val === duplicate) {
				pointer.next = pointer.next.next;
			}
		// 2-2. pointer의 다음 두 노드 값이 같지 않다면 그냥 pointer를 한 칸 전진시킨다. 
		} else {
			pointer = pointer.next;
		}
	}

	return prevHead.next;
}