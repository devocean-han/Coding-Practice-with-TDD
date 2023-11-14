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
	if (n < 0) {
		x = 1 / x;
		n = -n;
	}

	let result = 1;

	for (let i = 0; i < n; i++) {
		result *= x;
	}

	return result;
};

// (메모리 초과 실패)재귀를 이용하기: 
// Time complexity: O(N)
// Space complexity: O(N)
function myPow2(x: number, n: number): number {
	if (n === 0) return 1;
	if (x === 0) return 0;

	return n < 0 ? 1 / x * myPow2(1 / x, -n - 1) : x * myPow2(x, n - 1);
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

// (성공)반복 계산을 줄인 개량 Divide and Conquer 풀이:
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

// (성공, 100배 이상 느림)재귀를 사용하지 않는 Divide and Conquer(?)
function myPow5(x: number, n: number): number{
	if (n < 0) {
		x = 1 / x;
		n = -n;
	}

	let result = n % 2 === 1 ? x : 1;

	for (let i = 0; i <= n / 2 - 1; i++) { // n=6일 때와 n=7일 때를 모두 3번만 반복하도록 설정
		result *= (x * x);
	}

	return result;
}



//^ ----------------------------------------------------------------
// 배열에서 최대값과 최소값 구하기:

/* Class Pair is used to return two values from getMinMax() */
class Pair {
	min: number;
	max: number;

	constructor() {
		this.min = -1;
		this.max = 10000000;
	}
}

function getMinMax(arr: number[]) {
	let minmax = new Pair();
	
	function doRecursion(arr: number[], low: number, high: number) {
		let mmLeft = new Pair();
		let mmRight = new Pair();
		let mid;

		// If there is only one element: 그 한 요소를 최대값과 최소값으로 삼아 반환.
		if (low === high) {
			minmax.max = arr[low];
			minmax.min = arr[low];
			return minmax;
		}

		/* If there are two elements: 둘 중 더 큰 쪽을 최대값, 더 작은 쪽을 최소값으로 삼아 반환. */
		if (high === low + 1) {
			if (arr[low] > arr[high]) {
				minmax.max = arr[low];
				minmax.min = arr[high];
			} else {
				minmax.max = arr[high];
				minmax.min = arr[low];
			}
			return minmax;
		}

		/* If there are more than 2 elements:  반절로 나눈 구간 각각에서 최대, 최소값을 찾는다. */
		mid = Math.floor((low + high) / 2);
		mmLeft = doRecursion(arr, low, mid);
		mmRight = doRecursion(arr, mid + 1, high);

		// 그렇게 얻은 양 구간의 최대값과 최소값을 각각 비교해서 지금 단계의 전체 구간의 최대, 최소값을 얻는다: 
		// compare minimums of two parts 
		if (mmLeft.min < mmRight.min) {
			minmax.min = mmLeft.min;
		} else {
			minmax.min = mmRight.min;
		}

		// compare maximums of two parts
		if (mmLeft.max > mmRight.max) {
			minmax.max = mmLeft.max;
		} else {
			minmax.max = mmRight.max;
		}

		return minmax;
	}

	return doRecursion(arr, 0, arr.length - 1);
}

// Refactored version(최대값만 찾도록 수정한 풀이):
function getMax(arr: number[]): number {
	function getMaxDC(low: number, high: number): number {
		// 탈출 조건: 배열에 요소가 하나뿐인 경우, 그 요소를 반환한다.  
		if (low === high)
			return arr[low];
		// 배열에 두 개 이상의 요소가 있는 경우: 
		else {
			// 두 부분 배열로 나눠서 각각의 최대값을 찾고,
			const mid = Math.floor((low + high) / 2);
			const leftMax = getMaxDC(low, mid);
			const rightMax = getMaxDC(mid + 1, high);

			// 그 둘을 비교하여 전체 배열의 최대값을 정하고 반환한다.
			return Math.max(leftMax, rightMax);
		}
	}

	return getMaxDC(0, arr.length - 1);
}