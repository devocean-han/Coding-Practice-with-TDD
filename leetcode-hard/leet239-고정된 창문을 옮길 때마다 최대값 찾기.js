/* 239. Sliding Window Maximum
https://leetcode.com/problems/sliding-window-maximum/

Hard

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.


Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7


Example 2:

Input: nums = [1], k = 1
Output: [1]


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length

*/

// Brute force:
// Time complexity: O((N - K) * K) = O(NK - K^2)
// 					(K는 1부터 N까지 가능하므로,
// 				K가 최소값이면 O(N),
// 					최대값이면 O(0),
// 					최대값에 '가까우면' O(N^2),
// 					중간값이면 O(1/4 * N^2) => O(N^2) 이 된다.)
// Space complexity: O(N - K + 1) => O(N - K)
function solution(nums, k) {
	if (k === 1) return nums;

	let result = [];
	// 1. 결과 배열의 최대값 개수는 nums.length - k + 1개이다. 즉, 
	// "nums.length - k" 번 '창문'을 옮기며 최대값을 산출해야 한다. 
	for (let i = 0; i <= nums.length - k; i++) { // O(N - K)
		let max = nums[i];
		// 2. 각 단계마다 "i 자리로부터 k개"를 비교해서 max값을 얻어내야 한다. 
		for (let j = i; j < i + k; j++) { // O(K)
			max = Math.max(max, nums[j]);
		}
		result.push(max);
	}

	return result;
}
/* 
Runtime
8520ms
Beats 5.09%of users with JavaScript
=> 시간복잡도 대략 O(N^2) 답게 아주 느린 속도가 나온다.
Memory
86.83mb
Beats 89.84%of users with JavaScript
*/

// Sliding window:
// 자료구조로, map은 일단 아니다. 구성 요소 '무슨 종류가 몇 개 있는지' 검사해서 답을 찾는 문제가 아니므로.
// 		Max Heap도 아니다. (딱 좋으나 javascript에 구현된 클래스가 없음)
// 		Monotonic Decreasing Stack도 안 되며, (불가능한 이유가 명백함)
// 		Queue로 해 볼만 하겠다... (방법 생각중)
function queueSolution(nums, k) {
	if (k === 1) return nums;
	
	// 0. 두 포인터 사용(left와 right)
	// 1. right을 하나 증가한다. 'map'과 'requiredLength'를 업데이트한다. => map 대신 queue를 사용한다. 
	// 2. 'requiredLength' === 0이면 true를 반환했었다. => 여기서 '창문' 내 max를 확정짓는다... 
	// 3. '현재 창문 길이' === '필요 길이 k'이면 left를 하나 증가시키고, 'map'과 'requiredLength'를 업데이트했다. => map 대신 사용하는 queue의 '처음' 수를 완전 제거한다(인덱스도 당겨지도록). 아니다... 이렇게 해서는 그냥 창문으로 범위를 지정하는 것과 다를 바가 없다. 차라리 linked list로, 현재 최대값이 사라지더라도 '다음 최대값'을 추적할 수 있도록 해놓는 게 나을 듯...
	
	// => 양방향 queue인 Deque(덱)과 Linked list, 두 가지 방향으로 계속 생각해볼 수 있을 것 같다. 
}


module.exports.solution = solution;