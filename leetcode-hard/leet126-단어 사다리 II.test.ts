import source from './leet126-단어 사다리 II';
const { solution } = source;

describe('Word Ladder II', () => {
	describe('Example 1: "hit"->"cog", wordList=["hot","dot","dog","lot","log","cog"]', () => {
		let beginWord: string = "hit";
		let endWord: string = "cog";
		let wordList: string[] = ["hot","dot","dog","lot","log","cog"];
		it(`should return 2 transformation sequences:\n\t"hit" -> "hot" -> "dot" -> "dog" -> "cog"\n\t"hit" -> "hot" -> "lot" -> "log" -> "cog"`, () => {
			expect(solution(beginWord, endWord, wordList)).toEqual([["hit", "hot", "dot", "dog", "cog"], ["hit", "hot", "lot", "log", "cog"]]);
		});
	});
	describe('Example 2: "hit"->"cog", wordList=["hot","dot","dog","lot","log"]', () => {
		let beginWord: string = "hit";
		let endWord: string = "cog";
		let wordList: string[] = ["hot","dot","dog","lot","log"];
		it(`should return 0 transformation sequence because the endWord is not in wordList`, () => {
			expect(solution(beginWord, endWord, wordList)).toEqual([]);
		});
	});

	describe('Error case 26: "red"->"tax", wordList=["ted","tex","red","tax","tad","den","rex","pee"]', () => {
		let beginWord: string = "red";
		let endWord: string = "tax";
		let wordList: string[] = ["ted","tex","red","tax","tad","den","rex","pee"];
		it(`should return 3 transformation sequences:\n\t"red" -> "ted" -> "tad" -> "tax"\n\t"red" -> "ted" -> "tex" -> "tax"\n\t"red" -> "rex" -> "tex" -> "tax"`, () => {
			expect(solution(beginWord, endWord, wordList)).toEqual([["red","ted","tad","tax"],["red","ted","tex","tax"],["red","rex","tex","tax"]]);
		});
	});
});