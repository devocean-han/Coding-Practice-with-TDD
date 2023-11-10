/*
 * @lc app=leetcode id=17 lang=typescript
 *
 * [17] Letter Combinations of a Phone Number
 *
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (58.85%)
 * Total Accepted:    1.8M
 * Total Submissions: 3M
 * Testcase Example:  '"23"'
 *
 * Given a string containing digits from 2-9 inclusive, return all possible
 * letter combinations that the number could represent. Return the answer in
 * any order.
 * 
 * A mapping of digits to letters (just like on the telephone buttons) is given
 * below. Note that 1 does not map to any letters.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: digits = ""
 * Output: []
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: digits = "2"
 * Output: ["a","b","c"]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= digits.length <= 4
 * digits[i] is a digit in the range ['2', '9'].
 * 
 * 
 */

// (성공) Backtracking 풀이: 
function letterCombinations(digits: string): string[] {
	if (digits.length === 0) return [];

	const resultCombinations: string[] = [];
	const digitLetters: Record<string, string> = {
		// Record<K, T>: 새로운 객체 타입을 생성하는 데 사용되는 유틸리티 타입. 즉,
		// const digitLetters: { [key: K]: T } 와 같다.
		'2': 'abc',
		'3': 'def',
		'4': 'ghi',
		'5': 'jkl',
		'6': 'mno',
		'7': 'pqrs', 
		'8': 'tuv',
		'9': 'wxyz',
	}
	
	function aug(digits: string, currentIndex: number, currentCombination: string[]): undefined {
		// 0. 탈출 조건: i가 digits의 범위를 초과했을 때 곧바로 현재까지의 문자 조합을 result에 넣고 탈출한다.
		if (currentIndex === digits.length) {
			resultCombinations.push(currentCombination.join(''));
			return;
		}

		// 1. 현재 위치의 숫자에 대해 가능한 문자들로 루트를 나눠 탐색
		const currentNumber = digits[currentIndex];
		for (let letter of digitLetters[currentNumber]) {
			currentCombination.push(letter);
			aug(digits, currentIndex + 1, [...currentCombination]);
			currentCombination.pop();
		}
	}
	
	aug(digits, 0, []);
	return resultCombinations;
};

// 위의 풀이를 리팩토링한 버전: 
function letterCombinations2(digits: string): string[] {
	const result: string[] = [];
	if (digits.length === 0) {
		return result;
	}

	const DIGIT_TO_LETTERS: Record<string, string> = {
		'2': 'abc',
		'3': 'def',
		'4': 'ghi',
		'5': 'jkl',
		'6': 'mno',
		'7': 'pqrs', 
		'8': 'tuv',
		'9': 'wxyz',
	}

	function backtrack(i: number, curCombination: string) {
		// 0. 탈출 조건: i가 digits의 범위를 초과했을 때 곧바로 현재까지의 문자 조합을 result에 넣고 탈출한다.
		if (i === digits.length) {
			result.push(curCombination);
			return;
		}

		// 1. 현재 위치의 숫자에 대해 가능한 문자들로 루트를 나눠 탐색
		for (const letter of DIGIT_TO_LETTERS[digits[i]]) {
			backtrack(i + 1, curCombination + letter);
		}
	}

	backtrack(0, '');
	return result;
}

export default {
	solution: letterCombinations2,
}