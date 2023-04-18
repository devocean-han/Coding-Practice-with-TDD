/* 종이 자르기
https://school.programmers.co.kr/learn/courses/30/lessons/120922

머쓱이는 큰 종이를 1 x 1 크기로 자르려고 합니다. 예를 들어 2 x 2 크기의 종이를 1 x 1 크기로 자르려면 최소 가위질 세 번이 필요합니다.

스크린샷 2022-07-25 오후 4.49.44.png

정수 M, N이 매개변수로 주어질 때, M x N 크기의 종이를 최소로 가위질 해야하는 횟수를 return 하도록 solution 함수를 완성해보세요.

제한사항
0 < M, N < 100
종이를 겹쳐서 자를 수 없습니다.

입출력 예
M	N	result
2	2	3
2	5	9
1	1	0

*/

/*
일단 잘라야 하는 총 단면은 총 n(m-1) + m(n-1) = 2mn - m - n개이다. 거기서 '절약될 수 있는 단면 가위질 수'를 빼면 된다. 

절약될 수 있는 단면 가위질 수 = (m-1) * (n-1)
따라서 총 단면 - 절약되는 단면 = 2mn - m - n - (mn - m - n - 1) = mn + 1(?!!!)

다른 관점: 
=> 겹쳐서 자를 수 있었다면, (m-1)(n-1)이었을 것. 
=> 겹쳐서 자를 수 없을 땐 우선 m-1번만큼 길~게 길게 자르고, 그 후 생긴 m개의 1 x n 조각을 n-1번만큼씩 잘라야 하므로 (m-1) + m(n-1)가 된다. 
*/

function solution(m, n) {
	const totalUnit = 2 * m * n - m - n;
	console.log('totalUnit: ', totalUnit);
	if (m === 1) {
		return n - 1;
	} else if (n === 1) {
		return m - 1;
	} 
	// 아하, 세로와 가로 중 더 많이 가위질을 해야 하는 쪽을 1로 줄여버리는 게 핵심이구나.
	// 예를 들어 2*5면, ...
	// 아니, 왜인지 '최소로 가위질'이란
	// 1) 가로든 세로든 한 방향으로 처음에 죽 자르도록 통일하고
	// 1-1) 아니 사실 가로 세로 어느 방향으로 마구 자르든 절약되는 가위질 수가 동일한 것 같다. 대체 원리가 뭐지..? 
	// 2) 어느쪽을 먼저 시작했든 총 절약되는 가위질 수는 같다. 
	// 그런데 왜 그런지는 모르겠다. 
	
	// 아무튼 '절약되는 가위질 수' = (m-1) * (n-1)같다..! 
	const totalSaved = (m - 1) * (n - 1);
	return totalUnit - totalSaved;
}

// 더 깔끔히
function solution1(m, n) {
	const totalUnit = n * (m - 1) + m * (n - 1) // = 2mn - m - n
	const totalSaved = (m - 1) * (n - 1) // = mn - m - n - 1
	return totalUnit - totalSaved; // = mn - 1;
}

// 식도 더 깔끔히
function solution2(m, n) {
	return m * n - 1;
}

module.exports.solution = solution2;