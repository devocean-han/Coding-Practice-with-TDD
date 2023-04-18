/* 문자열 밀기
https://school.programmers.co.kr/learn/courses/30/lessons/120921

문제 설명
문자열 "hello"에서 각 문자를 오른쪽으로 한 칸씩 밀고 마지막 문자는 맨 앞으로 이동시키면 "ohell"이 됩니다. 이것을 문자열을 민다고 정의한다면 문자열 A와 B가 매개변수로 주어질 때, A를 밀어서 B가 될 수 있다면 밀어야 하는 최소 횟수를 return하고 밀어서 B가 될 수 없으면 -1을 return 하도록 solution 함수를 완성해보세요.

제한사항
0 < A의 길이 = B의 길이 < 100
A, B는 알파벳 소문자로 이루어져 있습니다.

입출력 예
A	B	result
"hello"	"ohell"	1
"apple"	"elppa"	-1
"atat"	"tata"	1
"abc"	"abc"	0

*/

// 시간복잡도는 O(N)
function solution(A, B) {
	if (A === B) {
		return 0;
	}

	// 오른쪽으로 미는 것이므로 만들어지는 순환 문자열은 잘리는 부분 i가 오른쪽 끝부터 왼쪽으로 이동해야 함.
	for (let i = A.length - 1; i > 0; i--) {
		// 시간복잡도 O(1)
		const newString = A.slice(i) + A.slice(0, i);
		if (newString === B) {
			// 반환하는 값은 length - i
			return A.length - i;
		}
	}
	return -1;
}

// 주석 없이 조금 더 깔끔히
function solution2(A, B) {
	if (A === B) {
		return 0;
	}

	for (let i = 1; i < A.length; i++) {
		const newString = A.slice(A.length - i) + A.slice(0, A.length - i);
		if (newString == B) {
			return i;
		}
	}
	return -1;
}

module.exports.solution = solution2;

// 다른 풀이들

// 시간복잡도는 O(N)
function solution3(A, B) {
	return (B + B).indexOf(A)
}

function solution4(A, B) {
	if (A === B) return 0;

	for (let i = 0; i < A.length; i++) {
		A = A.slice(-1) + A.slice(0, -1);
		if (A === B) return i + 1;
	}

	return -1;
}

function solution5(A, B) {
	const result = new Array(A.length)
		.fill(A)
		.map((s, i) => s.slice(A.length - i) + s.slice(0, A.length - i))
		.indexOf(B)
	return result;
}