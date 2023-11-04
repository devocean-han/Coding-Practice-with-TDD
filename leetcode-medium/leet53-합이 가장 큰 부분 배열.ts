/*
 * @lc app=leetcode id=53 lang=typescript
 *
 * [53] Maximum Subarray
 *
 * https://leetcode.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Medium (50.39%)
 * Total Accepted:    3.5M
 * Total Submissions: 6.9M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * Given an integer array nums, find the subarray with the largest sum, and
 * return its sum.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [1]
 * Output: 1
 * Explanation: The subarray [1] has the largest sum 1.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 
 * 
 * 
 * Follow up: If you have figured out the O(n) solution, try coding another
 * solution using the divide and conquer approach, which is more subtle.
 * 
 */

// 방법1: 그냥 앞에서부터 차례로 더해나가다가 이 전 수가 합을 더 작게 만들면 버린다. 왼쪽부터 순회한다. 지금까지 진행해온 부분합을 저장한다. 마주치는 수가 현재까지의 부분합을 음수로 만든다면 지금 음수를 포함해서 왼쪽 전체를 버리고 부분합을 0으로 되돌린다. 마주치는 수가 양수라면 부분합에 더하고 넘어간다. 마주치는 수가 부분합을 0으로 만든다면? 최대한 짧은 길이의 부분배열을 만들어야 한다는 얘기는 없으므로, 그리고 어차피 부분합 자체만을 반환하므로 끊어버리든 그냥 안고 가든 상관 없다.
// 		문제: 상기한 방법은 전체 숫자 중 부분합이 한 번이라도 0 이상이 될 수 있을 때 유효한 방법이다. 즉, 양수가 하나라도 있을 때 유효한 방법이다. 
// 		문제2: 상기한 방법으로는 왼쪽의 시작지점은 잡을 수 있으나 이후부터 오른쪽 끝점을 어떻게 잡아야 하는지는 알 수 없다. 

// 방법2: 전체 합을 구한 후, 양 끝에서부터 걔를 빼면 합이 더 커지는지 확인하며 지워나간다.
// 		문제: 왼쪽 끝의 1을 지우지 않고 남겨두면 그 다음 -3, -4가 연이어 나오게 되는 것을 막을 수 없다. 
	// => 연이은 두 수의 총합이 더 작아지는 쪽이면 두 수를 지우도록 한다.얘를 들어[1, -3, 4, -2]라면[1, -3]의 합은 - 2이므로[1]을 지우고, [-3, 4]의 합은 1이므로 앞선 음수[-3]만 지우고, [4, -2]는 합이 2이므로 둘 다 보존한다. [1, -3, -4, 2]라면[1, -3, -4]까지를 지우면 된다. 
	// => 왼쪽을 끊어낼 때: 아예 양수를 지울지 고민해야 하는 경우, 다음으로 연이어 나오는 음수들 총합이 양수 값을 넘기면 싹 다 지우고, 넘기지 않고 새로운 양수가 끊어준다면 남겨두도록 한다. 
	// => 처음부터 왼쪽부터 순회하면서 끊어내기도 동시에 진행하는, 방법 1과 엮을 수 있겠다 (방법 1로)

// 방법3: 그냥 중간부터 시작한다. 양 옆의 어느 수를 더해서 더 커지는 방향으로 창문을 넓혀나간다. 
// 		문제: 더 작아지는 수가 3번 반복된 후에 갑자기 엄청 큰 수가 나올 수도 있는 것을 미리 짐작할 수가 없다. 

// 방법4: 그냥 가능한 모든 연속된 부분배열에 대해 부분합을 비교한다. 

// 방법5: divide and conquer? 8개 숫자가 주어졌다면 처음엔 하나 단위로 쪼개지겠지. 그리고 자기 자신을 부분합으로 삼은 다음 옆집과 합쳐질 것이다. 그래도 여전히 '연속'일 것이므로, 합쳐진 옆집과의 부분합을 계산한다. ...

// 방법6: 가장 큰 수를 찾는다. 거기서부터 양 옆을 조사해나간다. 왼쪽으로 뻗어나가면서 하나 더할때마다 순간max를 기록하고 가장 큰 순간max였던 때의 인덱스를 기억하도록 한다. 마찬가지로 오른쪽도 가장 큰 순간max의 인덱스를 기억하도록 해서, 왼 순간max 인덱스 ~ 오른 순간max 인덱스(포함)의 부분 배열을... 아니다, 그냥 양쪽의 순간max만 기억해서, 왼 순간max + 최대값 + 오른 순간max 합을 반환한다. 
// 		문제: 가장 큰 수(max)가 두 개 이상인 경우에는? 

// 방법6 이용: 
function maxSubArray(nums: number[]): number {
	// 1. 가장 큰 수 찾기
	const max = Math.max(...nums);
	const maxIndex = nums.indexOf(max);


	// 1-1. 가장 큰 수가 여러개일 때는?
	const maxIndices = nums
		.map((num, i) => [num, i])
		.filter((val) => val[0] === max)
		.map((val) => val[1]);

	// 2. 양 옆으로 뻗어나가며 순간 max 기록하기
	let maxCandidate = [];
	for (const maxIndex of maxIndices) {
		let leftSum = 0, leftSumMax = 0;
		let rightSum = 0, rightSumMax = 0;
		for (let i = maxIndex - 1; i >= 0; i--) {
			leftSum += nums[i];
			if (leftSum > leftSumMax)
				leftSumMax = leftSum;
		}
		for (let i = maxIndex + 1; i < nums.length; i++) {
			rightSum += nums[i];
			if (rightSum > rightSumMax)
				rightSumMax = rightSum;
		}
		maxCandidate.push(leftSumMax + max + rightSumMax);
	}

	return Math.max(...maxCandidate);
};

// (시간 초과 실패)방법 4: 가능한 모든 조합 만들기
// Time complexity: O(N^2)
// Space complexity: O(1)
function maxSubArray2(nums: number[]): number {
	// [-2,1,-3,4,-1,2,1,-5,4]
	let maxSum = -Infinity;
	for (let i = 0; i < nums.length; i++) {
		let localSum = 0;
		for (let j = i; j < nums.length; j++) {
			localSum += nums[j];
			if (localSum > maxSum)
				maxSum = localSum;
		}
	}

	return maxSum;
}

// 다른 해답: 
// Time complexity: O(N)
// Space complexity: O(1) 
function maxSubArray3(nums: number[]): number {
	let localSum = 0;
	let maxSum = -Infinity;

	// [-2,1,-3,4,-1,2,1,-5,4]
	for (const num of nums) {
		// 지금 수와 지금 수를 부분 합계에 더한 값 중 더 큰 쪽을 새로운 부분 합계로 삼는다. 
		localSum = Math.max(num, localSum + num);
		// 만약 새로운 부분 합계가 최고 합계보다 더 크면 최고 합계를 업데이트한다. 
		if (localSum > maxSum) {
			maxSum = localSum;
		}
	}

	return maxSum;
}

// 다른 해답: Kadane Algorithm
// Time complexity: O(N)
// Space complexity: O(1) 
function maxSubArray4(nums: number[]): number {
	let maxSum = -Infinity;
	let localSum = 0;
	nums.forEach((num) => {
		// 지금 수를 부분 합계에 더한 후, 부분 합계가 최고 합계보다 크면 최고 합계를 업데이트 한다. 
		localSum += num;
		if (localSum > maxSum)
			maxSum = localSum;
		// 부분 합계가 0보다 작아지면 부분 합계를 0으로 갱신해 지금까지 더해진 수들을 부분 배열에 포함하지 않는 것으로 리셋한다. 
		if (localSum < 0)
			localSum = 0;
	});

	return maxSum;
}

// 해답 3의 for of 문을 forEach함수로 바꾸고, Math.max도 삼항 연산자로 바꿔본 풀이: 
// Time complexity: O(N)
// Space complexity: O(1) 
function maxSubArray5(nums: number[]): number {
	let localSum = 0;
	let maxSum = -Infinity;

	// [-2,1,-3,4,-1,2,1,-5,4]
	nums.forEach((num) => {
		// 지금 수와 지금 수를 부분 합계에 더한 값 중 더 큰 쪽을 새로운 부분 합계로 삼는다. 
		// localSum = Math.max(num, localSum + num);
		// localSum = localSum + num >= num ? localSum + num : num;
		if (localSum + num >= num)
			localSum += num;
		else
			localSum = num;
		// 만약 새로운 부분 합계가 최고 합계보다 더 크면 최고 합계를 업데이트한다. 
		if (localSum > maxSum) {
			maxSum = localSum;
		}
	});

	return maxSum;
}

// 어떤 빠른 해답
function maxSubArray6(nums: number[]): number {
	let maxSum = Number.NEGATIVE_INFINITY;
	let localSum = 0;
	for (let i = 0; i < nums.length; i++) {
		localSum += nums[i];
		maxSum = Math.max(maxSum, localSum);
		if (localSum < 0)
			localSum = 0;
	}

	return maxSum;
}

// 재귀(Recursive) 풀이: 가능한 모든 부분 배열 조합을 탐색하기
/* 시나리오 설명: 
	- 각 인덱스 i마다 그 요소를 선택할수도 있고 안 할 수도 있다. 
	- 각 시작점마다 계속해서 그 다음 요소를 선택할지 안 할지 선택지가 생기게 된다. 
	- 시작점부터 지금 요소 까지의 부분합을 반환하는 보조 재귀 함수를 만든다. 
	- 각 시작점마다, 이후의 현재 요소를 선택하지 않으므로써 지금까지 선택한 연속된 요소의 합을 반환하고 재귀 호출을 끝내든지, 현재 요소 역시 선택함으로써 재귀 호출(이 시작점 탐색)을 계속할 수 있다. 

	재귀 호출된 함수 안에서 '이 호출은 직전 요소를 선택했던 루트이다'라는 신호를 mustPick = true라는 인수로 넘겨주기로 한다. mustPick = true를 인자로 받은 호출은 0을 반환하든지 현재 요소를 선택해서 다음 재귀 호출을 이어가든지 할 수 있다. mustPick = false를 인자로 받은 호출은 현재 요소를 선택하지 않고 재귀 호출을 이어가든지 현재 요소를 선택하고 재귀 호출을 이어가든지 선택할 수 있다. 
*/
// Time complexity: O(N^2)
// Space complexity: O(N)
function maxSubArray7(nums: number[]): number {
	// [-2,1,-3,4,-1,2,1,-5,4]
	// [5,4,-1,7,8]
	
	// 보조 재귀 함수: i=부분 배열의 시작 인덱스, mustPick=이 부분 배열이 유효한가
	function aug(i: number, mustPick: boolean): number {
		// 0. 탈출 조건: i가 유효한 범위를 넘어가게 되면, 0 혹은 최소값(-10,000)을 반환하면서 탈출한다.
		if (i >= nums.length)
			return mustPick ? 0 : -1e5;

		// 이 부분 배열이 '유효하다면'
		if (mustPick)
			// 여기서 멈추든지 현재 요소를 선택하고 재귀 호출을 계속함 (둘 중 부분합이 더 커지는 쪽을 선택)
			return Math.max(0, nums[i] + aug(i + 1, true));
		// 이 부분 배열이 '유효하지 않다면', 현재 요소를 선택하는 쪽과 선택하지 않는 쪽의 재귀 호출을 모두 탐색해야 함. 
		return Math.max(aug(i + 1, false), nums[i] + aug(i + 1, true));
	}

	return aug(0, false);
}