/*
 * @lc app=leetcode id=126 lang=typescript
 *
 * [126] Word Ladder II
 *
 * https://leetcode.com/problems/word-ladder-ii/description/
 *
 * algorithms
 * Hard (27.32%)
 * Total Accepted:    355.4K
 * Total Submissions: 1.3M
 * Testcase Example:  '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]'
 *
 * A transformation sequence from word beginWord to word endWord using a
 * dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... ->
 * sk such that:
 * 
 * 
 * Every adjacent pair of words differs by a single letter.
 * Every si for 1 <= i <= k is in wordList. Note that beginWord does not need
 * to be in wordList.
 * sk == endWord
 * 
 * 
 * Given two words, beginWord and endWord, and a dictionary wordList, return
 * all the shortest transformation sequences from beginWord to endWord, or an
 * empty list if no such sequence exists. Each sequence should be returned as a
 * list of the words [beginWord, s1, s2, ..., sk].
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log","cog"]
 * Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
 * Explanation: There are 2 shortest transformation sequences:
 * "hit" -> "hot" -> "dot" -> "dog" -> "cog"
 * "hit" -> "hot" -> "lot" -> "log" -> "cog"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log"]
 * Output: []
 * Explanation: The endWord "cog" is not in wordList, therefore there is no
 * valid transformation sequence.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= beginWord.length <= 5
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 500
 * wordList[i].length == beginWord.length
 * beginWord, endWord, and wordList[i] consist of lowercase English
 * letters.
 * beginWord != endWord
 * All the words in wordList are unique.
 * The sum of all shortest transformation sequences does not exceed 10^5.
 * 
 * 
 */

// '최단' 경로 전부 찾기는, 일단 정답이 나온 경로와 같은 스텝 수 중에서 또 정답이 나오면 전부 포함하면 된다.

// (시간 초과 실패) BFS와 백트래킹을 사용한 풀이. 로직은 맞는 듯 하다: 
function findLadders1(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const wordSet = new Set<String>(wordList);	
	// endWord가 wordList에 들어있지 않으면 endWord에 도달할 수 없음
	if (!wordSet.has(endWord))
		return [];

	// 관계 매핑 객체 생성
	// const relationMap = new Map<string, Set<string>>();
	const relationMap: { [key: string]: Set<string> } = {};
	for (let keyword of [beginWord, ...wordList]) {
		for (let i = 0; i < keyword.length; i++) {
			for (let j = 0; j < 26; j++) {
				let possibleWord = keyword.slice(0, i) + String.fromCharCode(97 + j) + keyword.slice(i + 1);
				if (keyword !== possibleWord && wordSet.has(possibleWord)) {
					if (!relationMap[keyword]) relationMap[keyword] = new Set();
					if (!relationMap[possibleWord]) relationMap[possibleWord] = new Set();
					relationMap[keyword].add(possibleWord);
					relationMap[possibleWord].add(keyword);
				}
			}
		}
	}
	// console.dir(relationMap)

	// BFS 수행
	const queue: [string, number, string[]][] = [[beginWord, 1, []]]
	const resultSequences: string[][] = [];
	const visited = new Set<string>();
	let leastStep: number | null = null;
	while (queue.length) {
		let [curWord, step, path] = queue.shift();
		// 최초로 발견한 '완결 시퀀스'의 스텝 수보다 탐색 중인 스텝 수가 커지면 탐색을 종료함:
		if (leastStep !== null && leastStep < step)
			break;
		// endWord에 도달한 '완결 시퀀스'를 발견했을 때: 
		if (curWord === endWord) {
			console.log(`시퀀스 하나 완결: ${[...path, curWord]}`);
			resultSequences.push([...path, curWord]); // 1) 완결 시퀀스를 결과 배열에 저장
			leastStep = step; // 		2) 현재 스텝 수를 기록
			// visited.clear(); // 		3) '방문함' set을 초기화 => 할 필요 없음음
			continue;
		}

		if (!visited.has(curWord)) {
			if (relationMap[curWord]) {
				for (let neighbor of relationMap[curWord]) {
					if (!visited.has(neighbor)) {
						visited.add(curWord)
						queue.push([neighbor, step + 1, [...path, curWord]]);
						visited.delete(curWord)
					}
				}
			}
		}
	}

	// 결과 배열 반환
	return resultSequences;
};


// 위의 풀이를 시간이 덜 걸리게 리팩토링: 
function findLadders2(beginWord: string, endWord: string, wordList: string[]): string[][] {
	const wordSet = new Set<String>(wordList);	
	// endWord가 wordList에 들어있지 않으면 endWord에 도달할 수 없음
	if (!wordSet.has(endWord))
		return [];

	// 관계 매핑 객체 생성
	const relationMap: { [key: string]: Set<string> } = {};
	for (let keyword of [beginWord, ...wordList]) {
		for (let i = 0; i < keyword.length; i++) {
			for (let j = 0; j < 26; j++) {
				let possibleWord = keyword.slice(0, i) + String.fromCharCode(97 + j) + keyword.slice(i + 1);
				if (keyword !== possibleWord && wordSet.has(possibleWord)) {
					if (!relationMap[keyword]) relationMap[keyword] = new Set();
					// if (!relationMap[possibleWord]) relationMap[possibleWord] = new Set();
					relationMap[keyword].add(possibleWord);
					// relationMap[possibleWord].add(keyword);
				}
			}
		}
	}
	// console.dir(relationMap)

	// BFS 수행
	const queue: [string, number][] = [[beginWord, 1]];
	const parentMap: { [key: string]: string[] } = {}; // {자식: [부모1, 부모2, ...]}
	let leastStep: number | null = null;

	// const visited = new Set<string>();
	while (queue.length) {
		let [curWord, step] = queue.shift();
		// 최초로 발견한 '완결 시퀀스'의 스텝 수보다 탐색 중인 스텝 수가 커지면 탐색을 종료함:
		if (leastStep !== null && leastStep < step)
			break;
		// endWord에 도달한 '완결 시퀀스'를 발견했을 때: 
		if (curWord === endWord) {
			// console.log(`시퀀스 하나 완결: ${[...path, curWord]}`);
			// resultSequences.push([...path, curWord]); // 1) 완결 시퀀스를 결과 배열에 저장
			leastStep = step; // 		2) 현재 스텝 수를 기록
			// visited.clear(); // 		3) '방문함' set을 초기화 => 할 필요 없음
			continue;
		}

		// if (!visited.has(curWord)) {
			if (relationMap[curWord]) {
				for (let neighbor of relationMap[curWord]) {
					// if (!visited.has(neighbor)) {
					// 	visited.add(curWord)
					// 	queue.push([neighbor, step + 1, [...path, curWord]]);
					// 	visited.delete(curWord)
					// }

					// 이 이웃(neighbor)이 '자식'으로서는 처음 등장한 경우거나, '자식'으로 등록은 됐는데 부모 중 curWord가 이미 들어 있는 경우: neighbor-curWord는 유효한 자식-부모 관계이므로 탐색을 진행함
					if (!parentMap[neighbor] || parentMap[neighbor].includes(curWord)) {
						// 큐에 이 이웃과 스텝+1을 넣음
						queue.push([neighbor, step + 1]);
						// parentMap에 이 이웃과 curWord를 '자식-부모' 관계로 등록 
						if (!parentMap[neighbor])
							parentMap[neighbor] = [];
						parentMap[neighbor].push(curWord);
					}
				}
			}
		// }
	}

	// 끝 자식부터 출발해 첫 부모 beginWord까지 역으로 거슬러 올라가며 경로를 기록하는 함수. 유효한(=parentMap에 있는) 부모 전체에 대해 가능한 경로를 전부 생성해서 외부 변수 resultSequences에 넣음.
	const resultSequences: string[][] = [];
	function buildPath(word: string, path: string[]) {
		// Base case: 자식
		if (word === beginWord) {
			resultSequences.push([beginWord, ...path]);
			return;
		}
		for (let parent of parentMap[word]) {
			buildPath(parent, [word, ...path]);
		}
	}
	buildPath(endWord, []);

	// 결과 배열 반환
	return resultSequences;
};


export default {
	solution: findLadders2,
}
