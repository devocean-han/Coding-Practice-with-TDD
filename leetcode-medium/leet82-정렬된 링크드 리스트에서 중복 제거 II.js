/* 82. Remove Duplicates from Sorted List II
문제: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
LeetCode에 포스팅한 풀이법: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/solutions/3911069/javascript-solution-with-brief-explanation-time-o-n-space-o-1/

Medium

Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.


Example 1:

Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]

Example 2:

Input: head = [1,1,1,2,3]
Output: [2,3]


Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

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

// 아래 solution4에 영어 주석으로 정리한 버전(해설로 제출한 버전은 더 정리되어 있음):
function deleteDuplicates(head) {
	// 0. If given linked list's size is 0 or 1, return head.
	if (!head || !head.next) return head;

	// 1. Set variables.
	let prevHead = new ListNode(-101, head); // A temporary node to store referrence for return, pointing to the 'head' as the next node. Necessary since 'head(=the given first node)' itself could be a duplicate and removed. 
	let pointer = prevHead;

	let currentVal = pointer.next.val; // Current number being compared. Updated when 'pointer.next' encounter a new number. Necessary for checking if 'pointer.next' is the (end) duplicate number after removing leading duplicates.    
	let isNewNum = true; // Whether the 'currentVal(=current number being compared)' is the first occurrence. Updated to false when duplicate occurs and to true when 'currentVal' is updated to a new value. Necessary to decide if a single 'pointer.next' value is the end(last of the series of) duplicates. If false, the node should be removed. 

	// While there are at least two nodes remaining after the pointer, examine the following two nodes.
	while (pointer.next && pointer.next.next) {
		// 2-I. Pointer's next two nodes are duplicates: (1)remove the 'next' node. (2)update 'isNewNum' to false.
		if (pointer.next.val === pointer.next.next.val) {
			pointer.next = pointer.next.next;
			isNewNum = false;

		// 2-II. Pointer's next two nodes are different and the very next node was a duplicate number: (1)remove the 'next' node. (2)update 'currentVal' to the new next node's value. (3)update 'isNewNum' to true.
		} else if (!isNewNum) {
			pointer.next = pointer.next.next;
			currentVal = pointer.next.val;
			isNewNum = true;

		// 2-III. Pointer's next two nodes are different and the very next node is not a duplicate number: (1)move(not remove) pointer to the next node. (2)update 'currentVal' to the new next node's value. (3)'isNewNum' doesn't have to be updated since it is already set to true.
		} else {
			pointer = pointer.next;
			currentVal = pointer.next.val;
			// isNewNum = true;
		}
	}

	// 3. The last node could be 'the end duplicate' remained. This could happen since while loop above ends without checking the last node(when 'pointer.next.next' becomes null). Here the pointer is placed at the node second to last, so check if 'pointer.next(=the last node)' is duplicate and if so, remove it.  
	if (!isNewNum) pointer.next = pointer.next.next;

	// 4. Return 'prevHead'.next.
	return prevHead.next;
}


// 첫 번째와 두 번째 (미완)풀이를 바탕으로 새로운 풀이:
// 요점 1. 먼저 pointer는 검사 대상이 되는 노드의 전에 위치해야 한다.
// 요점 2. 중복되는 수인지를 기억하는 것도 맞다. => 중복되는 수였다면 '제거(스킵)'함으로써 pointer를 이동하는 것이 생략되었을 테니 그냥 넘어가고, 중복되는 수가 아닌 경우에 pointer를 이동하며 동시에 '중복되는지 기억할 수'를 업데이트한다.
// 풀었다..!!!!!
function solution4(head) {
	if (!head || !head.next) return head;

	let prevHead = new ListNode(-101, head);
	let pointer = prevHead;

	// 1안: '중복 수'를 바깥에 기억하기: 
	let currentVal = pointer.next.val;
	// 		+ 현재 수가 처음인지 아닌지 기억하기: 
	let isNewNum = true;

	// pointer의 '다음'과 '다음다음' 노드를 비교하니까 '다음 두 노드가 존재하는 동안만' 검사할 수도 있고,.. 이렇게 하면 pointer 뒤로 마지막 1개가 남았을 때(지우거나 pointer를 옮김으로 인하여) 자동으로 while문을 벗어나게 된다. 마지막 1개 노드는 pointer.next이고... pointer는 이전 자리에서 옮겨왔거나 그 자리 그대로에서 다음 노드를 삭제했을 것이다. 즉, [1(p),2,2,3]=>[1(p),3] 이렇게 삭제로 인해 짧아졌거나, [1(p),2,3]=>[1,2(p),3] 이렇게 옮겨와서 마지막 노드가 1개까지 줄었거나 둘 중 하나다. 음... [1(p),2,2,2]면 어떡하지? 아니면 [1(p),3,3]이면? [1(p),2,2,2]=>[1(p),2(지워야함)]인데 루프를 완료하게 되고, [1(p),3,3]=>[1(p),3(지워야함)]인데 루프를 완료하게 된다. 결국 문제는 마지막 숫자가 지워져야 하는데 남아있는 경우로 수렴되는 듯 하다. 그렇다면 while루프를 돌고 나와서 마지막에 isNewNum=false라면 마지막 숫자도 지우는 것으로. 왜냐면 isNewNum이 false가 되는 지점은 '다음 두 노드'가 중복이라고 검사되는 때뿐이다. '지워져야할' 숫자가 끝에 남아있게 된다는 것은 이전에 그 수를 대상으로 중복이 일어났다는 것이고 그러면 isNewNum=false인 채로 남아있게 된다. 결국 isNewNum이 false인지만 while문 뒤에 마지막으로 검사하여 처리해주면 마지막에 남아있을지 모를 '지워져야 할' 숫자도 지울 수 있다는 얘기..! 맞을까? 
	while (pointer.next && pointer.next.next) {
		// 만약 다음 두 노드가 중복이면:
		// 처음 발생한 중복일 수도, 아닐 수도 있다. => isNewNum을 무조건 false로 업데이트한다? 그리고 .next노드를 지운다. 
		//		 '전에 중복 아님 -> 지금 중복'이면: [0,1(p),2,2]같은 경우로, 넘어올 때 처음에 currentVal=2(로 이미 업데이트한 상태), isNewNum=true인 상태이고 이제 isNewNum=false로 바뀌게 된다. 그리고 .next를 삭제.
		// 		'전에 중복 -> 지금 중복'이면: [0(p),1(삭제대상),2,2]같은 경우로, 넘어올 때 currentVal=2, isNewNum=true인 상태에 [0(p),2,2]였을 것이고 이제 isNewNum=false로 바뀌게 된다. 
		// 		=> 보니까 두 경우 모두 '현재 중복'이기만 하면 넘어올 때와 지금 변하는 것 모두 isNewNum=true->false인 것과 currentVal이 유지된다는 점에서 동일하다. 'isNewNum을 무조건 false로 업데이트한다'가 맞는 것이다.
		if (pointer.next.val === pointer.next.next.val) {
			isNewNum = false;
			pointer.next = pointer.next.next;
			// 이렇게만 하면 중복이었더라도 마지막 수는 제거되지 않는다. 진짜 '중복 수'를 기억해둬야 한다... 
			// let currentVal = pointer.next.val;

		// 그렇지 않고(중복이 아닌데) 다음 노드가 '중복됐던' 수라면:
		// 두 노드가 서로 다른데 앞 노드가 '중복됐던' 수라면 뒷 노드는 isNewNum이 true가 맞다. 앞 노드는 isNewNum이 false임으로 인해 제거 대상이 된다. 제거 후 맞은 .next노드(=뒷 노드)를 currentVal로 업데이트해주고 isNewNum=true로 바꾼다.  
		// (이후의 다음 노드와 비교해서 중복되면 isNewNum을 false로 업데이트 + 지우기를 진행하고, 중복이 아니라면 isNewNum이 true임으로 인해 '지우지 않고' pointer를 옮긴다.)
		} else if (!isNewNum) {
			pointer.next = pointer.next.next;
			currentVal = pointer.next.val;
			isNewNum = true;
		// 그렇지 않고(중복이 아닌데) 다음 노드가 처음 나오는 수라면
		// 그렇다면 isNewNum=true인 채로 넘어왔다는 얘기. .next와 .next.next가 중복도 아니고 .next의 isNewNum도 true라면, '지우지 않고' pointer를 옮겨야 한다. pointer를 옮겼으므로 currentVal도 옮긴 이후의 .next 값으로 업데이트해준다.  
		} else {
			pointer = pointer.next;
			currentVal = pointer.next.val;
			// 이미 isNewNum = true 이므로 손대지 않는다.
		}
	}

	// 마지막, '지워졌어야 할' 노드 검사 후 삭제하기
	if (!isNewNum) pointer.next = pointer.next.next;

	return prevHead.next;
}



// (미완)두 번째 풀이: (왜 안되는지 모르겠음. 이렇게 하면 두 개 테스트가 통과하지 못하고, 저렇게 하면 다른 두 개가 못 통과하고, 요렇게 하면 앞선 미통과 테스트에서 각각 하나씩이 통과하지 못한다. 얼핏 봐선 패턴도 못 찾겠고... 테스트 할 때도 디버거가 있으면 참 좋을텐데)

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
	solution: solution4,
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