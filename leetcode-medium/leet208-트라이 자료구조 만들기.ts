/*
https://leetcode.com/problems/implement-trie-prefix-tree/description/

Medium

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.

*/

export class Trie {
	words: string[]
	constructor() {
		this.words = [];
    }

	insert(word: string): void {
		this.words.push(word);
	}

	// 정확한 매칭
	search(word: string): boolean {
		return this.words.includes(word);
	}

	// 앞의 일부분만 매칭되면 ok
	startsWith(prefix: string): boolean {

		for (let word of this.words) {
			if (word.startsWith(prefix)) return true;
		}

		return false;
	}
}

export class Trie2 {
	words: string[]
	constructor() {
		this.words = [];
	}

	insert(word: string): void {
		this.words.push(word);
	}

	// 정확한 매칭 - 직접 구현
	search(word: string): boolean {
		for (let w of this.words) {
			if (word === w) return true;
		}

		return false;
	}

	// 앞의 일부분이 매칭되면 true 반환 - 직접 구현
	startsWith(prefix: string): boolean {
		for (let w of this.words) {
			if (w.slice(0, prefix.length) === prefix) return true;
		}

		return false;
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// 다른 해답:
const dict = "abcdefghijklmnopqrstuvwxyz";
const charMap = new Map([...dict].map((v, i) => [v, i]));
// => 'charCodeAt()' 대체용 map
// charMap = { a: 0, b: 1, ..., y: 24, z: 25}

// recursive array type(?)
type TrieNode = TrieNode[];
//~ 예시:
const trie: TrieNode = [
    [
        [
            [],
            [],
            []
        ],
        [],
        []
    ],
    [
        [],
        []
    ],
    []
]; 

class Trie3 {
	#root: TrieNode[] = Array(dict.length); // 26개 길이의 빈 배열
	#ends = new WeakSet<TrieNode>();

	insert(word: string): void {
		let node: TrieNode[] = this.#root; 

		// "coffee"를 인수로 받았다면 'c','o'...의 각 문자에 대하여
		for (const char of word) {
			// 해당하는 영문자 번호에 해당하는 위치로 찾아간다. 
			// 
			// 다음 노드로 이동하고 필요하다면 새로 만든다. 
			node = node[charMap.get(char)!] ??= Array(dict.length);
		}

		this.#ends.add(node);
	}

	// 노드를 순회하며 주어진 word의 마지막 노드 혹은 null을 반환한다.
	#search(word: string): TrieNode | null {
		let node = this.#root;

		for (const char of word) {
			const next = node[charMap.get(char) ?? -1];
			if (!next) return null;
			node = next;
		}

		return node;
	}

	search(word: string): boolean {
		return this.#ends.has(this.#search(word) ?? []);
	}

	startsWith(prefix: string): boolean {
		return this.#search(prefix) !== null;
	}
}


//? new WeakSet이란?
	//^ Set()과 사용법이 비슷한데 참조를 가지고 있는 객체만 저장이 가능한 자료구조. 객체가 아닌 값(숫자, 불 값, 문자, null, undefined)을 넣으려하면 에러를 되돌린다. 
	//^ WeakSet에 저장된 객체에 대한 참조가 없으면 해당 객체는 가비지 컬렉터에 의해 제거된다. 따라서 객체를 일시적으로 저장하고 나중에 더 이상 필요하지 않을 때 자동으로 제거하려는 경우에 유용하다.
	/*
	const weakArray = new WeakSet();
 
	weakArray.add([1, 2, 3]); // [1, 2, 3]
	weakArray.add(function() {}); // function(){}
	weakArray.add({name: "Kim", age: 33}); // {name: "Kim", age: 33}
	
	weakArray.add(12345); // Uncaught TypeError: Invalid value used in weak set
	weakArray.add(null); // Uncaught TypeError: Invalid value used in weak set
	weakArray.add("가나다"); // Uncaught TypeError: Invalid value used in weak set
	*/
	
//? TrieNode를 선언한 적이 없는데 왜 사용 가능한가
	//~ "Recursive array type" 방식으로 선언이 가능하기 때문에. 

//? ?? 연산자: 널 병합 연산자
//? ??= 연산자: 널 병합 할당 연산자
	//~ node = node[charMap.get(char)!] ??= Array(dict.length);
	//~ node[2] = node[2] ?? Array(dict.length)
	// => node[2]값이 있다면 그대로 두고, 없다면 새롭게 26칸짜리 빈 배열을 만들어 node[2]에 넣는다. 
	// => 그리고 "node" 변수가 그 결과를 가리키게 만든다....


export default {
	Trie: Trie3,
}
