/* 704. Binary Search
https://leetcode.com/problems/binary-search/

Easy

Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
 

Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.

*/


// linear search, O(N)
function solution(nums, target) {
	for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1
}

// binary search, O(log N)
function binarySolution(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low < high) {
        let mid = low + Math.floor((high - low + 1) / 2);
        if (target < nums[mid]) {
            high = mid - 1;
        } else {
            low = mid;
        }
    }

    return nums[low] == target ? low : -1;
}

module.exports.solution = binarySolution;