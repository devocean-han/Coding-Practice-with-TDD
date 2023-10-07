/* 36. Valid Sudoku
https://leetcode.com/problems/valid-sudoku/

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.


Example 1:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.


Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.


*/

// 1. 한 row 안에 중복되는 숫자가 있으면 false
// 2. 한 column 안에 중복되는 숫자가 있으면 false
// 중복되는 숫자가 있는지를 어떻게 구하지? set으로 변환해도 9가지보다 크냐 작냐로 구분할 수 없는데 말이다.
// => 일단 map에 넣어서 빈도수를 세보자.
// ==> 셀마다 1-9를 검사하는 게 아니라 1을 정해두고 전체 셀을 검사할 수도 있지 않을까?



// Time complexity: O(N^2)
// Space complexity: ...한 객체 변수를 N번 재생성하거나 재할당한다면, 그건 O(1)인가 O(N)인가?
// 		전자(O(1))라고 가정하고 계산하면: O(N) + O(N) + O(1) => O(N)
// 		후자(O(N))라고 가정하고 계산하면: O(N^2) + O(N^2) + O(9*N^2/9) => O(N^2)

// 그런데 사실 N = 9로 고정되어 있어야 함을 고려한다면,
// Time complexity: O(N^2) => O(1)
// Space complexity: O(N) or O(N^2) => O(1)
// 라고 할 수 있다. 
function isValidSudoku(board) {

	// // 0. 한 번의 루프로 통합
	// for (let row = 0; row < board.length; row++) {
	// 	const rowDuplicateCount = {};
	// 	const colDuplicateCount = {};
	// 	const subSquareDuplicateCount = {};

	// 	for (let col = 0; col < board[0].length; col++) {
	// 		const num = board[row][col];
	// 		if (num !== ".") {
	// 			if (num in rowDuplicateCount[row] || num in colDuplicateCount[row] || num in subSquareDuplicateCount[row]) {
	// 				return false;
	// 			}

	// 			// store row, col duplicate info
	// 			rowDuplicateCount[row] ? rowDuplicateCount[row][num] = true : rowDuplicateCount[row] = { num: true };
	// 			colDuplicateCount[col] ? colDuplicateCount[col][num] = true : colDuplicateCount[col] = { num: true };
	// 			// subsquare numbering:
	// 			// [0 - 3][0 - 3] => 0 / [0 - 3][3 - 6] => 1 / [0 - 3][6 - 9] => 2
	// 			// [3 - 6][0 - 3] => 3 / [3 - 6][3 - 6] => 4 / [3 - 6][6 - 9] => 5
	// 			// [6 - 9][0 - 3] => 6 / [6 - 9][3 - 6] => 7 / [6 - 9][6 - 9] => 8
	// 			// row: Math...
	// 			// []...
	// 			subSquareDuplicateCount[row] ? subSquareDuplicateCount[row][num] = true : subSquareDuplicateCount[row] = { num: true };
	// 		}
	// 	}
	// }

	// 1. 한 row 안의 1-9 빈도수 세기 및 중복 검사
	// time: O(row * col) = O(N^2)
	for (let row = 0; row < board.length; row++) { // O(row)
		const rowDuplicateCount = new Map(); 
		for (let num of board[row]) { // O(col)
			if (num !== ".") {
				if (rowDuplicateCount.has(num)) return false;
				rowDuplicateCount.set(num, true);
			}
		}
	}

	// 2. 한 column의 1-9 빈도수 세기 및 중복 검사
	// time: O(col * row) = O(N^2)
	for (let column = 0; column < board[0].length; column++) { // O(col)
		const columnDuplicateCount = new Map();
		for (let row of board) { // O(row)
			const num = row[column];
			if (num !== ".") {
				if (columnDuplicateCount.has(num)) return false;
				columnDuplicateCount.set(num, true);
			}
		}
	}

	// 3. 한 subSquare 안의 1-9 빈도수 세기 및 중복 검사
	// time: O(row/3) * { O(col/3) + 4O(3) } * O(9) => O(N) * { O(N) + O(1) } * O(1) => O(N^2)
	for (let i = 0; i < 9; i += 3) { // O(row/3)
		for (let j = 0; j < 9; j += 3) { // O(col/3)
			const subSquareCount = new Map();
			const subSquare = board.slice(i, i + 3).map((row) => row.slice(j, j + 3)).flat(); // O(3) + O(3) + O(3) + O(3) => O(1)
			board.slice(0, 3).map((row) => row.slice(0, 3))

			for (let num of subSquare) { // O(9)
				if (num !== ".") {
					if (subSquareCount.has(num)) return false;
					subSquareCount.set(num, true);
				}
			}
		}
	}

	return true;
}



module.exports.solution = singleSetSolution;

// 같은 논리로 i, j 한번의 루프 안에서 행/렬/3*3을 전부 처리한 해법: 
function hashSetSolution(board) {
	for (let i = 0; i < 9; i++) {
		let row = new Set(),
			col = new Set(),
			box = new Set();
		
		/* 
		00 01 02 | 03 04 05 | 06 07 08
		10 11 12 | 13 14 15 | 16 17 18  // i = 0, 1, 2
		20 21 22 | 23 24 25 | 26 27 28
		------------------------------
		30 31 32 | 33 34 35 | 36 37 38
		40 41 42 | 43 44 45 | 46 47 48  // i = 3, 4, 5
		50 51 52 | 53 54 55 | 56 57 58
		------------------------------
		60 61 62 | 63 64 65 | 66 67 68 
		70 71 72 | 73 74 75 | 76 77 78  // i = 6, 7, 8
		80 81 82 | 83 84 85 | 86 87 88
		*/
		for (let j = 0; j < 9; j++) {
			let _row = board[i][j]; // [0][0->8]
			let _col = board[j][i]; // [0->8][0]
			let _box = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];
			// i=0, j=0->2일 때, board[3 * 0 + 0][3 * 0 + 0->2] = board[0][0->2]
			// i=0, j=3->5일 때, board[3 * 0 + 1][3 * 0 + 0->2] = board[1][0->2]
			// i=0, j=6->8일 때, board[3 * 0 + 2][3 * 0 + 0->2] = board[2][0->2]
			// 
			// i=1, j=0->2일 때, board[3 * 0 + 0][3 * 1 + 0->2] = board[0][3->5]
			// i=1, j=3->5일 때, board[3 * 0 + 1][3 * 1 + 0->2] = board[1][3->5]
			// i=1, j=6->8일 때, board[3 * 0 + 2][3 * 1 + 0->2] = board[2][3->5]
			
			if (_row != '.') {
				if (row.has(_row)) return false;
				row.add(_row);
			}
			if (_col != '.') {
				if (col.has(_col)) return false;
				col.add(_col);
			}
			
			if (_box != '.') {
				if (box.has(_box)) return false;
				box.add(_box);
			} 
		}
	}

	return true;
}

// // Set을 하나만 쓰고 루프를 하나로 통일하려던 처음의 내 방식와 더 유사한 풀이: 
function singleSetSolution(board) {
	let set = new Set();
    
    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board[r].length; c++){
            let val = board[r][c];
            
            if(val === '.')
                continue;
            
            //basically, formula is 3 * row + col --> to turn 2d array into 1d array
            //using Math.floor(row/3) + Math.floor(col/3) --> so we can find row and col of our sub box 
            let boxNum = 3 * Math.floor(r/3) + Math.floor(c/3);
            
            let inRow = `row: ${r}, value: ${val}`;
            let inCol = `col: ${c}, value: ${val}`;
            let inSubBox = `subBox: ${boxNum}, value: ${val}`;
            
            if(set.has(inRow) || set.has(inCol) || set.has(inSubBox))
                return false;
            
            set.add(inRow);
            set.add(inCol);
            set.add(inSubBox);
        }
	}
	
    return true;
}