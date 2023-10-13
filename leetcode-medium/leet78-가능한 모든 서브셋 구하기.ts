/*
 * @lc app=leetcode id=78 lang=typescript
 *
 * [78] Subsets
 *
 * https://leetcode.com/problems/subsets/description/
 *
 * algorithms
 * Medium (76.22%)
 * Total Accepted:    1.6M
 * Total Submissions: 2.1M
 * Testcase Example:  '[1,2,3]'
 *
 * Given an integer array nums of unique elements, return all possible subsets
 * (the power set).
 * (A subset of an array is a selection of elements (possibly none) of the array.)
 * 
 * The solution set must not contain duplicate subsets. Return the solution in
 * any order.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [0]
 * Output: [[],[0]]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * All the numbers of nums are unique.
 * 
 * 
 */

// => 백트래킹을 이용해 주어진 배열로 가능한 모든 부분 배열 조합을 반환하기(빈 배열 포함)

// (실패) 첫 시도
function subsetsFailed(nums: number[]): number[][] {
	const result: Array<Array<number>> = [[]];
	if (nums.length === 1)
		return [[], nums];
	if (nums.length === 2) {
		// 한 개짜리 전부 넣기
		for (let index in nums) {
			result.push([nums[index]]);
		}
		// 두 개짜리 넣기
		result.push(nums);
		return result;
	}
	if (nums.length === 3) {
		// 한 개짜리 전부
		for (let index in nums) {
			result.push([nums[index]]);
		}
		// 두 개짜리 전부 넣기
		let makingSubsetsOfLength = 2;
		for (let i = 0; i <= nums.length - makingSubsetsOfLength; i++) {
			let currentSubset = [];
			// (2)
			while (currentSubset.length !== makingSubsetsOfLength) {
				currentSubset.push(i);
				// 뭔가 말이 안 돼서 subsets2로 재작성함
			}
			// (1)
			for (let j = i; j < makingSubsetsOfLength; j++) {
				if (currentSubset.length >= makingSubsetsOfLength) {
					result.push(currentSubset);
					// (2)while문으로 리팩토링하러 이동
				}
				if (currentSubset.length < makingSubsetsOfLength) {
					currentSubset.push(j);
				}
			}
		}
	}
};

// 에잇 그냥 재귀로 
function subsets1(nums: number[]): number[][] {
	function makeSubset(sub: number[], startIndex: number) {
		for (let i = startIndex; i < nums.length; i++) {
			sub.push(nums[i]);
			result.push([...sub]); // 그냥 push(sub) 하면 이후 루프에서 바뀌는 그대로 영향을 받게 됨. 
			makeSubset(sub, i + 1);
			sub.pop();
		}
	}
	
	const result: number[][] = [[]];
	makeSubset([], 0);

	return result;
}

// 리팩토링한 재귀 풀이: 
function subsets2(nums: number[]): number[][] {
	function makeSubsets(currentSub: number[], startIndex: number) {
		result.push([...currentSub]);
		for (let i = startIndex; i < nums.length; i++) {
			currentSub.push(nums[i]);
			makeSubsets(currentSub, i + 1);
			currentSub.pop();
		}
	}

	const result: number[][] = [];
	makeSubsets([], 0);
	return result;
}

// 부분 배열(subset)에 push와 pop이 따로 필요없고, result에 push할 때도 깊은 복사가 필요없는 풀이: 
function subsets3(nums: number[]): number[][] {
	function makeSubsets(curSub: number[], startIndex: number) {
		result.push(curSub);
		for (let i = startIndex; i < nums.length; i++) {
			makeSubsets(curSub.concat(nums[i]), i + 1);
		}
	}
	
	const result: number[][] = [];
	makeSubsets([], 0);
	return result;
}
//* a.concat(b): 배열 a와 b를 합친 새로운 배열을 반환함. a와 b는 수정되지 않는다. 

export default {
	solution: subsets2,
}