/*
 * @lc app=leetcode id=46 lang=typescript
 *
 * [46] Permutations
 *
 * https://leetcode.com/problems/permutations/description/
 *
 * algorithms
 * Medium (77.61%)
 * Total Accepted:    1.9M
 * Total Submissions: 2.5M
 * Testcase Example:  '[1,2,3]'
 *
 * Given an array nums of distinct integers, return all the possible
 * permutations. You can return the answer in any order.
 * 
 * 
 * Example 1:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * Example 2:
 * Input: nums = [0,1]
 * Output: [[0,1],[1,0]]
 * Example 3:
 * Input: nums = [1]
 * Output: [[1]]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * All the integers of nums are unique.
 * 
 * 
 */

// => 순열: 모든 숫자를 다 써서 만들어야 하는 것이 핵심

// (성공)
function permute(nums: number[]): number[][] {
	const results: number[][] = [];
	const path: number[] = [];
	let doNotChooseIndex = new Set<number>();
	backtrackingDFS();
	return results;

	function backtrackingDFS() {
		if (path.length === nums.length) {
			results.push([...path]);
			return;
		}
		for (let i = 0; i < nums.length; i++) {
			if (doNotChooseIndex.has(i))
				continue;
			path.push(nums[i]);
			doNotChooseIndex.add(i);
			backtrackingDFS()
			path.pop();
			doNotChooseIndex.delete(i);
		}
	}
};

// (불가능 -> 성공) Set 자체에 길이 변화를 주면서 순회하는 것은 무한 루프를 발생시킬 수밖에 없음 
function permute2(nums: number[]): number[][] {
	const results: number[][] = [];
	const path: number[] = [];
	let chooseIndex: Set<number> = new Set(nums.map((_,idx) => idx));
	backtrackingDFS();
	console.dir(results)
	return results;

	function backtrackingDFS() {
		if (path.length === nums.length) {
			results.push([...path]);
			return;
		}
		for (let i of [...chooseIndex]) {
			path.push(nums[i]);
			chooseIndex.delete(i)
			backtrackingDFS()
			chooseIndex.add(i);
			path.pop();
			// console.log()
		}
	}
}; 
/* 
=> Javascript의 for 반복문은 초기 조건을 '박제해'두지 않고 매 반복 시에 조건을 새롭게 측정함. 
	즉, 순회 대상이 되는 배열의 길이가 도중에 변화하게 되면 몇 번을 반복하게 되는지도 영향을 받게 된다. 
	permute2에선 for 문 안에서 chooseIndex에 항상 하나 이상의 요소가 존재하게 되기 때문에 for 문이 끝나지 않는 무한루프가 발생하게 되는 것.  
*/

// for 문 실험: 
let nums: number[];
// 1. 평범한 순회
nums = [1,2,3,4,5]
for (let i = 0; i < nums.length; i++) {
	console.log(`val: ${nums[i]}`)
	nums.pop()
	console.dir(nums)
}
// 2. Object.entries()로 복제품을 만들어 순회
nums = [1,2,3,4,5]
for (let [i,val] of Object.entries(nums)) {
	console.log(`i: ${i}`)
	nums.pop()
	console.dir(nums)
}
// 3. for ... of 순회
nums = [1,2,3,4,5]
for (let val of nums) {
	console.log(`val: ${val}`)
	nums.pop()
	console.dir(nums)
}
// 4. for ... in 순회
nums = [1,2,3,4,5]
for (let i in nums) {
	console.log(`i: ${i}`)
	nums.pop();
	console.dir(nums);
}


export default {
	solution: permute2,
}