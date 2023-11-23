/*
 * @lc app=leetcode id=5 lang=typescript
 *
 * [5] Longest Palindromic Substring
 *
 * https://leetcode.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (32.88%)
 * Total Accepted:    2.8M
 * Total Submissions: 8.3M
 * Testcase Example:  '"babad"'
 *
 * Given a string s, return the longest palindromic substring in s.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s = "cbbd"
 * Output: "bb"
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 * 
 * 
 */

// Time complexity: O(n^2)
// Space complexity: O(1)
function longestPalindrome(s: string): string {
    let maxPal = ''; 
    for (let i = 0; i < s.length; i++) {
        isPalindrome(i, i);      // 홀수 길이의 부분 문자열 체크
        isPalindrome(i, i+1);    // 짝수 길이의 부분 문자열 체크
    }

    // 시작점 left와 right 인덱스를 받아 좌우로 넓혀가며 팰린드롬인지 체크하는 보조 함수
    function isPalindrome(left: number, right: number) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;   
        }
        if (right - left - 1 > maxPal.length) {
            maxPal = s.slice(left + 1, right);
        }
    }

    return maxPal;
};

// 위의 풀이의 변형: 보조 함수를 평면적으로 풀어 쓴 방법
function longestPalindrome2(s: string): string {
    let maxPal = '';

    for (let i = 0; i < s.length; i++) {
        let left = i;
        let right = i;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxPal.length) {
                maxPal = s.slice(left, right + 1);
            }
            left -= 1;
            right += 1;
        }

        left = i;
        right = i + 1;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxPal.length) {
                maxPal = s.slice(left, right + 1);
            }
            left -= 1;
            right += 1;
        }
    }

    return maxPal;
}
