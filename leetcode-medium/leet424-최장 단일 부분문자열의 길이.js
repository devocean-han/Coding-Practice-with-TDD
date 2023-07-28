/* 424. Longest Repeating Character Replacement
https://leetcode.com/problems/longest-repeating-character-replacement/

Medium

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.


Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achive this answer too.


Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
*/

// 먼저 k 개수를 확인하고...
// s='ABCDEF' 일 때 k가 0이냐 ~ 6이냐에 따라 결과가 달라진다.
// k가 5나 6이면 전부 바꿔서 같은 걸로 만들어버릴 수 있다.
// 		if (k >= s.length - 1) return s.length
// k가 4면, 1개를 빼고 나머지 5개를 같은 문자로 맞출 수 있다. 어느 위치의 문자든 선택해서 바꿀 수 있으므로, 가장 자리의 문자를 '외톨이' 문자로 만들고 나머지를 쭉 이어진 동일한 5개 문자로 만들면 된다. => s.length-1
// 		if (k === s.length - 2) return s.length - 1
// k가 3이면, 2개를 빼고 나머지 4개를 동일하게 맞출 수 있다. 역시나 다른 문자들을 가장자리로 몰아버리고, 동일하도록 바꾼 4개를 연달아 붙여놓는다는 것을 전제할 때 최장 길이는 4, 즉 => s.length - 2
// 		if (k === s.length - 3) return s.length - 2
// k가 2이면, 마찬가지 논리로 최장 길이는 3 => s.length - 3
// 		if (k === s.length - 4) return s.length - 3
// k가 1과 0이면 각각,
// 		if (k === s.length - 5) return s.length - 4
// 		if (k === s.length - 6 === 0) return s.length - 5 === 1
// 일반화하면: 결국 반환하는 최장 길이는 k + 1이 된다. 만약 k === s.length라면 s.length + 1이 아니라 그냥 s.length를 반환하면 된다.
//
// 이상은 최악의 경우에, 그러니까 s가 어떻게 생겼는지를 고려하지 않고 반환하는 경우의 수이다. 만약 s에 중복 문자가 있다면? 그것도 '어떻게' 흩어져 있는지까지 고려한다면?
//

// 아니 이렇게 복잡한 경우의 수를 어떻게 다 고려해서 풀지?!
// sliding window가 해결책이긴 한가?!
// 양 포인터를 정한다... 포인터를 두 개 정한다.... 해결해야 하는 문제는:
// 1) 어떤 중복되는 문자'들'이 있는지 파악해야 한다.
// 2) 가장 빈도수가 많은 문자가 어떻게 '분포되어 있는지'를 파악해야 한다.
// 3) 빈도수가 비슷하거나 더 많더라도, 더 적은 문자가 더 잘 분포되어 있어서 더 긴 부분 문자열을 만들게 될 수도 있다.
// 좀 정리하면:
// 1) 무슨 문자로 바꿀 건지 정해야 한다.
// 2) 어느 곳을 바꿀 건지 정해야 한다.

// 일단 빈도수를 세어볼까? 전체를 한 번 순회하여 객체 {'문자': 빈도수}를 만든다.
//

// 무식한 방법:
// 1) 일단 한 번 순회하여 등장하는 고유 문자들을 set으로 만든다.
// 2) set에 담긴 문자들로, k개만큼 앞에서부터 바꿔보며 그 문자로 이루어진 연속된 부분문자열 길이를 잰다.
// 		예를 들어 k = 1이면 set에 담긴 문자들로  
function solution(s, k) {
	if (s.length <= 1) return s.length;
	if (k === s.length) return s.length;
	

	
	
	
	return k + 1;
	

}

module.exports.solution = solution;
