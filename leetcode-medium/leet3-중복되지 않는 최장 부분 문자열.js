/* 3. Longest Substring Without Repeating Characters
https://leetcode.com/problems/longest-substring-without-repeating-characters/

Medium

Given a string s, find the length of the longest substring without repeating characters.

*Substring: A substring is a contiguous non-empty sequence of characters within a string.


Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.

*/

// 중복되지 않는 가장 긴 부분 문자열(빈 문자열이 아닌) 찾기

// 1. 문자열 인덱스를 돌면서 해당 문자열을 객체에 {문자열: true}로 기억한다.
// 2. 다음 문자를 만날 때마다 객체에서 key로 검사하여, 있으면 순회를 멈추고 그 때까지의 연속된 문자열을 변수 maxSubstring에 저장한다.
// 3. 끝까지 순회하여 만들어지는 최종 maxSubstring의 길이를 반환하도록 한다.
// => 문제: 중복되는 문자를 만났을 때 isRepeatingCharacter를 초기화시켜버리면 안 된다. '그 문자'-1을 해야 한다.
// 's38sb'에서, s를 중복으로 만났다면 s-1만 시켜서 [s38]과 [38sb]가 될 수 있다.
// 그런데 만약 's38sb'가 아니라 's383b'라면?(2번째 s자리에서 s가 아니라 3을 만났다면?) [s38]과 [83b]로 나뉘겠지.
// 앞서 나타났던 바로 그 자리를 지워야(끊어야) 하는 것이다.
// 만약 's388b'라면, [s38]과 [8b]가 되겠고.
// 아! 그러면 중복되지 않는 최초 문자들의 위치를 기록하는 firstOccurred {문자: 위치}을 만들고, 만약 얘를 검사해서 중복되는 문자를 발견하게 된다면 세컨드 인덱스를 바로 그 문자키로 검색해서 나온 값 + 1에 놓으면 되겠다!
// Sliding Window 
function solution2(s) {
	if (s.length === 0) return 0;
	if (s.length === 1) return 1;
	
	let firstOccurred = {}; // {문자열: 위치(인덱스)}를 저장할 객체
	let left = right = 0; // 인덱스 0에서부터 시작하는 양 포인터. left에서 시작하여 right지점에서 끝나는 임시 부분문자열을 나타내는 데 사용할 포인터이다.  
	let maxSubLength = 0; // 부분문자열 최고 길이를 저장할 변수
	
	// 1. right 포인터를 한 칸씩 오른쪽으로 옮겨가면서
	while (right < s.length) {
		let currChar = s[right];
		// 2. 전에 나왔던 문자라면 
		if (firstOccurred[currChar] !== undefined) { // 끌어낸 값(위치 인덱스)가 0일수도 있으므로 if (firstOccurred[currChar])는 안된다. 
			// 2-1. 여태까지 '중복 없이 만든' 부분문자열 길이와 기존의 '최장 부분문자열' 길이를 비교하여 더 큰 값을 새로운 '최장 부분문자열 길이(maxSubLength)'로 업데이트하고,  
			let currentSubLength = right - left;
			maxSubLength = Math.max(maxSubLength, currentSubLength);
			// 2-2. 이전에 (같은 문자가)나왔던 위치 + 1로 left 포인터를 옮겨놓아 새롭게 부분문자열을 만들어 나간다. 이 떄, 전에 이미 옮겨놓은 위치보다 더 '이전(왼쪽)'에 중복된 문자가 위치해있었다면 그곳으로 옮겨놓아선 안된다. (예시: "abba") 
			left = Math.max(left, firstOccurred[currChar] + 1);	
		}
		
		// 2-3. 현재 문자를 (이미 firstOccurred에 저장되어 있었든지 아니든지) key로 삼아 {현재 문자열: 현재 인덱스} 키-값 쌍을 새롭게 추가/업데이트한다. 
		firstOccurred[currChar] = right;
		right++;
	}

	// 3. 마지막으로 옮긴 left포인터에서부터 시작하여 만들 수 있는 부분문자열을 마지막으로 계산하고, 최종 '최장 부분문자열 길이(maxSubLength)'를 반환한다.  
	let currentSubLength = right - left;
	return Math.max(maxSubLength, currentSubLength);
}
/* Runtime
112ms
Beats 32.93%of users with JavaScript

Memory
48.07mb
Beats 46.85%of users with JavaScript
*/ 


function solution(s) {
	if (s.length === 0) return 0;
	if (s.length === 1) return 1;
	
	// 
	let isRepeatingCharacter = {};
	let maxSubLength = 0;
	let subStartIndex = 0;
	for (let i = 0; i < s.length; i++) {
		let currChar = s[i];
		if (isRepeatingCharacter[currChar]) {
			let currentSubLength = i - subStartIndex;
			if (currentSubLength > maxSubLength) maxSubLength = currentSubLength;
			subStartIndex = i;	
			isRepeatingCharacter = {}
			isRepeatingCharacter[currChar] = true;
		} else {
			// isRepeatingCharacter = { currChar: true };
			// isRepeatingCharacter = { s[i]: true };
			// => 이 둘이 왜 안되는 걸까? 
			isRepeatingCharacter[currChar] = true;
		}
	}
	console.dir(isRepeatingCharacter);
	let currentSubLength = s.length - subStartIndex;
	if (currentSubLength > maxSubLength) maxSubLength = currentSubLength;

	return maxSubLength;
}

module.exports.solution = solution3;

// Sliding window
function solution3(s) {
    if (s.length === 0) return 0;
    if (s.length === 1) return 1;
	
	let set = new Set();
    let left = 0;
    let maxSubLength = 0;

	// 1. right 포인터를 오른쪽으로 움직이면서
    for (let right = 0; right < s.length; right++) {
		// 3. 만약 set에
        while (set.has(s[right])) {
            set.delete(s[left])
            left++;
		}
		// 2. right포인터가 가리키는 문자열을 set에 저장하고 '최장 부분문자열 길이'를 업데이트한다.  
        set.add(s[right]);
        maxSubLength = Math.max(maxSubLength, right - left + 1)
	}
	
    return maxSubLength;
}
/* Runtime
88ms
Beats 62.96%of users with JavaScript

Memory
46.98mb
Beats 66.39%of users with JavaScript
*/