/*
 * @lc app=leetcode id=70 lang=typescript
 *
 * [70] Climbing Stairs
 *
 * https://leetcode.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (52.23%)
 * Total Accepted:    2.7M
 * Total Submissions: 5.2M
 * Testcase Example:  '2'
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 * 
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can
 * you climb to the top?
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= n <= 45
 * 
 * 
 */

// => 한 번에 1계단 또는 2계단씩 오를 수 있을 때, 총 n개의 계단을 오르는 경우의 수 구하기. ("1계단 + 2계단"과 "2계단 + 1계단"을 서로 다른 경우로 취급한다.) 즉, n을 1과 2의 나열로 표현할 수 있는 조합의 개수를 반환하기.

//* 수학적 풀이 방법:
// 먼저 전부 1로 쪼개놓고, 뒤에서부터 2로 교체해나간다면...
// n=10인 경우:
// 1 1 1 1 1  1 1 1 1 1 => 가능한 순열:  1가지 (=10! / (10! 0!))
// 1 1 1 1 1  1 1 1 2   => 가능한 순열:  9가지 (= 9! / (8! 1!))
// 1 1 1 1 1  1 2 2		=> 가능한 순열: 28가지 (= 8! / (6! 2!))
// 1 1 1 1 2  2 2		=> 가능한 순열: 35가지 (= 7! / (4! 3!))
// 1 1 2 2 2  2			=> 가능한 순열: 15가지 (= 6! / (2! 4!))
// 2 2 2 2 2			=> 가능한 순열:  1가지 (= 5! / (0! 5!)
// n=11인 경우:
// 1 1 1 1 1  1 1 1 1 1  1  => 가능한 순열:  1가지 (=11! / (11! 0!))
// 1 1 1 1 1  1 1 1 1 2		=> 가능한 순열: 10가지 (=10! / (9! 1!))
// 1 1 1 1 1  1 1 2 2		=> 가능한 순열: 36가지 (= 9! / (7! 2!))
// 1 1 1 1 1  2 2 2			=> 가능한 순열: 56가지 (= 8! / (5! 3!))
// 1 1 1 2 2  2 2			=> 가능한 순열: 35가지 (= 7! / (3! 4!))
// 1 2 2 2 2  2				=> 가능한 순열:  6가지 (= 6! / (1! 5!))
// => 2는 0,1,2,...,floor(n/2)까지 될 수 있음.
// => 2를 기준으로 가능한 1과 2의 '조합'은 floor(n/2) + 1가지임.
// => 2를 기준으로 i = 0~floor(n/2)까지 순회하면서, 1에
// 		1) (n - i)!을 곱해준다.
// 		2) (n - (i*2))!으로 나눠준다.
// 		3) i!으로 나눠준다.
// 		4) 각 i 단계에서 나온 결과값을 더해준다.
// => 전체 조합의 개수를 반환한다.
// => 팰토리얼 값이 급격히 커져서 컴퓨터가 계산하기 힘듬

//* 피보나치 수열과 비슷한 접근법을 이용한 풀이:
function climbStairs(n: number): number {
	// 총 계단 수가 0개, 1개, 혹은 2개면 가능한 스텝은 정해져있다.
	if (n <= 0) return 0;
	if (n === 1) return 1;
	if (n === 2) return 2;

	// 각 스텝마다 1 또는 2계단씩 소모한다.
	// 남은 계단이 정확히 0이 되면 성공적인 조합이다. 
	// 총 계단 수가 3개 이상이라면: 
	let oneStepBefore = 2; 		// 두 번째 계단까지 도달하는 데 가능한 스텝 조합 개수 
	let twoStepsBefore = 1;  	// 첫 번째 계단까지 도달하는 데 가능한 스텝 조합 개수
	let possibleCombiCount = 0;
	
	// n - 2번 반복한다. 즉, 첫 두 계단 이후 3번째 계단부터 계산해나간다. 
	for (let i = 2; i < n; i++) { 
		// 예를 들어 3번째 계단에 도달하는 데 가능한 스텝 조합 개수는, 직전(-1)계단에 도달하는 조합 수 + 전전(-2)계단에 도달하는 조합 수가 된다.
		possibleCombiCount = oneStepBefore + twoStepsBefore;
		twoStepsBefore = oneStepBefore;
		oneStepBefore = possibleCombiCount;
	}

	return possibleCombiCount;
};
