/* 211. Design Add and Search Words Data Structure


Medium

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 104 calls will be made to addWord and search.

*/

// => 단어를 추가하고, 추가한 목록에서 단어를 찾을 수 있는 자료구조(클래스)를 만들기.
// 특이사항: 찾을 때 단어에 점(.)이 포함될 수 있으며 이 점은 어떤 문자에도 '매칭된다'고 판단헤야 한다. 

type TrieNode = TrieNode[];
let lowercase = "abcdefghijklmnopqrstuvwxyz";
const charMap = new Map([...lowercase].map((v, i) => [v, i]));
class WordDictionary1 {
	#root: TrieNode;
	#end;

	constructor() {
		this.#root = Array(charMap.size);
		this.#end = new WeakSet<TrieNode>();
	}

	addWord(word: string): void {
		if (word.length > 25) throw new Error("word length should be less than 26 letters");
		if (word.length < 1) throw new Error("word length should be greater than 1 letter");

		let node = this.#root;
		for (let char of word) {
			if (!(charMap.has(char))) throw new Error("word should contains only lowercase English letters");

			node[charMap.get(char)] ??= Array(charMap.size);
			node = node[charMap.get(char)];
		}

		this.#end.add(node);
	}

	// 문자 하나가 '.'이면 ...
	#checkDot(char: string) {

	}
	// 노드를 순회하며 주어진 word의 마지막 노드 혹은 null을 반환한다.
	#search(word: string) {
		let node = this.#root;
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			const nextChar = word[i + 1];
			let next;
			// 현재 문자가 '.'이면 현재 레벨의 모든 노드(a~z)에 대해 분기를 뻗는다. 
			if (char === '.') {
				for (let possibleNode of node) {
					if (possibleNode[charMap.get(nextChar)]) {
						next = possibleNode[charMap.get(nextChar)];
						continue;						
					}
				}
			} else {
				next = node[charMap.get(char)];
			}
			if (!next) return null;

			if (char !== '.') {
				next = node[charMap.get(char)];
				if (!next) return null;
			} else {
				// '.'자리에 올 수 있는 모든 문자를 다 검사한다. 
				for (let possibleNode of node) {
					// 다음 자리에 다음 문자가 저장되어 있으면
					if (possibleNode[charMap.get(nextChar)]) {
						continue;
					}
				}
				return false;
			}
			node = next;
		}

		return node;
	}

	search(word: string): boolean {	
		return this.#end.has(this.#search(word));
	}
}

class WordDictionary2 {
    isWord: boolean;
    child: {[Key: string]: WordDictionary2};
    constructor() {
        this.child = {}; 
        this.isWord = false;
    }

    addWord(word: string): void {
        let curr: WordDictionary2 = this;
        for(const c of word) {
            if(!curr.child[c]) {
                curr.child[c] = new WordDictionary2();
            }
            curr = curr.child[c];
        }
        curr.isWord = true;
    }

    search(word: string, i = 0): boolean {
        let curr: WordDictionary2 = this;
        for(;i < word.length; i++) {
            const c = word[i];
            if(c !== '.') {
                if(!curr.child[c]) { 
                    return false; 
                }
                curr = curr.child[c];
            } else {
                for(const key in curr.child) {
                    if(curr.child[key].search(word, i + 1)){
                        return true;
                    };
                }
                return false;
            }
        }
        return curr.isWord;
    }
}

export default {
	WordDictionary: WordDictionary1,
}

