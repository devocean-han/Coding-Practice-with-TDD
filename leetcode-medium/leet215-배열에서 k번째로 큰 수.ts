/*
 * @lc app=leetcode id=215 lang=typescript
 *
 * [215] Kth Largest Element in an Array
 *
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (67.07%)
 * Total Accepted:    2M
 * Total Submissions: 3M
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * Given an integer array nums and an integer k, return the k^th largest
 * element in the array.
 * 
 * Note that it is the k^th largest element in the sorted order, not the k^th
 * distinct element.
 * 
 * Can you solve it without sorting?
 * 
 * 
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= k <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 
 * 
 */

// => 주어진 숫자 배열에서 k번째로 큰 수를 찾아 반환하기. 수들은 중복으로 존재할 수 있고, sort 함수를 사용하지 말 것.

// max heap을 만들어서 k개로 자르고 맨 마지막 수를 반환하기? 안된다. 맨 앞의 수를 제외한 뒤의 수들은 크기 정렬이 안 되어 있다. 그러면 min heap을 만들어서 k개로 자르고 맨 앞의 수를 반환하기. 
function findKthLargest(nums: number[], k: number): number {
	const minHeap: MinHeap = new MinHeap();
	for (const num of nums) {
		// 1. k개에 못 미치면 그냥 넣기
		// 2. k개이고 지금 넣는 수가 min보다 크거나 같으면: min을 먼저 빼고, 지금 수를 넣기
		if (minHeap.getLength() < k)
			minHeap.insert(num);
		else if (num >= minHeap.getMin()) {
			minHeap.popMin();
			minHeap.insert(num);
		}
	}

	return minHeap.getMin(); 
};

class MinHeap {
	private heap: number[];

	constructor() {
		this.heap = [];
	}

	// heap배열의 마지막 자리에 위치한 요소를 제자리로(Heapify): bubble up
	private bubbleUp() {
		let index = this.heap.length - 1;
		let element, parentIndex, parent;

		while (index > 0) {
			element = this.heap[index]
			parentIndex = Math.floor((index - 1) / 2);
			parent = this.heap[parentIndex];
			
			if (element >= parent) break;

			this.heap[parentIndex] = element;
			this.heap[index] = parent;
			
			index = parentIndex;	
		}
	}

	// heap배열의 첫 자리에 위치한 요소를 제자리로(Heapify): bubble down
	private bubbleDown() {
		let index = 0;
		let element: number;
		let leftChildIndex: number, rightChildIndex: number;
		let leftChild: number, rightChild: number;
		let swapTarget: null | number;
		
		while (true) {
			swapTarget = null;
			element = this.heap[index];
			leftChildIndex = index * 2 + 1;
			rightChildIndex = index * 2 + 2;
			
			if (leftChildIndex < this.heap.length) {
				leftChild = this.heap[leftChildIndex];
				if (leftChild < element) {
					swapTarget = leftChildIndex;
				}
			}

			if (rightChildIndex < this.heap.length) {
				rightChild = this.heap[rightChildIndex];
				if ((swapTarget === null && rightChild < element) ||
					(swapTarget && rightChild < leftChild)) {
					swapTarget = rightChildIndex;
				}
			}

			if (swapTarget === null) break;

			this.heap[index] = this.heap[swapTarget];
			this.heap[swapTarget] = element;

			index = swapTarget;
		}
	}

	// 요소를 삽입
	insert(num: number) {
		this.heap.push(num);
		this.bubbleUp();
	}

	// 최소 요소 추출
	popMin() {
		const min = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.bubbleDown();
		}
		return min;
	}

	getMin() {
		return this.heap[0];
	}

	getLength() {
		return this.heap.length;
	}
}

// 그냥 sort로 풀면? 테스트코드의 biggestNums 같은 애들은 못 풀려냐? => 잘만 풀린다. 심지어 더 빠른 것 같기도...
function findKthLargest2(nums: number[], k: number): number {
	nums.sort((a, b) => b - a); // 내림차순 정렬
	return nums[k - 1];
}

export default {
	solution: findKthLargest,
}
