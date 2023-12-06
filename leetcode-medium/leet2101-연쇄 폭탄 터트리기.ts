/*
 * @lc app=leetcode id=2101 lang=typescript
 *
 * [2101] Detonate the Maximum Bombs
 *
 * https://leetcode.com/problems/detonate-the-maximum-bombs/description/
 *
 * algorithms
 * Medium (49.05%)
 * Total Accepted:    103.8K
 * Total Submissions: 211.7K
 * Testcase Example:  '[[2,1,3],[6,1,4]]'
 *
 * You are given a list of bombs. The range of a bomb is defined as the area
 * where its effect can be felt. This area is in the shape of a circle with the
 * center as the location of the bomb.
 * 
 * The bombs are represented by a 0-indexed 2D integer array bombs where
 * bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate and Y-coordinate
 * of the location of the i^th bomb, whereas ri denotes the radius of its
 * range.
 * 
 * You may choose to detonate a single bomb. When a bomb is detonated, it will
 * detonate all bombs that lie in its range. These bombs will further detonate
 * the bombs that lie in their ranges.
 * 
 * Given the list of bombs, return the maximum number of bombs that can be
 * detonated if you are allowed to detonate only one bomb.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: bombs = [[2,1,3],[6,1,4]]
 * Output: 2
 * Explanation:
 * The above figure shows the positions and ranges of the 2 bombs.
 * If we detonate the left bomb, the right bomb will not be affected.
 * But if we detonate the right bomb, both bombs will be detonated.
 * So the maximum bombs that can be detonated is max(1, 2) = 2.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: bombs = [[1,1,5],[10,10,5]]
 * Output: 1
 * Explanation:
 * Detonating either bomb will not detonate the other bomb, so the maximum
 * number of bombs that can be detonated is 1.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]
 * Output: 5
 * Explanation:
 * The best bomb to detonate is bomb 0 because:
 * - Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb
 * 0.
 * - Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
 * - Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
 * Thus all 5 bombs are detonated.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= bombs.length <= 100
 * bombs[i].length == 3
 * 1 <= xi, yi, ri <= 10^5
 * 
 * 
 */

// => 주어진 폭탄 리스트 bombs[x좌표, y좌표, 폭발 반지름 r]에서 하나를 골라 터뜨릴 때, 연쇄적으로 폭발시킬 수 있는 최대 폭탄 개수를 반환하기
// => 폭탄 위치와 폭발 반지름은 전부 정수로만 주어지고, r이 커질수록 폭발에 포함되는 '정수'범위가 많아진다. 결국 꼼짝없이 x와 y좌표마다 폭탄위치와의 거리를 구해야 함.


/* (성공)
	0번 폭탄 안에 포함되는 폭탄들을 세서 {1: [2,3]}처럼 만들어 놓는다.
	2번 폭탄 안에 포함되는 폭탄달을 세서 {2: []}처럼 만들어 놓는다.
	5번 폭탄까지 그렇게 하면, bombs=[[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]의 경우 인덱스 0을 시작점으로 하면:
	{폭탄 넘버: [폭발 범위 안에 들어오는 다른 폭탄들]}
	{0: [1,2]}
	{1: []}
	{2: [1,3]}
	{3: [1,2,4]}
	{4: [2,3]}
	가 된다. 한 번의 루트에서 같은 폭탄으로는 다시 진행하지 않는다고 하면 가능한 폭발 순서는:
	0 -> 1 -> x,
	  -> 2 -> 3 -> 4 
	혹은
	1 -> x
	혹은
	2 -> 1 -> x,
	  -> 3 -> 4
	혹은
	3 -> 1 -> x,
	  -> 2,
	  -> 4
	혹은
	4 -> 2 -> 1 -> x,
	  	   -> 3
	이 중에 0부터 시작하는 폭발이 0,1,2,3,4 모두를 거쳐가는 루트들이 가능하므로 정답인 5개를 반환시킬 수 있다.

	따라서 
	1) 각 폭탄들에게 폭발 범위 안에 포함되는 다른 폭탄들을 짝지어 객체로 만든다. => {폭탄 넘버: [폭발 범위 안에 들어오는 다른 폭탄들]}
		ex) {0: [1,2], 1: [], 2: [1,3], 3: [1,2,4], 4: [2,3]}
	2) 각 폭탄들을 시작점으로 하여 만들 수 있는 모든 루트를 훑는다. 같은 폭탄으로는 다시 진행하지 않아야 하고, 이 때 거쳐가는 모든 폭탄 넘버를 카운트한다. 
	3) 마지막 폭탄까지 진행한 후, 가장 큰 카운트를 그대로 반환한다. 
 */
function maximumDetonation(bombs: number[][]): number {
	if (bombs.length === 1) return 1;
	// 1) 각 폭탄들의 폭발 범위 안에 포함되는 다른 폭탄들을 짝지어 {폭탄 넘버: [폭발 범위 안에 들어오는 다른 폭탄들]}과 같이 기록해둔다. 
	let bombChain: { [key: number]: number[] } = {}
	for (let i = 0; i < bombs.length; i++) { // i[x,y,r] = 터지는 폭탄
		const [x, y, r] = bombs[i];
		// 이후 모든 폭탄 넘버에 연결된 배열을 순회할 필요가 있게 되므로 아무 연쇄가 일어나지 않는 폭발도 빈 배열을 할당한다.
		if (!bombChain[i]) {
			bombChain[i] = [];
		}
		for (let j = 0; j < bombs.length; j++) { // j[a,b] = 다른 폭탄
			// 같은 폭탄에 대해서는 검사를 진행하지 않고,
			if (i === j) continue;
			// 만약 '다른 폭탄'의 위치[a,b]가 '터지는 폭탄'의 폭발 범위 내면 bombChain에 넣기
			let [a, b] = bombs[j];
			let distanceSquare = (x - a) * (x - a) + (y - b) * (y - b);
			if (distanceSquare <= r * r) {
				bombChain[i].push(j);
			}
		}
	}
	// => 완성된 bombChain 예시: {0:[1,2], 1:[], 2:[1,3], 3:[1,2,4], 4:[2,3]}

	// 2) 각 폭탄들을 시작점으로 하여 만들 수 있는 모든 루트를 훑는다. 같은 폭탄으로는 다시 진행하지 않아야 하고, 이 때 거쳐가는 모든 폭탄 넘버를 카운트한다. 
	const detonatedBombList: { [key: number]: boolean[] }
		= {};
	let maxDetonation = 0;
	for (let [key, bombs] of Object.entries(bombChain)) {
		let initialBomb: number = Number(key); // 시작점이 되는 폭탄
		let detonatedBomb: boolean[] = [];  // 터진 폭탄을 기록할 배열(터진 폭탄 넘버를 인덱스로 하여 '터짐'을 true로, '터지지 않음'을 undefined로 기록)
		detonatedBomb[initialBomb] = true;
		let stack = [...bombs];

		while (stack.length) {
			let bomb = stack.pop();
			// 꺼내온 폭탄이 이미 터진 폭탄이면 루트를 더이상 진행하지 않고 다음 폭탄을 살피러 간다:
			if (detonatedBomb[bomb] === true) {
				continue;
			}
			// 그렇지 않다면 꺼내온 폭탄을 '터뜨리고' 이 폭탄에 영향을 받는 폭탄 목록을 또 stack에 넣는다.
			detonatedBomb[bomb] = true;
			bombs = bombChain[bomb];
			stack.push(...bombs);
		}
		maxDetonation = Math.max(maxDetonation, detonatedBomb.filter(e => true).length);
		detonatedBombList[initialBomb] = detonatedBomb;
		console.log('결과: ', initialBomb, detonatedBomb);
	}
	
	// 3) 마지막 폭탄까지 진행한 후, 가장 큰 카운트를 그대로 반환한다. 
	const detonatedBombCount = Object.values(detonatedBombList)
		.map((val) => val.filter(e => true).length);
	return Math.max(...detonatedBombCount);

	return maxDetonation;
};

// 위의 풀이를 리팩토링한 버전: 
/* 
	1) 각 폭탄들에게 폭발 범위 안에 포함되는 다른 폭탄들을 짝지어 객체로 만든다. => {폭탄 넘버: [폭발 범위 안에 들어오는 다른 폭탄들]}
		ex) {0: [1,2], 1: [], 2: [1,3], 3: [1,2,4], 4: [2,3]}
	2) 각 폭탄들을 시작점으로 하여 만들 수 있는 모든 루트를 훑는다. 같은 폭탄으로는 다시 진행하지 않아야 하고, 이 때 거쳐가는 모든 폭탄 넘버를 카운트한다. 
	3) 마지막 폭탄까지 진행한 후, 가장 큰 카운트를 그대로 반환한다. 
 */
function maximumDetonation2(bombs: number[][]): number {
	// 폭탄이 하나만 있을 경우, 폭발 수는 1
	if (bombs.length === 1) return 1;

	// 폭탄 연쇄 정보를 저장할 객체 초기화
	let bombChain: { [key: number]: number[] } = {}

	// 1. 각 폭탄에 대해 폭발 범위 내의 다른 폭탄들을 찾아서 bombChain에 저장
	for (let i = 0; i < bombs.length; i++) { // i[x,y,r] = 터지는 폭탄
		const [x, y, r] = bombs[i];
		bombChain[i] = bombChain[i] || [];
		// (=> 이후 모든 폭탄 넘버에 연결된 배열을 순회해야 하므로 아무 연쇄가 일어나지 않는 폭발도 빈 배열을 할당해야 함)
		
		for (let j = 0; j < bombs.length; j++) { // j[a,b] = 다른 폭탄
			// 같은 폭탄에 대해서는 검사를 진행하지 않고,
			if (i === j) continue;
			// 만약 '다른 폭탄'의 위치[a,b]가 '터지는 폭탄'의 폭발 범위 내면 bombChain에 넣기
			let [a, b] = bombs[j];
			let distanceSquare = (x - a) * (x - a) + (y - b) * (y - b);
			if (distanceSquare <= r * r) {
				bombChain[i].push(j);
			}
		}
	}
	// => 완성된 bombChain 예시: {0:[1,2], 1:[], 2:[1,3], 3:[1,2,4], 4:[2,3]}

	// 2. 각 폭탄을 시작점으로 하여 만들 수 있는 모든 루트를 훑음.
	let maxDetonation = 0;
	for (let [key, bombs] of Object.entries(bombChain)) {
		let initialBomb: number = Number(key); // 시작점이 되는 폭탄
		let detonatedBomb: boolean[] = [];  // 터진 폭탄을 기록할 배열(터진 폭탄 넘버를 인덱스로 하여 '터짐'을 true로, '터지지 않음'을 undefined로 기록)
		detonatedBomb[initialBomb] = true; 
		let stack = [...bombs]; // 터지게 될 폭탄 목록을 담아둘 stack

		while (stack.length) {
			let bomb = stack.pop();
			// 꺼내온 폭탄이 이미 터진 폭탄이면 루트를 더이상 진행하지 않고 다음 폭탄을 살피러 간다.
			if (detonatedBomb[bomb] === true) {
				continue;
			}
			// 그렇지 않다면 꺼내온 폭탄을 '터뜨리고' 이 폭탄에 영향을 받는 폭탄 목록을 또 stack에 넣는다.
			detonatedBomb[bomb] = true;
			bombs = bombChain[bomb];
			stack.push(...bombs);
		}

		// 가장 큰 폭발 개수를 업데이트
		maxDetonation = Math.max(maxDetonation, detonatedBomb.filter(e => true).length);
	}
	
	// 3) 마지막 폭탄까지 진행한 후, 가장 큰 폭발 개수를 반환한다. 
	return maxDetonation;
};

// 위의 풀이와 커다란 로직(1~3)이 같고 stack 대신 재귀 함수를 활용한 DFS 풀이:
function maximumDetonation3(bombs: number[][]): number {
	const n = bombs.length;
	if (n === 1) return 1;

	// 폭탄 연쇄 정보를 저장할 배열 초기화
	let bombChain: number[][] = Array(n).fill(null).map(() => []);

	for (let i = 0; i < n; i++) {
		const [x, y, r] = bombs[i];
		for (let j = 0; j < n; j++) {
			if (i === j) continue;

			let [a, b] = bombs[j];
			let distanceSquare = (x - a) * (x - a) + (y - b) * (y - b);
			if (distanceSquare <= r * r) {
				bombChain[i].push(j);
			}
		}
	}

	// 깊이 우선 탐색(DFS)을 사용하여 가장 큰 폭발 수를 찾음
	let maxDetonation = 0;
	let visited: boolean[] = Array(n).fill(false);

	function findMaxVisitedDfs(bomb: number): number {
		visited[bomb] = true;
		let count = 1;
		for (let nextBomb of bombChain[bomb]) {
			// 아직 방문하지 않았으면 그 폭탄을 1로 카운트하고
			// '연쇄'되는 폭탄들을 각각 더하여 최종 합을 반환
			if (!visited[nextBomb]) {
				count += findMaxVisitedDfs(nextBomb);
			}
		}

		return count;
	}

	// 각 폭탄을 시작점으로 루트를 탐색할 때마다
	// visited를 전부 false로 초기화하여 DFS 탐색을 
	// 진행하고 최대 폭발 수 업데이트
	for (let i = 0; i < n; i++) {
		visited.fill(false);
		maxDetonation = Math.max(maxDetonation, findMaxVisitedDfs(i));
	}

	return maxDetonation;
}

// BFS를 이용한 풀이
function maximumDetonation4(bombs: number[][]): number {
    const n = bombs.length;
    if (n === 1) return 1;

    // 폭탄 연쇄 정보를 저장할 배열 초기화
    let bombChain: number[][] = Array(n).fill(null).map(() => []);

    // 각 폭탄에 대해 폭발 범위 내의 다른 폭탄들을 찾아서 bombChain에 저장
    for (let i = 0; i < n; i++) {
        const [x, y, r] = bombs[i];
        for (let j = 0; j < n; j++) {
            if (i === j) continue;

            let [a, b] = bombs[j];
            let distanceSquare = (x - a) * (x - a) + (y - b) * (y - b);

            // '다른 폭탄'의 위치[a,b]가 '터지는 폭탄'의 폭발 범위 내면 bombChain에 넣기
            if (distanceSquare <= r * r) {
                bombChain[i].push(j);
            }
        }
    }

    // 너비 우선 탐색(BFS)을 사용하여 가장 큰 폭발 수를 찾음
    let maxDetonation = 0;
    let visited: boolean[] = Array(n).fill(false);

	// bomb을 시작점으로 하여 연쇄 폭발이 일어나는 수를 반환하는 함수
    function bfs(bomb: number): number {
        let queue = [bomb];
        visited[bomb] = true;
        let count = 1;

        while (queue.length > 0) {
            let currentBomb = queue.shift();

            for (let linkedBomb of bombChain[currentBomb]) {
                if (!visited[linkedBomb]) {
                    visited[linkedBomb] = true;
                    queue.push(linkedBomb);
                    count++;
                }
            }
        }

        return count;
    }

	// bombs의 첫 폭탄부터 차례로 시작점으로 삼아 각각의 연쇄 폭발
	// 수를 셈하고 최대 폭발 수를 업데이트. 각 폭탄을 시작점으로
	// 루트를 탐색할 때마다 visited는 전부 false로 초기화해준다.
    for (let i = 0; i < n; i++) {
        visited.fill(false);
        maxDetonation = Math.max(maxDetonation, bfs(i));
    }

    // 가장 큰 폭발 수를 반환
    return maxDetonation;
};

export default {
	solution: maximumDetonation4,
}