/*
 * @lc app=leetcode id=55 lang=typescript
 *
 * [55] Jump Game
 *
 * https://leetcode.com/problems/jump-game/description/
 *
 * algorithms
 * Medium (38.59%)
 * Total Accepted:    1.6M
 * Total Submissions: 4.2M
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * You are given an integer array nums. You are initially positioned at the
 * array's first index, and each element in the array represents your maximum
 * jump length at that position.
 * 
 * Return true if you can reach the last index, or false otherwise.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last
 * index.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum
 * jump length is 0, which makes it impossible to reach the last index.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10^4
 * 0 <= nums[i] <= 10^5
 * 
 * 
 */

// => 첫 자리부터 점프를 시작하고, 각 자리의 숫자는 그 자리에서 뛸 수 있는 최대 칸 수를 의미할 때 마지막 자리에 도달할 수 있는지 여부를 반환하기.

/*
[2,3,1,1,4] => 가능하다. 
	=> 가능한 시나리오: 
	(개구리가 착지하는 인덱스): (각 단계에서 개구리 앞에 놓인 남은 요소들) 
	1) 0 1 2 3 4 : [2,3,1,1,4] [3,1,1,4] [1,1,4] [1,4] [4]
	1) 0 1 3 4   : [2,3,1,1,4] [3,1,1,4] [1,4] [4]
	3) 0 1 4     : [2,3,1,1,4] [3,1,1,4] [4]
	4) 0 2 3 4   : [2,3,1,1,4] [1,1,4] [1,4] [4]
[3,2,1,0,4] => 어떻게 뛰어도 넷째 자리의 0에 도달하게 되므로 불가능하다. 
	1) 0 1 2 3   : [3,2,1,0,4] [2,1,0,4] [1,0,4] [0,4] 
	1) 0 2 3     : [3,2,1,0,4] [1,0,4] [0,4] 
	1) 0 3       : [3,2,1,0,4] [0,4] 
	1) 0 1 3     : [3,2,1,0,4] [2,1,0,4] [0,4] 
	
마지막에서 2번째 자리에 0이 있으면 일단 무조건 불가능함. 마3 자리가 2인지를 찾아야 함. 마찬가지로...
...
*/

// (메모리 초과 실패)방법1: 모든 조합 확인하기: 
// 각 자리에서, "1~그 자리의 값" 만큼 뜀뛰기를 할 수 있다. 이 모든 경우의 시나리오를 살핀다. 
function canJump1(nums: number[]): boolean {
	// 0. 
	if (nums.length === 1) return true;

	for (let i = 1; i <= nums[0]; i++) {
		// return canJump(nums.slice(i));

		// let oneElementLeft = canJump(nums.slice(i));
		// if (oneElementLeft) return true; 

		if (canJump1(nums.slice(i))) return true;
	}

	// nums[0] === 0인 경우, 이곳으로 바로 넘어오게 됨
	// 혹은 위의 for문을 모두 순회할 때까지 true 케이스를 만나지 못한 경우:
	return false;
};
// 실패 시나리오1: [1,1,1,...]이 10000개 들어있으면 스택(재귀호출)도 만 개가 쌓이게 된다.
// 실패 시나리오2: [100000,1]만 되어도 스택(재귀호출)에 십만 개가 쌓이게 된다.

// => 실패 시나리오2의 재귀 호출 횟수는 큰 점프부터 먼저 하게 함으로써 조금 줄일 수 있겠다. 끝에서부터 순회하게 한다. 
// (메모리 초과 실패) 방법2: 방법1과 똑같음.
function canJump2(nums: number[]): boolean {
	// 0. 탈출 조건
	if (nums.length === 1) return true;

	for (let i = nums[0]; i >= 1; i--) {
		if (canJump2(nums.slice(i))) return true;
	}

	return false;
};

// 하지만 실패 시나리오1은 여전히 답이 없다. nums[i] === 1이 되는 요소값은 재귀 호출을 하게 하지 않고 무조건 true로 넘기는 수를 쓰는 건..?  
// (시간 초과 실패)방법3:
function canJump3(nums: number[]): boolean {
	// 0. 탈출 조건
	if (nums.length === 1) return true;

	let i = 0;
	while (i < nums.length && nums[i] === 1) {
		i++;
	}
	// i가 (1씩)진행하여 마지막 1개 혹은 0개의 요소만 남겨뒀다면 true 반환
	if (i >= nums.length - 1)
		return true;

	for (let j = nums[i]; j >= 1; j--) {
		// return canJump(nums.slice(j));

		// let oneElementLeft = canJump(nums.slice(j));
		// if (oneElementLeft) return true; 

		if (canJump3(nums.slice(i+j))) return true;
	}

	// nums[0] === 0인 경우, 이곳으로 바로 넘어오게 됨
	// 혹은 위의 for문을 모두 순회할 때까지 true 케이스를 만나지 못한 경우:
	return false;
};

// 혹시, 아예 각 요소값이 자기 자신의 자리(인덱스)와 일치하는지만으로 검사가 가능할까? => 일치하는지만으로 검사하지 말고, 이 '일치하는지' 검사를 위의 재귀 풀이에 끼워넣자
// (시간 초과 실패)방법 4: 
function canJump4(nums: number[]): boolean {
	// 0. 탈출 조건
	if (nums.length === 1) return true;

	let i = 0;
	while (i < nums.length && nums[i] === 1) {
		i++;
	}
	// i가 (1씩)진행하여 마지막 1개 혹은 0개의 요소만 남겨뒀다면 true 반환
	if (i >= nums.length - 1)
		return true;
	// i와 현제 값을 더하여 마지막 자리에 도달할 수 있다면 true 반환
	if (i + nums[i] >= nums.length - 1)
		return true;

	for (let j = nums[i]; j >= 1; j--) {
		if (canJump4(nums.slice(i+j))) return true;
	}

	return false;
}
// 실패 input: 
// [2,4,4,3,1,1,2,1,4,1,4,1,4,3,3,3,3,4,1,4,4,4,3,3,4,3,2,4,4,2,4,4,1,4,4,2,1,4,2,4,4,4,1,3,3,2,1,3,3,2,3,3,2,4,2,4,4,4,4,1,4,3,4,1,1,2,1,1,4,3,1,1,1,2,3,4,3,2,1,2,1,3,2,1,1,4,2,3,1,4,1,2,1,4,3,3,1,2,3,3,1,1,4,3,3,3,1,2,1,3,4,1,1,3,2,3,3,4,4,3,3,2,1,2,2,3,1,4,1,3,2,4,3,3,1,3,4,3,1,4,4,3,4,1,4,1,1,2,3,3,2,2,2,1,1,3,3,4,1,2,2,3,3,2,1,3,1,1,4,4,2,1,4,1,2,1,2,2,3,4,2,4,1,2,4,4,2,4,4,2,3,3,2,1,3,1,2,1,3,3,2,1,2,2,4,3,2,2,3,3,2,2,3,3,4,3,3,1,2,1,3,1,4,3,3,1,3,3,3,2,3,4,3,4,1,2,1,1,4,2,3,3,1,4,3,1,1,4,3,4,3,3,2,2,3,2,2,2,4,2,0,0,0,0]


// (실패)뒤에서부터 1을 검사하기: 
function canJump5(nums: number[]): boolean {
	// 0. 탈출 조건
	if (nums.length === 1) return true;

	for (let i = nums.length - 1; i >= 0; i--) {
		let num = nums[i];
		// i와 현재 값을 더하여 마지막 자리에 도달할 수 있다면 true 반환
		if (i + nums[i] >= nums.length - 1)
			return true;
		// 현재 요소가 1이면 재귀 호출하지 않고 다음으로 넘김(호출 스택 줄이기)
		if (num === 1)
			continue;

		// 현재 요소가 2 이상이면 갈래 탐색
		for (let j = nums[i]; j >= 1; j--) {
			if (canJump5(nums.slice(i + j))) return true;
		}
	}

	return false;
}


//^ ---------------------------------------------------
// (성공)어떤 해답: 
function canJump6(nums: number[]): boolean {
	// [2,3,4,5,1,6,7]
	// [2,3,1,1,4]
	// [3,2,1,0,4]
	let left = nums[0];
	for (let i = 1; i < nums.length; i++) {
		if (left === 0)
			return false;
		left = Math.max(left - 1, nums[i]);
	}
	return true;
}

// (성공)또 다른 해답: '마지막 자리'를 갱신하며 거꾸로 순회
function canJump7(nums: number[]): boolean {
	// [2,3,1,1,4]
	// [3,2,1,0,4]
	let lastIndex = nums.length - 1;

	for (let i = nums.length - 2; i >= 0; i--) {
		// 지금 위치에 현재 값(=뛸 수 있는 범위)을 더해서 마지막 자리에 도달할 수 있다면, 이 자리 뒤로는 따질 필요가 없다. 즉, 지금 위치를 새로운 '마지막 자리'로 삼아서 그 전까지의 가능성을 따지면 됨. 
		if (i + nums[i] >= lastIndex)
			lastIndex = i;
	}

	return lastIndex === 0;
}

// (성공)다른 해답: '최대 점프로 도달할 수 있는 위치'를 갱신하며 순회
function canJump8(nums: number[]): boolean {
	// [2,3,1,1,4]
	// [3,2,1,0,4]
	let maxIndex = 0; // 최대 점프로 도달할 수 있는 위치
	for (let i = 0; i < nums.length; i++) {
		// 만약 최대 점프로 도달할 수 있는 위치가 i에게 따라잡히면 그 순간 false를 반환한다. 
		if (maxIndex < i)
			return false;

		// 최대 점프로 도달할 수 있는 위치 갱신
		maxIndex = Math.max(maxIndex, i + nums[i]);

		// 최대 점프로 도달할 수 있는 위치가 끝 자리를 커버하게(=넘어서게) 되면 바로 true를 반환한다. 
		if (maxIndex >= nums.length - 1)
			return true;
	}
}

export default {
	solution: canJump6,
}