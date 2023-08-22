/* 287. Find the Duplicate Number
https://leetcode.com/problems/find-the-duplicate-number/?envType=list&envId=rus4c4ci

Medium

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?

*/

// => n개의 수를 가진 숫자 배열에서 중복되는 수 찾아서 반환하기
// 		단, 배열의 원소 개수는 최소 2개 최대 10^5 + 1개이며
// 			원소의 값(수의 범위)은 1 ~ n-1 사이의 값이다. 즉,
// 			어떤 원소값을 골라서 인덱스를 삼아도 전부 유효하다.
// 		또한 반드시 하나의 수가, 하나의 수만이, 중복된다고 한다. 

// => leet234에서 배운 Ployd's 토끼와 거북이 알고리즘을 사용해보자.
// 		nums안의 요소들을 링크드 리스트의 값이자 포인터로 삼으면 된다.
// 	ex)   val[1,3,4,2,2]
// 		index[0,1,2,3,4]
// 		=> 0번째 자리에 해당하는 노드는 1번째 자리의 노드를 가리킨다.
// 		=> 1번째 자리에 해당하는 노드는 3번째 자리의 노드를 가리킨다.
// 			...
// 		=> 2번째 자리를 가리키는 노드가 3과 4번째 노드 두 개로, Ployd의 알고리즘에 따르면 인덱스 2번 노드가 바로 순환고리(시작점)이 된다. 링크드 리스트에서 순환이 있는지 확인하고 그 시작점을 찾는 방법을 사용하면 인덱스 2번 노드를 알아낼 수 있고, 그 노드의 값을 반환하면 되겠다.

// ==> 실제로 링크드 리스트를 만들어야 할까? 이미 만들어진 것 처럼 배열 그대로 사용할 수 있지 않을까... 하지만 일단 만든다. 아니다. 거북이가 다음 칸으로 가는 것은 '거북이_위치 = nums[거북이_위치]'처럼 하면 된다. 토끼는 '토끼_위치 = nums[nums[토끼_위치]]'처럼 하면 된다. 이하 생략.

/**
 * 
 * @param {number[]} nums 
 * @returns {number}
 */
function solution(nums) {
	// 0. 토끼와 거북이를 첫 자리로 세팅(nums 길이는 2이상임).
	let tortoise = hare = 0;
	
	// 1. 토끼와 거북이가 만날 때까지 뛰어다니게 만든다(반드시 하나의 중복되는 수가 있다고 하였으므로 반드시 만나게 될 것임)
	
	// (이지만, 최대 2바퀴를 돌면 만날 수 있는지 없는지를 확정지을 수 있다).
	// for (let i = 0; i <= nums.length * 2; i++) {
	// 	tortoise = nums[tortoise]; // 1칸 이동
	// 	hare = nums[nums[hare]]; // 2칸씩 이동
	// 	if (tortoise === hare) {
	// 		tortoise = 0;
	// 		while (true) {
	// 			tortoise = nums[tortoise];
	// 			hare = nums[hare];
	// 			if (tortoise === hare) return tortoise;
	// 		}
	// 	}
	// }
	// return -1;
	// => 왜인지 안된다. 

	while (true) {
		tortoise = nums[tortoise]; // 1칸 이동
		hare = nums[nums[hare]]; // 2칸씩 이동
		if (tortoise === hare) break;
	}

	// 2. 거북이를 처음 자리로 이동시키고, 토끼와 거북이 모두 한 칸씩만 이동하면서 만나는 자리를 찾는다.
	tortoise = 0;
	while (true) {
		tortoise = nums[tortoise];
		hare = nums[hare];
		if (tortoise === hare) break;
	}

	// 3. 둘이 만난 자리가 바로 중복 수가 발견되는 자리이므로 반환한다.
	return tortoise;
}

module.exports = {
	solution: solution,
}