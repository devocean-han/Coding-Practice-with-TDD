/* 같은 숫자는 싫어
https://school.programmers.co.kr/learn/courses/30/lessons/12906?language=javascript

문제 설명
배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다. 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다. 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다. 예를 들면,

arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

제한사항
배열 arr의 크기 : 1,000,000 이하의 자연수
배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수
입출력 예
arr	answer
[1,1,3,3,0,1,1]	[1,3,0,1]
[4,4,4,3,3]	[4,3]
입출력 예 설명
입출력 예 #1,2
문제의 예시와 같습니다.

*/

// Linear
function solution1(arr) {
	const result = [arr[0]];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] !== arr[i - 1]) result.push(arr[i])
	}

	return result;
}

// Stack
function stackSolution(arr) {
	// 스택으로 어떻게 푼다는 거지?
	// 스택으로 푼다고 해도 linearSolution의 O(N)보다 빨라질 수 있을까?
	
	// 스택을 하나 만들고 arr의 첫 수를 넣는다. 
	// arr의 다음 수부터 스택의 top과 비교하여, top과 같지 않으면 새로이 push 한다. 
	// 마지막으로 스택을 반환한다. 
	
	const stack = [arr[0]];
	for (let i = 0; i < arr.length; i++) {
		if (stack[stack.length - 1] !== arr[i]) stack.push(arr[i]);
	}

	return stack;
}

module.exports.solution = solution;

// 다른 풀이

// filter를 이용한 풀이
function filterSolution(arr) {
	return arr.filter((val, index) => val !== arr[index + 1])
}

// pair programming 연습한 것.
function solution(arr) {
	// 결과값을 담을 빈 배열을 하나 만든다.
	const result = [];

	let prev = null;
	for (let i = 0; i < arr.length; i++) {
		let current = arr[i];
		if (current !== prev) {
			result.push(current);
			// prev 변수에 다음에 비교할 '이전 값'으로 현재 값을 재설정해준다. 
			prev = current;
		}
	}

	return result;
}
