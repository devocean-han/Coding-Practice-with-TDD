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

    // 마지막이 low[1,2,3]high에서 target=1인 상태라면 low[1]high 상태가 되어 끝.
    // 마지막이 low[1,2,3]high에서 target=2인 상태라면 -> low[2,3]high -> low[2]high인 채로 while문 종료.
    // 마지막이 low[1,2,3]high에서 target=3인 상태라면 -> low[2,3]high -> low[3]high인 채로 종료됨. 
    // 
    // 마지막이 low[1,2,3(mid),4]high에서 target=1인 상태라면 -> low[1,2(mid)]high -> low[1]high인 채로 종료됨. 
    // 마지막이 low[1,2,3(mid),4]high에서 target=2인 상태라면 -> low[1,2(mid)]high -> low[2]high인 채로 종료됨. 
    // 마지막이 low[1,2,3(mid),4]high에서 target=3인 상태라면 -> low[3,4(mid)]high -> low[3]high인 채로 종료됨. 
    // 마지막이 low[1,2,3(mid),4]high에서 target=4인 상태라면 -> low[3,4(mid)]high -> low[4]high인 채로 종료됨. 
    // 
    // 마지막이 
    return nums[low] == target ? low : -1;
}

module.exports.solution = binarySolution;