/*
 * @lc app=leetcode id=1851 lang=typescript
 *
 * [1851] Minimum Interval to Include Each Query
 *
 * https://leetcode.com/problems/minimum-interval-to-include-each-query/description/
 *
 * algorithms
 * Hard (49.13%)
 * Total Accepted:    24.3K
 * Total Submissions: 49.5K
 * Testcase Example:  '[[1,4],[2,4],[3,6],[4,4]]\n[2,3,4,5]'
 *
 * You are given a 2D integer array intervals, where intervals[i] = [lefti,
 * righti] describes the i^th interval starting at lefti and ending at righti
 * (inclusive). The size of an interval is defined as the number of integers it
 * contains, or more formally righti - lefti + 1.
 * 
 * You are also given an integer array queries. The answer to the j^th query is
 * the size of the smallest interval i such that lefti <= queries[j] <= righti.
 * If no such interval exists, the answer is -1.
 * 
 * Return an array containing the answers to the queries.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
 * Output: [3,3,1,4]
 * Explanation: The queries are processed as follows:
 * - Query = 2: The interval [2,4] is the smallest interval containing 2. The
 * answer is 4 - 2 + 1 = 3.
 * - Query = 3: The interval [2,4] is the smallest interval containing 3. The
 * answer is 4 - 2 + 1 = 3.
 * - Query = 4: The interval [4,4] is the smallest interval containing 4. The
 * answer is 4 - 4 + 1 = 1.
 * - Query = 5: The interval [3,6] is the smallest interval containing 5. The
 * answer is 6 - 3 + 1 = 4.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
 * Output: [2,-1,4,6]
 * Explanation: The queries are processed as follows:
 * - Query = 2: The interval [2,3] is the smallest interval containing 2. The
 * answer is 3 - 2 + 1 = 2.
 * - Query = 19: None of the intervals contain 19. The answer is -1.
 * - Query = 5: The interval [2,5] is the smallest interval containing 5. The
 * answer is 5 - 2 + 1 = 4.
 * - Query = 22: The interval [20,25] is the smallest interval containing 22.
 * The answer is 25 - 20 + 1 = 6.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= intervals.length <= 10^5
 * 1 <= queries.length <= 10^5
 * intervals[i].length == 2
 * 1 <= lefti <= righti <= 10^7
 * 1 <= queries[j] <= 10^7
 * 
 * 
 */

// intervals가 오름차순이라는 얘기가 없다. 중복되는 시작점과 끝점이 존재한다.

// 일단 intervals를 오름차순 정렬한다. 그러면 각 query마다 전체 intervals를 검사하지 않아도 된다. 
function minInterval(intervals: number[][], queries: number[]): number[] {
	// intervals 시작점 기준 오름차순 정렬
	intervals.sort((a, b) => a[0] - b[0]);

	// 만약 어떤 query를 봤는데 2이다, 그러면 시작점이 2 이하인 인터벌들을 본다. 끝점도 2이상인 인터벌을 찾는다. 그 중 가장 짧은 길이를 선택한다. 
	const result = [];
	for (let j = 0; j < queries.length; j++) {
		const query = queries[j];
		let minIntervalSize = Infinity;
		let i = 0;
		while (i < intervals.length && intervals[i][0] <= query) {
			if (intervals[i][1] >= query) {
				if (intervals[i][1] - intervals[i][0] + 1 < minIntervalSize)
					minIntervalSize = intervals[i][1] - intervals[i][0] + 1;
			}
			i++;
		}

		result.push(minIntervalSize === Infinity ? -1 : minIntervalSize);
	}

	return result;
};

// (성공)방법 2: size를 아예 구해서 오름차순 정렬?
function minInterval2(intervals: number[][], queries: number[]): number[] {
	// intervals의 길이(size)를 구해서 오름차순 정렬한다
	const intervalsWithSize = intervals
		.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
	
	// 각 query 별로 intervalsSize를 처음부터 순회하다가 속할 수 있는 인터벌을 찾자마자 그 사이즈로 확정
	const result = [];
	queryIteration:
	for (let query of queries) {
		for (const interval of intervalsWithSize) {
			if (interval[0] <= query && query <= interval[1]) {
				result.push(interval[1] - interval[0] + 1);
				continue queryIteration;
			}
		}
		result.push(-1);
	}

	return result;
};

// 다른 해답: min heap을 이용
function minInterval3(intervals: number[][], queries: number[]): number[] {
	const sortedQueries = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
	intervals.sort((a, b) => a[0] - b[0]);

	const heap = new MinHeap();
	const result = new Array(queries.length);

	let i = 0; 

	for (const [query, index] of sortedQueries) {
		while (i < intervals.length && intervals[i][0] <= query) {
			const [start, end] = intervals[i];
			heap.insert([end - start + 1, end]);
			i++;
		}

		while (heap.size && query > heap.min[1]) {
			heap.remove();
		}

		result[index] = heap.size ? heap.min[0] : -1;
	}
	
	return result;
}

class MinHeap {
	private heap: [number, number][] = [];

	get min() {
		return this.heap[0];
	}

	get size() {
		return this.heap.length;
	}

	insert(val: [number, number]) {
		this.heap.push(val);
		this.bubbleUp(this.size - 1);
	}

	remove() {
		if (!this.size) return;

		this.swap(0, this.size - 1);
		const min = this.heap.pop();
		this.bubbleDown(0);
		return min;
	}

	// 현재 index 자리의 노드를 min heap 규칙에 맞도록 끌어올린다.
	private bubbleUp(index: number) {
		// 지금 자리가 루트(root)에 도달하거나, 부모의 size값 이상이 될 때까지 반복 
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);

			// 지금 자리의 size값이 부모 자리의 size값보다 작을 때만 자리 교체
			if (this.heap[index][0] < this.heap[parentIndex][0]) {
				this.swap(index, parentIndex);
				index = parentIndex;
			} else {
				break;
			}
		}
	}

	// 현재 index 자리의 노드를 min heap 규칙에 맞도록 끌어내린다.
	private bubbleDown(index: number) {
		// 지금 자리가 힙의 끝에 도달하거나, 두 자식의 size값 미만이 될 때까지 반복
		while (index < this.size) {
			const leftChildIndex = index * 2 + 1;
			const rightChildIndex = index * 2 + 2;
			let smallest = index;

			if (leftChildIndex < this.size && this.heap[leftChildIndex][0] < this.heap[smallest][0])
				smallest = leftChildIndex;
			
			if (rightChildIndex < this.size && this.heap[rightChildIndex][0] < this.heap[smallest][0])
				smallest = rightChildIndex;

			if (index === smallest) break;

			this.swap(index, smallest);
			index = smallest;
		}
	}

	private swap(i: number, j: number) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}