/*
 * @lc app=leetcode id=51 lang=typescript
 *
 * [51] N-Queens
 *
 * https://leetcode.com/problems/n-queens/description/
 *
 * algorithms
 * Hard (66.96%)
 * Total Accepted:    661.2K
 * Total Submissions: 983K
 * Testcase Example:  '4'
 *
 * The n-queens puzzle is the problem of placing n queens on an n x n
 * chessboard such that no two queens attack each other.
 * 
 * Given an integer n, return all distinct solutions to the n-queens puzzle.
 * You may return the answer in any order.
 * 
 * Each solution contains a distinct board configuration of the n-queens'
 * placement, where 'Q' and '.' both indicate a queen and an empty space,
 * respectively.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * Explanation: There exist two distinct solutions to the 4-queens puzzle as
 * shown above
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: n = 1
 * Output: [["Q"]]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= n <= 9
 * 
 * 
 */

// => n x n의 빈 체스보드에 n개의 여왕을 배치하는 모든 방법을 반환하기


// (중단 후 분리)
function solveNQueens(n: number): string[][] {
	let results: string[][] = [];
	let curBoard = Array.from({ length: n }, () => Array(n).fill('.'));
	function resetBoard(n=2) {
		curBoard = Array.from({ length: n }, () => Array(n).fill('.'));
	}
	// 판이 1x1이라면, 한 가지 경우뿐
	if (n === 1)
		return [["Q"]];
	// 판이 2x2라면, 두 가지가 가능
	if (n === 2) {
		// [0,0]칸에 놓는 경우
		curBoard[0][0] = 'Q';
		curBoard[1][1] = 'Q';
		results.push(curBoard.map((row) => row.join('')));
		// [0,1]칸에 놓는 경우
		resetBoard()
		curBoard[0][1] = 'Q';
		curBoard[1][0] = 'Q';
		results.push(curBoard.map((row) => row.join('')));
	}
	// 판이 3x3이라면,
	// 첫 퀸을 놓는다. 일단 0,0에 놓는다
	resetBoard(3)
	curBoard[0][0] = 'Q';
	let queensPosition = [[0,0]]
	// 두 번째 퀸은 첫 퀸과 가로세로가 겹치지 않는 첫 발견지점에 놓는다
	for (let i = 0; i < n && i !== 0; i++) {
		for (let j = 0; j < n && j !== 0; j++) {
			curBoard[i][j] = 'Q'
			queensPosition.push([i, j]);
		}
	}
	// 세 번째 퀸도 첫 두 퀸과 가로세로가 겹치지 않는 첫 발견지점에 놓는다
	for (let i = 0; i < n && i !== 0 && i !== 1; i++) {
		for (let j = 0; j < n && j !== 0 && j !== 1; j++) {
			curBoard[i][j] = 'Q'
			queensPosition.push([i, j]);
		}
	}
	results.push(curBoard.map((row) => row.join('')));
	resetBoard(3)
	console.log(`n: ${n}`);
	console.dir(queensPosition)
	for (let result of results) {
		console.table(result)
	}
	return results;
};

// 백트래킹을 이용한 recursive DFS 풀이: 
function solveNQueens2(n: number): string[][] {
	const results: string[][] = [];
	const Qpotisions: [number, number][] = [];
	// => 배치한 퀸들의 위치[x,y]를 저장하는 배열
	const board = Array.from({ length: n }, () => Array(n).fill('.'));
	// => 점(.)으로 채워넣은 n x n 체스판
	completeBoardFromThisRowOn(0);
	return results;

	// 주어진 행(i)부터 이후 행에 퀸을 채워넣는 DFS 탐색 함수
	function completeBoardFromThisRowOn(i: number) {
		// 마지막 행(n-1)까지 퀸이 배치되어 n행을 대상으로 
		// 재귀호출됨: 현재 체스판을 results에 넣고 탈출함
		if (i === n) {
			results.push(board.map((row) => row.join('')));
			return;
		}
		row: for (let j = 0; j < n; j++) {
			for (let [x, y] of Qpotisions) {
				if (i === x || j === y ||
					Math.abs(i - x) === Math.abs(j - y)) {
					continue row;
				}
			}
			Qpotisions.push([i, j]);
			board[i][j] = 'Q';
			completeBoardFromThisRowOn(i + 1);
			board[i][j] = '.';
			Qpotisions.pop();
		}
	}
}

export default {
	solution: solveNQueens2,
}