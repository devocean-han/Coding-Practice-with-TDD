/*
 * @lc app=leetcode id=1046 lang=typescript
 *
 * [1046] Last Stone Weight
 *
 * https://leetcode.com/problems/last-stone-weight/description/
 *
 * algorithms
 * Easy (65.17%)
 * Total Accepted:    533.7K
 * Total Submissions: 819.2K
 * Testcase Example:  '[2,7,4,1,8,1]'
 *
 * You are given an array of integers stones where stones[i] is the weight of
 * the i^th stone.
 * 
 * We are playing a game with the stones. On each turn, we choose the heaviest
 * two stones and smash them together. Suppose the heaviest two stones have
 * weights x and y with x <= y. The result of this smash is:
 * 
 * 
 * If x == y, both stones are destroyed, and
 * If x != y, the stone of weight x is destroyed, and the stone of weight y has
 * new weight y - x.
 * 
 * 
 * At the end of the game, there is at most one stone left.
 * 
 * Return the weight of the last remaining stone. If there are no stones left,
 * return 0.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: stones = [2,7,4,1,8,1]
 * Output: 1
 * Explanation: 
 * We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
 * we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
 * we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
 * we combine 1 and 1 to get 0 so the array converts to [1] then that's the
 * value of the last stone.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: stones = [1]
 * Output: 1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= stones.length <= 30
 * 1 <= stones[i] <= 1000
 * 
 * 
 */

// => 무게가 있는 돌멩이 뭉치가 주어지면 그 중 가장 무거운 2개를 부딪힌다. 부딪힌 무게만큼 양 돌멩이가 부서진다고 할 때, 이 과정을 반복하여 남은 돌멩이가 1개 이하가 됐을 때의 무게를 반환하기.
// ==> 부딪히고서 무게가 0만큼 남았다면 없는 취급한다. 매번 가장 무거운 돌멩이 2개를 새로 고른다. 

function lastStoneWeight(stones: number[]): number {
	// 최대값을 두 번 뽑는다.
	// 두 값의 차(절대값)를 계산해서 >0이면 다시 넣는다. 
	// 다시 최대값을 두 번 뽑고 차를 계산하기를 반복한다.
	// 남은 돌멩이가 1개나 0개가 될 때까지 반복한다. 
	const maxHeap: MaxHeap = new MaxHeap();
	for (const weight of stones)
		maxHeap.insert(weight);

	let max, secondMax;
	while (maxHeap.getLength() > 1) {
		max = maxHeap.popMax();
		secondMax = maxHeap.popMax();
		let diff = Math.abs(max - secondMax);
		if (diff > 0) maxHeap.insert(diff);
	}

	// return maxHeap.getLength() === 0 ? 0 : maxHeap.popMax();
	return maxHeap.popMax() ?? 0;
};

class MaxHeap {
	private heap: number[]

	constructor() {
		this.heap = [];
	}

	//^ heap의 맨 끝 요소를 제자리로 끌어올리기
	private bubbleUp() {
		// 부모와 비교하여 더 클 때만 자리를 교체한다.
		let index = this.heap.length - 1;

		while (index > 0) {
			let element = this.heap[index];
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.heap[parentIndex];
			
			if (element <= parent) break;
			
			this.heap[parentIndex] = element;
			this.heap[index] = parent;
			
			index = parentIndex;
		}
	}
	
	//^ heap의 맨 앞 요소를 제자리로 끌어내리기
	private bubbleDown() {
		// 존재하는 자식 중 나보다 더 큰 최대 자식과 자리를 교체한다. 
		let index = 0;
		const element = this.heap[index];
		
		while (true) {
			let leftChildIndex = index * 2 + 1;
			let rightChildIndex = index * 2 + 2;
			let leftChild, rightChild;
			let swapTarget = null;

			if (leftChildIndex < this.heap.length) {
				leftChild = this.heap[leftChildIndex];
				if (element < leftChild) {
					swapTarget = leftChildIndex;
				}
			}
			if (rightChildIndex < this.heap.length) {
				rightChild = this.heap[rightChildIndex];
				if ((swapTarget === null && element < rightChild) ||
					(swapTarget !== null && leftChild < rightChild)) {
					swapTarget = rightChildIndex;
				}
			}

			if (swapTarget === null) break;

			this.heap[index] = this.heap[swapTarget];
			this.heap[swapTarget] = element;

			index = swapTarget;
		}

	}

	//^ 요소를 삽입
	insert(num: number) {
		this.heap.push(num);
		this.bubbleUp();
	}

	//^ 최대 요소 추출
	popMax() {
		const max = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.bubbleDown();
		}
		return max;
	}

	getLength() {
		return this.heap.length;
	}
}
