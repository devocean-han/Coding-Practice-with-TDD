/*
 * @lc app=leetcode id=973 lang=typescript
 *
 * [973] K Closest Points to Origin
 *
 * https://leetcode.com/problems/k-closest-points-to-origin/description/
 *
 * algorithms
 * Medium (65.89%)
 * Total Accepted:    1.1M
 * Total Submissions: 1.6M
 * Testcase Example:  '[[1,3],[-2,2]]\n1'
 *
 * Given an array of points where points[i] = [xi, yi] represents a point on
 * the X-Y plane and an integer k, return the k closest points to the origin
 * (0, 0).
 * 
 * The distance between two points on the X-Y plane is the Euclidean distance
 * (i.e., √(x1 - x2)^2 + (y1 - y2)^2).
 * 
 * You may return the answer in any order. The answer is guaranteed to be
 * unique (except for the order that it is in).
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: points = [[1,3],[-2,2]], k = 1
 * Output: [[-2,2]]
 * Explanation:
 * The distance between (1, 3) and the origin is sqrt(10).
 * The distance between (-2, 2) and the origin is sqrt(8).
 * Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
 * We only want the closest k = 1 points from the origin, so the answer is just
 * [[-2,2]].
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: points = [[3,3],[5,-1],[-2,4]], k = 2
 * Output: [[3,3],[-2,4]]
 * Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= k <= points.length <= 10^4
 * -10^4 <= xi, yi <= 10^4
 * 
 * 
 */


function kClosest1(points: number[][], k: number): number[][] {
	const maxHeap: MaxHeap = new MaxHeap();
	for (let point of points) {
		const [x, y] = point;
		const distance = x * x + y * y;
		if (maxHeap.getLength() < k) 
			maxHeap.insert(x, y);
		else if (maxHeap.getMax().distance > distance) {
			maxHeap.popMax();
			maxHeap.insert(x, y);
		}
	}

	return maxHeap.getPositionArray();
};

interface point {
	position: [number, number];
	distance: number;
}
class MaxHeap {
	// private heap: number[];
	private heap: point[];

	constructor() {
		this.heap = [];
	}

	// 마지막 요소를 제자리로 끌어 올리기
	private bubbleUp() {
		// 부모의 '거리'값보다 더 크면 부모와 자리를 교체하기를 반복한다.
		let index = this.heap.length - 1;
		const point = this.heap[index];
		
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.heap[parentIndex];

			if (point.distance <= parent.distance) break;

			this.heap[parentIndex] = point;
			this.heap[index] = parent;

			index = parentIndex;
		}
	}

	// 첫 번째 요소를 제자리로 끌어내리기
	private bubbleDown() {
		// 존재하는 자식 중 나의 '거리'값보다 더 큰 최대 자식과 자리를 교체하기를 반복한다. 
		let index = 0;
		const point = this.heap[index];
		
		while (true) {
			let leftChildIndex = index * 2 + 1;
			let rightChildIndex = index * 2 + 2;
			let leftChild, rightChild;
			let swapTarget = null;
			if (leftChildIndex < this.heap.length) {
				leftChild = this.heap[leftChildIndex];
				if (leftChild.distance > point.distance) {
					swapTarget = leftChildIndex;
				}
			}
			if (rightChildIndex < this.heap.length) {
				rightChild = this.heap[rightChildIndex];
				if ((swapTarget === null && rightChild.distance > point.distance) || 
					(swapTarget !== null && rightChild.distance > leftChild.distance)) {
					swapTarget = rightChildIndex;
				}
			}

			if (swapTarget === null) break;

			this.heap[index] = this.heap[swapTarget];
			this.heap[swapTarget] = point;

			index = swapTarget;
		}
	}

	insert(x:number, y:number) {
		const point: point = { distance: x * x + y * y, position: [x, y] };
		this.heap.push(point);
		this.bubbleUp();
	}

	popMax() {
		const max = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.bubbleDown();
		}
		return max; 
	}

	getMax() {
		return this.heap[0];
	}

	getLength() {
		return this.heap.length;
	}

	getPositionArray() {
		return this.heap.map((point) => point.position);
	}
}

function kClosest(points: number[][], k: number): number[][] {
	return points.map((point) => {
		const [x, y] = point;
		const distance: number = x * x + y * y;
		return { position: point, distance };
	})
		.sort((a, b) => a.distance - b.distance)
		.slice(0, k)
		.map((point) => point.position);
}

export default {
	solution: kClosest,
}