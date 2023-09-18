/* 211. Design Add and Search Words Data Structure
https://leetcode.com/problems/design-add-and-search-words-data-structure/description/

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

// (실패) 와이들카드(.)가 포함된 단어를 검색하려면 필히 search 메소드를 재귀귀함수로 만들어야 하는데 이 클래스는 그렇게 구현하지 않아 중간에 막혔다. 
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
			// if (char === '.') {
			// 	for (let possibleNode of node) {
			// 		if (possibleNode[charMap.get(nextChar)]) {
			// 			next = possibleNode[charMap.get(nextChar)];
			// 			continue;						
			// 		}
			// 	}
			// } else {
			// 	next = node[charMap.get(char)];
			// }
			// if (!next) return null;

			if (char !== '.') {
				next = node[charMap.get(char)];
				if (!next) return null;
			} else {
				// '.'자리에 올 수 있는 모든 문자를 다 검사한다. 
				for (let possibleNode of node) {
					// // 다음 자리에 다음 문자가 저장되어 있으면
					// if (possibleNode[charMap.get(nextChar)]) {
					// 	this.#search(possibleNode[charMap.get(nextChar)]
					// 	continue;
					// }
					// => this 노드부터 검색하게 할 방법이 현재로썬 없기 때문에 잰귀 호출 전개가 불가능하다. 
				}
				return null;
			}
			node = next;
		}

		return node;
	}

	search(word: string): boolean {	
		return this.#end.has(this.#search(word));
	}
}


// (성공)
// 클래스 자체가 자료구조가 되게 만든다. 자료구조는 객체이다. = child라는 이름으로 자가 복제 속성을 갖도로 ㄱ한다. -> 타입을 어떻게 지정하는가도 눈여겨 볼 포인트. 왜 객체를 자료구조로 갖는 게 편하냐면 나중에 '.'을 검색할 때 다음다음 노드로 해당 문자가 '있는가'를 한 방에 검색하는 데 편리하므로.
//^ (속성)child: 먼저 빈 객체로 설정. 자가복제 자료구조라는 것은 제일 처음 타입 지정할 때 명시되고, 실제 적용은 addWord 메소드에서 부여되며, 실제 사용은 search 메소드에서 재귀호출 형식으로 활용된다. 
//^ (속성)isWord: 어떤 노드가 기록된 적 있는 단어의 끝 문자인지 기록
//^ (메소드)addWord:
	/*
	 * 1. curr 포인터가 현재 노드(자기 자신)를 가리키도록 설정한다. 
	 * 2. word의 문자만큼 순회하며
	 * 		3. 자식 노드 중 현재 문자가 없으면 새롭게 자신 클래스를 만들어 그 자리에 저장한다.
	 * 		4. 현재 포인터를 새롭게 만든(아니면 원래 존재했던) 현재 문자에 해당하는 자식 노드로 옮긴다. 
	 * 5. 현재 포인터에게 isWord 속성을 true로 저장시켜준다.  
	 */
//^ (메소드)search:
	/*
	 * 1. curr 포인터가 현재 노드(자기자신)를 가리키도록 설정한다. 
	 * 2. word의 문자만큼 순회하며
	 * 		3. 현재 문자가 .가 아니면 -> 현재 '가능성(child)'노드 중 c인 애가 있나 검사해서 없으면 바로 false를 반환하고 있으면 그 노드를 curr 포인터가 가리키도록 만든다. (있으면/없으면 의 순서가 바뀌어도 상관없겠다)
	 * 		4. 현재 문자가 .면 
	 * 			5. 현재 '가능성' 노드를 모두 순회하며 노드 하나하나마다
	 * 				6. word의 현재 문자~마지막 문자까지 검색하는 자기 자신(search)메소드를 재귀호출한다.
	 * 				7. 그래서 결과가 참이면(=현재 문자가 .이 아니고 노드로 존재하면 그 노드로 현재 포인터를 옮기고, 노드로 존재하지 않으면 곧바로 false를 반환하며, 현재 문자가 .이면 다시 재귀호출을 반복하는 = 현재 문자가 기록 노드에 존재하지 않으면 곧바로 false를 반환하는) 현재 if도 true로 반환시키고,
	 * 			8. '가능성' 노드를 모두 순회할 때까지 true가 나오지 않는다면 모든 가능한 문자에 대해 그 다음 문자가 맞는 게 없었다는 의미로 false를 반환한다. 
	 * 9. 마지막으로 현재 노드(포인터)의 isWord를 반환시키면 된다? 왜냐면 2번의 큰 for문을 빠져나온 상황은 word의 끝까지 확인했다는 의민데 지금 시점에서 '단어로서 완결된 저장기록'을 나타내는 isWord가 거짓일 수도 있으니까. 즉, 'note'를 찾고 있는데 저장된 건 'notebook'이었을 때, note까지는 전부 매칭된다고 나올 것이므로 단순히 'note'끝까지 false가 반환되지 않고 무사히 순회가 끝나서 나왔다고 'note'가 있었다는 의미의 true를 반환할 수는 없는 것이다. 
	   	9-1. 보충: 다른 클래스에서는 같은 역할을 #end라는 Set에 각 단어의 마지막 노드를 추가시키는 형태로 '끝맺은 단어'인지 아닌지를 나타냈었다. 
	 */
//^ (참고) search 재귀호출이 가능한 이유: 
/*
	1) this 클래스가 자기 자신을 중첩으로 가지는 구조가 되도록 만드렁서
	2) search메소드에서 '현재 포인터'를 root부터 시작하도록 하지 않고 '현재 노드(=this)'부터 가리켜서 검색을 시작하게 만들어서. 
	3) 또한 '현재 문자'부터 순회하게 만들 수 있는 인덱스 정보를 인자로 하나 더 주고 재귀호출하게 만들었다.  
	4) 자료구조를 객체로 삼아서 '전체 자식 중에 다음 문자에 매칭되는 게 있나 없나'를 살피는 코드가 많이 줄어들었다. 
*/
class Trie2 {
    isWord: boolean;
    child: {[Key: string]: Trie2};
    constructor() {
        this.child = {}; 
        this.isWord = false;
    }

	
    addWord(word: string): void {
        let curr: Trie2 = this;
        for(const c of word) {
            if(!curr.child[c]) {
                curr.child[c] = new Trie2();
            }
            curr = curr.child[c];
        }
        curr.isWord = true;
    }

    search(word: string, i = 0): boolean {
        let curr: Trie2 = this;
        for(;i < word.length; i++) {
			const c = word[i];
			// '.' 문자가 아니라면 현재 문자에 매칭되는 노드로 curr 포인터를 옮긴다. 
            if(c !== '.') {
				if(!curr.child[c]) { 
					return false; 
                }
				curr = curr.child[c];
			// '.'문자라면 만약 그 다음 문자에 매칭되는 기록이 존재함을 발견하면 곧바로 전체 true를 리턴한다? 가능한 이유는 재귀함수를 호출하기 때문.	
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

// Trie2를 보고 뽑은 레시대로 스스로 작성해본 버전: 
class Trie3 {
	#child: { [key: string]: Trie3 };
	#isWord: boolean;
	constructor() {
		this.#child = {};
		this.#isWord = false;
	}

	addWord(word: string): void {
		let curr: Trie3 = this;
		for (let char of word) {
			curr = curr.#child[char] ??= new Trie3();
			// if (!curr.#child[char]) {
			// 	curr.#child[char] = new Trie3();
			// }
			// curr = curr.#child[char];
		}
		curr.#isWord = true;
	}

	search(word: string): boolean {
		let curr: Trie3 = this;
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			if (char !== '.') {
				if (!curr.#child[char]) return false;
				curr = curr.#child[char];
			} else {
				for (let key in curr.#child) {
					if (curr.#child[key].search(word.slice(i + 1))) return true;
				}
				return false;
			}
		}

		return curr.#isWord;
	}
} 
export default {
	WordDictionary: Trie3,
}

