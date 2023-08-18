/* 146. LRU Cache
https://leetcode.com/problems/lru-cache/?envType=list&envId=rus4c4ci

Medium

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.

*/

class LRUCachePrompt {
	constructor(capacity) {
		this.capacity = capacity; // a positive size of the capacity
		this.storage = new Map();
	}

	/**
	 * @param {number} key 
	 * @returns {number} 
	 * : returns the value of the key if the key exists, otherwise -1 
	 */
	// 캐시 메모리에 '있는' 정보를 조회(hit)한 경우이다. '못찾아서 -1을 반환한다'는 것은 miss가 발생했음을 호출한 쪽에 알려주는 것. 디스크로 가서 찾아봐야 함
	get(key) {
		return this.storage.get(key) ?? -1;
	}

	/**
	 * @param {number} key 
	 * @param {number} value 
	 * @returns {void}
	 * : update or add the key-value pair to the cache. if ...
	 */
	// key가 없는 경우 새로 넣음: 종전에 miss가 뜬 get()의 결과에 더하여 새롭게 캐시 메모리로 데이터를 불러오는 것을 뜻한다. 사용자로부터의 새 데이터가 캐시에만 원래 ㅁ너저 들어가는 것인지 캐시와 동시에 디스크에도 쓰이는 것인지는 모르겠다. 
	// key가 있어서 업데이트함: 새 캐시를 저장하려는데 캐시 메모리에 이미 key값이 존재해버린 경우. get()의 결과로 hit이 뜨고, 새롭게 덮어쓴다... 
	// => 결국, put도 get도 '캐시가 사용된 경우'에 해당하는 것 같다. 왜냐면 [1,10], [2,20]이 차례로 들어왔을 때 새로운 [3,30]은 [1,10]을 걷어내고 들어앉게 된다고 하니까. 
	// 		=> #1. put(1) 이후 put(2)가 발생했을 때, 더 오래된 쪽은 1이다.  
	// 		=> #2. get(1) 이후 put(3)가 발생했을 때, 더 오래된 쪽은 1이다.  
	
	// => 그렇다면... get과 put이 불릴 때마다 불린 key를 앞에다 배치해야 하므로 이미 존재하더라도 삭제하고 다시 쓰자. map 대신 linked list를 사용한다면....
	
	// [1] map: 삭제 후 재삽입 할 때 '삭제'를 금방 할 수 있다. 오 삭제 '후' 삽입을 하면 순서도 암묵적으로 알맞게 배열된다. 다만 그렇게 정렬된 순서를 명시적으로 사용할 수가 없다. 즉, '가장 마지막 key'를 뽑아낼 수가 없다. value 안에 'timeBit' 같은 걸 넣어서 한 번 put이나 get이 불릴 때마다 해당 key의 timeBit을 1씩 올려주는 방법을 쓴다면... 그래도 전체를 훑어서 '가장 높은' timeBit을 찾아야 한다. ...
	// [2] linked list: timeBit을 노드의 순서로 대신할 수 있다. 가장 앞의 노드가 가장 오래된(get도 put도 적용되지 않은) 캐시가 된다.
	// 		단순 조회(get): 조회할 항목을 일일이 찾아가야 한다. 중간에 발견하면 그 노드를 가장 마지막으로 옮기고 값을 반환한다. 끝까지 가도록 발견하지 못하면 '없는 것'이므로 -1을 반환한다. => 꽉 찬 O(N)
	// 		(같은 값)삭제 후 재삽입할 때(=put업데이트): 삭제할 항목을 찾아가야 한다. 단순조회(get)와 마찬가지로 중간에 찾으면 그 노드를 마지막으로 옮기고 값을 새 값으로 수정한다. => O(N)
	// 		(다른 값)꽉차서 지우고 삽입할 때(put추가): 삭제할 항목은 가장 앞의 노드로 고정된다. 삽입은 가장 뒤에 연결시키고 포인터를 항상 tail을 가리키도록 유지한다. 중간에 '같은 값이라 지워야 할' 노드가 있는지를 체크해야 하므로 전부 훑고 지나가야 한다... => 꽉 찬 O(N)
	// 		단순 삽입(put추가): 마지막 노드로 추가한다. => O(1)
	
	// => 정리하면: 
	// get: 꽉 찬 O(N)
	// put: if(캐시 capa === 노드 총 개수) 
	// 		 	while (노드 순회)
	// 				if(넣을 key를 발견(=put업데이트에 해당)하면)  
	// 					발견한 노드를 삭제.
	// 				else(끝까지 가도록 발견 못함(=put추가에 해당))
	// 					가장 앞의 노드를 삭제.
	// 			마지막 노드로 새 키-값 추가.
	// 		else 
	// 			while (노드 순회) 
	// 				if(같은 key가 있는지 확인) 있으면 삭제
	// 			마지막 노드로 새 키-값 추가하기.
	// => 다시 정리하면: 
	// put: while(노드 순회)
	// 			if(같은 key가 존재함을 발견하면)
	// 				발견한 노드를 삭제.
	// 				마지막 노드로 새 키-값 추가하고 return;
	//		if((끝까지 같은 key를 발견 못했지만)캐시가 꽉 찬 상태라면) 
	//			가장 앞의 노드를 삭제.(하여 자리 마련)
	// 		마지막 노드로 새 키-값 추가하기. 
	// 		=> 시간복잡도: 같은 key가 존재할 시 O(N)
	// 		=> 			   같은 key가 존재하지 않을 시 꽉 찬 O(N)
	// 		=> 공간복잡도: 링크드 리스트 하나. 
	// 만약 '버린 캐시key를 갖고 있는 set'을 만든다면... 공간은 좀 더 많이 필요하겠지. 그치만 '없음'을 증명하기는 간단할 것이다. 그래도 '있는 위치'를 찾아가기 위한 시간은 똑같이 들 텐데.
	// => put: if(같은 key가 없음 확정)
	// 				if(캐시가 꽉 찬 상태라면)
	// 					가장 앞의 노드 삭제.(하여 자리 마련)
	// 					set에 해당 키 추가.
	// 				마지막 노드로 새 키-값 추가하고 return;
	// 			(else(같은 key가 어딘가에 존재함))
	// 				while(노드 순회)
	// 					if(현재 노드가 같은 key면)
	// 						발견한 노드를 삭제.
	//						마지막 노드로 새 키-값 추가하고 return;
	// 		=> 시간복잡도: 같은 key가 존재할 시 O(N)
	// 					   같은 key가 존재하지 않을 시 O(1)
	// 		=> 공간복잡도: 최대 ...인 링크드 리스트 
	// 						+ 최대 ...인 set
	// 	=> ...인 줄 알았으나 set을 만드는 데 한계가 있다. 아예 언급되지도 않은 값은 set에 들어있을 수 없다. 존재할 수 있는 모든 key값(0 ~ 10^4)를 처음부터 몽땅 넣어줄 수 있는 게 아니라면... 
	// 	=> '버린 캐시key를 갖고 있는 set'만들기는 따라서 불필요함. 
	
	putPrompt(key, value) {
		// 문제1: '가장 오래전 불린' 키를 찾는 방법...
		// 문제2: 그걸 지우고서 맞게 지웠는지 확인할 방법 => 테스트 코드 자체와 print() 메소드를 마련함으로써 결과를 비교하기로 해결봄.

		// 만약 지금 key 개수가 this.storage의 사이즈를 넘어가면(=같다면) LRU 처리를 해야함. 
		this.storage.set(key, value);
		if (this.storage.size < this.capacity) {
			this.storage.set(key, value);
		} else {
			// '가장 오래전 쓰인' 키 찾기
			// map은 객체같아도 삽입된 순서가 기억된다고 했다. 그래서 .entries() 결과도 삽입 순서가 같으면 동일하다고 나오고 삽입 순서가 다르면 equality 체크에 falsy가 나오지 않던가... map이 삽입순서를 기억한다면... 만약 '업데이트'한 키의 경우는 처음 진입 순서에 위치해 있는가, 업데이트된 시점의 순서에 위치해 있는가? => 처음 진입 순서에 위치해 있는다. 흠... 이러면 단순히 set으로 업데이트해주면 안되겠는데... 
			
			// get이 호출됐을 때 '최신 동향'도 업데이트해야 한다.
			// put으로 추가나 업데이트가 됐을 때도 'used'로 봐야하나? 
			
		}
	}

	print() {
		const result = [];
		for (let pair of this.storage.entries()) {
			result.push(pair);
		}
		return result;
		return this.storage.entries();
	}
}

class ListNode {
	constructor(key, val, next) {
		this.key = (key === undefined ? 0 : key);
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

	// 값을 받아 다음 노드로 연결하고 방금 만든 노드 반환
	nextVal(num) {
		this.next = new ListNode(num);
		return this.next;
	}
	// => 알게된 점: Class에 속성(propterty)와 같은 이름의 메소드(method)를 만들 수 없다. 메소드도 본질적으로는 객체에 붙은 속성이기 때문이다. 위와 같이 .next라는 속성과 .next(num)이라는 메소드가 만들어진 경우, 오버라이팅이나 오버로딩되지 않고 처음 만든 속성 .next만 생존하는 것 같다. 
}
// 순수 링크드 리스트로 구현
class LRUCacheByLinkedList {
	constructor(capacity) {
		this.capacity = capacity;
		this.list = new ListNode(0); // dummy initial node
		this.tail = this.list;
		this.size = 0;
	}

	get(key) {
		let pointer = this.list.next;
		while (pointer) {
			if (pointer.key === key) return pointer.val;
			pointer = pointer.next;
		}
		return -1;
	}

	// put: while(노드 순회)
	// 			if(같은 key가 존재함을 발견하면)
	// 				발견한 노드를 삭제.
	// 				마지막 노드로 새 키-값 추가하고 return;
	//		if((끝까지 같은 key를 발견 못했지만)캐시가 꽉 찬 상태라면) 
	//			가장 앞의 노드를 삭제.(하여 자리 마련)
	// 		마지막 노드로 새 키-값 추가하기. 
	put(key, val) {
		let pointer = this.list;
		while (pointer.next) {
			if (pointer.next.key === key) {
				pointer.next = pointer.next.next;
				this.tail.next = new ListNode(key, val);
				this.tail = this.tail.next;
				return;
			}
			pointer = pointer.next;
		}

		if (this.capacity === this.size) {
			this.list = this.list.next;
			this.size--;
		}
		this.tail.next = new ListNode(key, val);
		this.tail = this.tail.next;
		this.size++
		return;
	}
}




// 다른 해답: Doubly linked list를 이용한 풀이
class Node {
	constructor(key, val, next) {
		this.key = key;
		this.val = val;
		this.next = next ?? null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(key, val) {
		const newNode = new Node(key, val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return newNode;
	}

	remove(node) {
		if (!node.next && !node.prev) { // 노드가 1개뿐일 때
			this.head = null;
			this.tail = null;
		} else if (!node.next) { // 삭제하려는 노드가 끝 노드일 때
			this.tail = node.prev;
			this.tail.next = null;
		} else if (!node.prev) { // 삭제하려는 노드가 첫 노드일 때
			this.head = node.next;
			this.head.prev = null;
		} else { 
			const prev = node.prev;
			const next = node.next;
			prev.next = next;
			next.prev = prev;
		}
		this.length--;
	}
}

class LRUCacheDoublyLinkedList {
	constructor(capacity) {
		this.DLL = new DoublyLinkedList();
		this.map = {}; // {key: Node(key,val)} 쌍
		this.capacity = capacity;
	}

	get(key) {
		// map에서 key를 찾아서 없으면 -1 반환
		if (!this.map[key]) return -1;

		// map으로 해당 노드를 찾아
		const value = this.map[key].val;
		// 1) 링크드 리스트에서 삭제
		this.DLL.remove(this.map[key]);
		// 2) 링크드 리스트의 끝에 다시 추가
		this.map[key] = this.DLL.push(key, value);
		return value;
	}

	put(key, value) {
		// map에 key가 존재하는 경우, 일단 링크드 리스트에서 지워준다(key가 이미 존재하든 아니든 새롭게 끝 노드로 덧붙여져야 하기 때문).
		if (this.map[key]) this.DLL.remove(this.map[key]);

		// 링크드 리스트의 끝에 새 노드를 추가하고, {key: (새로)만든 노드} 쌍을 map에도 저장
		this.map[key] = this.DLL.push(key, value);
		
		// 그렇게 추가했는데 가용 캐시 용량을 초과해버린 경우
		if (this.DLL.length > this.capacity) {
			// 링크드 리스트의 첫 노드가 제거 대상이 됨.
			const currKey = this.DLL.head.key;
			// 1) 먼저 map에서 첫 노드에서 뽑아온 key를 삭제하고 
			delete this.map[currKey];
			// 2) 링크드 리스트에서도 해당 노드를 삭제한다.  
			this.DLL.remove(this.DLL.head);
		}
	}
}




module.exports = {
	LRUCache: LRUCacheDoublyLinkedList,
}

// => function은 호이스팅이 되는데 class는 안 되는 것 같다.