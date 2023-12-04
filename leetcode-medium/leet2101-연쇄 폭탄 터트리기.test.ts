import source from './leet2101-연쇄 폭탄 터트리기';
const { solution } = source;

// 폭발 범위... 가 아니라 우선 폭탄들의 위치부터 지도로 나타내보자
/*
일단 폭탄은 전부 1사분면 위에 위치한다고 되어 있다. 
그러면 x,y축을 왼,아래 경계로 삼는 표를 만들면 되겠다.
다만 정해진 표의 크기가 없다는 게 문제. 만약 [100,0,1]인 폭탄이 있다면 그대로 col을 101까지 늘려야 한다. 
그리드가 교차하는 지점에 점을 찍을 방법이 없으므로 [x,y]=[1,1] 자리를 [row][col]=[1,1]로 삼아 표기하기로 한다. 즉, col 0과 row 0을 그냥 쿠션으로 끼워넣기로 한다.
col 인덱스: x
row 인덱스: 최대 y값 - y + 1
근데 딱히 폭발범위까지 포함해서 최대 col을 잡을 필요가 없겠다.
최대 col(지도의 가로 길이): 최대 x + 1값 
최대 row(지도의 세로 길이): 최대 y + 1값

*/
const makeRanges = (bombs: number[][]) => {
	let maxCol: number = 0;
	let maxRow: number = 0;

	// 처음에 row를 정립한다. 아니, maxCol과 maxRow를 찾는다.
	for (let [x, y, r] of bombs) {
		maxRow = Math.max(maxCol, y + 1);
		maxCol = Math.max(maxCol, x + 1);
	}
	// maxRow, maxCol을 기반으로 빈 2차원 배열을 만든다.
	const grid: string[][] | number[][] = Array.from({ length: maxRow }, () => new Array(maxCol).fill(''));
	// 다음에 다시 순회를 한바퀴 하며 col을 정립하며 점을 찍는다.
	for (let [x, y, r] of bombs) {
		// grid[maxRow - y - 1][x] = r;
		grid[y][x] = r;
		// 중심 x,y로 구할 수 있는 폭발 정수 범위:
		// 어떤 a,b좌표가 있을 때 (x-a)^2 + (y-b)^2 <= r^2 이면 해당 범위이다. 일단 가상으로 x-r ~ x+r, y-r ~ y+r까지 정사각형을 대상으로 각 좌표를 계산해보자.
		for (let row = y - r; row <= y + r; row++) {
			for (let col = x - r; col <= x + r; col++) {
				if (row < 0 || row >= maxRow || col < 0 || col >= maxCol || grid[row][col] !== '') {
					continue;
				}
				let distanceFromBomb = (x - col) * (x - col) + (y - row) * (y - row);
				if (distanceFromBomb <= r * r) {
					grid[row][col] = '' + r;
				}
			}
		}
	}
	// console.table(grid);
	return grid;
}
const showRanges = (bombs: number[][]) => {
	const grid = makeRanges(bombs);
	let reversedGrid = grid.reverse();
	console.table(reversedGrid)
}
describe('Detonate the Maximum Bombs', () => {
	describe('Simple case: minimum bomb number and range =[[1,1,1]]', () => {
		let bombs: number[][];
		it(`should return 1`, () => {
			bombs = [[1, 1, 1]];
			showRanges(bombs);
			expect(solution(bombs)).toBe(1);
		});
	});
	describe('Example 1: grid=[[2,1,3],[6,1,4]]', () => {
		let bombs: number[][];
		it(`should return 2`, () => {
			bombs = [[2,1,3],[6,1,4]];
			showRanges(bombs);
			expect(solution(bombs)).toBe(2);
		});
	});
	describe('Example 2: grid=[[1,1,5],[10,10,5]]', () => {
		let bombs: number[][];
		it(`should return 1`, () => {
			bombs = [[1,1,5],[10,10,5]];
			showRanges(bombs);
			expect(solution(bombs)).toBe(1);
		});
	});
	describe('Example 3: grid=[[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]', () => {
		let bombs: number[][];
		it(`should return 5`, () => {
			bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]];
			showRanges(bombs);
			expect(solution(bombs)).toBe(5);
		});
	});
});