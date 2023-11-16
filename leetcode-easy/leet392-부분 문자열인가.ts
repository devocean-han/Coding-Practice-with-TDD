/*
 * @lc app=leetcode id=392 lang=typescript
 *
 * [392] Is Subsequence
 *
 * https://leetcode.com/problems/is-subsequence/description/
 *
 * algorithms
 * Easy (47.97%)
 * Total Accepted:    1.2M
 * Total Submissions: 2.4M
 * Testcase Example:  '"abc"\n"ahbgdc"'
 *
 * Given two strings s and t, return true if s is a subsequence of t, or false
 * otherwise.
 * 
 * A subsequence of a string is a new string that is formed from the original
 * string by deleting some (can be none) of the characters without disturbing
 * the relative positions of the remaining characters. (i.e., "ace" is a
 * subsequence of "abcde" while "aec" is not).
 * 
 * 
 * Example 1:
 * Input: s = "abc", t = "ahbgdc"
 * Output: true
 * Example 2:
 * Input: s = "axc", t = "ahbgdc"
 * Output: false
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= s.length <= 100
 * 0 <= t.length <= 10^4
 * s and t consist only of lowercase English letters.
 * 
 * 
 * 
 * Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k
 * >= 10^9, and you want to check one by one to see if t has its subsequence.
 * In this scenario, how would you change your code?
 */

// => 주어진 문자열 s가 t의 부분 집합으로 이루어지는 문자열인지 체크하기.
// => s가 t에서 몇 문자를 빼더라도 순서를 뒤바꿔 만들어질 수는 없다는 점이 핵심이다.

// Two Pointer를 이용한 iterative 풀이:
// Time complexity: O(len(t))
// Space complexity: O(1)
function isSubsequence(s: string, t: string): boolean {
	let i = 0; // s를 순회하는 포인터
	let j = 0; // t를 순회하는 포인터
	
	// s의 모든 문자가 '유효한' 문자인지 검사해야 한다: 
	while (i < s.length && j < t.length) {
		// 현재 s의 문자가 t에 있는 문자라면 s의 포인터를 한 칸 전진시킨다.    
		if (s[i] === t[j]) {
			i++;
		}
		// 현재 s의 문자가 t에 있든 없든, t의 포인터를 한 칸 전진시켜 t의 다음 문자를 살펴본다.
		j++;
	}

	// 만약 t의 모든 문자를 살펴보기 전에 s의 모든 문자가 '유효한' 것으로 확인되면 true를, 그렇지 않으면 false를 반환하도록 한다. 
	return i === s.length;
};

// Dynamic Programming 풀이: 
function isSubsequence2(s: string, t: string): boolean {
	// dp = (s길이 + 1) x (t길이 + 1) 길이의 이중 배열을 만들고
	// (예를 들어 s = 'ace', t = 'abcde'이면 4 x 6의 테이블을 만든다)
	// 모든 자리를 0으로 채운다.
	const dp = new Array(s.length + 1);
	for (let row = 0; row < s.length + 1; row++) {
		dp[row] = new Array(t.length + 1).fill(0);
	}

	// s[:j]가 t[:i]의 부분 문자열이면 dp[i][j] = "그때까지 공통 문자열의 길이"가 되도록, dp[][]를 채워나간다
	for (let row = 1; row < s.length + 1; row++) {
		for (let col = 1; col < t.length + 1; col++) {
			if (s[row - 1] === t[col - 1]) {
				dp[row][col] = 1 + dp[row - 1][col - 1];
			}
			else {
				dp[row][col] = dp[row][col - 1];
			}
		}
	}

	return dp[s.length][t.length] === s.length;
}