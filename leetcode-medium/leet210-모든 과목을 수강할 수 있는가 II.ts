/*
 * @lc app=leetcode id=210 lang=typescript
 *
 * [210] Course Schedule II
 *
 * https://leetcode.com/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (49.46%)
 * Total Accepted:    935.3K
 * Total Submissions: 1.9M
 * Testcase Example:  '2\n[[1,0]]'
 *
 * There are a total of numCourses courses you have to take, labeled from 0 to
 * numCourses - 1. You are given an array prerequisites where prerequisites[i]
 * = [ai, bi] indicates that you must take course bi first if you want to take
 * course ai.
 * 
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to
 * first take course 1.
 * 
 * 
 * Return the ordering of courses you should take to finish all courses. If
 * there are many valid answers, return any of them. If it is impossible to
 * finish all courses, return an empty array.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: [0,1]
 * Explanation: There are a total of 2 courses to take. To take course 1 you
 * should have finished course 0. So the correct course order is [0,1].
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [0,2,1,3]
 * Explanation: There are a total of 4 courses to take. To take course 3 you
 * should have finished both courses 1 and 2. Both courses 1 and 2 should be
 * taken after you finished course 0.
 * So one correct course order is [0,1,2,3]. Another correct ordering is
 * [0,2,1,3].
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: numCourses = 1, prerequisites = []
 * Output: [0]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi
 * All the pairs [ai, bi] are distinct.
 * 
 * 
 */

// => 0부터 n-1번 과목을 어떤 순서로 수강해야 하는지를 반환하기
// prerequisite[a,b] 는 a<-b 순서로 과목을 수강해야 함을 의미.
// 여러 순서가 있을 수 있다면 그 중 아무거나, 어떤 순서로도 들을 수 없다면 빈 배열을 반환하기.

// '어떤 순서로도 들을 수 없다' = '방향 그래프를 그렸을 때 일방향 사이클이 존재한다'
// ...그냥 위상 정렬 알고리즘으로 '작업 순서'를 알아내자.

// (성공) Topological Sorting 알고리즘 사용:
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	// 위상 정렬 방법:
	// 1. 노드마다 진입 차수를 계산한다.
	// (진입 차수 = 노드를 향하는 간선 수)
	const entryLevel: number[] = new Array(numCourses).fill(0);
	const relations: { [key: number]: number[] } = {};
	for (let [a, b] of prerequisites) {
		entryLevel[a] += 1;
		if (!relations[b]) relations[b] = [];
		relations[b].push(a);
	}

	// 2. 진입 차수가 0인 노드들을 초기 큐에 넣는다. 
	const queue: number[] = [];
	for (let i = 0; i < numCourses; i++) {
		if (entryLevel[i] === 0)
			queue.push(i);
	}

	// 3. BFS 수행
	const visitOrder: number[] = [];
	while (queue.length) {
		const curCourse: number = queue.shift();
		visitOrder.push(curCourse);
		// 3-1. 노드를 '방문'할 때마다 직계 자식들의 진입 차수를 -1 한다.
		const children: number[] = relations[curCourse] || [];
		for (let childCourse of children) {
			entryLevel[childCourse] -= 1;
			// 3-2. 그 후 자식들 중 새롭게 진입 차수가 0이 된 노드를 또 큐에 넣어서 나중에 '방문'하도록 한다.
			if (entryLevel[childCourse] === 0)
				queue.push(childCourse);
		}
	}
	
	// 4. 방문할 수 있는 모든 노드를 방문했을 때...
	// 4-1. 전체 노드를 방문했다면 방문한 순서를 그대로 담아 반환한다.
	if (visitOrder.length === numCourses)
		return visitOrder; 
	// 4-2. 진입 차수가 1 이상인 노드가 남아있다면 사이클이 있다는 뜻이고 과목을 전부 들을 수 없음을 뜻하므로 빈 배열을 반환한다.
	return [];
};


// (성공) 위의 풀이에서 queue와 visitOrder를 한 배열로 처리할 수 있지 않을까? 
function findOrder2(numCourses: number, prerequisites: number[][]): number[] {
	// 1. 노드마다 진입 차수를 계산한다.
	// (진입 차수 = 노드를 향하는 간선 수)
	const entryLevel: number[] = new Array(numCourses).fill(0);
	const relations: { [key: number]: number[] } = {};
	for (let [a, b] of prerequisites) {
		entryLevel[a] += 1;
		if (!relations[b]) relations[b] = [];
		relations[b].push(a);
	}

	// 2. 진입 차수가 0인 노드들을 초기 큐에 넣는다. 
	const queue: number[] = [];
	for (let i = 0; i < numCourses; i++) {
		if (entryLevel[i] === 0)
			queue.push(i);
	}

	// 3. BFS 수행
	// const visitOrder: number[] = [];
	let pointer: number = 0;
	while (pointer < queue.length) {
		// (변경점): queue에서 빼지 말고 그냥 다음 노드를 가리키도록 포인터를 옮긴다. 
		const curCourse: number = queue[pointer];
		pointer += 1;
		// 3-1. 노드를 '방문'할 때마다 직계 자식들의 진입 차수를 -1 한다.
		const children: number[] = relations[curCourse] || [];
		for (let childCourse of children) {
			entryLevel[childCourse] -= 1;
			// 3-2. 그 후 자식들 중 새롭게 진입 차수가 0이 된 노드를 또 큐에 넣어서 나중에 '방문'하도록 한다.
			if (entryLevel[childCourse] === 0)
				queue.push(childCourse);
		}
	}
	
	// 4. 방문할 수 있는 모든 노드를 방문했을 때...
	// 4-1. 전체 노드를 방문했다면 방문한 순서를 그대로 담아 반환한다.
	if (queue.length === numCourses)
		return queue; 
	// 4-2. 진입 차수가 1 이상인 노드가 남아있다면 사이클이 있다는 뜻이고 과목을 전부 들을 수 없음을 뜻하므로 빈 배열을 반환한다.
	return [];
};


/* (잠깐 생각하다 불가능으로 결론 난 아이디어) 
처음에 relations를 만드는 것도 생략할 수 있지 않을까..?

하지만 그러려면 set으로 '이전에 지나친 노드'를 기억하고 있다가 다음 간선을 마주할 때마다 계산해줘야 한다... set을 따로 만들 요량이면 relations를 아예 만들어버리는 것과 별다를 바가 없을 것이고, "간선을 마주할 때마다 그 때 그 때 계산한다"가 가능할지도 지금 보니 의문스럽군...
그냥 relations로 어떤 노드가 어떤 자식들을 가지고 있는지를 가지고 시작하는 게 깔끔하겠다. 어디서 "시작할지"만 생각해도 relations가 필수임.  
*/


// Typescript를 좀 더 활용한 풀이: 
function findOrder3(numCourses: number, prerequisites: number[][]): number[] {
	let hasCycle = false; // 재귀 탐색 중간에 'true'라는 결과를 낸 경우 밖으로 전달받는 변수

	// 1. 관계 매핑 객체 생성 및 초기화
	const relationMap = new Map<number, number[]>(); // ★
	prerequisites.forEach(([a, b]) => {
		if (relationMap.has(b)) {
			relationMap.get(b).push(a);
		} else {
			relationMap.set(b, [a]);
		}
	});

	// 2. 노드 방문 상태 매핑 객체 생성 및 초기화
	const courseOrder: number[] = [];
	enum courseStatus { // ★
		unVisited = "unVisited",
		visiting = "visiting",
		visited = "visited",
	}
	const cousreStatusMap = new Map<number, courseStatus>();
	for (let i = 0; i < numCourses; i++) {
		cousreStatusMap.set(i, courseStatus.unVisited);
	}

	// 3. 노드를 순회하며 DFS 수행
	for (let i = 0; i < numCourses; i++) {
		if (cousreStatusMap.get(i) === courseStatus.unVisited) {
			dfs(i);
		}
	}

	// 4. 결과 반환
	if (!hasCycle) 
		return courseOrder;
	return [];

	// 3-1. '미방문'인 자식들을 재귀 탐색하다가 사이클을 발견하면 뻗어나가던 모든 루트를 중단하고 true를 반환하는 재귀 함수
	function dfs(course: number) {
		if (hasCycle) // 현재까지 사이클이 발견되었는가?
			return true;
		// 최초의 dfs에 들어와 진행중인 모든 노드는 'visiting'으로 표기될 것.
		cousreStatusMap.set(course, courseStatus.visiting);
		if (relationMap.has(course)) {
			// 진행하는 방향의 자식들이
			// 1. '미방문'인 경우 탐색을 진행하고
			// 2. '방문중(=이★ 경로에서 이미 만난 적 있음)'인 경우는 사이클이 이루어졌다는 의미. 
			// 3. '방문함(=이전 경로를 탐색할 때 이미 확인함)'인 경우 아무것도 하지 않고 지나치기
			for (const nextCourse of relationMap.get(course)) {
				if (cousreStatusMap.get(nextCourse) === courseStatus.unVisited) {
					dfs(nextCourse);
				} else if (cousreStatusMap.get(nextCourse) === courseStatus.visiting) {
					hasCycle = true;
				}
			}
		}
		// 현재 노드의 가능한 자식 경로를 모두 탐색한 후엔 현재 노드를 '방문함'으로 표시 
		cousreStatusMap.set(course, courseStatus.visited);
		courseOrder.unshift(course); // 왜냐면 가장 inner 재귀부터 '완료'되어서 courseOrder에 들어가게 될 것이기 때문에. 
	}
}
/*
=> 왜 '위상 정렬'보다 더 빠르고 안정적이지? 
일단 Recursive DFS이다. 
Union-Find와 비교하면:
	메모리: '위상 레벨' 배열을 하나 덜 만든다. 자식 관계를 매핑하는 relations는 똑같이 만든다. 대신 '노드의 방문 상태'를 매핑하는 새로운 객체를 만들어 사용한다. 큐를 안 만드는 대신 어차피 visitOrder를 담을 배열이 필요하다. 
	런타임: 
일반 (Recursive) DFS와 비교하면:
스택을 안 만든다. 이건 원래 recursive dfs가 그렇지 참. 
원래 무방향 그래프에서는... 그냥 출발 노드를 언젠가 만나기만 하면 사이클로 판정했었잖아, 방향 그래프에서는 출발 노드를 '목표 자식'으로 두고서 언젠가 만나는지 확인했었고. 그리고 그 와중에 활용한 알고리즘은:
	무방향 그래프 1) Recursive DFS
	무방향 그래프 2) Union-Find 알고리즘 - 사이클의 위치 파악 가능
	방향 그래프 1) '목표 자식'을 타깃으로 하고 간선을 순회하는 Recursive DFS - 사이클의 위치 파악 가능
	방향 그래프 2) Topological Sorting - 사이클의 존재 여부만, 방문해야 하는 순서 파악 가능
	new! -> 방향 그래프 3) 노드를 순회하는 Recursive DFS - 사이클의 위치 파악 가능

이 새로운 '노드 순회' 타입이 '간선 순회 & 목표 자식' 타입 recursive dfs보다 빠른 이유는 알겠다: '간선 순회' 타입은 새로운 간선을 첫 시작점으로 삼을 때마다 그래프 전체가 '미방문' 영역이 된다. 그에 반해 '노드 순회' 타입은 전체 탐색에서 한 번만 '방문함' 표시가 되므로 훨씬 경제적인 것이다. 거기다 애초에 전체 노드를 순회하는 것도 아니다. 그 때까지 '미방문' 영역으로 남은 노드만 시작점으로 삼는다. 
	=> 왜냐면 어떤 시작점에서 출발했든, 한 번 '가봤던' 길은 다른 시작점에서 출발해서 만나도 같은 결과를 낳을 '가봤던' 길이기 때문이다. 그러니까 전체 탐색에서 한 번 가봤던 길을 '방문함'으로 표시해두고 다음 시작점에서 탐색할 때 영향을 미치도록 두는 게 괜찮고 훨씬 효율적이다. 

Topological Sorting과 비교하면: 메모리는 확실히 0.7MB 정도 덜 들고, 런타임은 비슷한 것 같다. 
	메모리: 
		- Topological: 진입 차수 배열(N), 관계 매핑 객체(N), 방문 후보와 최종 결과를 담을 배열(N) 
		- 노드 순회 DFS: 관계 매핑 객체(N), 최종 결과를 담는 배열(N), 노드의 방문 상태를 표시하는 객체(N)
		=> 둘이 비슷한데? 오히려 이쪽(DFS)이 진입 차수 배열 대신 방문 상태 객체를 가짐으로써 크기가 더 커졌으면 커졌지...
	런타임: 
		- Topological: 진입 차수 계산과 관계 매핑을 위한 순회(M(간선수)), 큐 초기화(N), BFS 수행(최대 N x 직계자식 평균수)
		- 노드 순회 DFS:  관계 매핑을 위한 간선 순회(M), 노드 방문상태 초기화(N), DFS 수행(for문과 dfs 내의 for문을 통틀어 최대 N)
		=> 오 BFS와 DFS에서 수행하는 최대 횟수가 다르다! 이쪽(DFS)이 더 적다. 

 */


// 위의 풀이3를 리팩토링한 풀이: 
// 위의 '노드 순회 Recursive DFS'는 중간에 결과가 나와도 끝까지 노드를 순회한다(물론 '미방문'노드만). 이걸 중간에 사이클이 발견되면 곧바로 전체 false를 반환하도록 수정하면, 남은 미방문 노드(몇 개 안 남았을지라도) 탐색을 생략할 수 있다.  
function findOrder4(numCourses: number, prerequisites: number[][]): number[] {
	// 1. 관계 매핑 객체 생성
	const relationMap = new Map<number, number[]>();
	for (let [a, b] of prerequisites) {
		if (relationMap.has(b))
			relationMap.get(b).push(a);
		else
			relationMap.set(b, [a]);
	}

	// 2. 노드 방문 상태 매핑 객체 생성 및 초기화
	enum courseStatus {
		unvisited = "unvisited",
		visiting = "visiting",
		visited = "visited",
	}
	const courseStatusMap = new Map<number, courseStatus>();
	for (let i = 0; i < numCourses; i++) {
		courseStatusMap.set(i, courseStatus.unvisited);
	}

	// 3. 노드 방문 DFS 수행
	const visitOrder: number[] = [];
	for (let i = 0; i < numCourses; i++) {
		if (courseStatusMap.get(i) === courseStatus.unvisited) {
			if (hasCycleDfs(i))
				return [];
		}
	}

	// 3-1. 
	function hasCycleDfs(course: number): boolean {
		// 탈출 조건 생략
		courseStatusMap.set(course, courseStatus.visiting);
		const nextCourses: number[] = relationMap.get(course) || [];

		for (let next of nextCourses) {
			// 1) unvisited면
			if (courseStatusMap.get(next) === courseStatus.unvisited) {
				if (hasCycleDfs(next))
					return true;
			// 2) visiting이면
			} else if (courseStatusMap.get(next) === courseStatus.visiting) {
				return true;
			}
			// 3) visited면: x
		}

		courseStatusMap.set(course, courseStatus.visited);
		visitOrder.unshift(course);

		return false;
	}

	// 4. 결과 반환 
	return visitOrder;
}


export default {
	solution: findOrder4,
}