/* 81. Search in Rotated Sorted Array II, 결국 미완성...
https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

Medium

There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].

Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.

You must decrease the overall operation steps as much as possible.


Example 1:

Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true

Example 2:

Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
nums is guaranteed to be rotated at some pivot.
-104 <= target <= 104
 

Follow up: This problem is similar to Search in Rotated Sorted Array, but nums may contain duplicates. Would this affect the runtime complexity? How and why?
*/


// '회전된 정렬 배열에서 수 찾기I'에서와 마찬가지로,
// 1. mid로 잘린 왼쪽 반절이 끊김없이 오름차순 정렬되어 있다면 target이 이쪽에 속하는지 검사한다. 그렇지 않다면 오른 반절에 속한 것이므로 오른쪽으로 left를 옮겨준다.
// 2. 그렇지 않고 mid로 잘린 오른쪽 반절이 끊김없이 오름차순 정렬되어 있다면 target을 오른 반절에서 검사한다. 결과에 따라 left나 right을 옮겨준다. 
// 3. while문 안에서 === target일 시 바로 true를 반환해주거나, 다 끝나고 nums[left] === target인지 확인해서 반환값을 정해준다. 
function solution(nums, target) {
	// 양 끝 값을 정한다. 
	let left = 0, right = nums.length - 1;

	// 에러 케이스: [1,0,1,1,1], target:0
	// => [1,0,1][1,1] : 바로 왼쪽 반절에서 검사를 진행하게 되어 잘못되게 된다.... 반절 안에서 중간에 오름차순이 끊겼다가 마지막에 가서 처음 수와 같아지는 경우를 생각해야 한다. "같은 수가 없다"는 조건일 때는 이런 경우를 상정하지 않아도 됐는데.
	// => 왼쪽 반절이 [1,0,1]과 같은 케이스인지를 걸러내는 방법: 오른 반절도 반드시 [1,...,1]일 것이다. 따라서 nums[left] === nums[mid]인 경우에 한해서 오른 반절로 이동하여 검사를 진행하도록 한다! 
	// 마찬가지로 [1,1][1,0,1]같이 오른 반절이 양 끝값이 같은 경우, 왼쪽 반절에서 target 검사를 진행하도록 한다. 
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		// 0. mid 자리의 값이 target과 일치하면 바로 현재 mid를 반환한다.
		if (nums[mid] === target) return true;

		// 1. mid로 잘린 왼쪽 반절이 끊김없이 오름차순 정렬되어 있다면
		if (nums[left] <= nums[mid]) {
			// 1-1. target이 왼쪽 반절에 속하는지 검사할 수 있다.
			if (nums[left] <= target && target <= nums[mid]) {
				// 1-2. 만약 그렇다면 다음 검색 대상을 왼쪽 반절로 삼는다.
				right = mid;
			} else {
				// 1-3. 그렇지 않다면 target은 오른쪽 반절에 존재한다는 의미이다.
				left = mid + 1;
			}
		} 
		// 2. 그렇지 않고 mid로 잘린 오른쪽 반절이 끊김없이 오름차순 정렬되어 있다면 
		else {
			// 2-1. target이 오른쪽 반절에 속하는지 검사할 수 있다. 
			if (nums[mid] <= target && target <= nums[right]) {
				// 2-2. 만약 그렇다면 다음 검색 대상은 오른쪽 반절이다.
				left = mid;
			} else {
				// 2-3. 그렇지 않다면 target이 왼쪽 반절에 존재한다는 얘기.
				right = mid - 1;
			}
		}
	}

	return false;
}

function fixedSolution(nums, target) {
	// 양 끝 값을 정한다. 
	let left = 0, right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		// 0. mid 자리의 값이 target과 일치하면 바로 현재 mid를 반환한다.
		if (nums[mid] === target) return true;

		// 1. mid로 잘린 왼쪽 반절이 끊김없이 오름차순 정렬되어 있다면
		if (nums[left] < nums[mid] || nums[mid + 1] === nums[right]) {
			// 1-1. target이 왼쪽 반절에 속하는지 검사할 수 있다.
			if (nums[left] <= target && target < nums[mid]) {
				// 1-2. 만약 그렇다면 다음 검색 대상을 왼쪽 반절로 삼는다.
				right = mid - 1;
			} else {
				// 1-3. 그렇지 않다면 target은 오른쪽 반절에 존재한다는 의미이다.
				left = mid + 1;
			}
		} 
		// // 2. 만약 왼쪽 반절을 봤는데 양 끝이 같은 값이라면, 오른 반절로 가서 target이 속하는지 검사한다.
		// else if (nums[left] === nums[mid]) {
		// 	if (nums[mid] <= target && target <= nums[right]) {
		// 		// 2-2. 만약 그렇다면 다음 검색 대상은 오른쪽 반절이다.
		// 		left = mid;
		// 	} else {
		// 		// 2-3. 그렇지 않다면 target이 왼쪽 반절에 존재한다는 얘기.
		// 		right = mid - 1;
		// 	}
		// }
		// // 3. 만약 오른쪽 반절을 봤는데 양 끝이 같은 값이라면, 왼쪽 반절로 가서 target이 범위 안에 속할지 검사한다.
		// else if (nums[mid + 1] === nums[right]) {
		// 	if (nums[left] <= target && target <= nums[mid]) {
		// 		// 4-2. 만약 그렇다면 다음 검색 대상을 왼쪽 반절로 삼는다.
		// 		right = mid;
		// 	} else {
		// 		// 4-3. 그렇지 않다면 target은 오른쪽 반절에 존재한다는 의미이다.
		// 		left = mid + 1;
		// 	}
		// }
		// 4. 그렇지 않고 mid로 잘린 오른쪽 반절이 끊김없이 오름차순 정렬되어 있다면 
		else { // if (nums[mid + 1] < nums[right]) 
			// 3-1. target이 오른쪽 반절에 속하는지 검사할 수 있다. 
			if (nums[mid] <= target && target < nums[right]) {
				// 3-2. 만약 그렇다면 다음 검색 대상은 오른쪽 반절이다.
				left = mid + 1;
			} else {
				// 3-3. 그렇지 않다면 target이 왼쪽 반절에 존재한다는 얘기.
				right = mid - 1;
			}
		} 
		
	}

	return false;
}

// 참고하여:
function fixedSolution2(nums, target) {
	// 양 끝 값을 정한다. 
	let left = 0, right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		// 0. mid 자리의 값이 target과 일치하면 바로 현재 mid를 반환한다.
		if (nums[mid] === target) return true;

		// 1. mid로 잘린 왼쪽 반절이 끊김없이 오름차순 정렬되어 있다면
		if (nums[left] < nums[mid]) {
			// 1-1. target이 왼쪽 반절에 속하는지 검사할 수 있다.
			if (nums[left] <= target && target < nums[mid]) {
				// 1-2. 만약 그렇다면 다음 검색 대상을 왼쪽 반절로 삼는다.
				right = mid - 1;
			} else {
				// 1-3. 그렇지 않다면 target은 오른쪽 반절에 존재한다는 의미이다.
				left = mid + 1;
			}
		} 
		else if (nums[mid] < nums[right]) { // if (nums[mid + 1] < nums[right]) 
			// 3-1. target이 오른쪽 반절에 속하는지 검사할 수 있다. 
			if (nums[mid] < target && target <= nums[right]) {
				// 3-2. 만약 그렇다면 다음 검색 대상은 오른쪽 반절이다.
				left = mid + 1;
			} else {
				// 3-3. 그렇지 않다면 target이 왼쪽 반절에 존재한다는 얘기.
				right = mid - 1;
			}
		} 
		else {
			left += 1;
		}
	}

	return false;
}

module.exports.solution = fixedSolution2;