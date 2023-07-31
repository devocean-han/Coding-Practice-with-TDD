/* 560. Subarray Sum Equals K
https://leetcode.com/problems/subarray-sum-equals-k/

Medium

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.


Example 1:

Input: nums = [1,1,1], k = 2
Output: 2

Example 2:

Input: nums = [1,2,3], k = 3
Output: 2


Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107

*/

// => 실패 메소드
// sliding window: 양 끝에서 시작하든지 왼쪽에서 둘 다 시작한다. 처음부터 훑어야 하니까 이번엔 왼쪽에서 시작하는 게 낫겠다.
// 1. 오른쪽 창문을 한 칸씩 연다(이는 3번에서 수행할 것임). 그 때마다 해당 자리의 수를 더한다.
// 2. 여태까지의 합계가 k보다 크거나 같아지는 순간 왼쪽 창문을 한 칸씩 닫기 시작한다. 
// 2-1. 닫기 전에 먼저 여태까지의 함계가 k와 같으면 subTotal에 +1을 해주고 닫기를 그만둔다. 그렇지 않으면 합계가 k보다 작거나 같아질 때까지 닫는 작업을 계속한다.   
// 3. 오른쪽 창문이 끝에 +1에 도달하면 자연스럽게 멈추게 된다. (더 처리해줄 필요 없음) 
function solution(nums, k) {
	if (nums.length === 1) return nums[0] === k ? 1 : 0;

	// 0. 양 창문(left, right)을 모두 왼쪽에서 시작한다. 
	let left = right = subTotal = sum = 0;

	// 1. 오른쪽 창문을 한 칸씩 연다. 
	while (right < nums.length) {
		sum += nums[right];
		
		if (sum === k) subTotal++;
		// 2. 합계가 k보다 크거나 같을 동안 왼쪽 창문을 한 칸씩 닫기 시작한다. 
		while (sum > k) {
			// 2-1. 닫기 전에 먼저 합계가 k와 같으면 subTotal에 +1을 해주고 닫기를 그만둔다. 그렇지 않으면 합계가 k보다 작거나 같아질 때까지 닫는 작업을 계속한다. 
			// if (sum === k) {
			// 	subTotal++;
			// }
			// => sum에서 바로 뺴주기에는 다음 left가 0일 수도, 음수일 수도 있어서 안 된다. 
			sum -= nums[left];
			left++;
		}
		// subTotal++를 해준 다음에 right이 움직이기 전에 left를 움직여야 할 수 있다. 
		// 그냥 생각해보니까 nums가 0도, 음수도 될 수 있는 조건이면 sliding window를 사용할 수 없을 것 같다...왜냐면 특정 조건 k에 '맞지 않았을 때', 항상 right을 옮긴다거나 left를 옮긴다거나 하는 규칙을 세울 수 없기 떄문이다. 단적으로 왼 창문을 엄청 닫다가 k가 될 수도 있다. 왼 창문을 오른 창문까지 딱 붙여보기 전까지는 중간에 왼 창문 닫기를 그만둘 수 없다. 그건 결국 brute force와 다를 바가 없다...

		right++;
	}

	return subTotal;
}
// => 이런... 음수가 포함된 배열에는 이 로직을 적용할 수 없는 건가?!


module.exports.solution = bruteSolution;

// Brute force method
// 1. 0번째 수를 시작점으로 하는 모든 부분 배열을 순회하며 합계가 k와 같으면 count++를 해준다.
// 2. 1번째 수를 시작접으로 하는 모든 부분 배열을 순회하며 합계가 k와 같으면 count++를 해준다. 
// 3. 그렇게 시작점이 마지막 요소에 도달할 때까지 반복해주면 모든 경우의 수에 대하여 검사한 것이 된다. 마지막에 count를 반환해준다. 
function bruteSolution(nums, k) {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j];
			if (sum === k) count++;
		}
	}

	return count;
}

// Using hash map
// => 처음에 map을 만드는 한 번의 순회에, 다시 nums를 순회하며 (이전에 만들어진) map에서 '어떤 순간(인덱스)에 어떤 합계가 있었나'를 복잡하게 검사해야 했을 것을, 한 번의 순회로 줄여버렸다.
// Time complexity: O(N)
// Space complexity: O(N)
function solution2(nums, k) {
	// {0번~i번 까지의 합계: 합계가 나타난 횟수}를 저장하는 객체(map)를 만들 것이다.
	let map = {0: 1};
    let sum = 0;
    let count = 0;
    
	// nums를 순회하며
    for (let i = 0; i < nums.length; i++) {
		// 현재 값을 더해 부분합을 계산한다.
		sum += nums[i];
		// 만약 맵이 sum - k를 키로 가지고 있으면, 그 값을 '부분 배열 개수'에 더한다. 
		// => sum과 더해서 k가 되게 하는 수가 '이전에' 합계로써 존재했다는 말이다. 예를 들어 그게 0부터 인덱스 3, 4, 8까지 총 세 번 있었다면, 그만큼의 연속된 왼쪽 부분배열을 통째로 잘라내면 '현재 합계 - 잘라낸 부분 배열의 합계 = k'를 만들 수 있다는 얘기다. 잘라내고 남은 부분도 연속된 배열이 될 것이므로, 이것은 완전히 유효한 로직이다. 이걸 어떻게 생각해내지? 
        if (map[sum - k]) {
            count += map[sum - k];
		}
		
		// 맵이 sum을 키로 가지고 있으면 그 값에 1을 더하고, 없으면 새로 1을 배정해준다. 
        map[sum] = map[sum] ? map[sum] + 1 : 1;
    }
    
    return count;
}