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