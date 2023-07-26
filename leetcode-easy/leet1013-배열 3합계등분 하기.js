/* 1013. Partition Array Into Three Parts With Equal Sum
https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/

Easy

Given an array of integers arr, return true if we can partition the array into three non-empty parts with equal sums.

Formally, we can partition the array if we can find indexes i + 1 < j with (arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... + arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1])

Example 1:

Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1
Example 2:

Input: arr = [0,2,1,-6,6,7,9,-1,2,0,1]
Output: false
Example 3:

Input: arr = [3,3,6,5,-2,2,5,1,-9,4]
Output: true
Explanation: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4
 

Constraints:

3 <= arr.length <= 5 * 104
-104 <= arr[i] <= 104

*/

// 실패 sliding window: 예외 케이스 하나를 해결하지 못하고 있음.
function solution(arr) {
	// 1. 배열의 총합이 3으로 나누어 떨어질 수 있어야 3등분이 가능하다:
	let sum = arr.reduce((partialSum, val) => partialSum + val);
	if (sum % 3) return false;

	// 2. 포인터 둘을 양 끝 + 1에서 가운데로 전진시키며 위치할 곳을 찾는다. 
	let left = 1, right = arr.length - 2;
	let sum1 = arr[0];
	let sum3 = arr[arr.length - 1];
	let sum2 = sum - sum1 - sum3;

	// 2-1. 양 포인터가 마주 붙게 되기까지, 혹은 세 sum들이 같아지는 순간까지
	while (left < right && (sum1 !== sum / 3 || sum2 !== sum / 3)) {
		if (sum1 !== sum / 3) {
			sum1 += arr[left];
			sum2 -= arr[left];
			left++;
		}
		if (sum3 !== sum / 3) {
			sum3 += arr[right];
			sum2 -= arr[right];
			right--;
		}
	}

	return sum1 === sum2 && sum2 === sum3;
}

module.exports.solution = solution;

// 합계가 같아지도록 삼등분이 되려면, "전체합/3"이 되는 부분합이 3개가 있어야 한다는 얘기다. 즉, 앞에서부터 차례로 더하여 부분합을 계산할 때(그리고 "전체합/3"이 되는 순간 부분합을 다시 0으로 초기화하여 더해간다고 할 때), "전체합/3"이 되는 순간이 3번 있어야 한다. 끝까지 순회했을 때 그런 순간이 3번 있었다면 true를, 그렇지 않다면 false를 반환하도록 한다.
// Time: O(2N) => O(N)
// Space: O(1)
function solution2(arr) {
	// 1. 총 합계를 구한다.
	const sum = arr.reduce((partialSum, val) => partialSum + val);

	// 2. 배열의 앞에서부터 차례로 더해나갈 currentSum 변수를 0으로 초기화하고, 부분합이 전체합/3이 되는 순간 카운트할 count 변수도 0으로 초기화한다. 
	let currentSum = 0, count = 0;

	// 3. 배열을 순회하며 숫자를 currentSum에 더해나간다. 
	for (let i = 0; i < arr.length; i++) {
		currentSum += arr[i];
		// 4. 만약 부분합 currentSum이 전체합/3과 같아지면 카운트를 올리고 부분합을 다시 0으로 초기화한다. 
		if (currentSum === sum / 3) {
			count++;
			currentSum = 0;
		}
	}

	// count를 정확히 3과 비교하지 않는 것은, 전체합이 0이되는 경우가 있을 수 있기 때문이다. 즉, 전체합/3 = 0이 되는 부분합이 세 번을 넘어 그 이상 생길 수 있고 그 경우엔 어느 구간으로 나눠도 정확히 3등분이 될 수 있으므로, count === 3 이 아니라 count >= 3인 경우를 true로 삼도록 한다.
	return count >= 3;
}

// 위의 방법을 더 줄인 버전:
function solution3(arr) {
	const sum = arr.reduce((partialSum, val) => partialSum + val);
	let count = 0, currentSum = 0;
	for (let num of arr) {
		if ((currentSum += num) === sum / 3) count++, currentSum = 0;
	}

	return count >= 3;
}