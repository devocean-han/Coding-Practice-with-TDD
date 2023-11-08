/*
 * @lc app=leetcode id=45 lang=typescript
 *
 * [45] Jump Game II
 *
 * https://leetcode.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Medium (40.16%)
 * Total Accepted:    1M
 * Total Submissions: 2.6M
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * You are given a 0-indexed array of integers nums of length n. You are
 * initially positioned at nums[0].
 * 
 * Each element nums[i] represents the maximum length of a forward jump from
 * index i. In other words, if you are at nums[i], you can jump to any nums[i +
 * j] where:
 * 
 * 
 * 0 <= j <= nums[i] and
 * i + j < n
 * 
 * 
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are
 * generated such that you can reach nums[n - 1].
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2. Jump
 * 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [2,3,0,1,4]
 * Output: 2
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10^4
 * 0 <= nums[i] <= 1000
 * It's guaranteed that you can reach nums[n - 1].
 * 
 * 
 */

import { MinHeap } from "../Class 모음";

// 제자리로 점프할 수 있다는 조건이 추가된 가운데, 마지막 자리에 도달하기 위해 뛰어야 하는 최소 점프 수를 반환하기. 모든 인풋은 마지막 자리에 도달할 수 있도록 주어진다.

/*
 최소값? 최소 힙 사용?!
 모든 시나리오의 점프 수를 센다. 
 */

// (실패) 보조 재귀 함수 활용: 
function jump(nums: number[]): number {
	// 언제 탈출해야 하는가?
	// 반환값을 무엇으로 하는가? 지금 단계의 스텝을 추가할지 말지. 추가하면 +1, 안 추가하면 0
	// 만약 끝에 도달할 수 있었던 루트라면 최종 스텝 수를 heap에 넣는다. 
	// 끝에 도달할 수 있음을 어떻게 확인하지? 
	
	// lasgIndex부터 시작한다. 스텝 수는 0으로 두고 시작한다. 지금 요소가 lastIndex를 넘어설 수 없으면 lastIndex와 스텝 수는 그대로 두고 이전 요소를 탐색한다. 지금 요소가 lastIndex를 넘어설 수 있으면 루트를 분기한다. 지금 요소를 선택하고 넘어가는 루트와 선택하지 않고 넘어가는 루트로. 마지막에 갱신된 lastIndex가 0이 될 수 있었으면 그 루트는 가능한 루트이므로, 스텝 수를 heap에 넣는다. 마지막에 갱신된 lastIndex가 0이 되지 않았다면 스텝 수를 heap에 넣지 않고 그 루트를 버린다. 최종적으로 heap.min() 값을 반환한다. 
	// 그냥 뒤에서부터 검사하니까, 가장 큰 뜀뛰기 요소로 건너오는 건 어떤가? 
	
	const minHeap: MinHeap = new MinHeap();
	// Time complexity: O(N^N)?
	function canJump(lastIndex: number, steps: number) {
		for (let i = lastIndex - 1; i >= 0; i--) {
			if (i + nums[i] >= lastIndex) {
				let chosen = canJump(i, steps + 1); // 이 요소를 선택하는 루트
				// => 왜 ++steps 는 이상한 결과가 나왔던 거지? steps++가 이상했던 건 이해가 가는데...
				// let notChosen = canJump(lastIndex, steps);
			}
		}
	
		// 최종 lastIndex가 0에 도달할 수 있었으면 가능한 루트. 최종 스텝 수를 heap에 넣는다. 
		if (lastIndex === 0) {
			minHeap.insert(steps);
		} 
	}

	canJump(nums.length - 1, 0);
	console.log(minHeap.getHeap());
	return minHeap.getMin();
};

// 아마 요소를 선택하느냐 안 하느냐로만 갈라지는 게 아니라 각 '선택한다' 마다 새 for 루프가 생겨서 시간이 압도적으로 걸리는 것 같다. 즉, O(N^N) 시간 복잡도가 됐던 것(?)
// => for 루프를 없애본다. 
// (완성x)
function jump2(nums: number[]): number {
	const minHeap: MinHeap = new MinHeap();

	function canJump2(i: number, lastIndex: number, steps: number) {
		if (i === -1) {
			if (lastIndex === 0)
				minHeap.insert(steps);
			return;
		} 
		
		while (true) {
			if (nums[i] === 0)
				canJump2(i - 1, lastIndex, steps);
			else if (i + nums[i] < lastIndex) {
				canJump2(i, i + 1, steps + 1); // 뛸 수 있는 최대 뜀을 뜀. 
				break;
			}
			i--;
			// canJump2(i - 1, lastIndex, steps); // 현재 요소를 선택하지 않는 루트
		}
	}

	canJump2(nums.length - 2, nums.length - 1, 0);
	console.log(minHeap.getHeap());
	return minHeap.getMin();
}

// (완성x)
function jump3(nums: number[]): number {
	// 그 때 뛸 수 있는 최대 길이를 뛴다. 거꾸로.
	let lastIndex = nums.length - 1;
	let steps = 0;

	for (let i = nums.length - 1; i >= 0; i--) {
		if (nums[i] !== 0 && i + nums[i] < lastIndex) { // 처음 lastIndex로 점프하지 못하겠는 자리에 도달한 순간, lastIndex를 그 직후 자리로 당긴다.
			lastIndex = i + 1;
			steps++;
		}
		// nums[i] === 0인 경우에는 다음 자리를 계속 봐야한다. 
	}
	return steps;
}

// 어떤 풀이: Greedy
function jump4(nums: number[]): number {
	let steps = 0;
	let lastIndex = 0; 
	let farthest = 0;

	/* [5,6,4,4,6,	9,4,4,7,4,
		4,8,2,6,8,	1,5,9,6,5,
		2,7,9,7,9,	6,9,4,1,6,
		8,8,4,4,2,	0,3,8,5   ] => 5
	*/
	// 첫 자리에서부터 뒤로 순회하며
	for (let i = 0; i < nums.length - 1; i++) {
		// 지나왔던 자리에서 가장 멀리까지 뛸 수 있었던 '최대 도착 거리'와 지금 뛸 수 있는 가장 먼 자리 중 더 먼 자리를 새로운 '최대 도착 거리'로 삼는다. 
		farthest = Math.max(farthest, i + nums[i]);
		// 만약 현재 인덱스가 '마지막 자리'에 도달하면 이 자리로 점프를 한 번 (해야)하고, '마지막 자리'를 '최대 도착 거리'로 새롭게 덧씌워준다. 
		if (i === lastIndex) {
			steps++;
			lastIndex = farthest;
		}
	}

	return steps;
}

// 다른 풀이: 아주 빠른
function jump5(nums: number[]): number {
	const last = nums.length - 1;
	const bestJump: () => number | undefined = BestJumpCalculator();
	
	let jumps = 0;
	let index = 0;

	while (index < last) {
		let next = bestJump();
		if (typeof next === undefined) return -1; // 이 분기는 일어나면 안 된다.
		else {
			jumps++;
			index = next;
		}
	}

	return jumps;

	function BestJumpCalculator(): () => number | undefined {
		let lastSeen = 0; 
		return calculate;
	
		//? 왜 이런 바깥-안 함수를 만드는 거지? 단순히 함수 내부 전역변수(lastSeen)를 만들어 이용하기 위함인가? 
		function calculate(): number | undefined {
			let min = Math.min(lastSeen + 1, index + 1);
			let max = index + nums[index];

			// 새로 정한 max가 nums의 끝 자리에 도달하면 nums의 끝 인덱스 반환
			if (max >= last) return last

			let bestValue = 0; 
			let bestIndex: number | undefined;
			for (let i = min; i <= max; i++) {
				let value = i + nums[i];
				if (value > bestValue) {
					bestValue = value;
					bestIndex = i;
				}
			}

			lastSeen = max;
			return bestIndex;
		}
	}
}

export default {
	solution: jump5,
}


// class MinHeap {
// 	private heap: number[];

// 	constructor() {
// 		this.heap = [];
// 	}


// }