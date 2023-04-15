/* 세균 증식
https://school.programmers.co.kr/learn/courses/30/lessons/120910

어떤 세균은 1시간에 두배만큼 증식한다고 합니다. 처음 세균의 마리수 n과 경과한 시간 t가 매개변수로 주어질 때 t시간 후 세균의 수를 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ n ≤ 10
1 ≤ t ≤ 15

입출력 예
n	t	result
2	10	2048
7	15	229,376
*/

const solution1 = (n, t) => {
	let bacteria = n; // 사실 이건 없어도 된다. 
	for (let i = 0; i < t; i++) {
		bacteria *= 2;
	}
	return bacteria;
	// 결국 n^(t+1)이 결과값이 된다. 아닌가? 아니구나
	// n * 2^n 이다!
}

// n * 2^n을 재귀로 구하기
const solution2 = (n, t) => {
	if (t === 0) {
		return n;
	}
	return solution2(n, t - 1) * 2;
}
// => 재귀가 유용할 때:
// sorting 알고리즘.
// 그래프, 트리 알고리즘에서.
// 아주 복잡한 알고리즘의 경우, 재귀를 쓰면 많이 단순해질 수 있다.

// => 보통의 재귀는 유용하지 않다:
// 시간 복잡도 적으로 for 문과 똑같고,
// 공간 복잡도 적으로도 O(N)이다. 콜 스택에 N만큼 쌓이게 되어서. 단순 for문을 쓸 땐 공간이 들지 않는다(복잡도가 O(1)).

// 코테 인터뷰, 면접 볼 때 좋은 자세:
// 처음 문제를 보고 시간을 가져야 할 때도 "이거 잠시 3분만 이해하는 시간을 가지겠습니다."라고 소통하고 들어가기! 어려운 문제를 만났을 때, 난관을 만났을 때의 태도도 보기 때문. 
// 틀려도 자신 있게. 주눅들거나 자신 없이 말을 끄는 모양은 좋지 않다. 
const solution = (n, t) => {
	while (t > 0) {
		n *= 2;
		t--;
	}
	return n;
}

module.exports.solution = solution2;

/* 다른 풀이 */

// 시간 안 듬, 공간 안 듬. 최고의 방법. 
function solution3(n, t) {
	return n << t;
}

// !!
function solution4(n, t) {
    while (t-- > 0) n*=2;
    return n;
}

function solution5(n, t) {
    return n*Math.pow(2,t);
}