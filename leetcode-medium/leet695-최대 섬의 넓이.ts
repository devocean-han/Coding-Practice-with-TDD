/*
 * @lc app=leetcode id=695 lang=typescript
 *
 * [695] Max Area of Island
 *
 * https://leetcode.com/problems/max-area-of-island/description/
 *
 * algorithms
 * Medium (71.85%)
 * Total Accepted:    784.1K
 * Total Submissions: 1.1M
 * Testcase Example:  '[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]'
 *
 * You are given an m x n binary matrix grid. An island is a group of 1's
 * (representing land) connected 4-directionally (horizontal or vertical.) You
 * may assume all four edges of the grid are surrounded by water.
 * 
 * The area of an island is the number of cells with a value 1 in the island.
 * 
 * Return the maximum area of an island in grid. If there is no island, return
 * 0.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: grid =
 * [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * Output: 6
 * Explanation: The answer is not 11, because the island must be connected
 * 4-directionally.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: grid = [[0,0,0,0,0,0,0,0]]
 * Output: 0
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] is either 0 or 1.
 * 
 * 
 */

// (성공)DFS 풀이: 
function maxAreaOfIsland1(grid: number[][] | string[][]): number {
	let maxArea: number = 0;

	// 전체 grid를 순회하다가 '육지' 좌표를 만나면
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (grid[row][col] === 1) {
				// 해당 좌표를 대상으로 섬의 크기를 측정하는 DFS 순회를 하고,
				let area = markAndMeasureIsland(row, col);
				// 받아온 섬의 넓이가 최대 넓이 maxArea보다 크면 업데이트한다.
				if (area > maxArea) {
					maxArea = area;
				}
			}
		}
	}

	// '육지'인 좌표 하나를 받아 상하좌우 좌표를 검사, 
	// 해당 섬의 크기를 측정하고 그 넓이를 반환한다.
	// 측정을 완료한 칸은 '1','5' 등과 같이 바뀜
	function markAndMeasureIsland(row: number, col: number): number {
		// Base case: return 0 
		// 1) if current coordinates are outside grid border
		if (row < 0 || row >= grid.length ||
			col < 0 || col >= grid[0].length) 
			return 0;
		// 2) or if current coordinates are 'water' or marked
		if (grid[row][col] !== 1) {
			return 0;
		}	
		
		// if current coordinates are 'land', measure neighboring area
		grid[row][col] = '1';
		let upArea	  = markAndMeasureIsland(row - 1, col);
		let rightArea = markAndMeasureIsland(row, col + 1);
		let downArea  = markAndMeasureIsland(row + 1, col);
		let leftArea  = markAndMeasureIsland(row, col - 1);
		grid[row][col] = String(1 + upArea + rightArea + downArea + leftArea);
		return +grid[row][col];
	}

	return maxArea;
};

// 위 풀이와 똑같고, grid의 '섬'에 '1','2', 등으로 덮어쓰는 작업을
// 하지 않을 때 빠르기에 차이가 있는지 확인하기 위한 풀이: 
function maxAreaOfIsland2(grid: number[][] | string[][]): number {
	let maxArea: number = 0;

	// 전체 grid를 순회하다가 '육지' 좌표를 만나면
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (grid[row][col] === 1) {
				// 해당 좌표를 대상으로 섬의 크기를 측정하는 DFS 순회를 하고,
				// 받아온 섬의 넓이가 최대 넓이 maxArea보다 크면 업데이트한다.
				// console.table(grid);
				maxArea = Math.max(maxArea, measureIsland(row, col));
			}
		}
	}

	// '육지'인 좌표 하나를 받아 상하좌우 좌표를 검사(DFS 순회), 
	// 해당 섬의 크기를 측정하고 그 넓이를 반환한다.
	// 측정을 완료한 '육지'칸은 '#'으로 바뀜
	function measureIsland(row: number, col: number): number {
		// Base case: return 0 
		// 1) if current coordinates are outside grid border
		if (row < 0 || row >= grid.length ||
			col < 0 || col >= grid[0].length) 
			return 0;
		// 2) or if current coordinates are 'water' or marked
		if (grid[row][col] !== 1) {
			return 0;
		}	
		
		// if current coordinates are 'land', measure neighboring area
		grid[row][col] = '#';
		let upArea	  = measureIsland(row - 1, col);
		let rightArea = measureIsland(row, col + 1);
		let downArea  = measureIsland(row + 1, col);
		let leftArea  = measureIsland(row, col - 1);
		return 1 + upArea + rightArea + downArea + leftArea;
	}

	return maxArea;
};

export default {
	solution: maxAreaOfIsland2,
}