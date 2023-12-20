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

export default {
	solution: findOrder2,
}