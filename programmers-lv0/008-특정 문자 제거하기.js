/* 특정 문자 제거하기
https://school.programmers.co.kr/learn/courses/30/lessons/120826

문자열 my_string과 문자 letter이 매개변수로 주어집니다. my_string에서 letter를 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ my_string의 길이 ≤ 100
letter은 길이가 1인 영문자입니다.
my_string과 letter은 알파벳 대소문자로 이루어져 있습니다.
대문자와 소문자를 구분합니다.

입출력 예
my_string	letter	result
"abcdef"	"f"	"abcde"
"BCBdbe"	"B"	"Cdbe"

function solution(my_string, letter) {}
*/

function solution1(my_string, letter) {
	return my_string.replaceAll(letter, '');
}

// replaceAll 없이
function solution2(my_string, letter) {
	return my_string.split(letter).join('');
}

// 배열 내장 함수 없이 -> 내장 함수를 쓰지 않은 이 방식이 코딩 테스트에서는 가장 좋다...
function solution3(my_string, letter) {
	let newStr = ''
	for (let char of my_string) { 
		if (char !== letter) {
			newStr += char;
		}
	}
	return newStr;
}

// RegExp으로
function solution4(my_string, letter) {
	// 1. 'haha'에서 모든 a를 매치하고 싶다:
	// const regex = /a/g; // haha => hh
	// 2. 문자열 a 말고 모든 변수 letter를 매치하고 싶다:
	// const regex = new RegExp(`${letter}/g`)
	// 3. new RegExp로 만들 때엔 슬래시(/)를 빼야 함. => 그러면 g나 i같은 플래그는 어떻게? => 제 2의 인수로 넣어주면 됨: 
	// const regex = new RegExp(letter, 'g');

	const re = new RegExp(letter, 'g');
	return my_string.replace(re, '');
}

module.exports.solution = solution3;

/* 다른 풀이 */
// 어떤 정규식
function solution11(my_string, letter) {
    let reg = new RegExp(letter, 'g');
    return my_string.replace(reg, '');
}
