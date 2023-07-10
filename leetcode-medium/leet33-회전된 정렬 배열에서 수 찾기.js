/* 33. Search in Rotated Sorted Array
https://leetcode.com/problems/search-in-rotated-sorted-array/

Medium

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:

Input: nums = [1], target = 0
Output: -1


Constraints:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104

*/

// 1. '회전된 정렬 배열에서 최솟값 찾기'에서 사용한 방법으로 최소값이 되는 지점(인덱스)를 찾는다.
// 2. 거기서부터 target을 찾는 이진 탐색을 다시 시작한다. left와 right을 옮길 때 인덱스를 " % nums.length"로 한 번 계산해서 배정한다. 
// => 에러 케이스 발생, 실패...
function solution(nums, target) {
	// 1. 최솟값 위치 찾기
	let left = 0, right = nums.length - 1;

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		
		if (nums[mid] > nums[right]) { // 최솟값은 mid보다 오른쪽 반절에 존재함.
			left = mid + 1;
		} else { // 최솟값이 mid에 위치하거나 mid보다 왼쪾 반절에 존재함 => mid를 포함하여 다음 sub array를 잡는다. 
			right = mid;
		}
	}

	// 2. 다시 target을 찾는 이진 탐색 수행
	const len = nums.length;
	right = (left - 1 + len) % len; // 최솟값의 인덱스(left)가 0일 때 right을 유효 인덱스 범위에 넣기 위하여.
	console.log('min left and, right: ', left, right);
	
	while (left < right) {
		console.log('current left & right: [', left, right, ']')
		let mid;
		if (left < right) {
			mid = Math.floor((left + right) / 2);
		} else {
			// left와 right이 뒤집혀 있을 때도 유효 인덱스 범위 내의 mid 구하기: 
			mid = (Math.floor((left + (right + len)) / 2)) % len;
		}
		if (nums[mid] < target) { // target이 mid의 오른 반절에 존재함. 
			left = (mid + 1) % len;
		} else {
			right = mid;
		}
	}

	return nums[left] === target ? left : -1;
}

module.exports.solution = solution;

// 다른 해답: 
function oneBinarySolution(nums, target) {
	let left = 0;
	let right = nums.length - 1;
		
	while (left <= right) {
		let mid = Math.floor((left + right) / 2);
		
		if (nums[mid] === target) {
			return mid;
		}
		
		// When dividing the roated array into two halves, one must be sorted.
		
		// Check if the left side is sorted
		if (nums[left] <= nums[mid]) {
			if (nums[left] <= target && target <= nums[mid]) {
				// target is in the left
				right = mid - 1;
				
			} else {
				// target is in the right
				left = mid + 1;
			}
		} 
		
		// Otherwise, the right side is sorted
		else {
			if (nums[mid] <= target && target <= nums[right]) {
				// target is in the right
				left = mid + 1;

			} else {
				// target is in the left
				right = mid - 1;
			}
		}
	}
	
	return -1;
} 

//
// 숫자가 주어졌을 때, 숫자의 자릿수만큼 for문을 도는 방법: 
// for (let n = num; n > 0; n = Math.floor(num / 10)) { ... }