/* 76. Minimum Window Substring
https://leetcode.com/problems/minimum-window-substring/

Hard

Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?

*/

// Sliding window
// 0. right 포인터로 s를 순회한다.
// 1. left와 right 포인터 사이에 t의 모든 문자가 포함되는지 확인한다.
// 2. '창문' 안에 t의 모든 문자가 포함되는 것이 확인되면, left를 줄여가며 그래도 여전히 t의 ㅁ든 문자가 포함되는지 확인한다.
// 3. 모두 포함하다가 포함하지 않게 되는 지점 직전을 left로 고정하고 부분문자열을 반환한다. 이 때의 길이를 '최소 기록'과 비교한다.
// 4. right이 끝까지 닿도록 그런 순간이 오지 않는다면 빈 문자열 ''을 반환한다.  
function solution(s, t) {
	if (s.length < t.length) return '';

	// t의 맵을 만들어봄 or ...?
	const tMap = {};
	for (let char of t) tMap[char] = (tMap[char] ?? 0) + 1;

	// 0. 
	let left = right = 0;
	let minLength = s.length + 1;
	let minLeft = minRight = 0;
	let validCharLength = t.length;

	let prevRight = -1;
	while (right < s.length) {
		if (right !== prevRight) { // 이전 루프에서 right이 한 칸 진행했을 경우에만 tMap과 validCharLength를 업데이트해줌.
			prevRight = right;
			// 현재 right 지점의 문자를 tMap에서 삭감(tMap에 없는 문자라면 무시되고, 있던 문자라면 -값이 되도록 삭감될 수 있다. 이 경우엔 나중에 left를 옮길 때 tMap의 모든 키의 값이 0 혹은 -값인지를 체크하면 되도록 만든다)
			const char = s[right];
			if (tMap[char] > 0) {
				validCharLength--;
			}
			if (tMap[char] !== undefined) {
				tMap[char]--;
			}
		}
		// 여기서 console을 찍어보는 게 제일 알맞다.
		// s: "ADOBECODEBANC", t: "ABC"
		console.log(`left: ${left}, right: ${right}, subString: "${s.slice(left, right + 1)}", validCharLength: ${validCharLength}\ntMap: ${Object.entries(tMap)}`)

		// 3. 최소 길이 비교
		if (validCharLength === 0) {
			// 2. left를 옮겨가며 최소 범위를 찾는다.
			const leftChar = s[left++];
			// tMap에 '존재하던' 문자만 되돌림. 
			if (tMap[leftChar] >= 0) {
				validCharLength++;
			}
			if (tMap[leftChar] !== undefined) {
				tMap[leftChar]++;
			}
			// let minLeft = left - 1;
			// minLength = Math.min(minLength, right - (left - 1) + 1);
			if (right - (left - 1) + 1 < minLength) {
				minLength = right - (left - 1) + 1;
				minLeft = left - 1;
				minRight = right;
			}
		} else {
			right++;
		}
		
	}

	return minLength <= s.length ? s.slice(minLeft, minRight + 1) : '';
}
/* => 변수를 엄청나게 지어댔는데도 메모리 사용량이 아주 준수하게 나왔다: 
Runtime
83 ms
Beats
91.74%

Memory
44.2 MB
Beats
95.26%
*/

module.exports.solution = solution;

