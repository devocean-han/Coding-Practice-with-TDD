/*
 * @lc app=leetcode id=127 lang=typescript
 *
 * [127] Word Ladder
 *
 * https://leetcode.com/problems/word-ladder/description/
 *
 * algorithms
 * Hard (38.39%)
 * Total Accepted:    996.2K
 * Total Submissions: 2.6M
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
 * the number of words in the shortest transformation sequence from beginWord
 * to endWord, or 0 if no such sequence exists.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log","cog"]
 * Output: 5
 * Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot"
 * -> "dog" -> cog", which is 5 words long.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log"]
 * Output: 0
 * Explanation: The endWord "cog" is not in wordList, therefore there is no
 * valid transformation sequence.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= beginWord.length <= 10
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 5000
 * wordList[i].length == beginWord.length
 * beginWord, endWord, and wordList[i] consist of lowercase English
 * letters.
 * beginWord != endWord
 * All the words in wordList are unique.
 * 
 * 
 */

// => 주어진 beginWord에서 시작해 한 글자씩만 바꿔서 endWord가 되도록 만들 때, 거치는 총 단어 수를 반환하기. beginWord를 빼고 모든 단어는 주어진 wordlist에 들어있는 단어들이어야 함.

/* 세부 조건:
1. 시작 단어와 끝 단어는 당연히 길이가 같게 주어진다.
2. 시작 단어는 1~10자의 영문 소문자 단어로 주어진다.
3. wordList는 1~5000개의 전부 다른 단어가 들어있다. => 시작 단어 빼고 '중간 단어' 전부와 끝 단어가 들어있어야 하니까, 최소 1개는 있어야 끝 단어로 가능한지 비교라도 해 볼 수 있으므로 당연한 조건임.
4. wordList 안의 단어는 다 시작 단어와 같은 길이이다. => wordList의 단어 중 뭐든지 '중간 단어'가 될 수 있음.
5. 시작 단어와 끝 단어는 다르다. => 최소 1번의 변화를 거쳐 끝 단어에 도달하든지, 아예 도달할 수 없든지. 
*/

// 예를 들어 endWord가 wordList에 없으면 0을 반환해야 한다.
// endWord에 도달할 수 있는지를 검사하는 동시에, 어떤 길을 거쳐야 도달할 수 있는지도 기록해야 함.
// 시작 지점도 정해지지 않았으므로 모든 단어를 시작지점으로 삼아 가능성을 검토해야 함.

// 목표 노드: endWord
// 탐색 가능 간선: a->b 노드 사이의 차가 문자 하나일 때
// 방향? 무방향? : 무방향. 선후관계가 정해지지 않았으니까.
// 탐색을 했다가 그 전 단계로 가는 길이 다시 더 빠른 길이 될 수: 없다. 없으므로 탐색을 했다면 '방문함' 표시를 하도록 하자.
// 어떤 방향이 더 빠른 길이 될 지 알 수 없으므로: 백트래킹
// 근데 같은 단어에 이르는 여러 '단계'가 있을 수 있잖아? : 그래도 더 빨리 등장하는 순서에 '방문함' 표시를 받았을 것이므로 이후에 더 늦은 단계에서 재등장하는 '방문한' 단어는 다시 고려할 필요 없다. 
// 즉, 그냥 마주치는 '미방문' 순서대로 '방문함' 표시를 하고 다니면 된다: 아, 이렇게 하려면 꼭 DFS여야 함. (맞나?)

/* 필요 자료구조: 
관계 매핑 객체


이 노드가 목표 노드이면 카운트 +1 하고 true를 반환
최종적으로 카운트를 반환
 <- 더 '빨리' 목표 노드를 찾은 루트가 true를 반환하고 끝낼 것이므로, 그냥 편안하게 기록된 카운트를 반환하면 된다. 

이 노드가 목표 노드가 아니면 이웃 노드를 탐색
줘야할 매개 변수는 '현재(이웃) 노드', '목표 노드', '카운트', '이 루트에서의 방문함 set(?)',
=> 이 루트에서 방문함을 따로 표시할 것인가, 전체 과정에서 방문함으로 표시해도 되는가... 일단 그냥 루트마다 방문함set을 초기화해주자. 

*/

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
	if (wordList.length === 1) {
		if (wordList[0] === endWord) return 2;
		else return 0;
	}

	// 모든 이웃 관계 매핑 객체 생성: 
	const relationMap = new Map<string, Set<string>>();
	for (let keyWord of wordList) {
		// 한 글자만 바꾼다...
		for (let possibleWord of wordList) {
			if (keyWord.split('').filter((char, i) => char !== possibleWord[i]).length === 1) {
				if (!relationMap.has(keyWord)) relationMap.set(keyWord, new Set());
				if (!relationMap.has(possibleWord)) relationMap.set(possibleWord, new Set());
				relationMap.get(keyWord).add(possibleWord);
				relationMap.get(possibleWord).add(keyWord);
			}
		}
	}
	console.dir(relationMap);

	// 목표 노드에 도달할 수 있는지 탐색
	// 스택 초기화: beginWord와 한 끗 차이인 단어들
	const stack: [string, number][] = [];
	for (let word of wordList) {
		if (word.split('').filter((char, i) => char !== beginWord[i]).length === 1) {
			stack.push([word, 2]);
		}
	}
	console.log('initial stack: ', stack);
	const visited = new Set();
	while (stack.length) {
		let [curWord, step] = stack.pop();
		if (curWord === endWord) {
			// console.dir(visited);
			return step;
		}
		if (!visited.has(curWord)) {
			visited.add(curWord);
			for (let neighbor of relationMap.get(curWord)) {
				console.log(`cur word: ${curWord}, step: ${step}, current target: ${neighbor}`);
				console.dir(visited);
				if (!visited.has(neighbor))
					stack.push([neighbor, step++]);
			}
			// => step += 1을 했을 땐 for 루프마다 +1이 돼서 이상해짐.
			// => step++를 했을 땐 stack에 담길 때만 +1이 되고 for루프가 돌아갈 땐 되지를 않아서 의도한 대로 결과가 나옴. 
			// 무슨 차이인 거지..? 
		}
	}
	
	return 0;
};

export default {
	solution: ladderLength,
}
