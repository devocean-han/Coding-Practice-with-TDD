/*
 * @lc app=leetcode id=647 lang=typescript
 *
 * [647] Palindromic Substrings
 *
 * https://leetcode.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (67.89%)
 * Total Accepted:    642.6K
 * Total Submissions: 944.7K
 * Testcase Example:  '"abc"'
 *
 * Given a string s, return the number of palindromic substrings in it.
 * 
 * A string is a palindrome when it reads the same backward as forward.
 * 
 * A substring is a contiguous sequence of characters within the string.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: s = "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s = "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= s.length <= 1000
 * s consists of lowercase English letters.
 * 
 * 
 */

// Two Pointer(?)
// Time complexity: O(n^2)
// Space complexity: O(1)
function countSubstrings(s: string): number {
    let count = 0;
    for (let i = 0; i < s.length; i++) { // O(n)
        // [i,i]와 [i,i+1]을 중심으로 좌우로 넓혀가며
        // 길이가 홀수와 짝수인 부분 문자열을 (팰린드롬인지)검사
        aug(i, i);      // O(n/2)
        aug(i, i + 1);  // O(n/2)
    }

    // 중심 글자 하나(low=high) 혹은 둘을 인자로 받아
    // 양 옆으로 동시에 넓혀가며 팰린드롬이 성립하는 
    // 부분문자열인지를 카운트하는 보조 함수.
    function aug(low: number, high: number) {
        while (low >= 0 && high <= s.length 
                && s[low] === s[high]) { // O(n/2)
            count += 1;
            low -= 1;
            high += 1;
        }
    }

    return count;
};

// 위의 해답의 변형: 보조 함수를 평면적으로 풀어 쓴 방법 
function countSubstrings2(s: string): number {
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        let left = i;
        let right = i;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count += 1;
            left -= 1;
            right += 1;
        }

        left = i;
        right = i + 1;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count += 1;
            left -= 1;
            right += 1;
        }
    }

    return count;
}

// Dynamic Programming
// Time complexity: 
// Space complexity: O(1)
function countSubstrings3(s: string): number {
    let count = 0;
    
    const dp = [...Array(s.length)].map((e) => Array(s.length).fill(0));

    // 길이가 1~n인 부분 문자열을 만들어 가며 검사를 진행
    for (let len = 1; len <= s.length; len++) { // O(n)
        // 각 길이마다 왼쪽 끝점(left)을 +1 해가며 순회
        for (let left = 0; left <= s.length - len; left++) { // O(n-m)
            const right = left + len - 1;

            // 부분 문자열 길이가 1인 경우: left=right이므로 무조건 팰린드롬이다: 
            if (len === 1) {
                dp[left][right] = 1;
                count++;
            } 
            // 부분 문자열 길이가 2인 경우: 왼쪽 문자=오른쪽 문자 라면 팰린드롬이다:  
            else if (len === 2) {
                if (s[left] === s[right]) {
                    dp[left][right] = 1;
                    count++;
                }
            } 
            // 길이가 3 이상인 부분 문자열을 만들 때: 
            // 1. 현재 왼쪽 끝 문자(left)와 오른쪽 끝 문자(right)가 같은지 비교하고,
            // 2. 끝에서 한 칸 전까지의 부분 문자열이 팰린드롬이었는지 기록을 확인하여
            // 둘 다에 해당한다면 현재 부분 문자열 전체도 팰린드롬이다: 
            else {
                if (s[left] === s[right] && dp[left + 1][right - 1] === 1) {
                    dp[left][right] = 1;
                    count++;
                }
            }
        }
    }

    return count;
};