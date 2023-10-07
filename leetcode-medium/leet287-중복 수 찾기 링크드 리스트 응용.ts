/* 287. Find the Duplicate Number
https://leetcode.com/problems/find-the-duplicate-number/?envType=list&envId=rus4c4ci
* 사용 알고리즘(Floyd's Tortoise & Hare Algorithm): https://fierycoding.tistory.com/45

Medium

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?

*/

// => n개의 수를 가진 숫자 배열에서 중복되는 수 찾아서 반환하기
// 		단, 배열의 원소 개수는 최소 2개 최대 10^5 + 1개이며
// 			원소의 값(수의 범위)은 1 ~ n-1 사이의 값이다. 즉,
// 			어떤 원소값을 골라서 인덱스를 삼아도 전부 유효하다.
// 		또한 반드시 하나의 수가, 하나의 수만이, 중복된다고 한다. 

// => leet234에서 배운 Ployd's 토끼와 거북이 알고리즘을 사용해보자.
// 		nums안의 요소들을 링크드 리스트의 값이자 포인터로 삼으면 된다.
// 	ex)   val[1,3,4,2,2]
// 		index[0,1,2,3,4]
// 		=> 0번째 자리에 해당하는 노드는 1번째 자리의 노드를 가리킨다.
// 		=> 1번째 자리에 해당하는 노드는 3번째 자리의 노드를 가리킨다.
// 			...
// 		=> 2번째 자리를 가리키는 노드가 3과 4번째 노드 두 개로, Ployd의 알고리즘에 따르면 인덱스 2번 노드가 바로 순환고리(시작점)이 된다. 링크드 리스트에서 순환이 있는지 확인하고 그 시작점을 찾는 방법을 사용하면 인덱스 2번 노드를 알아낼 수 있고, 그 노드의 값을 반환하면 되겠다.

// ==> 실제로 링크드 리스트를 만들어야 할까? 이미 만들어진 것 처럼 배열 그대로 사용할 수 있지 않을까... 하지만 일단 만든다. 아니다. 거북이가 다음 칸으로 가는 것은 '거북이_위치 = nums[거북이_위치]'처럼 하면 된다. 토끼는 '토끼_위치 = nums[nums[토끼_위치]]'처럼 하면 된다. 이하 생략.

/**
 * 
 * @param {number[]} nums 
 * @returns {number}
 */
export function solution(nums: number[]): number {
	// 0. 토끼와 거북이를 첫 자리로 세팅(nums 길이는 2이상임).
	let tortoise: number = 0;
	let hare: number = 0;
	
	// 1. 토끼와 거북이가 만날 때까지 뛰어다니게 만든다(반드시 하나의 중복되는 수가 있다고 하였으므로 반드시 만나게 될 것임)
	
	// (이지만, 최대 2바퀴를 돌면 만날 수 있는지 없는지를 확정지을 수 있다).
	// for (let i = 0; i <= nums.length * 2; i++) {
	// 	tortoise = nums[tortoise]; // 1칸 이동
	// 	hare = nums[nums[hare]]; // 2칸씩 이동
	// 	if (tortoise === hare) {
	// 		tortoise = 0;
	// 		while (true) {
	// 			tortoise = nums[tortoise];
	// 			hare = nums[hare];
	// 			if (tortoise === hare) return tortoise;
	// 		}
	// 	}
	// }
	// return -1;
	// => 왜인지 안된다. 

	while (true) {
		tortoise = nums[tortoise]; // 1칸 이동
		hare = nums[nums[hare]]; // 2칸씩 이동
		if (tortoise === hare) break;
	}

	// 2. 거북이를 처음 자리로 이동시키고, 토끼와 거북이 모두 한 칸씩만 이동하면서 만나는 자리를 찾는다.
	tortoise = 0;
	while (true) {
		tortoise = nums[tortoise];
		hare = nums[hare];
		if (tortoise === hare) break;
	}

	// 3. 둘이 만난 자리가 바로 중복 수가 발견되는 자리이므로 반환한다.
	return tortoise;
}

module.exports = {
	solution: solution,
}

// 다른 해답1: Brute force
// O(N^2)
// O(1) 
function bruteSolution(nums: number[]): number {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] === nums[j]) return nums[i];
		}
	}

	return -1;
}

// 다른 해답2: 수의 출현 빈도를 셀 수 있는 Count 배열 사용
// O(N)
// O(N) 
function countSolution(nums) {
	const count = new Array(nums.length).fill(0);
	for (let i = 0; i < nums.length; i++) {
		count[nums[i]]++;
		if (count[nums[i]] > 1) return nums[i];
	}

	return -1;
}

// 다른 해답3: 수의 출현 빈도를 Hash Set을 이용해 측정
// O(N) 
// O(N) 
function setSolution(nums) {
	const set = new Set();
	// set.add(val)이 '이미 갖고 있는 수면 null이나 undefined' 등으로 다른 결과를 돌려보내줘야 가능한 방법이다. ...하지만 다르게 응용할 수 있지!
	for (let i = 0; i < nums.length; i++) {
		set.add(nums[i]);
		if (set.size !== i + 1) return nums[i];
	}

	return -1;
}

// 다른 해답4: nums의 요소 값을 인덱스로 하여 방문한 자리를 마킹하는 방법. 주어진 nums의 값을 변경한다는 단점이 있다.
// O(N) 
// O(1) 
function markingSolution(nums) {
	for (let num of nums) {
		// 방문한 인덱스면 -num으로 바뀌어 있을 것. 
		const absNum = Math.abs(num);
		if (nums[absNum] < 0) return absNum;
		nums[absNum] = -nums[absNum]; 
	}

	return -1;
} 

// 다른 해답5: 정렬 후 순회. 역시 nums에 변화가 가해진다는 단점이 있다. 
// O(N logN) 
// O(N)
// => V8엔진의 최신 Timesort 알고리즘은 작은 규모의 배열의 경우 시간:O(N), 공간:O(1)이 들고, 큰 규모의 배열은 시간:O(Nlog(N)), 공간:O(N)이 든다고 함(출처: https://stackoverflow.com/a/68141547) 
function sortValSolution(nums) {
	nums.sort((a, b) => a - b);
	for (let i = 1; i < nums.length; i++) {
		if (nums[i - 1] === nums[i]) return nums[i];
	}

	return -1;
}

// 다른 해답6: 인덱스를 정렬하며 검사. nums의 요소값들이 '자기 자신에 + 1한 값이 유효한 인덱스'라는 조건을 만족하기 때문에 가능한 방법...
// O(N) ? 
// O(1) 
function sortIndexSolution(nums) {
	// 만약 nums가 정렬되어있는 상태라면...
	// 1. if(nums[i] === i + 1) 이미 정렬되어 있다는 얘기...
	// 2. if(nums[i] === nums[nums[i] - 1]) 알맞은 인덱스 자리에 해당 숫자가 들어가 있다는 얘기. 즉 중복이라는 뜻이다.
	// 3. else nums[i]와 nums[nums[i] - 1]자리를 서로 바꾼다. 
	for (let i = 0; i < nums.length;) {
		let num = nums[i];
		if (num === i + 1) i++;
		else if (num === nums[num - 1]) return num;
		// else nums[i] = nums[num - 1], nums[num - 1] = num;
		else [nums[i], nums[num - 1]] = [nums[num - 1], nums[i]];

		// 예시: [1,3,4,2,2]
		// [1(i), 3, 4, 2, 2] => [1, 3(i), 4, 2, 2]
		// [1, 3(i), 4, 2, 2] => [1, 4(i), 3, 2, 2]
		// [1, 4(i), 3, 2, 2] => [1, 2(i), 3, 4, 2]
		// [1, 2(i), 3, 4, 2] => [1, 2, 3(i), 4, 2]
		// [1, 2, 3(i), 4, 2] => [1, 2, 3, 4(i), 2]
		// [1, 2, 3, 4(i), 2] => [1, 2, 3, 4, 2(i)]
		// [1, 2, 3, 4, 2(i)] => 2가 인덱스 1번 자리에 이미 들어가있다 => 2 반환!
	}

	return -1;
}

// 다른 해답7: 이진 탐색
// O(N logN) 
// O(1) 
function binarySearchSolution(nums) {
	// mid 값보다 작거나 같은 num들을 세서, 그 개수가 mid값보다 확실히 크면 mid이하 범위 안에 중복이 존재한다는 얘기이다. (n + 1개의 숫자가 n길이의 배열에 들어있다면 최소 1개는 중복되는 수가 존재해야 한다는 Pigeonhole Principle 참고)(...)
	let low = 1;
	let high = nums.length - 1;

	while (low < high) { // O(log N)
		let mid = low + Math.floor((high - low) / 2);
		let count = 0;
		// mid 값보다 작거나 같은 num들을 센다.
		for (let i = 0; i < nums.length; i++) { // O(N)
			if (nums[i] <= mid) count++;
		}

		// 그 개수가 mid값보다 확실히 크면 mid이하 범위 안에 중복이 존재한다는 뜻. 그게 아니면 그 반대쪽 범위에 중복이 존재한다. 
		if (count > mid) {
			high = mid;
		} else {
			low = mid + 1;
		}
	}

	return low;
}

// 다른 해답8: Bit(이진수)로 바꿔 찾기
function bitSolution(nums) {
	/* 예시 1:	nums = [1,2,3,4,5,6,6,7,8]

		nums          [1,8]
		in            in
		binary:       binary:
		0001          0000
		0010          0001
		0011          0010
		0100          0011
		0101          0100
		0110          0101
		0110          0110
		0111          0111
		1000          1000
		____          ____
		1554          1444   ->  difference:   0110 = 6
	*/
	/* 예시 2: nums = [1,2,6,6,6,6,6,7,8]

		nums          [1,8]
		in            in
		binary:       binary:
		0001          0000
		0010          0001
		0110          0010
		0110          0011
		0110          0100
		0110          0101
		0110          0110
		0111          0111
		1000          1000
		____          ____
		1672          1444   ->  difference:   023(-2) ~~> 6
	*/
	// [1,n]의 최대 이진 길이를 구한다.
	const maxLength = dec2bin(nums.length - 1).length;

	// 10진수를 2진수로 변환하여 반환하는 함수
	function dec2bin(dec) {
		// return dec.toString(2);
		return (dec >>> 0).toString(2);
	}
	// console.log(dec2bin(1)); // 1
	// console.log(dec2bin(-1)); // 11111111111111111111111111111111
	// console.log(dec2bin(256)); // 100000000
	// console.log(dec2bin(-256)); // 11111111111111111111111100000000

	let answer = 0;

	// nums 안의 수 중 가장 큰 수가 nums.length - 1이 될 테니까 그 수의 이진 자리 수를 검사할 가장 큰 비트 자리수로 삼는다. 
	// (예를 들어 nums의 요소 개수가 9개라면 가능한 가장 큰 수는 8이 된다. 8은 이진법으로 1000(2)이니까, 각 비트 자리수를 비교 및 카운트하려고 할 때 최대 4자리를 반복하면 된다. nums 안에 8이 없더라도 괜찮다.)
	for (let i = 0; i < maxLength; i++) {
		// 비트를 1 i 만큼 왼쪽으로 옮긴다. mask가 i번째 자리에만 1을 가지고 나머지 자리는 전부 0이 되도록.
		let mask = 1 << i; 
		let count = 0;

		for (let j = 0; j < nums.length; j++) {
			// nums[j]가 i번째 이진 자리에 1을 가지고 있는 경우
			if ((nums[j] & mask) > 0) count++;
			// j 자체가 i번째 이진 자리에 1을 가지고 있는 경우
			if ((j & mask) > 0) count--;
		}

		// 현재 i번째 이진 자리에 '여분의 카운트(=1을 더하고 뺀 최종 결과가 양수)'가 발견되는 경우, 그 자리가 '중복 수'의 이진을 구성하는 한 자리가 된다. 
		if (count > 0) answer |= mask;
	}

	return answer;
}
// "1 << i" : 비트 (왼쪽)시프트 연산자. 비트 자리를 i단위만큼 왼쪽으로 옮김(= x2를 i번 해주는 효과). 예를 들어 1 << 3 = 1000(2)이고, 1 << 1은 10(2)이다.
// "j & mask" : 비트 논리 연산자 AND. 두 숫자의 비트 간에 AND 연산을 수행한다. 
// "answer |= mask" : 비트 논리 연산자 OR와 할당 연산자의 결합.
// => maxLength가 대략 log2(N)이므로 시간복잡도는 O(N logN)이 된다.
