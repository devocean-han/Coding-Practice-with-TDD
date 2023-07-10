/* 

Medium

Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

 

Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
 

Constraints:

n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.

*/

/* 정리: 
nums는 원래 중복 없이 오름차순 정렬되어 있었다. 
1에서 최대 nums의 길이만큼 '회전'이 가해졌다. 
회전은 오른쪽으로 한칸씩 미는 것을 뜻한다. 
얼만큼 회전이 가해졌는지는 사전에 알 수 없다. 

이 때 배열 안에서 최소값을 찾아 반환하시오.
*/

// nums의 값들이 전부 unique하다는 데에 무슨 의미가 있나..?
// 최소와 최대 한계가 주어지고 그 사이의 무슨 조건을 만족하는 최적해를 찾는 문제라면 이진 탐색을 사용해볼 수 있는데....

// 일단 직관적으로: nums를 검사하여 숫자가 갑자기 '작아지는' 한 번의 순간을 포착하여 그 값을 리턴한다.
// 					만약 작아지는 순간이 없다면 첫 번째 요소를 리턴한다.
// Time complexity: O(N)
// Space complexity: O(1)
function solution(nums) {
	for (let i = 0; i < nums.length - 1; i++) {
		if (nums[i] > nums[i + 1]) {
			return nums[i + 1];
		}
	}

	return nums[0];
}

// 허망한 내장 함수 활용: Math.min()
function mathMinSolution(nums) {
	return Math.min(...nums);
}

// 이진 탐색 사용:
// 죄소와 최대 한계가 주어졌다고 볼 수 있는 것엔 '회전 수' r이 있다...
// r최소: 1, r최대: nums.length;
// r(로 만들 수 있는) 검사 조건: 만약 nums[r - 1] > nums[r] 이라면 합격.
// 		그렇지 않고 nums[r - 1] <= nums[r]인 동안 r을 다시 찾기를 반복한다. 
function binarySolution(nums) {
	if (nums.length === 1) return nums[0];
	if (nums[1] < nums[0]) return nums[1]; 
	
	// rotation의 최소, 최대 경계값 설정:
	let rMin = 1, rMax = nums.length;
	// 중간값 찾기 여정
	while (rMin <= rMax) {
		let rMid = Math.floor((rMin + rMax) / 2);
		// if (nums[rMid - 1] > nums[rMid]) return nums[rMid];
		// (회전된 경우) 왼쪽이 오른쪽 반절(쯤)보다 크다. 
		// 즉, r이 현재 rMid의 오른쪽에 해당한다면 '왼반절 첫 수' > '오른반절 첫 수'가 된다.
		// 반대로 '왼반절 첫 수' < '오른반절 첫 수'라면 r이 현재 rMid보다 왼쪽에 있다는 의미..가 아니다. 
		
		// [3,4,5,6,7,8,9,0,1,2]에서 r= 7.
		// 첫 rMid는 5, 즉 nums의 8을 가리키고, 여기서 왼반절로 가야할지 오른반절로 가야할지 결정하려면....
		// (1) 8 > 4이고, rMid를 더 오른쪽으로 옮겨야 함. => nums[rMin] < nums[rMid]면 rMin->rMid+1
		// [7,8,9,0,1,2,3,4,5,6]에서 r= 3.
		// 첫 rMid는 5이고 nums로는 2를 가리킴. 
		// (2) 2 < 8이고, rMid를 더 왼쪽으로 옮겨야 함. => nums[rMin] > nums[rMid]면 rMax->rMid-1
		// (3) nums[rMin] === nums[rMid]가 되는 경우는 없음. 
		
		// 위 (1)~(3) 로직대로 계속 해보면...
		// [3,4,5,6,7,8,9,0,1,2]에서 r= 7.
		// rMin: 1, rMax: 10, rMid: 5 => 8 > 4 => 더 오른쪽으로!
		// rMin: 6, rMax: 10, rMid: 8 => 1 < 9 => 더 왼쪽으로!
		// rMin: 6, rMax: 7, rMid: 6 => 9 = 9 => ?? nums[rMid + 1]을 답으로 내면 되는 상태...
		// 만약 ===상태도 '더 왼쪽으로'에 포함해서 진행한다면...
		// rMin: 6, rMax: 5 => 반복 벗어나고 rMid가 이전 그대로 보존됨. 
		
		// [7,8,9,0,1,2,3,4,5,6]에서 r= 3.
		// rMin: 1, rMax: 10, rMid: 5 => 2 < 8 => 더 왼쪽으로!
		// rMin: 1, rMax: 4, rMid: 2 => 9 > 8 => 더 오른쪽으로!
		// rMin: 3, rMax: 4, rMid: 3 => 0 = 0 => nums[rMid]를 답으로 내면 됨. 
		// 만약 ===상태도 '더 왼쪽으로'에 포함시켜 진행해도...
		// rMin: 3, rMax: 2 => 반복 벗어나고 rMid가 이전 그대로 보존됨. 
		
		// [7,8,9,10,0,1,2,3,4,5,6]에서 r= 4.
		// rMin: 1, rMax: 11, rMid: 6 => 2 < 8 => 더 왼쪽으로!
		// rMin: 1, rMax: 5, rMid: 3 => 10 > 8 => 더 오른쪽으로!
		// rMin: 4, rMax: 5, rMid: 4 => 0 = 0 => nums[rMid]를 답으로 내면 됨.
		// ...
		
		// [10,0,1,2,3,4,5,6,7,8,9]에서 r= 1.
		// rMin: 1, rMax: 11, rMid: 6 => 5 > 0 => 더 오른쪽으로!
		// rMin: 7, rMax: 11, rMid: 9 => 8 > 6 => 더 오른쪽으로!
		// rMin: 10, rMax: 11, rMid: 10 => 9 = 9 => rMid = 10이다? 
		// => 처음 if 조건으로 이 케이스 삭제
		
		// r이 1부터 n번 회전할 수 있다면, 이는 곧 0번부터 n-1번 회전할 수 있다고도 할 수 있겠다. 
		// 그래서 rMin과 rMax를 다시 설정해서 생각해보면...

		// [3,4,5,6,7,8,9,0,1,2]에서 r= 7.
		// rMin: 0, rMax: 9, rMid: 4 => 7 > 3 => 더 오른쪽으로!
		// rMin: 5, rMax: 9, rMid: 7 => 0 < 8 => 더 왼쪽으로!
		// rMin: 5, rMax: 6, rMid: 5 => 8 = 8 => r = 5???
		// => 더 말이 안 된다. 
		

		// 처음 로직 그대로 하되 최종적으로 나온 r의 앞뒤를 추가적으로 비교하고 반환하도록 하자.
		if (nums[rMin] < nums[rMid]) {
			// 오른쪽으로
			rMin = rMid + 1;
		} else {
			rMax = rMid - 1;
		}
	}

	return nums[rMin] > nums[rMin + 1] ? nums[rMin + 1] : nums[rMin];
}

module.exports = { solution: findMin2 }

// 다른 해답:
// 1. nums의 subarray 양 끝을 가리킬 left와 right 포인터를 지정한다.
// 2. 중간 포인터 mid를 지정하고 오른쪽 끝 right 포인터가 가리키는 값과 비교한다. 
// 
function findMin(nums) {
	// nums의 왼쪽 끝과 오른쪽 끝 인덱스를 지정
	let left = 0;
	let right = nums.length - 1;

	// 왼쪽이 오른쪽 인덱스보다 작은 동안
	while (left < right) {
		const mid = ~~((left + right) / 2);
		// const mid = Math.floor((left + right) / 2);

		// 가운데 지점의 값이 오른쪽 끝 값보다 크면: 오른쪽 반절로 이동
		if (nums[mid] > nums[right]) {
			left = mid + 1;
		// 그렇지 않으면: 왼쪽 반절로 이동
		} else {
			right = mid;
		}
	}

	return nums[left];
}
// => 어떻게 오른쪽 끝 값과 비교할 생각을 했을까? 어쨌든 이게 mid를 계속 조율할 조건이 되는 게 맞긴 한데...
// 1. 왜 (left < right)과 (left = mid), (right = mid - 1) 조건은 먹히지 않는 거지? 가능한 조합이 뭐야?
// 2. 다른 어떤 조합도 통하지 않고 findMin과 findMin2의 딱 두가지 조합만 가능한 이유가 뭐지? 예를 들어 (left < right) + (if nums[mid] >= nums[right]) + (left = mid) + (else right = mid - 1); 조합은 꼭 될 것 같은데 무한 루프에 걸린다...
// 3. 왜 '유티크한 값들임'이 중요한가? 

function findMin2(nums) {
	let left = 0, right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (nums[mid] > nums[right]) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	console.log('last left: ', left);
	return nums[left];
}
