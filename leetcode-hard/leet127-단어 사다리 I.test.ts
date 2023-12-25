import source from './leet127-단어 사다리 I';
const { solution } = source;

describe('Word Ladder I', () => {
	// describe('Simple case: wordList has one word', () => {
	// 	const wordList: string[] = ['a']
	// 	let beginWord: string;
	// 	let endWord: string;
	// 	it(`should return 2 when wordList[0] === endWord`, () => {
	// 		beginWord = 'z';
	// 		endWord = 'a'
	// 		expect(solution(beginWord, endWord, wordList)).toBe(2);
	// 	})
	// 	it(`should return 0 when wordList[0] !== endWord`, () => {
	// 		beginWord = 'z';
	// 		endWord = 'b'
	// 		expect(solution(beginWord, endWord, wordList)).toBe(0);
	// 	});
	// });

	describe('Example 1: "hit"->"cog", wordList=["hot","dot","dog","lot","log","cog"]', () => {
		const wordList: string[] = ["hot","dot","dog","lot","log","cog"];
		const beginWord: string = "hit";
		const endWord: string = "cog";
		it(`should return 5 as one shortest transformation sequence is: "hit" -> "hot" -> "dot" -> "dog" -> cog"`, () => {
			expect(solution(beginWord, endWord, wordList)).toBe(5);
		});
	});
	// describe('Example 2: "hit"->"cog", wordList=["hot","dot","dog","lot","log"]', () => {
	// 	const wordList: string[] = ["hot","dot","dog","lot","log"];
	// 	const beginWord: string = "hit";
	// 	const endWord: string = "cog";
	// 	it(`should return 0 as there is no 'endWord' in 'wordList'`, () => {
	// 		expect(solution(beginWord, endWord, wordList)).toBe(0);
	// 	});
	// });
});