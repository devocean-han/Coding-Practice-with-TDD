/*
 * @lc app=leetcode id=994 lang=typescript
 *
 * [994] Rotting Oranges
 *
 * https://leetcode.com/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (53.58%)
 * Total Accepted:    725.4K
 * Total Submissions: 1.4M
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * You are given an m x n grid where each cell can have one of three
 * values:
 * 
 * 
 * 0 representing an empty cell,
 * 1 representing a fresh orange, or
 * 2 representing a rotten orange.
 * 
 * 
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten
 * orange becomes rotten.
 * 
 * Return the minimum number of minutes that must elapse until no cell has a
 * fresh orange. If this is impossible, return -1.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation: The orange in the bottom left corner (row 2, column 0) is never
 * rotten, because rotting only happens 4-directionally.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: grid = [[0,2]]
 * Output: 0
 * Explanation: Since there are already no fresh oranges at minute 0, the
 * answer is just 0.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] is 0, 1, or 2.
 * 
 * 
 */

// => 10 x 10 내의 grid에 1과 2가 흩뿌려져 있다고 할 때, 1을 모두 2로 바꾸는 데 걸리는 단위 시간 구하기. 0으로 '장애물' 처리된 구역도 존재한다. 2는 상하좌우 칸의 1을 2로 물들일 수 있고 이 때 1 단위 시간이 걸린다고 정의한다.
// => 즉, 1을 절대로 2로 바꿀 수 없는 경우도 생긴다. 상하좌우가 모두 0으로 둘러싸인 1이 있는 경우가 이에 해당한다. 이 때는 -1을 반환하기.

// 일견, 모든 2에서 가장 멀리 떨어진 1이 '전염'되기까지 얼마만큼의 시간이 필요할까만 살피면 될 것 같다. 
// (초안, 작성중 중단)
function orangesRotting(grid: number[][]): number {
	console.table(grid);
	let lapse = 0;

	//? [[0]] => 'until no cell has a fresh orange'라는 것은, 전부 빈 칸인 경우에도 '유효하다(=0초)'고 보는 건가 '불가능하다(-1초)'고 보는 건가? => 일단 유효하다고 보자. 
	if (grid.length === 1) {
		// [[0]],[[1]],[[2]]
		if (grid[0].length === 1) {
			if (grid[0][0] === 0) return 0;
			if (grid[0][0] === 1) return -1;
			if (grid[0][0] === 2) return 0;
		}
		// [[0,0,0]], [[0,1,1,0]], [[2,2,0,1,1]], [[1,2,2,1,1]]
		let zeroPointer: number;
		let freshPointer: number;
		let rottenPointer: number;
		// 전체 검사하여 1이 없으면 0 반환
		// 2가 없거나 고립된 1이 있으면 -1 반환
		// 그 외에는 필요한 시간 계산하기
		const line = grid[0];
		for (let i = 0; i < line.length; i++) {
			// 고립된 1 찾기:
			// = 지난 zeroP와 새롭게 나타난 zeroP 사이에 freshP가 있고 rottenP는 없을 때.
			if (line[i] === 0) { // 지난 zeroP와 비교
				if (zeroPointer < freshPointer &&
					(rottenPointer === undefined || rottenPointer < zeroPointer)) {
					// 고립된 1 발견
					return -1;
				}
				zeroPointer = i;
			}
			// 2가 등장하고 1이 새로 계속 나올 때의 최소 거리와
			// 2나 0 이후에 1이 나오고 2가 등장하기까지의 최대 거리 중
			// 더 긴 쪽이 정답이다. 
			//^ 중간에 0이 나오지만 않는다면. 
			
			// 1을 만났을 때: 
			// 0 이후 처음 나오는 1이면 이후 2가 등장하길 기다려야 함. startFreshP를 i로 지정한다. (만약 다시 0이 나온다면 그 땐 고립 판정, -1을 반환한다.) endFreshP는 이전 자리에 머물러 있든지 undefined인 상태이다. 
			// 2 이후 처음 나오는 1이면 이후 0,2 뭐가 등장하든 상관x. startFreshP를 i로 지정한다. endFreshP도 i로 지정하고 이후 1이 나올 때마다 따라서 전진시킨다(혹은 그대로 멈춰둔다). 
			// 1 이후 나오는 1은 endFreshP가 >= startFreshP인 경우 i로 지정해준다. 혹은 아무것도 안 해줘도 된다. 
			// 이전에 등장했던 2와의 거리를 셈한다
			let frontRottenDistance;
			let rearRottenDistance;
			if (line[i] === 1) {
				frontRottenDistance = -(rottenPointer ?? i) + i;
				freshPointer = i;
			}
			// 2를 만났을 때: 
			// 0 이후 나오는 2는 의미 없음
			// 2 이후 나오는 2도 의미 없음
			// 1 이후 나오는 2라면, 일단 startFreshP와의 거리를 셈한다. endFreshP가 >= startFreshP이면 i - 1로 업데이트하고 startFreshP와의 거리 +1로 셈한다. 그게 아니라면(endFreshP가 null 혹은 undefined 혹은 < startFreshP이면) endFreshP를 무위로 돌린다. 
			if (line[i] === 2) rottenPointer = i;

			// 0을 만났을 때: 
			// 0 이후 나오는 0은 의미 없음
			// 2 이후 나오는 0도 의미 없음
			// 1 이후 나오는 0이라면, startFreshP를 무위로 돌림(null 혹은 0으로). 그리고 startFreshP를 무위로 돌리기 전에 endFreshP가 >= startFreshP인지(=2이후에 1이었는지)를 확인해서 맞으면 startFreshP와의 거리 +1을 셈하고 endFreshP를 i-1로 업데이트한다(솔직히 필요 없긴 하다). 그게 아니면  
			
			// startFreshP와 endFreshP를 모두 업데이트 혹은 무위로 돌린 다음, 둘 다 null이면 1이 고립된 것이므로 -1을 반환한다. startFreshP만 유효값이면 startFreshP~2까지의 거리를 셈하고, endFreshP만 유효값이면 2~endFreshP 거리를 셈한다. 
			// 둘 다 유효값이면 둘 중 하나를 셈해서 반절로 나눈다. 
			// 이 모든 셈 중 최대값을 반환한다.  
			
		}
		// 1이 없으면 (2가 있든 없든) 0 반환
		if (freshPointer === undefined) return 0;
		// (1이 있고) 2가 없으면 -1 반환
		if (rottenPointer === undefined) return -1;


	}
	return lapse;
};

//^ 위의 한 줄 grid인 경우의 로직을 발전시켜 정리한 풀이:
//* => 1 혹은 연속된 1의 앞뒤로 2와 0이 어떻게 붙느냐가 핵심이다. 
//* => 2가 가장 멀리 떨어진 1까지의 거리가 곧 필요한 최소 시간이 된다. 
/*
 ^ 2와 가장 멀리 떨어진 1의 거리를 계산하기: 
 * 순회하다가 1을 만나게 되었을 때(1의 시작): 
 * 1) 0 -> 1: startP를 현재 i로 지정, endP는 null로 지정한다.
 * 2) 2 -> 1: startP와 endP를 현재 i로 지정한다.
 * 
 * 순회하다가 1 다음으로 0과 2를 만나게 되었을 때(1의 끝):
 * 1) 1 -> 0: startP를 null로 지정하고 계산 돌입
 * 		- endP도 null이면 1이 고립됨. -1 반환하기.
 * 		- endP가 null이 아니면 "endP ~ 0" 거리를 계산하기.
 * 2) 1 -> 2: startP를 냅두고 계산 돌입
 * 		- endP가 null이면 "startP ~ 2" 거리를 계산하기.
 * 		- endP가 null이 아니면 "startP ~ 2" 거리를 2로 나누고 올림.
 * 
 * 위의 경우를 제외한 다른 숫자 조합은 무시하면 된다. 
 * '계산'을 수행할 때마다 maxDistance에 최대 거리를 업데이트하여 최종 반환하도록 한다. 
 */
function orangesRotting2(grid: number[][]): number {
	const line = grid[0];
	let startP: number;
	let endP: number;
	let maxDistance: number = 0;

	// 첫 번째 요소 앞에, 0번째 요소로 0이 자리하는 것과 같이 취급한다:
	// 또 마지막 요소의 뒤에, 추가로 0이 자리하는 것처럼 취급해주면 된다:
	line[-1] = 0; // 좀 이상한가...
	line.push(0);

	// // 첫 번째 요소가 1인 경우: 0 -> 1인 경우와 같음
	// // 나머지(0이나 2)의 경우도: 0 -> 0과 0 -> 2의 경우(=무대응)과 같다.
	// if (line[0] === 1) {
	// 	startP = 0;
	// 	endP = null;
	// }

	// // 두 번째 요소부터 검사 시작
	// 첫 번째 요소부터 검사 시작
	for (let i = 0; i < line.length; i++) {
		if (line[i] === 1) {
			if (line[i - 1] === 0) {
				startP = i;
				endP = null;
			} else if (line[i - 1] === 2) {
				startP = endP = i;
			}
		}
		else if (line[i - 1] === 1 && line[i] === 0) {
			startP = null;
			if (endP === null) return -1;
			else maxDistance = Math.max(maxDistance, i - endP);
		}
		else if (line[i - 1] === 1 && line[i] === 2) {
			if (endP === null) Math.max(maxDistance, i - startP);
			else maxDistance = Math.max(maxDistance, Math.ceil((i - startP) / 2));
		}
	}

	// // 다 끝났는데 [0,1,1]이나 [2,1,1]처럼 끝이 1로 끝나버린 경우:
	// // 끝이 1 -> 0인 것과 같이 취급해주면 된다.
	// if (line[line.length - 1] === 1) {
	// 	startP = null;
	// 	if (endP === null) return -1;
	// 	else maxDistance = Math.max(maxDistance, line.length - endP);
	// }

	return maxDistance;
}

export default {
	solution: orangesRotting2,
}