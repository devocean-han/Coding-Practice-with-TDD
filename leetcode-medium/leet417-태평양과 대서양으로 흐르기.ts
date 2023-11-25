/*
 * @lc app=leetcode id=417 lang=typescript
 *
 * [417] Pacific Atlantic Water Flow
 *
 * https://leetcode.com/problems/pacific-atlantic-water-flow/description/
 *
 * algorithms
 * Medium (54.82%)
 * Total Accepted:    414.9K
 * Total Submissions: 756.1K
 * Testcase Example:  '[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]'
 *
 * There is an m x n rectangular island that borders both the Pacific Ocean and
 * Atlantic Ocean. The Pacific Ocean touches the island's left and top edges,
 * and the Atlantic Ocean touches the island's right and bottom edges.
 * 
 * The island is partitioned into a grid of square cells. You are given an m x
 * n integer matrix heights where heights[r][c] represents the height above sea
 * level of the cell at coordinate (r, c).
 * 
 * The island receives a lot of rain, and the rain water can flow to
 * neighboring cells directly north, south, east, and west if the neighboring
 * cell's height is less than or equal to the current cell's height. Water can
 * flow from any cell adjacent to an ocean into the ocean.
 * 
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci]
 * denotes that rain water can flow from cell (ri, ci) to both the Pacific and
 * Atlantic oceans.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: heights =
 * [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * Explanation: The following cells can flow to the Pacific and Atlantic
 * oceans, as shown below:
 * [0,4]: [0,4] -> Pacific Ocean 
 * [0,4] -> Atlantic Ocean
 * [1,3]: [1,3] -> [0,3] -> Pacific Ocean 
 * [1,3] -> [1,4] -> Atlantic Ocean
 * [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
 * [1,4] -> Atlantic Ocean
 * [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
 * [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
 * [3,0]: [3,0] -> Pacific Ocean 
 * [3,0] -> [4,0] -> Atlantic Ocean
 * [3,1]: [3,1] -> [3,0] -> Pacific Ocean 
 * [3,1] -> [4,1] -> Atlantic Ocean
 * [4,0]: [4,0] -> Pacific Ocean 
 * ⁠      [4,0] -> Atlantic Ocean
 * Note that there are other possible paths for these cells to flow to the
 * Pacific and Atlantic oceans.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: heights = [[1]]
 * Output: [[0,0]]
 * Explanation: The water can flow from the only cell to the Pacific and
 * Atlantic oceans.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == heights.length
 * n == heights[r].length
 * 1 <= m, n <= 200
 * 0 <= heights[r][c] <= 10^5
 * 
 * 
 */

// 일단 대각선을 그어본다. 거기에 해당하는 cell들의 최저 높이가 곧 한계선이다.
// 평범한 다른 cell들이 흐를 수 있는가는, ... 그냥 각 cell마다 DFS를 하면서 마지막에 '상,좌' 경계선과 '우,하' 경계선에 모두 도달할 수 있는가를 보면 되겠다.
// '상,좌' 경계선: row=0 혹은 col=0에 도달할 수 있는가
// '우,하' 경계선: row=m-1 혹은 col=n-1에 도달할 수 있는가
// 특별 경계선: [0,n-1]과 [m-1,0]에는 한 칸에만 도달해도 태평양, 대서양 모두에 흐름 가능

// 각 cell마다 DFS 진행, '상,좌' 경계선과 '우,하' 경계선에 닿으면 true를 리턴함으로써 해당 cell을 result에 넣어야 함을 나타내도록 한다:
function pacificAtlantic(heights: number[][]): number[][] {
	const result: number[][] = [];

	for (let row = 0; row < heights.length; row++) {
		for (let col = 0; col < heights[0].length; col++) {
			let flowBoth = checkFlow(row, col);
			if (flowBoth)
				result.push([row, col]);
		}
	}

	function checkFlow(row: number, col: number): boolean {
		// Base case: 
		if ((row === 0 || col === 0) &&
			(row === heights.length - 1 || col === heights[0].length - 1)) {
			return true;
		}
		
		// check neighboring cells: 
		// heights[row][col] = 
		// up
		if (heights[row - 1]?.[col] <= heights[row][col])
			checkFlow(row - 1, col);
		// right
		if (heights[row][col + 1] <= heights[row][col])
			checkFlow(row, col + 1);
		// down
		if (heights[row + 1]?.[col] <= heights[row][col])
			checkFlow(row + 1, col);
		// left
		if (heights[row][col - 1] <= heights[row][col])
			checkFlow(row, col - 1);

		return false;
	}

	return result;
};

export default {
	solution: pacificAtlantic,
}