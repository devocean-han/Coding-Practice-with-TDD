/* 724. Find Pivot Index
https://leetcode.com/problems/find-pivot-index/

Easy

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 

Example 1:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
Example 2:

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.
Example 3:

Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0
 

Constraints:

1 <= nums.length <= 104
-1000 <= nums[i] <= 1000
 

Note: This question is the same as 1991: https://leetcode.com/problems/find-the-middle-index-in-array/

*/

// 순회를 두 번 하여 답을 구한다:
function solution(nums) {
	if (nums.length === 1) return 0;

	let rightSum = leftSum = 0;

	// 1. nums의 총합을 먼저 구해 rightSum에 저장한다. 
	nums.forEach((value) => rightSum += value);

	// 2. nums를 다시 한 번 순회하며, i번째 자리마다 rightSum에서 빼준 것과 현재의 leftSum이 같아지는 지를 확인한다. 같지 않다면 leftSum에 현재 값을 더해주고 다음 i로 넘어간다. 
	for (let i = 0; i < nums.length; i++) {
		rightSum -= nums[i];

		if (leftSum === rightSum) return i;

		leftSum += nums[i];
	}

	// 3. 마지막까지 leftSum과 rightSum이 같아지는 순간이 오지 않았다면 피벗 인덱스틑 존재하지 않는 것이다. 
	return -1;
}

module.exports.solution = solution;










// n의 약수 찾기 할 때 신기한 for 루프:
// for (let i = 1; i * i <= n; i++) {
// 	if (n % i === 0) { ... }
// }