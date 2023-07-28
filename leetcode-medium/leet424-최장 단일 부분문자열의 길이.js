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
// ...

// 무식한 방법:
// 1) 일단 한 번 순회하여 등장하는 고유 문자들을 set으로 만든다.
// 2) set에 담긴 문자들로, k개만큼 앞에서부터 바꿔보며 그 문자로 이루어진 연속된 부분문자열 길이를 잰다.
// 		예를 들어 k = 1이고 set이 {'a', 'm'}이라면 주어진 문자열 s의 앞에서부터 한 자리씩 a로 교체해보며 그 때 그 때 a로 이루어지는 연속된 문자열의 길이를 재고 최고기록을 기록한다. m에 대해서도 똑같이 한다. 마지막에 기록된 '최고 길이'를 반환한다.
// 		예를 들어 k = 2이고 set이 {'a', 'm'}이라면 주어진 문자열 s의 앞에서부터 두 자리를 a로 교체해보며 a로 이루어지는 연속된 부분 문자열의 길이를 잰다. 두 자리를 교체하는 것이므로 set의 각 문자마다 이중 루프(N^2)를 돌아야 할 것이다.
// 		예를 들어 k >= 3이면 앞서와 똑같이 하되 k 자리를 교체해야 하므로 set의 각 문자마다 k중 루프(N^k)를 돌아야 한다. (맞나?) 즉, set 내의 한 문자에 대해 k중 루프를 돌고, 그걸 set에 들어있는 문자 개수만큼 반복한다.
// 3) 마지막에 기록된 '최고 길이'를 반환한다. 

// Brute force 로 하려고 했지만 s에서 k개의 자리를 다른 문자로 바꾸는 재귀함수를 구현하지 못하여 일단 실패:  
function solution(s, k) {
	if (s.length <= 1) return s.length;
	if (k === s.length) return s.length;
	
	const set = new Set(s); // set에는 인수로 iterable이 들어갈 수 있다. 문자열은 iterable이다. 
	// console.log(set);
	if (set.size === s.length) return k + 1;
	
	let mexSubstringLength = 0;
	for (let char of set) {
		// 재귀함수를 사용하여 s에서 k개의 자리를 char로 바꿔본다.
		// 그 때 char로 이루어진 연속된 부분 문자열의 길이를 잰다. 
		// ...
	}
}

// => 혹시 set 말고 map으로 만들어서 문자별로 등장 위치를 배열로 가지고 있게 하다가,
// 그 위치(숫자) 사이의 간격이 k만큼인지, 더 적은지로 판단할 수 있지 않을까?
// 		예를 들어 "ABCCDEFC"의 경우 C를 보면 등장 위치가 [2,3,7]이므로
// 	- 만약 k가 7 - 3 - 1 = 3 이라면 3과 7사이를 매끈히 이어 234567, 즉 6개짜리 최장 문자열을 만들 수 있다.
// 	- 만약 k가 3미만이라면 23의 앞뒤로 붙어 최장 길이 4의 문자열을 만들 수 있다. 단, 앞뒤로 k만큼의 문자가 있어야 한다.
// 	- 만약 k가 3초과라면 3과 7사이를 채우고 앞뒤로 남는 수가 붙으면 된다. 즉, 234567 + 남은k 만큼의 최장 부분 문자열을 만들 수 있다.
// 		예를 들어 "CABCDEFC"에서 C의 경우, 등장 위치는 [0,3,7]이다. 이 때 각 위치 사이의 갭은 3-0-1=2와 7-3-1=3이므로,
// 	- 만약 k가 2 미만이라면 두 C를 연결지을 방법은 없다. 최장 길이는 2가 된다.
// 	- 만약 k가 2라면 갭이 2인 0과 3을 이을 수 있으므로 최장 길이는 0123의 4가 된다.
// 	- 만약 k가 3이라면 갭이 2인 0과 3을 잇고 하나를 더 붙여 01234를 만들든지, 갭이 3인 3과 7을 이어 34567을 만들든지 하여 최장 길이 5인 부분 문자열을 만들 수 있다.
// 	- 만약 k가 3초과 2+3=5 미만이라면 두 갭 중 하나를 잇고 남은 k를 더한, 최장 부분문자열 길이 2(두 C)+k를 만들 수 있다.
// 	- 만약 k가 5이상이라면 두 갭을 모두 이어 3(세 C)+k가 최장 길이가 된다.
// 	- 이 모두 s의 최소(1) 최대(s.length)길이 예외 적용 이후 얘기다. (s 길이가 1이면 k가 0이든 1이든 무조건 1을 반환하고, k가 s 길이와 같으면 '두 C + k'같이 계산할 게 아니라 s 길이를 반환한다. 아예 k가 모든 갭들의 합 이상일 때 'C의 등장 개수 + k'와 s 길이를 비교하여 더 작은 쪽을 반환하면 되겠다.)
// 		예를 들어 "CABCDEFCGHIJKC"라면 갭 AB + 갭 DEF 와 갭 GHIJK가 같다. 그러나 k가 5일 때 두 갭을 잇는 것이 C가 셋이 되어 더 긴 부분문자열을 만들 수 있다. 즉, 더 많은 갭을 이을 수록 좋다.
// 		예를 들어 "CABCDEFGHCIJKC"라면? k=5일 때 갭 AB + 갭 IJK를 이어도 연속될 수 없다. 따라서 단순히 갭의 크기 외에 갭의 위치도 고려해야 한다.

// => 정리해보면:
// 1) 일단 한 번 순회하며 {문자: [등장 위치1, 등장 위치2, ...]}인 map을 만든다.
// 2) map에 담긴 문자를 순회하며 각 등장 위치간의 차를 구하여 배열 gap에 따로 저장한다.
// 3) gap을 오름차순 정렬한다. (더 적은 갭부터 잇기 위함) => 하지만 갭의 위치도 중요하다.
// 4) 갭을 앞에서부터 잇는다? 뒤에서부터? 예를 들어 gap이 [2,5,3]이면... 아니, 앞 뒤의 남은 문자 개수도 표시하기 위해 [0,2,5,3,0]이라고 표기하자. 그리고서 k=5라면... 그냥 앞에서부터 더해나가면서 최대한 '여러번' 더해서 <= 5가 될 수 있는 방법을 찾는다. [0,2], [5], [3,0]이 가능하다. 즉, 최대 5+2의 부분문자열 길이가 나올 수 있다.
// 		예를 들어 gap=[0,2,5,3,2,5,3,0]이고 k=7이라면? 더해서 <= 7이 될 수 있는 연속된 조합은 [0,2,5], [5], [3,2], [2,5], [5], [3,0]이 가능하다. ...더해서 7 이하가 되는 연속된 부분배열을 찾는 것과 같은 문제이다.
// 			=> 앞에서부터 두 포인터를 두고, 합계를 구하여 7 초과가 되는 순간 left 포인터를 한 칸 전진한다(합계에서 삭감). 합계가 7 '이하'가 될 때까지. 그리고 다시 right 포인터를 전진하고, 7 초과가 되면 멈추고 left 포인터를 옮기고를 반복한다. "left 포인터 ~ 7 초과가 되어 멈춘 right 포인터 직전"까지가 가능한 연속된 갭 조합이다. 이렇게 만들어진 부분배열들을 저장하고, 가장 긴 부분배열을 택한다. 이 때 gap 양 끝의 0은 부분배열의 길이에 포함시키지 않는다. 중간에 등장하는 0만 계산에 포함시킨다. 이렇게 택해진 최장 부분배열의 "길이+1(=C의 개수)+k"가 바로 최종 반환값이 된다.
// 		
function solution2(s, k) {
	// edge 케이스:
	// s.length가 1이면 k가 0이든 1이든 1을 반환한다. 
	// k가 s.length와 같다면 그냥 s.length를 반환한다. 
	if (s.length <= 1 || k === s.length) return s.length;

	// 그 밖의 상황에는 보통 k + 1을 반환한다.
	const map = new Map();
	// 1. {문자: [등장 위치1, 등장 위치2, ...]}의 map을 만든다. 
	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		// map.set(char, [...((map.get(char) ?? []).push(i))]); // 왜인지 안 된다. 
		if (map.has(char)) {
			let arr = map.get(char);
			arr.push(i);
			map.set(char, arr);
		} else {
			map.set(char, [i]);
		}
	}
	console.dir(map);	
	
	// 2. map에 담긴 문자를 순회하며 각 등장 위치간의 차를 구하여 배열 gap에 따로 저장한다. => 'C': 위치[2,3,4] => 갭[2,0,0,3]이 되어야 함.
	// (갭 구하는 공식: 위치 인덱스 차 - 1)
	const charOccurredAt = map.get('C');
	const gap = [charOccurredAt[0]];
	for (let i = 0; i < charOccurredAt.length; i++) {
		gap.push((charOccurredAt[i + 1] ?? s.length) - charOccurredAt[i] - 1);
	}
	// gap.push(s.length - charOccurredAt[charOccurredAt.length - 1]); // 위의 for문에서 처리하였으므로 괜찮음.
	console.log(gap);

	// 3. 예를 들어 k=2라면 갭[2,0,0,3] 중 가능한 조합(갭들을 더해서 <= 2가 되는 조합)은: [2], [2,0], [2,0,0], [0,0], [0]이 가능하다. 이 중 최대한 '여러번' 더하는 조합은 [2,0,0]이며, 따라서 최대 부분문자열 길이는 [2,0,0]에 존재하는 문자 char의 개수 3개 + k = 5가 된다.
	// 만약 k=3이라면? 갭[2,0,0,3] 중 가능한 '여러번' 더하는 조합은 [2,0,0]과 [0,0,3]이며, 어느쪽으로 하든지 char의 개수 3개 + k = 5가 된다. 
	// 그런데 만약 k=3이고 갭[2,0,0,3,0]이었다면. 가능한 '여러번' 더하는 조합은 [2,0,0]과 [0,0,3,0]이며 이 때 존재하는 char의 개수는 [0,0,3,0]의 4개다. 따라서 최대 부분문자열 길이는 4 + k = 7이 된다. 
	// 최선의 조합을 이루는 갭들이 전부 중간에 있는 것들이라면 어떨까? 예를 들어 k=2이고 갭[2,0,1,0,0,1,0,2]일 때, 가능한 '여러번' 더하는 조합은 [2,0], [0,1,0,0,1,0], [0,2]이다. 최선의 조합인 [0,1,0,0,1,0]에게는 char가 7개 있다. 
	// 일반화해보면: 가장 많은 갭을 더하여 만들 수 있는 '최선의 조합'이 
	// 		1) gap[]의 양 가장자리를 모두 포함한다면 최대 부분문자열 길이는 "최선의 조합[]의 길이 - 1" + k가 되고, 
	// 		2) gap[]의 한쪽 가장자리만을 포함한다면 최대 부분문자열 길이는 "최선의 조합[]의 길이" + k가 되며,
	// 		3) gap[]의 가장자리 요소를 포함하지 않는다면 최대 부분문자열 길이는 "최선의 조합[]의 길이 + 1" + k가 된다. 
	
	// 따라서 '가능한 여러번 더한 최선의 갭 조합'을 구하면 된다. 즉, gap[]의 부분 배열 중 더해서 <= k가 될 수 있는 가장 긴 연속된 부분 배열을 구하자. 
	let left = right = 0; // 두 포인터
	let gapSum = 0;
	let maxLength = {
		length: 0, isLeftEdge: true, isRightEdge: false
	};
	for (; right < gap.length; right++) {
		gapSum += gap[right];
		// 합계가 k '이하'가 될 때까지
		while (gapSum > k) {
			// "left 포인터 ~ k 초과가 되어 멈춘 right 포인터 직전"까지가 바로 가능한 연속된 갭 조합이므로 maxLength를 업데이트하고
			maxLength.length = Math.max(maxLength.length, right - left + 1);
			maxLength.isLeftEdge = false;
			// 합계에서 삭감하고 left 포인터 한 칸 전진
			gapSum -= gap[left];
			left++;

			if (right === gap.length - 1) {
				maxLength.isRightEdge === true;
			}
			// => max의 isRight을 언제 업데이트하지?! isLeft도 저렇게 업데이트하는 거 맞나? 
		}
	}
	
}

module.exports.solution = solution2;

// Sliding window
// Time Complexity :  O(n)
// Space Complexity : O(1)
function characterReplacement(s, k) {
	// 사이즈 26인 map을 만든다.
	var map = [26];
	let largestCount = 0, beg = 0, maxlen = 0; // beg = '시작' 포인터
	
    // '끝' 포인터를 인덱스 0부터 끝까지 순회한다
    for (let end = 0; end < s.length; end++) {
		const char = s[end];
		// map에 문자 char 등장 횟수를 저장한다
        map[char] = (map[char] || 0) + 1
		// largestCount를 업데이트한다(기존 값과 현재까지의 등장 횟수 중 더 큰 것으로).
		largestCount = Math.max(largestCount, map[char])
		// 현재 '창문' 길이에서 char가 아닌 문자가 k보다 많으면 유효한 연속된 부분문자열이 될 수 없다. 즉, 
		// '시작~끝' 길이 - '등장횟수 최고값'이 k보다 크면
		if (end - beg + 1 - largestCount > k) {
			// map에서 '시작'문자의 값(=등장 횟수)을 1 줄이고
			map[s[beg]] -= 1;
			// '시작' 포인터를 한 칸 전진한다. 
			beg += 1;
		}
		
		// '시작~끝' 길이(=연속 부분 문자열)의 역대 최고값을 갱신한다. 
        maxlen = Math.max(maxlen, end - beg + 1);
	}
	
	// 최종 길이를 반환한다.  
    return maxlen; 
};