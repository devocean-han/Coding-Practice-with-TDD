/* 567. Permutation in String
https://leetcode.com/problems/permutation-in-string/description/

Medium

Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.

*/

// Sliding window 시도1:
// 1. s2의 앞에서부터 right 포인터를 전진시켜나간다.
// 2. left와 이루는 '창문' 안에 s1의 모든 문자의 종류와 개수가 빠짐없이 들어있는지 확인한다.
// 3. 아니면 ... 근데 어느 시점에 left를 옮길건지 확인하지? => 아, '창문' 안에 s1의 구성 요소보다 '더 많은' 단일 문자가 들어오게 되면 ...들어오게 되면 left를 이동하여 창문을 줄인다.
// 3-1. 정확히는, '더 넘치는 단일 문자'가 나타났을 때 '그 단일 문자가 최초로 포함된 창문 내의 지점 + 1'위치로 left를 옮긴다. ...뭔가 멀리 돌아가는 방법인 것 같긴 한데...
// 3-2. 그냥 늘어났다 ㅈ루어들었다 하는 '창문'이 정확히 s1의 것과 길이와 구성요소가 같은지만 체크해보자. 그러면 right을 한 칸씩 옮기는 동안
// 		3-2-1. '창문'의 길이가 s1보다 작으면 그냥 둔다.
// 		3-2-2. '창문' 안에 s1에 포함되지 않는 문자가 포함되면(그리고 아직 완전한 조합이 되지 않은 상태라면) 그 때 옮긴 right지점으로 left도 이동해서 새로 시작한다.
// 		3-2-3. '창문' 안에 s1에 포함되지만 더 많은 개수의 문자가 포함된다면? 그 때는 '그 문자의 창문 안 첫 위치 + 1'로 left를 옮긴다. 3-1과 같은 내용.
// 3-3. 그러는 동안 '창문' 안의 구성요소를 셈할 객체가 필요하다. left를 옮길 땐 -1씩, right을 옮길 땐 +1씩 기록되는. 처음에 s1의 구성요소를 셈한 객체도 필요하겠다.
// 3-4. 창문 조정이 언제 끝나지? right이 끝까지 도달했을 때 일단 끝나고, 중간에 '완전한 조합'이 발견된 경우 바로 리턴하며 끝난다.
// 4. right이 끝까지 도달하여 반복문이 끝난 후, 마지막 남은 ...부분문자열을 따로 검사해야 하나? 그럴 필요 없을 것 같기도 한데...

// (성공!) Sliding Window 1
// right 포인터가 한 칸씩 진행하며 s2를 검사할 때 s1에 존재하지 않는 문자를 만나거나 넘치는 빈도수를 맞닥뜨릴 때마다 left 포인터가 그를 포함하지 않는 '다음칸'으로 점프하는 식으로 검사를 진행하는 원리. '창문'의 길이가 쉽게 늘어나지 않으며, 그렇게 점프하는 left 포인터가 양전히 멈춰서있고 right가 쭉쭉 전진하여 '창문'이 s1과 같은 길이를 이루는 순간이 바로 s1으로 이루어진 부분문자열이 s2에 포함되어있다고 판명할 수 있는 순간이 된다.  
// s1: "bbaba", s2: "adbccbaabb"
function solution(s1, s2) {
	// s1이 s2보다 무조건 짧다는 제약 사항이 없으므로: 
	if (s1.length > s2.length) return false;

	// 1. s1의 문자 구성 요소를 셈하여 {문자: 등장 횟수}의 객체로 저장한다. s2의 구성요소를 검사할 때 이 객체에서 다시 1씩 경감시키는 방법으로 사용될 것이다. 
	const s1Map = {}
	for (let char of s1) {
		s1Map[char] = (s1Map[char] ?? 0) + 1;
	}

	// 2. 왼쪽 포인터를 인덱스 0에 위치시킨다. 
	let left = 0;

	// 3. 오른쪽 포인터를 0부터 s2의 끝까지 순회하며 왼쪽-오른쪽 포인터로 '창문'을 만들어 조건에 맞는지 검사한다.
	outer: for (let right = 0; right < s2.length; right++) {
		console.log(`left: ${left}, right: ${right}, window: ${s2.slice(left, right+1)}`);
		// 3-0. '창문' 안의 구성 요소를 기록한다. 기존에(s1에) 없었던 문자나 기존의 출현 빈도보다 많아진 문자라면 음수로 기록된다. 
		const char = s2[right];
		s1Map[char] = (s1Map[char] ?? 0) - 1;

		// 3-1. 현재 right 포인터가 가리키게 된 문자가 s1Map에서 음의 빈도수를 가지는지 확인하여 left 포인터를 '현재 문자의 첫 등장 위치 + 1'의 지점으로 옮긴다: 
		// 		1) 현재 문자가 s1에 존재하지 않았던 문자인 경우: left 포인터를 현재 문자의 다음 문자로 옮기게 되어 '창문'에서 그 문자를 배제하게 됨.
		//	 	2) 현재 문자가 s1에서의 등장횟수보다 높아진 경우: left 포인터를 '현재 문자의 첫 등장 위치 + 1'로 옮김으로써 '창문' 안에 포함되는 현재 문자의 빈도수가 s1 때와 같도록 조정됨.
		while (s1Map[char] < 0) {
			let leftChar = s2[left];
			s1Map[leftChar] = s1Map[leftChar] + 1;
			left++;
		}

		// 3-2. left 포인터를 다 조정한 후에 '창문'의 너비가 s1보다 작다면 더 확인할 것 없이 그냥 right 포인터를 한 칸 늘리는 '다음(continue)'으로 진행함.
		if (right - left + 1 < s1.length) continue;

		// 3-3. '창문'의 길이가 s1과 같고 구성 요소도 같으면 true 반환.
		// 구성 요소를 어떻게 체크하지? 
		// => 총계 sum만으로는 -1+1=0이 되는 경우를 걸러낼 수 없다. 어차피 하나하나 순회함녀서 더해가는 방법이니, 각 빈도가 정확히 0인지 아닌지를 걸러내는 게 더 정확하고 중간에 'continue' 시켜줄 수 있어 전체 합계 sum을 구하는 것보다 오히려 더 경제적이다. 
		// if (right - left + 1 === s1.length) {
		// 	for (let [char, count] of Object.entries(s1Map)) {
		// 		if (count) continue outer;
		// 	}
		// 	return true;
		// }
		// 3-3. s1Map의 빈도수가 전부 0인지 검사하여 true를 반환한다.
		// 		'창문' 내에 s1에 존재하지 않는 문자나 빈도가 더 높은 문자를 제외하도록 left를 옮기고 '창문' 너비가 s1보다 '작지 않을' 때까지 right을 확장한 직후라면, '창문'의 너비는 s1과 정확히 같아지는 첫 순간에만 이곳까지 도달하게 되고 그보다 너비가 커질 수가 없다.
		// 		!! 즉, 굳이 s1Map에 남은 모든 빈도값이 0인지 확인할 필요 없이 여기 도달하기만 하면 바로 true를 반환하면 되는 것이다...!
		return true;
	}

	return false;
}
/*
Runtime
75ms
Beats 83.20%of users with JavaScript

Memory
45.26mb
Beats 60.08%of users with JavaScript
*/
/* 3-3 개량 후: 
Runtime
66ms
Beats 94.69%of users with JavaScript

Memory
42.83mb
Beats 85.47%of users with JavaScript
*/

// 위와 똑같고 주석을 더 간결하게 적은 풀이법:
// Sliding Window 1
function solution2(s1, s2) {
	if (s1.length > s2.length) return false;

	// s1을 {문자: 등장횟수}의 map 객체로 저장함
	const map = {}
	for (let char of s1) {
		map[char] = (map[char] ?? 0) + 1;
	}

	// left와 right 포인터를 설정하고 right은 s2를 순회하게 함.
	let left = 0;
	for (let right = 0; right < s2.length; right++) {
		// right 포인터가 가리키는 s2의 문자의 빈도수를 map에서 1씩 '뺀다'
		const char = s2[right];
		map[char] = (map[char] ?? 0) - 1;

		// map에 음수가 존재하게 되면 left 포인터를 옮기면서 map에 1씩 '더하며' 창문을 더 '닫음'(map에 음수가 포함되지 않을 때까지)(= left-right 포인터 간의 '창문' 안에 s1에 존재하지 않던 문자나 더 많은 빈도수를 가진 문자가 포함되지 않는 지점까지 left를 옮김)
		while (map[char] < 0) {
			const leftChar = s2[left];
			map[leftChar]++;
			left++;
		}
	
		// '창문'의 길이가 s1보다 작은 경우도 다음 루프로 넘겨버림
		if (right - left + 1 < s1.length) continue;

		// 그렇게 다 진행하고도 right이 끝나버리기 전에 이 줄까지 코드가 도달한다면, 그것은 '창문'의 길이도 s1과 같고 구성요소도 같은 한 순간을 발견했다는 뜻이다. true를 반환하도록 한다. 
		return true;
	}	

	// 한 번도 true를 반환하지 못하고 right 포인터가 끝에 도달한다면 조건을 만족하는 부분문자열이 없었다는 뜻이므로 false를 반환하도록 한다. 
	return false;
}

module.exports.solution = checkInclusion3;

// 다른 풀이1:

// (주석 첨부 완료!) Sliding window 2
// 내 주석이 더 뛰어나다고 자부한다...
// => s2 문자열에서 right 포인터를 옮겨나가다가 left와 right 사이의 길이가 s1과 같아지는 순간부터 너비를 유지한 채 left와 right을 한 칸씩 같이 움직여나가는 방식. 이렇게 함으로써 (1)'연속되어야 한다'와 's1과 같은 길이를 가진다'는 조건을 검사하고,
// requiredLength라는 변수를 만들어 s1의 문자 빈도수를 해체한 map에 포함된 문자를 만났을 때만 증가하고 감소시킴으로써 부분문자열이 (2)'s1에 등장했던 문자인지'와 '빈도수가 넘지 않는지'를 전부 검사하게 되는 원리이다.
// 그렇게 처음에 s1의 길이와 같은 값이었던 requiredLength가 줄었다(right이 전진하며 s1에 포함된 문자를 포함시킬 때) 늘었다(left가 전진하며 s1에 포함된 문자를 배제시킬 때)를 반복하다가 0이 되는 순간이 바로 s1이 s2에 부분문자열로 존재하는 순간이 된다.  
// s1: "bbaba", s2: "adbccbaabb"
function checkInclusion1(s1, s2) {
	if (s1.length > s2.length) return false;

	let map = {};
	let requiredLength = s1.length;

	// s1의 문자 등장 빈도수를 {문자: 등장횟수}의 객체 map으로 저장한다.
	for (let char of s1) {
		map[char] = (map[char] ?? 0) + 1;
	}

	let left = 0;
	// right 포인터를 s2의 인덱스 0부터 시작하여, map에 포함된 문자일 때 '필요한 유효한 길이'로서 requiredLength를 1 줄이고 map에서도 1 줄인다.
	// 다시 말하면, map에서 그 문자는 무조건 1 줄이지만 map에 유효하게 key로써 포함된 문자였을 때만, 즉 s1에 존재하던 문자였을 때만 requiredLength값이 줄어드는 것이다. 
	// 즉, if (map[char] > 0) requiredLength--; 를 함으로써 if()로는 s1에 존재했던 문자인지, 그리고 그 문자의 본래 빈도수를 넘지 않는지를 검사하고 requiredLength--로는 s1의 길이와 같은 길이의 '창문'이 되는지를 체크하는 방식이다. 
	// (map[char]--로 map에서 무조건 1을 줄일 때 불필요하게 'c':NaN같은 쌍이 생기게 되는 점이 별로인 것 같긴 하다.) 
	for (let right = 0; right < s2.length; right++) {
		console.log(`left: ${left}, right: ${right}, window: ${s2.slice(left, right+1)}`);

		const char = s2[right];
		// right 포인터가 가리키는 문자가 s1에 '존재했고', left와 right사이의 '창문'에 아직 포함될 수 있는 빈도수가 남았을 때, requiredLength를 1 감소시킨다. 
		if (map[char] > 0) requiredLength--;
		// map에서 right 포인터가 가리키는 문자를 1 감소시킨다(애초에 존재하지 않았다면 값이 NaN으로 생겨나게 됨).
		map[char]--;

		// 현재 right이 가리키고 있는 값까지 처리한 후에야 현재의 '창문' 전체를 대상으로 부분문자열 검사를 할 수 있다. 즉, 이 위에서 right 포인터를 먼저 처리하고, 여기서 온전한 '창문'이 조건에 맞는 부분문자열인지를 체크하고, 이 아래에서(현재 '창문'이 조건에 맞지 않는다는 뜻이므로) left 포인터를 조건에 따라 옮겨준다. 
		if (requiredLength === 0) return true;

		// '창문'의 길이가 s1과 같을 때 left 포인터를 이동한다(같지 않다면 left는 움직이지 않고 다음 루프로 가 right만 늘어나게 됨). left를 옮길 때 먼저 left가 가리키는 문자가 map에 속한 문자였는지 확인해서 (이전에 '창문'에 포함시키며 빼줬던 빈도수를) '유효한 필요 길이' requiredLength를 다시 1 늘려주고, map에도 더해준다(이 때 map에 속한 문자가 아니라면 map에 더해줄 땐 의미없는 'c':NaN같은 쌍이 생길 뿐이다). 
		if (right - left + 1 === s1.length) {
			let leftChar = s2[left];
			// left 포인터가 가리키는 문자가 s1에 '존재했다면' requiredLength를 1 증가시킨다. 
			if (map[leftChar] >= 0) requiredLength++;

			// map에서 left 포인터가 가리키는 문자를 1 증가시킨다(역시나 애초에 존재하지 않았던 key의 경우 값이 NaN으로 생겨나게 됨).
			map[leftChar]++;
			// left 포인터를 한 칸 전진한다.
			left++
		}
	}

	return false;
}
/*
Runtime
67ms
Beats 94.14%of users with JavaScript

Memory
43.42mb
Beats 78.83%of users with JavaScript
*/

// 위와 똑같은 풀이법 원본:
// Sliding Window 2
function checkInclusion(s1, s2) {
	// If s1 is larger than s2 then match is not possible
	// i.e (s1 cannot be substring of s2)
	if (s1.length > s2.length) return false;

	let neededChar = {}; //To Store the frequency/count of required string s1
	for (let i = 0; i < s1.length; i++) {
		// Initially neededChar[s1[i]] will be undefined and
		// undefined || 0 will return 0. So we increment it by 1
		neededChar[s1[i]] = (neededChar[s1[i]] || 0) + 1;
	}
	/* 
	Now we have neededChar
	i.e neededChar={
		a:1,
		b:1,
	}
	*/
	let left = 0, //left pointer/index of the sliding window
		right = 0, //right pointer/index of the sliding window
		requiredLength = s1.length; //length of the substring required in s2

	// Now iterate until the right index of window is lesser than length of s2
	while (right < s2.length) {
		// If we found s2 character in s1 i.e in neededChar then we decrease requiredLength
		if (neededChar[s2[right]] > 0) requiredLength--;
		// Since we have encountered new char i.e s2[right] we decrease it's 
		// count in neededChar even if it is not present in neededChar because we only care about neededChars
		neededChar[s2[right]]--;
		right++ //window is incremented by 1 step

		// Now if our requiredLength becomes 0 it means we have found a match of the s2 substring
		// So we return true
		if (requiredLength === 0) return true;

		// If our window length is equal to s1 length (length of string to search in s2)
		// then we have to remove left element of window i.e left++ and add new element from right 
		// will be added in next iteration
		if (right - left === s1.length) {
			// if the left element we are removing was a required character then we increase requiredLength
			// because that element will no longer be the part of sliding window
			if (neededChar[s2[left]] >= 0) requiredLength++;
			// We will also increase the count of left element removed from window
			neededChar[s2[left]]++;
			// And finally we will decrease the window size by 1 from left i.e left++
			left++
		}
	}
	
	// If match was not found we return false
	return false;
}

// 다른 풀이2:
// 알파벳 소문자 26자를 순서대로 인덱스로 나타내는 count[26] 배열을 만들어, s2로 만드는 s1 길이의 '범위'만큼의 부분문자열이 '포함하는 문자'를 -로, s1에 존재했던 '포함해야 하는 문자'를 +로 계산하여 '범위'내의 문자만으로 count 전체를 0으로 만들 수 있는지를 검사하는 원리이다. 처음 s1길이만큼을 s2에서 검사하고 나서부터는 이후 남는 s2를 마저 순회할 땐 앞의 s2문자를 하나씩 '범위'에서 제거하며 나아간다. 즉, s1 길이만큼의 '범위'에 속하지 않게 되는 문자는 앞에서부터 차례로 count 배열에 +해줌으로써 '범위에서 제거되었음'을 나타내준다.
// 즉, count에 부여되는 +와 - 각각은 이러한 의미를 가진다:
// + : (1) s1에 나타나는 문자이다. s2의 '범위'내에서 -되어야 함.
//		(2) s2에서 '지나간 범위'의 문자이다. s1에 없었던 문자라면 '범위' 내에 들 때 처음부터 음수가 되었다가 '지나간 범위'가 되면서 다시 0으로 돌아오게 됨. s1에 있던 문자지만 더 많은 개수가 '범위' 내에 들어올 때도, 더 많이 '범위'에 들어와 추가적인 -를 야기한 만큼 '지나간 범위'가 될 때 +하여 상쇄되어야 한다.
// - : (1) s2의 '범위' 내의 문자이다.

// Sliding Window 3
// Time complexity: O(N)
// Space complexity: O(1)
//  s1: "bbaba", s2: "adbccbaabb"
function checkInclusion3(s1, s2) {
	if (s1.length > s2.length) return false;

	const count = Array(26).fill(0);

	// s1 길이만큼 s1과 s2를 순회하며 count배열의 해당하는 위치에 셈하여 넣음: 
	// s1에서 발견되는 문자는 1씩 더하고, s2에서 발견되는 문자는 1씩 뺀다.
	for (let i = 0; i < s1.length; i++) {
		count[s1.charCodeAt(i) - 97]++;
		count[s2.charCodeAt(i) - 97]--;
		console.log(`i: ${i}, count: [${count}]`);
	}
	// s1이 끝났을 때, 즉 s2에서 첫 s1만큼의 길이의 부분문자열이 정확히 s1과 같은 구조(문자 종류와 개수)를 가진다면 곧바로 true를 반환한다.
	// 검증법: count의 모든 위치의 값이 0이면 된다. = 'count 중 0이 아닌 값이 하나라도 있음'이 거짓이면 된다. 
	// if (!count.some((val) => val !== 0)) return true;
	if (count.every((val) => val === 0)) return true;

	// s2의 나머지 길이만큼 순회한다. 가상의 s1길이만큼의 '범위'를 지정해서, 그 '범위' 안에 포함되는 문자는 count에서 빼고,  s2에서 '나아가는'쪽 문자는 1씩 빼고, 길이가 길어져 '끊기는' 쪽 문자는 1씩 더한다. 
	for (let i = s1.length; i < s2.length; i++) {
		count[s2.charCodeAt(i) - 97]--;
		count[s2.charCodeAt(i - s1.length) - 97]++;
		console.log(`i: ${i}, count: [${count}]`);
		// 역시나, count 안의 모든 값이 0이 되는 순간이 온다면 곧바로 true를 반환한다. 
		// if (!count.some((val) => val !== 0)) return true;
		if (count.every((val) => val === 0)) return true;
	}

	return false;
}
/*
Runtime
57ms
Beats 99.30%of users with JavaScript

Memory
42.18mb
Beats 96.80%of users with JavaScript
*/
