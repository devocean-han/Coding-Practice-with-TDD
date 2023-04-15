/* 옹알이 (2)
https://school.programmers.co.kr/learn/courses/30/lessons/133499

머쓱이는 태어난 지 11개월 된 조카를 돌보고 있습니다. 조카는 아직 "aya", "ye", "woo", "ma" 네 가지 발음과 네 가지 발음을 조합해서 만들 수 있는 발음밖에 하지 못하고 연속해서 같은 발음을 하는 것을 어려워합니다. 문자열 배열 babbling이 매개변수로 주어질 때, 머쓱이의 조카가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ babbling의 길이 ≤ 100
1 ≤ babbling[i]의 길이 ≤ 30
문자열은 알파벳 소문자로만 이루어져 있습니다.

입출력 예
babbling	result
["aya", "yee", "u", "maa"]	1
["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]	2


입출력 예 설명
입출력 예 #1

["aya", "yee", "u", "maa"]에서 발음할 수 있는 것은 "aya"뿐입니다. 따라서 1을 return합니다.
입출력 예 #2

["ayaye", "uuuma", "yeye", "yemawoo", "ayaayaa"]에서 발음할 수 있는 것은 "aya" + "ye" = "ayaye", "ye" + "ma" + "woo" = "yemawoo"로 2개입니다. "yeye"는 같은 발음이 연속되므로 발음할 수 없습니다. 따라서 2를 return합니다.

유의사항
네 가지를 붙여 만들 수 있는 발음 이외에는 어떤 발음도 할 수 없는 것으로 규정합니다. 예를 들어 "woowo"는 "woo"는 발음할 수 있지만 "wo"를 발음할 수 없기 때문에 할 수 없는 발음입니다.

*/

const POSSIBLES = new Set(['aya', 'ye', 'woo', 'ma']); // O(N)!

// 연속된 yeye를 금지시키고, yemaye는 통과시키려면
// 전의 ye를 기억하고 있어야 한다. 즉 어차피 for문을 처음부터 끝까지 돌아야 한다.
const solution1 = (babbling) => {
	let count = 0;
	const map = new Map();
	// 1. Object도 있고, Map도 있는데 왜 Set을 선택했을까
	// => lookup time이 가장 빠르고, map이나 객체의 경우처럼 key값을 추가로 저장하지 않아도 되어서. 
	// => Set은 오버라이딩 개념이 없다. 
	// => Map은 오버라이딩이 된다. 

	// 2. slice(시간 희생)을 Set(공간 희생)으로 바꾸는 방법 

	// 시간 복잡도: O(N^3) => O(N^2) !!!!
	for (const babble of babbling) {
		let start = 0; end = 0;

		while (end < babble.length) { // babble = 'yeyewoo' 'yemaye'
			let currentBabble = babble.slice(start, end + 1);
			// babble = 'yeyewoo'
			// 			   j = 2
			//              k = 3

			// '유효한 옹알이'라면
			if (POSSIBLES.has(currentBabble)) {
				const length = currentBabble.length; // 2;
				
				// '연이은 같은 옹알이'는 배제
				if (map.has(currentBabble) && map.get(currentBabble) + length === start) {
					// babble 길이를 m이라고 하면, .slice는 O(M)이다.
					// .slice(2, 4)
					// .slice(0, 2): 시작지점이 유효 인덱스가 아니라면(음수 혹은 길이보다 큰 값) 결과는 그냥 빈 문자열 ''임. 
					// => .slice()는 삭제함. 
					break;
				}
				
				map.set(currentBabble, start); // map = {'ye': 2, }
				start = end + 1;
			}

			end = end + 1;
		}

		if (start === end) {
			count++
		}
	}

	return count;
}

module.exports.solution = solution1;

/* 다른 풀이 */

// 정규식
function solution2(babbling) {
	const regexp1 = /(aya|ye|woo|ma)\1+/;
	const regexp2 = /^(aya|ye|woo|ma)+$/;
  
	return babbling.reduce((ans, word) => (
	  !regexp1.test(word) && regexp2.test(word) ? ++ans : ans
	), 0);
}

// 또다른 어떤 정규식
function solution3(babbling) {
    let reg = new RegExp("^(aya(?!(aya))|ye(?!(ye))|woo(?!(woo))|ma(?!(ma)))+$");
    return babbling.reduce((acc, cur) => {
        return reg.test(cur) ? acc + 1 : acc;
    }, 0);
}

// 독특하고 깔끔한 전개
function solution4(babbling) {
    const babblables = ["aya", "ye", "woo", "ma"];

    return babbling.reduce((possible, babbl, index) => {
        for (let i = 0; i < babblables.length; i += 1) {
            if (babbl.includes(babblables[i].repeat(2))) return possible;
        }

        for (let i = 0; i < babblables.length; i += 1) {
            babbl = babbl.split(babblables[i]).join(' ').trim();
        }

        if (babbl) return possible;

        return possible += 1;
    }, 0)
}