/* 713. Subarray Product Less Than K
https://leetcode.com/problems/subarray-product-less-than-k/description/

Medium

Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

Example 2:

Input: nums = [1,2,3], k = 0
Output: 0

Constraints:

1 <= nums.length <= 3 * 104
1 <= nums[i] <= 1000
0 <= k <= 106

*/

/* Sliding window 알고리즘 
1. left bound 와 right bound 를 정의한다. 보통은 둘다 0 번 인덱스에서 시작한다.
2. right bound 를 하나씩 늘려가며 조건을 확인한다.
3. 조건이 맞지 않는다면 left bound 를 조건이 맞을 때까지 right bound 와 같거나 작은 수 범위 내에서 증가시킨다.
4. right bound 가 끝에 도달하면, 보통 알고리즘이 끝난다.
Time complexity: left bound 가 right bound 를 넘어서거나 뒤로 돌아가는 일이 없으므로, 복잡도는 O(n) 이 된다.

형식: 
function fn(arr) {
  // left bound 초기화, right bound 는 for 문에서 초기화
  let left = 0;
  // right bound 끝까지 반복하기, (right bound 를 하나씩 늘린다.)
  for (let right = 0; right < arr.length; right++) {
    // 조건 맞을 때까지 left bound 더해주기
    while(left <= right && 특정 조건) {
      left++;
    }
  }
}

참조: https://jake-seo-dev.tistory.com/326
*/

// 조건에 맞는 "연속된" 부분배열을 구하는 문제이므로 sliding window 기법을 떠올려볼 수 있다. right bound가 증가하는 동안, left~right 사이의 모든 수를 곱해서 < K인지를 확인한다.
// 일단 첫 번째 수를 확인한다. < K면 count++한다.
// right을 한 칸 옮겨서 곱을 확인하고, < K면 count++한다.
// 계속 옮기면서 곱을 확인하다가 >= K가 되는 순간, left를 한 칸 오른쪽으로 옮기고 곱을 확인한다. < K가 될 때까지 오른쪽으로 옮기고, count++한다.
// => 한 개짜리 부분 배열은 패스하게 될 것 같다...

// 확인:
// [10,5,2,6], k = 100일 때,
// [10], [10, 5],
// [5, 2], [5, 2, 6] 끝.

// => 추가1) right을 진짜 옮기기 전에 미리 곱을 계산해서 left를 먼저 옮겨서 count++한 번 하고, 다음에 right을 옮기자.
// => 추가2) right이 끝에 도달하고도 left를 끝까지 옮기자...
// 다시 확인해 봄:
// [10], [10, 5],
// [5], [5, 2], [5, 2, 6],
// [2, 6], [6]
// => [2]를 도출해 낼 방법이 없다....

// right bound를 오른쪽 끝에서부터 시작해볼까?
// 부분 배열의 곱이 >= K면, right을 옮겨주나 left를 옮겨주나?
// left와 right이 중간에 만나게 되는 이 방법은 더더욱 [2]를 도출할 방법이 아니다.

// 일단 무식한 방법부터 해보자...
// 양 끝에서 시작한다.
// 전체 곱이 >= K이면, right을 왼쪽으로 한 칸씩 옮기면서 딱 < K가 되는 지점에서 멈춘다. 만약 [10,5]인 상태가 됐다면, 그렇게 만들어진 배열의 길이만큼이 '가능한 부분 배열의 개수'이다.
// left를 한 칸 오른쪽으로 옮기고 right을 다시 오른쪽 끝에서 시작하여 같은 과정을 반복한다.
// 만약 [10]같은 상태가 됐다면, 즉 left=right까지는 괜찮다.
// 근데 left > right이 되면 left가 가리키고 있는 그 수에 대해서는 어떻게 해도 < K가 불가능하다는 얘기이므로 부분 배열이 존재하지 않는다. => 따라서 right은 >= left일 때까지만 옮기고, 다음 left로 넘어간다. left는 nums의 처음부터 끝까지 옮긴다.

// => Semi(?) Brute force:
// Time complexity: O(N^2)
// Space complexity: O(1)
function solution(nums, k) {
	if (k <= 1) return 0;
	
	let totalSub = 0;

	for (let left = 0; left < nums.length; left++) {
		let right = left;
		let product = 1;
		while (right < nums.length) { // N + (N-1) + (N-2) + ... + 1 = N(1+N)/2 ~= O(N^2)
			product *= nums[right];
			if (product >= k) break;

			totalSub++;
			right++;
		}
	}

	return totalSub;
}

// 다시 sliding window를 생각해보자...
// right bound를 한 칸씩 오른쪽으로 옮기면서 left~right 곱이 >= K가 되는 지점에서 멈춘다.
// totalSub에 right - left 개를 더한다. 이것은 left가 포함된 곱의 조합들을 의미한다.
// 이제 left를 한 칸 오른쪽으로 옮긴다. left~right 곱이 다시 < K가 될 때까지 계속 옮긴다.
// 이후, right을 다시 오른쪽으로 한 칸씩 옮기기 시작한다. left~right 곱이 >= K가 되는 지점에서 멈추고, totalSub에 right - left 개를 더한다.
// right이 끝에 도달했을 때, left~right 곱이 >= K라면 left를 오른쪽으로 옮기는 일련의 작업을 다시 한 번 해주고, 곱이 < K라면 그대로 right - left를 totalSub에 더해준다.

// 정리:
// 1. left bound, right bound, totalSub 변수를 만들고 0으로 초기화한다.
// 2. right을 오른쪽으로 끝까지 한 칸씩 옮길 것이다. 각 단계마다 left~right(포함) 사이의 곱이 >= K가 되는 지점이 나올 때마다,
// 2-1. 우선 totalSub에 right-left 개를 더한다.
// 2-2. left~right 곱이 다시 < K가 될 때까지 left를 한 칸씩 오른쪽으로 옮겨준다. left를 오른쪽으로 한 칸씩 옮길 땐 현재까지의 곱 product에서 이전 left의 수를 나눠준다. left는 right과 같아질 때까지 이동할 수 있다...
// (3. 마지막 숫자에서 곱이 < K라면, right-left를(while을 빠져나올 때 마지막으로 right++가 될 것임로 right-left+1이 아니라 right-left가 맞다.) 마지막으로 한 번 totalSub에 더해준다. 마지막 숫자에서 곱이 >= K가 되면, 자동으로 2-2를 한 번 거친 후 right++가 진행되어 while을 빠져나올 것이므로 똑같이 right-left 개가 마지막으로 totalSub에 더해지게 된다.)
// 4. totalSub를 반환한다.

// => 실패: 이 메소드는 길이 막힌 로직이다. 
// 그러나 수정에 수정을 거듭하였고, 단 하나의 결론이 도출되어 이 다음 메소드에 적용하였고, 성공했다(다른 해답도 참고함). 
function slidingWindowSolution(nums, k) {
	if (k <= 1) return 0;

	// 양쪽 창문 모두 왼쪽 끝(0)에서 시작한다.
	let left = right = totalSub = 0;
	let product = 1;
	
	// 오른쪽 창문을 오른쪽으로 한 칸씩 열 것이다. 
	while (right < nums.length) {
		product *= nums[right];

		if (product >= k) {
			let widthBefore = right - left;
			totalSub += widthBefore;
			while (product >= k && left < right) {
				product /= nums[left];
				left++;
			}
			// nums:[10,9,10,4,3,8,3,3,6,2,10,10,9,3], k:19 일 때
			// [4,5,8] => [8]로 갈 때 [4]와 [4,5]는 셈에 포함되지만 [5]를 완전히 건너 뛰게 되어버린다.
			// 따라서 (1)한 칸을 '전진(right이)' 할 때마다 한 번씩 정산하는 방안이 필요하다. 아니면 (2)왼 창문을 두 칸 이상 한꺼번에 닫을 때마다 '닫은 칸 수 - 1'개만큼 셈에 더해주는 작업을 덧붙여야 한다. 
			// 왼쪽 창문 닫기를 마쳤는데 최종 옮겨진 칸이 2칸 이상이면 '옮긴 칸 - 1'만큼 셈에 더해준다.
			let widthAfter = right - left;
			if (widthBefore - widthAfter >= 2) totalSub += (widthBefore - widthAfter - 1);
			// => 그러나 이렇게 하면 nums:[1,10,2,3], k:10 의 경우 왼 창문이 오른 창문을 '앞지르게' 될 때 이상하게 -- = +값이 되어 무조건 >=2가 되게 되어버린다. 그러니 이 방법은 왼쪽 창문이 오른쪽 창문보다 앞지를 수도 있는 문제에는 적용할 수 없다. 결국, (1)대안인 '한 칸을 전진할 때마다 한 번씩 정산하는 방안'을 적용해야 하는 것으로 결론!
		}

		right++;
	}

	// (right - left = n)개로 만들 수 있는 '조합' 총 개수를 더해야 한다. 즉 n + (n - 1) + ... + 2 + 1을 더해줘야 한다.  
	let leftOver = right - left;
	while (leftOver > 0) {
		totalSub += leftOver;
		leftOver--;
	}

	return totalSub;
}
// nums:[1], k:0 => while (product >= k && left < right)에서 left <= right으로 고쳐서 해결

// nums:[10,5,2,6], k:100 => product과 totalSub를 추적함
// product: 10, totalSub: 0
// product: 50, totalSub: 0
// product: 100, totalSub: 2
// product: 60, totalSub: 2
// 마지막: product: 60, totalSub: 5
// => 아하, [10]이 포함된 둘과 [5]가 포함된 셋은 카운트됐지만 [2]와 [6]에 대해서는 안 됐네...


module.exports.solution = numSubarrayProductLessThanK;

// 다른 해답 및 위 시행착오에서 도출한 유일한 로직: 
function numSubarrayProductLessThanK(nums, k) {
	if (k <= 1) return 0;
	// nums = [10,5,2,6], k = 100
    let totalSub = 0, left = 0, right = 0, product = 1;

	// product >= k가 될 때까지 창문 '열기'(오른쪽으로 확장)
    while (right < nums.length) {
		product *= nums[right];
		
		// product >= k를 유지하는 동안, 왼쪽 창문 '닫기'
		// left < right이라는 조건이 없어 창문이 뒤집어질 수 있지만 괜찮다. 언제나 왼 창문이 딱 한 칸만 앞서고 멈추게 되며, 그 경우에도 totalSub에 더해지는 값은 0이 되어 문제 없다. 
        while (product >= k)  {
            product /= nums[left];
            left++;
		}
		
		// 창문 '사이즈'를 계산해서 총 부분 배열 개수에 더하기
		// 오른쪽 창문을 한 칸 열 때마다 무조건 한 번씩 계산하게 되므로 왼 창문을 한꺼번에 여러칸 닫음으로 인해서 건너 띄어지는 요소를 방지할 수 있다. 이렇게 '오른 창 한 칸 전진마다 계산하기'가 유일한 방법이다. ...자세한 사항은 위의 시행착오를 참조할 것.  
        totalSub += right - left + 1;
        right++;
	}
	
    return totalSub;
};
// => ex) 창문이 '뒤집어지는' 케이스는 nums:[1,10,2,3], k:10 같이 k 이상인 단일 요소가 존재하는 경우이다.  