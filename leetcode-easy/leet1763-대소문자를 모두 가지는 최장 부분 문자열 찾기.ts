/*
 * @lc app=leetcode id=1763 lang=typescript
 *
 * [1763] Longest Nice Substring
 *
 * https://leetcode.com/problems/longest-nice-substring/description/
 *
 * algorithms
 * Easy (60.56%)
 * Total Accepted:    45.7K
 * Total Submissions: 75.4K
 * Testcase Example:  '"YazaAay"'
 *
 * A string s is nice if, for every letter of the alphabet that s contains, it
 * appears both in uppercase and lowercase. For example, "abABB" is nice
 * because 'A' and 'a' appear, and 'B' and 'b' appear. However, "abA" is not
 * because 'b' appears, but 'B' does not.
 * 
 * Given a string s, return the longest substring of s that is nice. If there
 * are multiple, return the substring of the earliest occurrence. If there are
 * none, return an empty string.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: s = "YazaAay"
 * Output: "aAa"
 * Explanation: "aAa" is a nice string because 'A/a' is the only letter of the
 * alphabet in s, and both 'A' and 'a' appear.
 * "aAa" is the longest nice substring.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s = "Bb"
 * Output: "Bb"
 * Explanation: "Bb" is a nice string because both 'B' and 'b' appear. The
 * whole string is a substring.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: s = "c"
 * Output: ""
 * Explanation: There are no nice substrings.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= s.length <= 100
 * s consists of uppercase and lowercase English letters.
 * 
 * 
 */

// => 'nice'한 문자열은 각 문자에 대하여 대문자와 소문자를 모두 포함하는 문자열을 말한다. 예를 들어 'aAbbB'는 nice하고, 'aabbB'는 nice하지 못하다. 알파벳 소문자와 대문자로 이루어진 문자열 s가 주어질 때, 구할 수 있는 최장 길이의 nice한 부분 문자열을 반환하기. 길이가 같은 결과가 여럿 나온다면, 가장 앞선 부분문자열을 반환한다. 

// Naive approach: Brute force 풀이
function longestNiceSubstring(s: string): string {
	const swapCase = (str: string) => {
		return str.split('')
			.map((char) => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
			.join('');
	}

	let result = '';
	for (let i = 0; i < s.length; i++) {
		for (let j = i; j < s.length; j++) {
			const substring = s.slice(i, j + 1);
			const invertedCases = swapCase(substring);

			if (invertedCases.split('').every((char) => substring.includes(char))) {
				if (substring.length > result.length) {
					result = substring;
				}
			}
		}
	}

	return result;
};


// Divide and Conquer 풀이: 
function longestNiceSubstring2(s: string): string {
	// 탈출 조건: s의 길이가 0 혹은 1인 경우, 대-소문자 짝이 있을 수 없으므로 (최장 부분 문자열은)빈 문자열 반환.
	if (s.length < 2)
		return '';

	let arr = [...s];
	let set = new Set(arr);

	for (let i = 0; i < arr.length; i++) {
		const c = arr[i];
		// 현재 문자 c의 대소문자 버전이 모두 현재 부분 문자열 s에 존재하면: 현재 부분 문자열 s의 다음 문자 검사를 계속한다(=s를 둘로 쪼개지 않는다).  
		if (set.has(c.toUpperCase()) && set.has(c.toLowerCase()))
			continue;

		// 현재 문자 c의 대소문자가 현재 부분 문자열 s에 들어있지 않으면: 현재 문자 c를 기준으로 반절을 가른 부분 문자열 각각에서 최장 부분 문자열을 추출한다. s의 길이가 < 2에 도달할 때까지 반복하게 됨.
		const sub1: string = longestNiceSubstring2(s.substring(0, i));
		const sub2: string = longestNiceSubstring2(s.substring(i + 1));

		// 두 (최장)부분 문자열 중 길이가 더 긴 쪽을 반환한다.
		return sub1.length >= sub2.length ? sub1 : sub2;
	}

	return s;
}