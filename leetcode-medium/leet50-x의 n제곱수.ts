/*
 * @lc app=leetcode id=50 lang=typescript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode.com/problems/powx-n/description/
 *
 * algorithms
 * Medium (34.08%)
 * Total Accepted:    1.4M
 * Total Submissions: 4.2M
 * Testcase Example:  '2.00000\n10'
 *
 * Implement pow(x, n), which calculates x raised to the power n (i.e.,
 * x^n).
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: x = 2.00000, n = 10
 * Output: 1024.00000
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: x = 2.10000, n = 3
 * Output: 9.26100
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: x = 2.00000, n = -2
 * Output: 0.25000
 * Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * -100.0 < x < 100.0
 * -2^31 <= n <= 2^31-1
 * n is an integer.
 * Either x is not zero or n > 0.
 * -10^4 <= x^n <= 10^4
 * 
 * 
 */

// => 숫자 x와 n이 주어질 때, x^n 값을 구하기

// (시간 초과 실패)단순 해법: for loop로 x를 n번 곱하기
// Time complexity: O(N)
// Space complexity: O(1)
function myPow(x: number, n: number): number {
	let result = 1;
	let doReverse = false;

	if (n < 0) {
		doReverse = true;
		n = -n;
	}

	for (let i = 0; i < n; i++) {
		result *= x;
	}

	if (doReverse) {
		result = 1 / result;
	}

	return result;
};

// (메모리 초과 실패)재귀를 이용하기: 
// Time complexity: O(N)
// Space complexity: O(N)
function myPow2(x: number, n: number): number {
	if (n === 0) return 1;
	if (x === 0) return 0;

	return n < 0 ? x * myPow2(1 / x, -n - 1) : x * myPow2(x, n - 1);
}


// (시간 초과 실패)Divide and Conquer를 이용한 풀이: 
// Time complexity: O(N)
// Space complexity: O(N)
function myPow3(x: number, n: number): number {
	// 지수가 음수면 밑을 역수로 만들고 음수였던 지수를 양수로 바꿔서 앞으로의 작업을 진행하도록 세팅함.
	if (n < 0) {
		n = -n;
		x = 1 / x;
	}

	// 탈출 조건: 지수가 0이면 1을 반환하며 재귀 중단.
	if (n === 0) {
		return 1;
	}
	// 지수가 n -> 0이 되기까지 반절씩 나눠 곱셈을 진행함
	else if (n % 2 === 0) {
		// 지수가 짝수면 반으로 가른 양 쪽을 동일하게 곱해주고,
		return myPow3(x, Math.floor(n / 2)) * myPow3(x, Math.floor(n / 2));
	}
	else {
		// 지수가 홀수면 반으로 가른 한 쪽에 밑을 한 번 더 곱해줘서 짝을 맞춘다. 
		return x * myPow3(x, Math.floor(n / 2)) * myPow3(x, Math.floor(n / 2));
	}
}

// (성공)반복 계산을 줄인 개량 버전:
// Time complexity: O(log N)
// Space complexity: O(log N), for recursive call stack
function myPow4(x: number, n: number): number {
	// 지수가 음수면 밑을 역수로 만들고 음수였던 지수를 양수로 바꿔서 앞으로의 작업을 진행하도록 세팅함.
	if (n < 0) {
		n = -n;
		x = 1 / x;
	}
	let temp; // <- new!

	// 탈출 조건: 지수가 0이면 1을 반환하며 재귀 중단.
	if (n === 0) {
		return 1;
	}

	// 지수가 n -> 1이 되기까지 반절씩 나눠 곱셈을 진행함.
	// 재귀 호출을 한 번만 해서 저장해두고 사용함.
	temp = myPow4(x, n / 2);
	if (n % 2 === 0) {
		return temp * temp;
	} else {
		return x * temp * temp;
	}
}

