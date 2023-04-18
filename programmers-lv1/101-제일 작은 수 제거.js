/* 제일 작은 수 제거하기
https://school.programmers.co.kr/learn/courses/30/lessons/12935?language=javascript

정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

제한 조건
arr은 길이 1 이상인 배열입니다.
인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.

입출력 예
arr	return
[4,3,2,1]	[4,3,2]
[10]	[-1]

*/

const solution1 = (arr) => {
	if (arr.length <= 1) {
		return [-1]
	}
	// arr.splice(arr.indexOf(Math.min(...arr)), 1); // O(3N)이 된다. splice와 indexOf, Math.min이 각각 O(N)이라서.

	// 코드가 늘어나더라도 내장 함수를 쓸 때는 각 변수에 담아서 쓰는 게 더 좋다. 
	const minValue = Math.min(...arr);
	const indexOfMinValue = arr.indexOf(minValue);
	arr.splice(indexOfMinValue);

	return arr;
}

module.exports.solution = solution;

/* 다른 풀이 */

// 내장함수 없이, 클래식하게 푸는 것이 필요할 때가 있다. 문제 자체에서 내장함수 사용을 '막아놓은' 경우, 내장함수가 실행되지 못하고 시간이 흘러 시간 초과 오류가 나올 수 있다... 그리고 예상치 못하게 nested loop가 만들어질 수 있는 문제도 있다. 
function solution(arr) {
	if (arr.length === 1) {
		return [-1];
	}

	let min = Number.MAX_SAFE_INTEGER; // integer 최대값
	const resultArr = [];

	// for (i = 0; i < arr.length; i++) {
	// 	if (arr[i] < min) {
	// 		min = arr[i];
	// 	}
	// }
	for (i = 0; i < arr.length; i++) { // [4, 3, 2, 1]
		if (arr[i] <= min) {
			// resultArr.push(arr[i]);
			min = arr[i];
		} else {
			resultArr.push(arr[i]);
		}
	}


	for (i = 0; i < arr.length; i++) {
		if (arr[i] !== min) {
			resultArr.push(arr[i]);
		}
	}

	return resultArr;
}



// for문으로 최소값의 인덱스를 찾는 방법. 
function solution2(arr) {
	let newArr = [];
	if (arr.length == 1) return [-1];

	let minIndex = 0;
	for (let i = 1; i < arr.length; i++) {
		if (arr[minIndex] > arr[i]) {
			minIndex = i;
		}
	}

	let i = 0;
	while (i < arr.length) {
		if (i !== minIndex) {
			newArr.push(arr[i]);
		}
		i++;
	}

	return newArr;
}

function solution3(arr) {
	const min = Math.min(...arr)
	return arr.length > 1 ? arr.filter(value => value !== min) : [-1];
}