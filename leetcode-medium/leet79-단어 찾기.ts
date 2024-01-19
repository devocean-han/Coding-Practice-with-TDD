/*
 * @lc app=leetcode id=79 lang=typescript
 *
 * [79] Word Search
 *
 * https://leetcode.com/problems/word-search/description/
 *
 * algorithms
 * Medium (41.07%)
 * Total Accepted:    1.5M
 * Total Submissions: 3.5M
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * Given an m x n grid of characters board and a string word, return true if
 * word exists in the grid.
 * 
 * The word can be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring. The same
 * letter cell may not be used more than once.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word
 * = "ABCCED"
 * Output: true
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word
 * = "SEE"
 * Output: true
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word
 * = "ABCB"
 * Output: false
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == board.length
 * n = board[i].length
 * 1 <= m, n <= 6
 * 1 <= word.length <= 15
 * board and word consists of only lowercase and uppercase English letters.
 * 
 * 
 * 
 * Follow up: Could you use search pruning to make your solution faster with a
 * larger board?
 * 
 */

// (중단)
function exist(board: string[][], word: string): boolean {
	// word가 한 글자일 때
	if (word.length === 1) {
		for (let row of board) {
			for (let letter of row) {
				if (letter === word)
					return true;
			}
		}
		return false;
	}
	// word가 두 글자일 때
	if (word.length === 2) {
		// 첫 글자가 위치한 칸을 모두 찾는다
		const stack = [];
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board[0].length; col++) {
				if (board[row][col] === word[0]) {
					stack.push([row, col]);
				}
			}
		}
		// 첫 글자를 하나도 찾지 못했으면 false 반환
		if (stack.length === 0)
			return false;
		// 첫 글자 칸부터 상하좌우를 재귀적으로 탐색해나간다
		while (stack.length) {
			const firstLetterRowCol = stack.pop();

			
		}
	}
	// return false;
};

// (실패) Stack을 이용한 DFS 풀이: 
function exist2(board: string[][], word: string): boolean {
	const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {

			// 해당 칸의 글자가 word의 첫 글자면 탐색을 시작한다
			if (board[i][j] === word[0]) {
				const visited = Array.from({ length: board.length }, () => Array(board[0].length).fill(false)); // '방문했음'을 true로 표시할 board와 같은 크기의 방문 지도
				const stack: number[][] = [[i, j, 0]];
				// => [board의 행, board의 열, word에서 현재 탐색중인 인덱스]를 저장하는 스택
				visited[i][j] = true;

				while (stack.length) {
					const [x, y, idx] = stack.pop();
					if (idx === word.length - 1)
						return true;

					for (let [dx, dy] of directions) {
						const nx = x + dx;
						const ny = y + dy;
						// 새 칸의 위치가 board 범위 바깥이면 탐색하지 않는다(해당 칸의 문자를 조회하지 않는다)
						if (nx < 0 || ny < 0 || nx >= board.length || ny >= board[0].length)
							continue;
						// 새 칸을 이미 방문했으면 탐색하지 않는다 
						if (visited[nx][ny])
							continue;
						// 새 칸의 문자가 word의 다음 글자와 일치하면 탐색한다
						if (board[nx][ny] === word[idx + 1]) {
							stack.push([nx, ny, idx + 1]);
							visited[nx][ny] = true;
						}
					}
				}
			}
		}
	}

	return false;
}
// => 한 칸에서 가능한 루트가 2개 이상일 때 처음 길로만 탐색함
// 		즉, 백트래킹을 하지 않아 문제가 생긴다.


// 백트래킹을 적용하기 위해 재귀를 이용한 DFS 풀이:
function exist3(board: string[][], word: string): boolean {
	const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

	// 각 재귀호출 단계마다 주어지는 board 내 위치(x, y)의 문자가
	// word 내의 현재 순서(idx) 문자와 일치하는지를 탐색하는 함수.
	// 1) 일치하지 않으면 false를, 
	// 2) word의 마지막 문자까지 도달하면 true를 반환하며, 
	// 3) 일치하면 false나 true를 만날 때까지 다음 칸과 다음 문자를 
	// 		재귀적으로 탐색한다. 
	function dfs(x: number, y: number, idx: number) {
		// 현재 탐색 순서인 idx가 word의 끝에 도달했으면
		// word 전체를 이루는 루트를 찾은 것이므로 true 반환
		if (idx === word.length)
			return true;
		// 현재 위치 [x,y]가 board의 경계 바깥이면 루트를 진행하지
		// 않음: false 반환
		if (x < 0 || x >= board.length ||
			y < 0 || y >= board[0].length) 
			return false;
		// 현재 위치 [x,y]의 문자가 word의 현재 순서 문자와
		// 일치하지 않으면 루트를 진행하지 않음: false 반환
		// ('방문한' 칸이면 '#'이 자연히 word의 문자와 불일치)
		if (board[x][y] !== word[idx])
			return false;

		// 현재 위치 [x,y]의 문자가 word의 현재 순서 문자와 
		// 일치하여 백트래킹 탐색 진행
		const letter = board[x][y];
		board[x][y] = '#'; // 방문을 표시
		for (let [dx, dy] of directions) {
			// true를 반환받은 순간은 곧 word의 끝까지 매칭되는
			// 루트를 찾은 순간이므로 곧바로 조상 호출로 true를 전달
			// (탐색 조기 종결 가능)
			if (dfs(x + dx, y + dy, idx + 1))
				return true;
		}
		board[x][y] = letter; // 방문 표시를 제거
	}

	// board의 모든 칸마다 word의 시작 문자(idx = 0)와 일치
	// 하는지 검사
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (dfs(i, j, 0))
				return true;
		}
	}

	return false;
}

export default {
	solution: exist3,
}