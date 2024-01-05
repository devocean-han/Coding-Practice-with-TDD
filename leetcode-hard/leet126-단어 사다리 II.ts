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


// (샘플 케이스에서 실패)위의 풀이를 시간이 덜 걸리게 리팩토링: 
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


// (성공) 단계별로 가능한 모든 단어를 저장하고, 나중에 끝 단어부터 루트를 꿰어 맞춰 반환하는 풀이: 
function findLadders3(beginWord: string, endWord: string, wordList: string[]): string[][] {
	let wordSet = new Set(wordList);
	// endWord가 wordList에 들어있지 않으면 endWord에 도달할 수 없음
	if (!wordSet.has(endWord))
		return [];

	// 두 단어 word1과 word2를 받아 서로 한 글자만 다르면 '연결된 노드'로 판단하고 true를 반환하는 함수
	function connected(word1: string, word2: string): boolean {
		let differentChars = 0;
		for (let i = 0; i < word1.length && differentChars < 2; i++) {
			if (word1[i] !== word2[i])
				differentChars++;
		}
		return differentChars === 1;
	}

	// 초기화: 큐에 단어들이 묶음별로 취급되고 소비되는 것이 핵심
	wordSet.delete(beginWord)
	let queue: string[] = [beginWord]; // '한 글자가 다른' 이웃 단어를 발견할 때마다 저장하고, 각 이웃의 이웃들을 탐색할 때마다 하나씩 뺄 단어 저장 공간
	let validWordsPerLevel = []; // 진행할 수 있는 레벨 별 단어 묶음. [[0레벨의 단어들], [1레벨의 단어들], ... ,]
	let reached = false; // 탐색중 목표 단어를 만났는지 여부

	// BFS: 같은 진행 단계(level)의 모든 진행할 수 있는 단어를 순회하며 진행 할 수 있는 이웃 단어를 전부 찾아 queue에 한 묶음으로 넣음. 
	// Time complexity: 단계(레벨) 수 * 각 단계별 유효 단어 수 * 전체 단어 중 미방문 단어 수 = O(N*3)..?
	while (queue.length && !reached) {
		validWordsPerLevel.push([...queue]); // 현 시점 queue: 이 전 단계에서 쌓인 '진행 가능한' 모든 이웃 단어 목록
		/*
		Q: [hit\   hot\  dot\  lot\  dog\  log] 
		L: [[hit], [hot], [dot,lot], [dog,log]]
		qlen: 1		1		2			2
		from: hit   hot   dot  lot	 dog
		*/
		let qlen = queue.length; // 현재 큐 길이를 고정하여 순회
		for (let i = 0; i < qlen && !reached; i++) {
			let from = queue.shift(); 
			for (let to of wordSet) {
				// 두 단어가 연결된 노드가 아니면 다음 단어 탐색
				if (!connected(from, to))
					continue;
				// 지금 단어가 목표 단어라면 탐색 중단
				if (to === endWord) {
					reached = true;
					break;
				}
				// 두 단어가 연결된 노드일 때만
				// - 지금 노드에 연결된 또 다른 노드를 살피러 큐에 넣고
				// - 이후의 다른 노드들이 검사할 '연결될 수 있는 대상' 후보에서 뺌 (중복 방문 방지)
				queue.push(to);
				wordSet.delete(to);
				// => 다른 레벨에서 같은 단어를 이웃으로 가질 수도 있는데 이렇게 '어떤 단어의 이웃임을 발견하자마자' '미방문' 목록에서 삭제할 수 있는 이유는, 어차피 '가장 짧은 길'을 찾는 문제라 그러함. 이렇게 하면 '돌고 돌아 나중에 다시 만날 수도 있는' 루트는 아예 폐쇄하게 됨. 
			}
		}
	}
	/*
		Q: [hit\   hot\  dot\  lot\  dog\  log] 
		L: [[hit], [hot], [dot,lot], [dog,log]]
		qlen: 1		1		2			2
		from: hit   hot   dot  lot	 dog

		ans: [[cog]\ [dog,cog]\,[log,cog]\,  [dot,dog,cog]\,[lot,log,cog]\]
				[hot,dot,dog,cog]\,[hot,lot,log,cog]\,
				[hit,hot,dot,dog,cog], [hit,hot,lot,log,cog]]
		len:  1			2
		P:    [cog]  [dog,cog]  [log,cog]
		lWord: cog		dog			log
	*/
	if (!reached) return [];

	// 마지막 단어부터 가능한 단어를 거꾸로 추가해 나가며 정답 루트 목록을 완성함
	let ans = [[endWord]];
	for (let level = validWordsPerLevel.length - 1; level >= 0; level--) {
		let len = ans.length; // 현재의 ans의 길이를 고정하여 순회
		for (let i = 0; i < len; i++) { //^ 여기서 그냥 ans.length로 지정하는 것과 결과가 다르다
			let currentPath = ans.shift();
			let lastWord = currentPath[0];
			for (let word of validWordsPerLevel[level]) {
				if (!connected(lastWord, word))
					continue;
				ans.push([word, ...currentPath]);
			}
		}
	}

	return ans;
}

// 또다른 해답: Typescript 문법을 좀 더 이용하는
function findLadders4(beginWord: string, endWord: string, wordList: string[]): string[][] {
	interface NodeInterface {
		name: string;
		path: NodeInterface[];
	}

	const encodeHash = new Map<string, Set<string>>();
	const wordsTemplates: { [key: string]: string[] } = {};
	const tree: { [key: string]: Set<string> } = {};
	let resultNodes: NodeInterface | null = null;

	for (const word of [beginWord, ...wordList]) {
		wordsTemplates[word] = [];
		for (let i = 0; i < word.length; i++) {
			const encode = word.slice(0, i) + '*' + word.slice(i + 1);

			// Avoid jump from end word to itself
			if (word !== endWord) {
				wordsTemplates[word].push(encode);
			}
			if (encodeHash.has(encode)) {
				const set = encodeHash.get(encode);
				set?.add(word);
			} else {
				const set = new Set<string>();
				set.add(word);
				encodeHash.set(encode, set);
			}
		}
	}

	for (const key in wordsTemplates) {
		for (const template of wordsTemplates[key]) {
			const items = encodeHash.get(template);

			if (!tree[key]) {
				tree[key] = new Set();
			}
			for (const item of items ?? []) {
				tree[key].add(item);
			}
		}
		tree[key]?.delete(key);
	}
	tree[endWord] = new Set();

	let queue: NodeInterface[] = [{ name: beginWord, path: [] }];
	const newQueue = new Map<string, NodeInterface>();
	let excludedNodes = new Set<string>();

	while (queue.length) {

		for (const nodeFromQueue of queue) {

			for (const word of tree[nodeFromQueue.name]) {
				if (excludedNodes.has(word)) {
					continue;
				}

				const futureNode = newQueue.get(word);
				if (futureNode) {
					futureNode.path.push(nodeFromQueue);
				} else {
					newQueue.set(word, { name: word, path: [nodeFromQueue] });
				}
			}

			excludedNodes.add(nodeFromQueue.name);
		}

		const endNode = newQueue.get(endWord);
		if (endNode) {
			if (resultNodes) {
				endNode.path.forEach(e => (resultNodes?.path?.push(e)));
			} else {
				resultNodes = endNode;
			}
			break;
		}

		queue = Array.from(newQueue.values()).filter(e => !excludedNodes.has(e.name));
		newQueue.clear();
	}

	const dfs = (root: NodeInterface): string[][] => {
		let result: string[][] = [];

		if (root.path.length === 0) {
			return [[root.name]];
		}

		for (const node of root.path) {
			dfs(node).forEach(e => (result.push([...e, root.name])));
		}

		return result;
	};

	return resultNodes ? dfs(resultNodes) : [];
}
		
/*
	^해답 1,2,3에서 관계를 매핑하는 방법의 차이: 
	방법1: wordList에 존재하는 모든 두 단어 쌍을 검사하여(N^2) 매핑 객체로 만듬
	방법2: wordList 각각의 단어들로 만들 수 있는 모든 '한 문자 변경 단어'들이 wordList에 존재하는지를 검사(N)하여 매핑 객체로 만듬
	방법3: 대상 노드를 정해두고 wordList의 미방문 단어들을 하나씩 대어보며 검사 
 */
export default {
	solution: findLadders4,
}
