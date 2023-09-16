import source from './leet211-단어 추가와 검색이 용이한 자료구조 구현하기';
const { WordDictionary } = source;

describe('Design Add and Search Words Data Structure', () => {
	describe('Class initiailization check', () => {
		let wordDict: any;

		it(`should exist when "new WordDictionary()" is initialized.`, () => {
			wordDict = new WordDictionary();
			expect(wordDict).toBeDefined();
		});
	});

	describe('Method check: ADDWORD', () => {
		let wordDict: any;
		beforeEach(() => {
			wordDict = new WordDictionary();
			jest.spyOn(wordDict, "addWord");
		});

		it(`should have been called with the word "note"`, () => {
			wordDict.addWord("note");
			expect(wordDict.addWord).toBeCalledWith("note");
			expect(wordDict.addWord).toReturn();
			expect(wordDict.addWord).toReturnWith(undefined);
		});

		it(`should have been called with the word "abcdefghijklmnopqrstuvwxy"`, () => {
			wordDict.addWord("abcdefghijklmnopqrstuvwxy");
			expect(wordDict.addWord).toBeCalledWith("abcdefghijklmnopqrstuvwxy");
			expect(wordDict.addWord).toReturn();
			expect(wordDict.addWord).toReturnWith(undefined);
		});

		// // must check if 'word' in addWord contians letters not lowercase or length greater than 25 or less than 1? 
		// it(`should throw Error when word longer than 25 letters is given`, () => {
		// 	wordDict.addWord("abcdefghijklmnopqrstuvwxyz"); // 26 letters
		// 	expect(wordDict.addWord).toThrowError("word length should be less than 26 letters");
		// });
		// it(`should throw Error when word less than 1 letter is given`, () => {
		// 	wordDict.addWord(""); 
		// 	expect(wordDict.addWord).toThrowError("word length should be greater than 1 letter");
		// });
		// it(`should throw Error when word contains letter other than lowercase English letters`, () => {
		// 	wordDict.addWord("NOTE"); 
		// 	expect(wordDict.addWord).toThrowError("word should contains only lowercase English letters");
		// });
		
	});

	describe('Method check: SEARCH', () => {
		let wordDict: any;
		beforeEach(() => {
			wordDict = new WordDictionary();
			jest.spyOn(wordDict, "search");
		});
		
		it(`should return true after inserting and calling with the word "note"`, () => {
			wordDict.addWord("note");
			wordDict.search("note")
			expect(wordDict.search).toBeCalledWith("note");
			expect(wordDict.search).toReturnWith(true);
		});
		
		it(`should return false after inserting "note" but calling with the word "node"`, () => {
			wordDict.addWord("note");
			wordDict.search("node")
			expect(wordDict.search).toBeCalledWith("node");
			expect(wordDict.search).toReturnWith(false);
		});
		
		it(`should return true after inserting "note" and calling with the word "no.e"`, () => {
			wordDict.addWord("note");
			wordDict.search("no.e")
			expect(wordDict.search).toBeCalledWith("no.e");
			expect(wordDict.search).toReturnWith(true);
		});
	});
});