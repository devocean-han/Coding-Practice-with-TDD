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
	// describe('Error case 19: "qa"->"sq", wordList=["si","go","se", ...]', () => {
	// 	let beginWord: string = "qa";
	// 	let endWord: string = "sq";
	// 	let wordList: string[] = ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"];
	// 	it(`should return 3 transformation sequences:\n\t"red" -> "ted" -> "tad" -> "tax"\n\t"red" -> "ted" -> "tex" -> "tax"\n\t"red" -> "rex" -> "tex" -> "tax"`, () => {
	// 		expect(solution(beginWord, endWord, wordList)).toEqual([["red","ted","tad","tax"],["red","ted","tex","tax"],["red","rex","tex","tax"]]);
	// 	});
	// });
});