/*
 * @lc app=leetcode id=200 lang=typescript
 *
 * [200] Number of Islands
 *
 * https://leetcode.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (57.95%)
 * Total Accepted:    2.4M
 * Total Submissions: 4.1M
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and
 * '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands
 * horizontally or vertically. You may assume all four edges of the grid are
 * all surrounded by water.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: grid = [
 * ⁠ ["1","1","1","1","0"],
 * ⁠ ["1","1","0","1","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","0","0","0"]
 * ]
 * Output: 1
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: grid = [
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","1","0","0"],
 * ⁠ ["0","0","0","1","1"]
 * ]
 * Output: 3
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] is '0' or '1'.
 * 
 * 
 */

// (성공)도중에 그만둔 방법1과 성공한 재귀 방법2: 
function numIslands1(grid: string[][]): number {
	if (grid.length === 1) {
		const line: string[] = grid[0];
		if (line.length === 1) return parseInt(line[0]);
		// 0 1 0 1
		// 0 1 1 1 
		let count = 0;
		for (let i = 0; i < line.length - 1; i++) {
			// 이전 칸이 1이었는데 다음 칸이 0이면 섬 하나 카운트
			if (line[i] === '1' && line[i + 1] === '0') {
				count++;
			}
		}
		// 마지막 자리가 1이면 섬 하나 더 카운트
		if (line[line.length - 1] === '1')
			count++;
		
		return count;
	}

	// 지도가 두 줄인 경우:
	// (중단)방법1: grid를 한줄 한줄씩 읽어가면서 각 줄에서 섬의 시작과 끝을 탐색한다. 윗 줄이 1이고 지금 줄의 같은 자리가 1이나 0인지를 살핀다. 뭔가 명쾌한 끝이 보이지 않는다.
	if (grid.length === 2 && false) {
		let count = 0;
		// 왼쪽 혹은 위칸이 1이면 연결된 섬이다.
		// 우선 첫째 줄 조사: 1처음 나타나고 퍼진 곳을 기억한다
		let line = grid[0];
		// [[1 0 0 0],[1 0 0 0]]
		let oneStart: number
		let oneStop: number;
		for (let i = 0; i < line.length - 1; i++) {
			// 처음 섬의 시작과 끝: 처음으로 1과 1->0이 나타난 곳
			oneStart = 0;
			if (line[i] === '1' && line[i + 1] === '0') {
				oneStop = i;
				// 다음 줄 탐색

			}
		}
		// (중단)
	}
	
	
	// (성공)방법2: 재귀함수를 이용해 "1"이 등장한 곳의 상하좌우를 살핀다. 보조 재귀함수는 '목표 칸'을 받아 만약 0이면 끝내고 1이면 다음 목표 칸으로 상하좌우를 다시 호출 하는 것으로 한다. 이 때, 전에 탐색했던 좌표를 dp에 넣어두고 만약 '목표 칸'이 전에 검사했던 곳이라면 바로 return함으로써 탈출한다.
	// 		다음 섬을 찾을 때: dp에서 undefined로 되어 있는 좌표를 찾아 검사한다...
	const dp: string[][] = [...Array(grid.length)].map((e) => Array(grid[0].length));
	let count = 0;
	
	// row(0~m-1)와 col(0~n-1) 좌표를 받아 상하좌우 칸 검사
	function aug(row: number, col: number) {
		// 탈출 조건:
		// 1) grid 범위를 벗어난 좌표일 때
		if (row < 0 || row >= grid.length ||
			col < 0 || col >= grid[0].length)
			return;
		// 2) 이미 탐색했던 좌표일 때
		if (dp[row][col]) return;
		// 3) 현재 좌표가 바다일 때
		if (grid[row][col] === '0') {
			dp[row][col] = '1';
			return;
		}

		// 현재 칸이 육지인 경우: 위 칸부터 시계방향으로 검사한다.
		dp[row][col] = '1';
		aug(row - 1, col); // 상
		aug(row, col + 1); // 우
		aug(row + 1, col); // 하
		aug(row, col - 1); // 좌
		// 언제 섬 하나가 '완료'됐다고 할 수 있을까?
		// => 그냥 첫 번째 발견 "1"을 중심으로 호출한 aug() 전체가 마지막(여기)까지 실행됐을 때, 섬 하나가 완성된다.
		// count += 1;
	}

	// 다음 육지 조각을 찾아서 aug() 호출을 반복한다.
	// => 확실하게 하기 위해서, 그냥 grid 전체를 2중 for문으로 dp에 체크돼있나 하나하나 확인하기로 한다
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			// 바다 칸(0)이면 dp에 체크만 하고 그냥 넘어감
			if (grid[row][col] === '0') {
				dp[row][col] === '1';
			}
			// dp에 기록되어 있지 않은 육지 칸이면(=아직 조사하지 않은 좌표면) aug() 호출
			else if (!dp[row][col]) {
				aug(row, col);
				count += 1;
			}
		}
	}

	return count;
};

// (성공)위의 풀이를 다듬은, 보조 재귀 함수를 이용한 풀이:
// => 재귀함수를 이용해 "1"이 등장한 곳의 상하좌우를 살핀다. 보조 재귀함수는 '목표 칸'을 받아 만약 0이면 끝내고 1이면 다음 목표 칸으로 상하좌우를 다시 호출 하는 것으로 한다. 이 때, 전에 탐색했던 좌표를 dp에 넣어두고 만약 '목표 칸'이 전에 검사했던 곳이라면 바로 return함으로써 탈출한다.
// Time complexity:  
function numIslands(grid: string[][]): number {
	// 이미 탐색한 좌표인지를 "1"과 undefined로 기록할 m x n 배열 
	const dp: string[][] = [...Array(grid.length)].map((e) => Array(grid[0].length));
	// 섬의 개수를 셀 변수
	let count = 0;
	
	// row(0 ~ m-1)와 col(0 ~ n-1) 좌표를 받아 상하좌우 칸 검사
	// => 더이상 탐색할 곳이 없을 때, 즉 하나의 섬을 전부 탐색하게 됐을 때 호출이 끝난다.
	function aug(row: number, col: number) {
		// 탈출 조건:
		// 1) grid 범위를 벗어난 좌표일 때
		if (row < 0 || row >= grid.length ||
			col < 0 || col >= grid[0].length)
			return;
		// 2) 이미 탐색했던 좌표일 때
		if (dp[row][col]) return;
		// 3) 현재 좌표가 바다일 때
		if (grid[row][col] === '0') {
			dp[row][col] = '1';
			return;
		}

		// 현재 칸이 육지인 경우: 위 칸부터 시계방향으로 검사한다.
		dp[row][col] = '1';
		aug(row - 1, col); // 상
		aug(row, col + 1); // 우
		aug(row + 1, col); // 하
		aug(row, col - 1); // 좌
		// 언제 섬 하나가 '완료'됐다고 할 수 있을까?
		// => 그냥 첫 번째 발견 "1"을 중심으로 호출한 aug() 전체가 마지막(여기)까지 실행됐을 때, 섬 하나가 완성된다.
		// count += 1;
	}

	// 다음 육지 조각을 찾아서 aug() 호출을 반복한다.
	// => 확실하게 하기 위해서, 그냥 grid 전체를 2중 for문으로 dp에 체크돼있나 하나하나 확인하기로 한다
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			// 바다 칸(0)이면 dp에 체크만 하고 그냥 넘어감
			if (grid[row][col] === '0') {
				dp[row][col] === '1';
			}
			// dp에 기록되어 있지 않은 육지 칸이면(=아직 조사하지 않은 좌표면) aug() 호출
			else if (!dp[row][col]) {
				aug(row, col);
				count += 1;
			}
		}
	}

	return count;
};

export default {
	solution: numIslands,
}