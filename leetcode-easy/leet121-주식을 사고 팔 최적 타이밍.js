/* 121. Best Time to Buy and Sell Stock
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

Easy

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104

*/

// 다음 큰 수 찾기 문제?! 그렇게 다음 큰 수가 나온 순간 지금 수와의 차를 기록해뒀다가 최고 '차'를 반환하면...
// ...

// Brute force: 각 날짜별로 이후 날짜 - 지금 날짜를 진행하여 최고차를 기록해두고, 
// 				그렇게 마지막으로 기록된 최고차가 <= 0이면 0을, 양수면 그 수를 반환한다. 
function solution(prices) {
	let maxDiff = 0;
	for (let i = 0; i < prices.length; i++) {
		for (let j = i + 1; j < prices.length; j++) {
			let currentDiff = prices[j] - prices[i];
			if (currentDiff > maxDiff) maxDiff = currentDiff;
		}
	}

	return maxDiff <= 0 ? 0 : maxDiff;
} 

// 잘 보니까, [2, 10, 3, 1, 10]같은 경우 0번부터 오른쪽으로 진행하면서 더 작은 값이 보일 때마다 '매수일'을 갱신한다.
// ...하지만 오른쪽에서부터 훑어오는 최고가 포인터가 닿기 전에 지나가버리면...
// 아! 왼쪽부터 포인터 두 개를 운용하는 것이다! 그래서 하나는 최저점을 찾고, 하나는 최고점을 찾고...
// 예를 들어 최저점을 [1]로 갱신했다고 할 때, 오른쪽에 이전 최고차 8을 갱신할 수 있는 값 [10]이 있음을 어떻게 보장할 수 있지?
// 처음에 [2]를 두 포인터가 모두 가리킨다... 다음 [10]을 보니 저점 포인터는 [2]에 그대로 남아있고 고점 포인터를 [10]으로 옮기고, 그 차를 한 번 계산해서 기록한다.
// 다음 [3]을 보니 최고, 최저 모두 갱신할 필요 없음.
// 다음 [1]은 최저를 갱신한다. 고점 포인터도 [1]로 옮긴다.
// 다음 [10]을 보니 고점 포인터를 옮길 만 하다. 옮기고 차를 계산해서 기존의 최대차와 비교하여 갱신한다.

// 예를 들면 [7,1,5,3,6,4]도,
// 처음에 [7]을 두 포인터가 모두 가리킨다.
// 다음 [1]을 보니 현재 저점보다 작아 저점 포인터가 옮겨간다. 고점 포인터도 똑같이 [1]로 옮긴다. => 저점 포인터를 옮겼을 때는 고점도 똑같이 옮겨만 놓고 최대차에 변동은 없다.
// 다음 [5]를 보니 현재 고점보다 크다. 고점 포인터를 [5]로 옮기고 차를 계산해서 기존의 최대차와 비교 후 업데이트한다. => 고점 포인터를 옮겼을 때 차를 계산한다. 최대차 업데이트도 이 때 한다.
// 다음 [3]을 보니 현재 저점보다 크고 현재 고점보다 작아서 무시.
// 다음 [6]을 보고 현재 고점을 [5]->[6]으로 옮긴다. 차와 최고차를 다시 한 번 계산 및 업데이트한다.
// 다음 [4]는 현재 저점보다 크고 현재 고점보다 작아서 무시.

// => 아마도 왼쪽부터 두 개의 '저점, 고점' 포인터를 운용하면서
// 새롬게 '차'를 계산할 때마다 최고차를 기억하고 갱신하게 하는 전략으로 가면 될 것 같다...

// 1. 인덱스 0에 두 '저점', '고점' 포인터를 두고 시작한다.
// 2. '최고차(이윤)'를 기억할 변수를 만들고 초기값 0을 부여한다.
// 3. prices를 순회하며
// 	3-1. '현재 저점'보다 작은 값이 나올 때마다 저점 포인트를 현재 값으로 옮긴다. 고점 포인트도 같은 위치로 옮긴다.
//  3-2. '현재 고점'보다 큰 값이 나올 때마다 고점 포인트를 현재 값으로 옮긴다. '현재 저점'과의 차를 새롭게 계산하고, 기존의 '최고차'보다 크면 '최고차'를 현재 차로 덮어씌운다.
//  (3-3. '현재 저점'보다 크(거나 같)고 '현재 고점'보다 작(거나 같)은 값이라면, 아무 일도 없이 무시하고 지나간다.)
// 4. 루프가 끝날 때 기록된 '최고차'를 그대로 반환하면 된다.
// => '어디서' 최고가와 최저가를 찍는지를 궁금해하지 않기 때문에 (그저 통틀어 최고 차익만 알기 원하기 때문에) 가능한 방법.

// Time complexity: O(N)
// Space complexity: O(1)
function twoPointerSolution(prices) {
	let low = high = 0;
	let maxDiff = 0;

	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < prices[low]) {
			low = high = i;
		} else if (prices[i] > prices[high]) {
			high = i;
			let currentDiff = prices[high] - prices[low];
			if (currentDiff > maxDiff) maxDiff = currentDiff;
		}
	}

	return maxDiff;
}

module.exports.solution = slidingWindowSolution3;

// 다른 풀이:

// 조금 더 간단히 하면, 최고점(매도일) 포인터를 없앨 수 있다: 
function onePointerSolution(prices) {
	if (prices === null || prices.length <= 1) return 0;

	let low = prices[0];
	let maxDiff = 0;
	for (let i = 1; i < prices.length; i++) {
		low = Math.min(low, prices[i]);
		maxDiff = Math.max(maxDiff, prices[i] - low);
	}

	return maxDiff;
}


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
*/

// Sliding window
function slidingWindowSolution1(prices) {
	let left = 0, right = 1; // 각각 매수일 포인터, 매도일 포인터
	let maxProfit = 0;

	// '매도일(right)' 포인터를 점점 오른쪽으로 옮기는데 prices의 끝에 도달할 때까지
	while (right < prices.length) {
		// '매수(left)' 가격이 '매도(right)'가보다 작으면 차(이윤)를 구하고, 기존의 '최대 이윤'보다 크면 최대 이윤을 업데이트한다. 
		if (prices[left] < prices[right]) {
			let profit = prices[right] - prices[left];

			maxProfit = Math.max(maxProfit, profit);
		} else {
			// 매수가 >= 매도가 라면 차를 구할 이유가 없다. 마이너스나 0이 될 테니. 그냥 left(매수일)을 right에 맞춰서 (오른쪽으로) 옮겨준다.
			left = right;
		}

		// 매도(right)할 날짜를 한 칸 전진한다. 
		right++;
	}

	return maxProfit;
}

// 위의 해답을 조금 다르게 표현한...
// Sliding window 알고리즘 적용: 
function slidingWindowSolution2(prices) {
	let [left, right, max] = [0, 1, 0];

	while (right < prices.length) {
		const canSlide = prices[right] <= prices[left];
		// 미래 주가가 구매가격과 같거나 작다면 그냥 구매일을 그 시점으로 옮김. 
		if (canSlide) left = right;

		// '구매일'을 옮기거나 말거나, 무조건 '차'를 계산해서 '최고차'를 업데이트해준다. 
		const profit = prices[right] - prices[left];
		max = Math.max(max, profit);
		// 다음 날짜의 주가로 이동한다. 
		right++;
	}

	return max;
}

// 내가 써본, while문 대신 for문을 활용한 sliding window:  
function slidingWindowSolution3(prices) {
	let left = 0;
	let maxProfit = 0;

	for (let right = 0; right < prices.length; right++) {
		// 조건이 맞을 때 left bound 옮겨주기
		// = right 값이 더 작아지는 경우
		if (prices[right] < prices[left]) left = right;

		// 항상, 차(수익)을 계산해서 최대차(수익)을 업데이트할 것
		maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
	}

	return maxProfit;
}
