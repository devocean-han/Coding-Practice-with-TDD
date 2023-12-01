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

// (성공) DFS 풀이: 
// 각 cell마다 DFS 진행, '상,좌' 경계선과 '우,하' 경계선에 닿으면 true를 리턴함으로써 해당 cell을 result에 넣어야 함을 나타내도록 한다.
function pacificAtlantic1(heights: number[][]): number[][] {
	const result: number[][] = [];
	let dp: string[][];
			
	for (let row = 0; row < heights.length; row++) {
		for (let col = 0; col < heights[0].length; col++) {
			// 지나간 경로 체크는 각 cell마다 새롭게 백지로 시작해야 함
			dp = [...Array(heights.length)].map((row) => Array(heights[0].length));
			let flowBoth = checkFlow(row, col, {});
			if (flowBoth)
				result.push([row, col]);
			// console.table(dp);
			// console.log(result);
		}
	}

	function checkFlow(row: number, col: number, eachOcean: any): boolean {
		dp[row][col] = '#';
		// 1) Pacific에(만) 닿은 경우:
		if (row === 0 || col === 0) {
			// 'pacific'을 true로 체크해둔 eachOcean을 다음 칸 탐색에 넘김
			eachOcean.pacific = true;
		}
		// 2) Atlantic에(만) 닿은 경우: 
		if(row === heights.length - 1 || col === heights[0].length - 1) {
			// 'atlantic'을 true로 체크해둔 eachOcean을 다음 칸 탐색에 넘김
			eachOcean.atlantic = true;
		}	
		// Base case:
		// 양측 모두에 닿은 경우에만 true 리턴
		if (eachOcean.pacific && eachOcean.atlantic) {
			return true;
		}

		// 다음 칸 탐색 진행: 
		// 양쪽 바다 중 한 곳에만 닿았거나, 아무 데도 닿지 못한 상태일 때
		// check neighboring cells: 
		// up
		if (dp[row - 1][col] === undefined &&
			heights[row - 1]?.[col] <= heights[row][col]) {
			if (checkFlow(row - 1, col, eachOcean))
				return true;
		}
		// right
		if (dp[row][col + 1] === undefined &&
			heights[row][col + 1] <= heights[row][col])
			if (checkFlow(row, col + 1, eachOcean))
				return true;
		// down
		if (dp[row + 1]?.[col] === undefined &&
			heights[row + 1]?.[col] <= heights[row][col])
			if (checkFlow(row + 1, col, eachOcean))
				return true;
		// left
		if (dp[row][col - 1] === undefined &&
			heights[row][col - 1] <= heights[row][col])
			if (checkFlow(row, col - 1, eachOcean))
				return true;

		// 1. 아예 위로 진행을 안 할 수도 있고
		// 2. 했는데 사방이 막혔을 수도 있고
		// 3. 바다를 만나서 atlantic=true가 되어 다음 칸으로 진행됐을 수 있고
		// 4. 양쪽 다 true라서 true가 리턴됐을 수 있다.
		// 		=> true가 명시적으로 리턴된 경우라면 호출한 부모함수도 곧바로 true를 리턴해주도록 해야 한다.
		// 			* 즉, 4방위 중 한 번이라도 true가 등장하면 그 부모의 부모의 부모들도 모두 즉시 true를 리턴하도록 세팅해준다.
		
		return false;
	}

	return result;
};

// (성공) 위의 풀이를 더 깔끔히 리팩토링한 버전: 
function pacificAtlantic2(heights: number[][]): number[][] {
	const result: number[][] = []; 
	const directions: number[][] = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // top, right, down, left
	let dp: string[][];  // 'visited cells' map
			
	for (let row = 0; row < heights.length; row++) {
		for (let col = 0; col < heights[0].length; col++) {
            // 'visited cells' map must be reset at each start cell
			dp = [...Array(heights.length)].map((row) => Array(heights[0].length));
			if (checkFlow(row, col, {}))
                result.push([row, col]);
		}
	}

	function checkFlow(row: number, col: number, reachOcean: any) {
        // Mark current cell as 'visited'
		dp[row][col] = '#';
        
        // If current cell is pacific or atlantic shore, 
        // Mark the ocean as 'reached'
		if (row === 0 || col === 0) {
			reachOcean.pacific = true;
		}
		if(row === heights.length - 1 || col === heights[0].length - 1) {
			reachOcean.atlantic = true;
		}	
		// Base case:
        // Return true if both oceans are marked as 'reached'
		if (reachOcean.pacific && reachOcean.atlantic) {
			return true;
		}

		/* Check neighboring cells only if it is...
            1) not visited yet
            2) not higher than current cell
         and return true right away when at some point 
         both oceans are marked 'reached'
        */
		for (let [dx, dy] of directions) {
			let newRow = row + dx;
			let newCol = col + dy;
			if (dp[newRow]?.[newCol] === undefined &&
				heights[newRow]?.[newCol] <= heights[row][col]) {
				if (checkFlow(newRow, newCol, reachOcean))
					return true;
			}
		}
		
		return false;
	}

	return result;
};

// (성공) BFS 풀이:
// 각 셀에서 시작하는 대신, 태평양과 대서양의 경계(해안선)에서 시작하여 높은 고도로 이동하는 방식. 각 셀을 한 번만 방문하므로 시간 복잡도가 향상된다.
// (더 자세한 설명: 위에서 아래로 흐를 때는 출발점 a와 b가 흐를 수 있는 길이 겹칠 수 있고 그 모든 길을 끝까지 쫓아가봐야 한다. 그러나 아래에서 위로 이어지는 길을 찾아 마크하면 같은 지점을 중복 탐색하지 않을 수 있다. 즉, 이차원 배열에서 목표 지점에 닿고자 할 때 목표 지점부터 거꾸로 탐색해 나가면 중복을 제거할 수 있다.)
function pacificAtlantic3(heights: number[][]): number[][] {
	const m = heights.length;
	const n = heights[0].length;
	const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	// BFS 함수: 큐에 있는 모든 cell을 방문하고,
	// 각 cell에서 가능한 모든 방향으로 이동한다.
	// => 이를 통해 '방문 지도(dp)'의 해안가에서 시작해 오르막만으로 이어질 수 있는 모든 길(cell)에 '방문함' 표시를 하게 됨.
	function isAscendingBfs(queue: number[][], dp: boolean[][]) {
		while (queue.length) {
			// 큐에 cell(좌표)이 남아있는 동안 제일 앞선(왼쪽) cell을 뽑아서
			let [x, y] = queue.shift();

			// 상하좌우 cell 중 방문이 가능한 방향이란:
			// (1) 유효하고(섬 내부이고)
			// (2) 아직 방문하지 않았으며
			// (3) 현재 위치보다 낮지 않은 경우에만(해안가에서 시작하여 더 높은 곳으로 찾아가기).
			for (let [dx, dy] of directions) {
				let nx = x + dx;
				let ny = y + dy;
				if (nx < 0 || nx >= m || ny < 0 || ny >= n ||
					dp[nx][ny] || heights[nx][ny] < heights[x][y]) {
					continue;
				}
				// 목표 cell 방문하기: 
				dp[nx][ny] = true; // 목표 cell을 '방문함' 표기
				queue.push([nx, ny]); // 목표 cell을 방문할 예정이므로 큐에 넣음
			}
		}
	}

	// 태평양과 대서양의 해안가에서 시작하는 오르막 탐색(BFS) 
	// 을 위한 queue 및 dp 초기화
	const pQueue: number[][] = [];
	const aQueue: number[][] = [];
	const pAscendingFlowMap: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
	const aAscendingFlowMap: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));

	// 각 row마다, 왼쪽 끝과 오른쪽 끝 cell을 각각 queue와 dp에 넣는다.
	for (let i = 0; i < m; i++) {
		pQueue.push([i, 0]);
		aQueue.push([i, n - 1]);
		pAscendingFlowMap[i][0] = true;
		aAscendingFlowMap[i][n - 1] = true;
	}
	// 각 col마다, 위 끝과 아래 끝 cell을 각각 queue에 넣고 dp에 '방문함' 표시를 한다.
	for (let i = 0; i < n; i++) {
		pQueue.push([0, i]);
		aQueue.push([m - 1, i]);
		pAscendingFlowMap[0][i] = true;
		aAscendingFlowMap[m - 1][i] = true;
	}
	// => [0,0]과 [m-1,n-1] 지점은 두 번 중복해서 같은 queue에 담기지만, 그래도 상관 없다. 어차피 이후로 queue에 추가할 때는 '다음 cell'을 검사하고 추가하는 것이므로. 즉, 한 번 사방이 탐색된 cell에 대해서는 추가적인 검사가 진행되지 않는다. 

	// BFS 실행:
	// flow1에는 태평양 해안선에서 시작해 오르막으로 이어질 수 있는 모든 cell 좌표가 true로 표기된다. flow2도 대서양에서 시작해 마찬가지.
	isAscendingBfs(pQueue, pAscendingFlowMap);
	isAscendingBfs(aQueue, aAscendingFlowMap);
	
	// 두 바다 모두에서 이어질 수 있는 cell을 찾아
	// result 배열에 그 좌표를 넣어줌.
	const result: number[][] = [];
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			if (pAscendingFlowMap[row][col] && aAscendingFlowMap[row][col]) {
				result.push([row, col]);
			}
		}
	}

	return result;
}

// (성공) 그렇다면 '목표->시작점'으로 거슬러 탐색하는 걸 BFS가 아닌 DFS로 할 수 있을까? : 스택을 이용한 방법:
function pacificAtlantic4(heights: number[][]): number[][] {
	const m = heights.length;
	const n = heights[0].length;
	const directions: number[][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	function isAscendingDfs(stack: number[][], dp: boolean[][]) {
		while (stack.length) {
			const [x, y] = stack.pop();
			for (let [dx, dy] of directions) {
				const [nx, ny] = [x + dx, y + dy];
				// 사방의 cell 중 유효하지 않은 cell은 거르고 탐색
				if (nx < 0 || nx >= m || ny < 0 || ny >= n ||
					dp[nx][ny] || heights[nx][ny] < heights[x][y]) {
					continue;
				}
				
				dp[nx][ny] = true;
				stack.push([nx, ny]);
			}
		}
	}

	// 스택 둘과 dp 둘을 초기화
	const pStack: number[][] = [];
	const aStack: number[][] = [];
	const pAscendingFlowMap: boolean[][] = Array.from({ length: m }, () => new Array(n));
	const aAscendingFlowMap: boolean[][] = Array.from({ length: m }, () => new Array(n));

	// 왼쪽과 오른쪽 가장자리 cell들을 스택과 dp에 추가
	for (let i = 0; i < m; i++) {
		pStack.push([i, 0]);
		aStack.push([i, n - 1]);
		pAscendingFlowMap[i][0] = true;
		aAscendingFlowMap[i][n-1] = true;
	}
	for (let i = 0; i < n; i++) {
		pStack.push([0, i]);
		aStack.push([m - 1, i]);
		pAscendingFlowMap[0][i] = true;
		aAscendingFlowMap[m-1][i] = true;
	}

	// DFS 수행
	isAscendingDfs(pStack, pAscendingFlowMap);
	isAscendingDfs(aStack, aAscendingFlowMap);

	// 전체 cell에 대해 pAscen.와 aAscend 모두에 해당하는 지점을 찾아 그 좌표를 result에 넣기
	const result: number[][] = [];
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			if (pAscendingFlowMap[row][col] && aAscendingFlowMap[row][col]) {
				result.push([row, col]);
			}
		}
	}

	return result;
}


// (성공) 그렇다면, low->high로 재귀 DFS도...?
function pacificAtlantic5(heights: number[][]): number[][] {
	const m = heights.length;		// row(x)의 길이 
	const n = heights[0].length;	// col(y)의 길이 
	const result: number[][] = []; 	
	const directions: number[][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	// heights와 똑같은 크기의 빈 m x n 지도를 만들고
	const pAscendingFlowMap: string[][] = Array.from({ length: m }, () => new Array(n));
	const aAscendingFlowMap: string[][] = Array.from({ length: m }, () => new Array(n));
	// 태평양과 대서양 해안가 초기 지점을 각각 하나씩 마크한 후
	pAscendingFlowMap[0][0] = '#';
	aAscendingFlowMap[m - 1][n - 1] = '#';
	// 그 초기 지점부터 재귀적으로 DFS를 수행, 두 지도는 각각
	// 태평양과 대서양 해안가에서부터 '오르막'으로만 가 닿을 수
	// 있는 길(cell들)을 '#'으로 표시하게 된다.
	checkAscending(0, 0, pAscendingFlowMap, true);
	checkAscending(m - 1, n - 1, aAscendingFlowMap, false);
	console.table(pAscendingFlowMap);
	console.table(aAscendingFlowMap);
	
	// 주어진 지도 heights 중 태평양과 대서양 모두와 
	// '오르막'으로 이어진 cell들이 바로 양 바다에 모두 
	// 흘러들어갈 수 있는 강수 지점이 되므로 result에 넣는다. 
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			if (pAscendingFlowMap[row][col] === '#' &&
				aAscendingFlowMap[row][col] === '#') {
				result.push([row, col]);
			}
		}
	}
	console.log(result);

	function checkAscending(row: number, col: number, dp: string[][], isPacific: boolean) {
		// 해안가를 stack에 담아두지 않고 어떻게 전부 살피지
		// 해안가이거나, 현재 고도보다 더 높아지는 방향이거나 하면 '마크'하기 => 이렇게 하면 '현재보다 더 낮아지는 cell이라서 이번엔 지나쳐도, 다음에 다른 해안가에서 시작해서 가능한 cell'이면 마크가 된다. 
		for (let [dx, dy] of directions) {
			const [nx, ny] = [row + dx, col + dy];
			// 일단 nx, ny가 유효범위를 벗어나면 패스
			if (nx < 0 || nx >= m || ny < 0 || ny >= n || dp[nx][ny])
				continue;
			
			// pacific이면, 위,왼 해안가이거나 더 높아지는 방향을 마크
			if (isPacific) {
				if (nx === 0 || ny === 0 ||
					heights[nx][ny] >= heights[row][col]) {
					dp[nx][ny] = '#';
					checkAscending(nx, ny, dp, isPacific);
				}
			}
			// atlantic이면, 우,아래 해안가이거나 더 높아지는 방향을 마크
			if (!isPacific) {
				if (nx === m - 1 || ny === n - 1 ||
					heights[nx][ny] >= heights[row][col]) {
					dp[nx][ny] = '#';
					checkAscending(nx, ny, dp, isPacific);
				}
			}

			// // 두 if 조건을 합치기:
			// if ((isPacific && (nx === 0 || ny === 0)) ||
			// 	!isPacific && (nx === m - 1 || ny === n - 1) ||
			// 	heights[nx][ny] >= heights[row][col]) {
			// 	dp[nx][ny] = '#';
			// 	checkAscending(nx, ny, dp, isPacific);
			// }
		} 
	}

	return result;
}

// 위의 5번 풀이를 리팩토링: 내부 재귀함수의 매개변수를 줄임
function pacificAtlantic6(heights: number[][]): number[][] {
	const m = heights.length;		// row(x)의 길이 
	const n = heights[0].length;	// col(y)의 길이 
	const result: number[][] = []; 	
	const directions: number[][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	// heights와 똑같은 크기의 빈 m x n 지도를 만들고
	const pAscendingFlowMap: string[][] = Array.from({ length: m }, () => new Array(n));
	const aAscendingFlowMap: string[][] = Array.from({ length: m }, () => new Array(n));
	// 태평양과 대서양 해안가 초기 지점을 각각 하나씩 마크한 후
	pAscendingFlowMap[0][0] = '#';
	aAscendingFlowMap[m - 1][n - 1] = '#';
	// 그 초기 지점부터 재귀적으로 DFS를 수행, 두 지도는 각각
	// 태평양과 대서양 해안가에서부터 '오르막'으로만 가 닿을 수
	// 있는 길(cell들)을 '#'으로 표시하게 된다.
	checkAscending(0, 0, pAscendingFlowMap);
	checkAscending(m - 1, n - 1, aAscendingFlowMap);
	console.table(pAscendingFlowMap);
	console.table(aAscendingFlowMap);
	
	// 주어진 지도 heights 중 태평양과 대서양 모두와 
	// '오르막'으로 이어진 cell들이 바로 양 바다에 모두 
	// 흘러들어갈 수 있는 강수 지점이 되므로 result에 넣는다. 
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			if (pAscendingFlowMap[row][col] === '#' &&
				aAscendingFlowMap[row][col] === '#') {
				result.push([row, col]);
			}
		}
	}
	console.log(result);

	function checkAscending(row: number, col: number, dp: string[][]) {
		// 해안가를 stack에 담아두지 않고 어떻게 전부 살피지
		// 해안가이거나, 현재 고도보다 더 높아지는 방향이거나 하면 '마크'하기 => 이렇게 하면 '현재보다 더 낮아지는 cell이라서 이번엔 지나쳐도, 다음에 다른 해안가에서 시작해서 가능한 cell'이면 마크가 된다. 
		for (let [dx, dy] of directions) {
			const [nx, ny] = [row + dx, col + dy];
			// 일단 nx, ny가 유효범위를 벗어나면 패스
			if (nx < 0 || nx >= m || ny < 0 || ny >= n || dp[nx][ny])
				continue;
			
			// pacific이면, 위,왼 해안가이거나 더 높아지는 방향을 마크
			// atlantic이면, 우,아래 해안가이거나 더 높아지는 방향을 마크
			
			// 두 if 조건을 합치기:
			if ((dp === pAscendingFlowMap && (nx === 0 || ny === 0)) ||
				dp === aAscendingFlowMap && (nx === m - 1 || ny === n - 1) ||
				heights[nx][ny] >= heights[row][col]) {
				dp[nx][ny] = '#';
				checkAscending(nx, ny, dp);
			}
		} 
	}

	return result;
}
// => 일치 연산자 '==='는 원시형 변수를 비교할 때는 값과 타입을 모두 일치시키고, 참조형 변수를 비교할 때는 동일한 객체를 참조하고 있는지를 확인한다. 

export default {
	solution: pacificAtlantic6,
}

/*	함수 선언과 함수 표현식
const bfs = (queue, flow) => {}와 function bfs(queue, flow) {} 두 선언 방식은 JavaScript에서 함수를 정의하는 두 가지 주요 방법입니다. 이 두 방식의 주요 차이점과 장단점은 다음과 같습니다:

함수 선언(function declaration): function bfs(queue, flow) {}

장점:
호이스팅: 함수 선언은 스크립트가 로드될 때 메모리에 로드되므로, 선언 전에 호출할 수 있습니다.
명확성: 함수 이름이 명시되어 있어서 디버깅 시에 스택 추적이 더 쉽습니다.
단점:
호이스팅: 함수가 자동으로 상단으로 이동하므로, 코드의 흐름을 이해하기 어려울 수 있습니다.

함수 표현식(function expression): const bfs = (queue, flow) => {}

장점:
유연성: 함수 표현식은 변수에 할당되므로, 다른 함수의 인자로 전달하거나 객체의 메서드로 사용할 수 있습니다.
this 바인딩: 화살표 함수는 자신만의 this를 가지지 않습니다. 대신, 화살표 함수는 자신을 둘러싼 코드의 this를 상속받습니다. 이는 특정 컨텍스트를 유지해야 하는 이벤트 핸들러나 콜백 함수에서 유용합니다.
단점:
호이스팅: 함수 표현식은 호이스팅되지 않으므로, 선언 전에 호출할 수 없습니다.
익명성: 함수 표현식은 종종 익명으로 사용되므로, 디버깅 시에 스택 추적이 어려울 수 있습니다. 하지만, const bfs = function bfs(queue, flow) {}와 같이 명명된 함수 표현식을 사용하여 이 문제를 해결할 수 있습니다.

*/