/* 347. Top K Frequent Elements
https://leetcode.com/problems/top-k-frequent-elements/

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.


Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]


Constraints:
1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

*/

// 
// Time complexity: 3O(N) + O(N logN) + O(K)? => O(N logN)
function topKFrequent(nums, k) {
	// 1. count frequency 
	const countNums = new Map();
	for (const num of nums) { // O(N)
		countNums.set(num, (countNums.get(num) ?? 0) + 1);
	}

	// 1-1. if the size of map is equal to k, just return all keys.
	if (countNums.size === k) {
		return [...countNums.keys()]; // O(N)
	}

	// 2. make it into an array
	let sortedNums = [...countNums]; // O(N)

	// 3. sort the array based on frequency descending order.
	sortedNums.sort((a, b) => b[1] - a[1]); // O(N logN) 

	// 4. return the first k values
	return sortedNums.slice(0, k).map((element) => element[0]); // O(K) ?
}

// To make time complexity less than O(N logN),
// sorting must not be used. 
function noSortSolution(nums, k) {
	// 1. 처음부터 숫자를 맵에 넣기 시작한다. 
	
	// 2. 빈 k크기 배열 result를 하나 만든다. 
	const result = [];

	// 3. '현재로써의 최고 빈도수'를 기억하고 있을 변수를 하나 만든다. 
	let topFrequency = 0;

	// 4. 현재로써의 최고 빈도수가 갱신될 때마다 result 배열의 제일 앞에 해당 숫자를 추가하고, 요소가 k개가 넘어가게 되면 제일 뒤의 수를 하나 제거한다. (이 부분은 개선의 여지가 있다)
	// 		근데 문제가 있다. 2를 추가해야 하는 시점에 [1, 2, 5] 이렇게 있었다면 추가&삭제 후 [2, 1, 2]가 되게 된다. 이를 위해 2가 이미 들어있나를 검사하게 되면 O(N)이 필요하게 되지만... O(N logN)보다는 나으므로 일단 이대로 간다. 
	const countNums = new Map();
		// ex. [1, 1, 2], 1 => countNums = {}, result = []
		// num = 1, countNums = {1: 1} => topFrequency = 1, numIndex = -1 => result = [1]
		// num = 1, countNums = {1: 2} => topFrequency = 2, numIndex = 0 => result = [1]
		// num = 2, countNums = {1: 2, 2: 1} => return [1]
	
		// ex. nums = [1, 1, 2, 7, 3], k = 4  => [1, 2, 7, 3]
		// result = []
		// num = 1 => countNums = {1: 1} => topfrequency = 1, numIndex = -1 => result = [1]
		// num = 1 => countNums = {1: 2} => topFrequency = 2, numIndex = 0 => result = [1]
		// num = 2 => countNums = {1: 2, 2: 1} 
		// num = 7 => 
	for (const num of nums) { 
		countNums.set(num, (countNums.get(num) ?? 0) + 1);
		if (countNums.get(num) >= topFrequency) {
			// '현재로써의 최고 빈도수' 업데이트
			topFrequency = countNums.get(num); 

			// result에 이미 num이 포함되어 있었다면 해당 숫자 제거 후 가장 앞에 재배치
			const numIndex = result.indexOf(num); 
			if (numIndex !== -1) { 
				result.splice(numIndex, 1);
				result.unshift(num);
				continue;
			}

			// 그렇지 않고 result의 끝자리까지 숫자가 채워져 있는 경우, 가장 마지막 수 제거 후 가장 앞에 현재 num 추가
			if (result.length === k) {
				result.pop();
			}

			result.unshift(num);
		}
	}

	// 5. nums를 다 돌고 난 후의 result를 그대로 반환한다. 
	return result; 
}

module.exports.solution = sortedHashIn3LinesSolution;

// 다른 해법

// Using another array 'bucket' that has frequency as it's index and the numbers of 'nums' as values.
// Time complexity: O(N) + O(number of unique numbers) + O(highest frequency) + O(k) => O(N) + O(N + 1) + O(k) => O(N)
// Space complexity: O(number of unique numbers) + O(highest frequency) + O(k) => O(N + 1) + O(k) => O(N) 
function linkedHashSolution(nums, k) {

	const freqMap = new Map(); // space: O(unique numbers)
    const bucket = []; 			// space: O(highest frequency)
    const result = [];			// space: O(k)
    
	// 1. 일단 nums 안의 각각의 숫자들에 대하여 빈도수 map을 만든다. 
    for (let num of nums) { // O(N) 
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
	if (freqMap.size === k) {
		return [...freqMap.keys()];
	}

	// 2. 만든 map에서 '빈도수'를 인덱스로 하는 배열(bucket)에 해당 '숫자'를 집어넣는다.
	// 		같은 빈도수를 가지는 숫자가 있을 수 있으니 set으로 만들어 넣는다. 
	// 		그냥 array로 하지 않는 이유는 빠르게 접근하기 위해서? 반환 순서는 상관 없다고 했으니까? 
    for (let [num, freq] of freqMap) { // O(unique numbers)
        bucket[freq] = (bucket[freq] || new Set()).add(num);
    }

	// 3. bucket에 존재하는 가장 큰 인덱스부터 앞으로 검사하면서
	// 		해당 인덱스의 값(set)을 통째로 결과 배열 result에 넣는다. 
	// 		result의 크기가 k개가 되면 앞으로 검사를 멈추고 리턴한다. 
	// 		(무조건 한 개의 해답이 존재한다고 했으므로, 한 번 루프에 k=5를 찾아야 하는데 result 크기가 4->6으로 건너뛰어지는 경우가 없을 것이 보장된다.)
    for(let i = bucket.length-1; i >= 0; i--) { // O(highest frequency)
		if (bucket[i]) result.push(...bucket[i]); // ~ O(1)
		// 아래 두 줄과 같이 하면 꼭 한 개의 해답이 존재하지 않아도(k=5를 찾아야 하는데 result 크기가 4->6으로 건너뛰는 경우도) 가장 먼저 자리한 k개만을 반환하여 통과할 수 있다. 
        if (result.length >= k) break;
    }
    return result.slice(0, k); // O(K)
}

// Using sorted Hashmap
function sortedHashSolution(nums, k) {
	let result = [];
	let map = new Map();

	for (const num of nums) {
		map.set(num, map.get(num) + 1 || 1);
	}

	let sortedArray = [...map.entries()].sort((a, b) => b[1] - a[1]);

	for (let i = 0; i < k; i++) {
		result.push(sortedArray[i][0]);
	}

	return result;
}
// => 엇, 내 첫 번째 해법과 똑같다.

// 방금 해법을 더 간단히 나타낸 버전. 
// 단, LeetCode 사이트에서는 통과가 되는데 VS Code에서 테스트 할 때는 숫자 값들이 왜인지 문자열로 반환되어 통과하지 않는다. 
function sortedHashIn3LinesSolution(nums, k) {
	const counts = {}
	for (let num of nums) counts[num] = (counts[num] ?? 0) + 1;
	
	return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, k);
}