/* 875. Koko Eating Bananas
https://leetcode.com/problems/koko-eating-bananas/

Medium

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23
 

Constraints:

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109

*/


// piles 숫자 전체를 더해서 나눴을 때 h가 될 수 있는 가장 작은 제수 k를 구하는 방식으로는... 나눠진 무더기에 따른 변수를 고려하지 못한다.
// [3,6,7,11] = 27
// => 27 / 3 = 9시간에 정확히 다 먹음.
// => 27 / 4 = 6.xxx => 7시간이면 다 먹고 남음.
// => 27 / 5 = 5.xxx => 6시간이면 다 먹고 남음.

// 예를 들면 총합 27이 어떻게 나눠져 있어서 시간당 4개를 먹더라도 7시간 내로 다 못 먹는 상황이 생길 수 있을까? h는 8이다.
// => piles 개수는 8개 이하여야 함.
// ex) [5, 5, 5, 5, 5, 1, 1] => 12시간 필요함. 오!

// 4개 무더기고 8시간 이내(포함)로 소비해야 한다면, 각 무더기당 최대 소비 가능 시간은 2시간.

// ...오름차순으로 늘어놓고 대강 '평균 소비 시간'으로 나눈 값이 나오는 무더기를 찾아본다?

// 이런식은 어떨까: 우선 piles 길이가 h와 같다면 무조건 한 무더기당 1시간에 끝내야 한다는 얘기다. 그러면 무더기 중 가장 큰 수를 먹는 속도 k로 삼으면 된다. 만약 piles.length < h라면, 1개 무더기만이라도 2시간 이상의 시간을 가질 수 있다는 얘기가 된다. 그러면 가장 큰 무더기를 2시간짜리로 잡고, 그 다음으로 큰 무더기를 시간당 먹는 속도 k로 잡으면 된다. 가장 큰 무더기와의 격차가 2배 이내라는 가정 하에. 무더기 개수와 시간 차가 딱 1시간이라면 이렇게 하면 된다. 만약 2시간이 남는다면? 무더기 2개에 각 1시간씩 더 여유를 주든지 한 무더기에 2시간의 여유를 주든지 할 수 있다. 최대 무더기와 3등 무더기의 크기가 곱절 이내로 차이난다면 1,2등 무더기에게 각각 1시간씩 더 주고 3등 무더기를 기준 속도 k로 삼으면 된다. 그렇지 않고 2등 무더기가 이미 (3등의) 곱절 이상이라면, 2등을 기준 속도 k로 삼는다. 이 경우 1등과 2등의 격차가 3배를 넘어갈 경우에만 1등을 기준 속도 k로 삼는다. 만약 2, 3등 곱절 내로 차이나는데 1등이 3등의 곱절을 넘어가면, 이 떄도 2등을 k로 삼고 그런 와중에 1등이 2등보다도 세곱을 초과하여 많으면 1등을 k로 삼는다.

// 정리하자면 먼저 1등과 2등의 격차가 (h - piles.length + 1)곱을 초과하면 무조건 1등을 기준 먹방 속도 k로 삼아야 하고,
// (h - piles.length + 1을 n이라고 하자.)
// 그렇지 않고(1등, 2등 격차가 n곱 이내인데) n번째로 큰 무더기와 1등 무더기가 두곱 이내로 차이난다면 1등부터 n - 1등 무더기에게 각 1시간씩 추가로 배분하면 되는, n등 무더기를 기준 속도 k로 가지는 계산이 가능하게 된다.
// 그렇지 않고 만약 n등 무더기까지 차례로 1등과 비교하다가 어느 무더기 m에서 두곱을 넘어서는 차가 발생하면, 그 무더기를 기준 속도 k개로 가져간다....
// 예) piles = [3,6,7,11], h = 8에서 n = 8-4+1 = 5가 된다.
//   	11과 7은 5배를 초과하여 차이 나지 않는다.
// 		5번째로 큰 무더기까지 1등 무더기와 비교할 수 있는 여유가 있다.
// 		2등무더기부터 각각 1등 무더기와 비교했을 때, 2배 이내, 2배 이내, 3배 초과의 결과가 나온다.
// 		논리대로라면 2배 초과가 일어나는 [3] 부분을 기준 속도 k로 가져가야 한다.
// 		=> [3]부분이 2배 초과 ~ 3배 이내였다면, 즉 [3]이 아니라 [4]였다면 깔끔하게 k로 삼으면 됐을 것이다. [4]이상인 어떤 수를 먹는 속도로 삼아도 8시간 내에 전부 먹는 게 가능했을 테니까. 그 중에 가장 느릿하게 먹을 수 있는 4를 선택해야 하는 것이고.
// 		=> 그런데 3배를 초과해버렸다. 1시간을 더 써야 하므로, [3] 그대로를 먹는 속도 k로 삼을 수 없고 1등 무더기 11을 2배 초과 ~ 3배 이내의 범위로 넣을 수 있는 [4]이상의 후보를 선택해야 하게 됐다.

// 이상한 역산이 가능해지는 것 같다. 최대 크기의 무더기를 기준으로 잡고, 더 작은 무더기로 내려오면서 1등 자신과 몇 배의 차이가 나는지 계산하는 것이다. n배 초과 n+1배 이내라는 계산이 설 때마다 n의 여유시간을 삭감한다. 예를 들어 1배 초과 2배 이내의 차이인 [7, 11]이라면 [7]에게 1시간의 여유시간을 할당해야 하는 것이다. 이런 식으로 여유시간을 할당하다가 n배 초과 n+1배 이내의 계산식에서 n시간을 할당하지 못하는 무더기에 이르면, 남은 n미만의 시간을 모두 쏟았을 때 1등 무더기를 초과(하거나 같아지도록)하도록 하는 숫자를 k로 잡는다. 예를 들어 [4,6,7,11]이었다면 [4]에서 2배 초과, 3배 이내라는 계산식이 나왔을 것이고 이는 현재 남은 여유시간 2시간을 딱 맞게 쓸 수 있어서 [4]를 그대로 k로 삼을 수 있었을 것이다. [4,6,7,12]도 [11]이 [4]의 3배 '이내'로, 같은 결과였을 것이다. 그런데 [3,6,7,11]은 남은 여유시간이 2시간인 채로 [3]을 맞닥뜨리게 되고, [3]은 [11]이 되기 위해 3배 초과 4배 이내를 해야 하므로 3시간이 필요하다. 따라서 [3]을 그대로 속도 k로 삼는 것은 안 되고 [11]을 남은 여유시간+1로 나눈 수인 3.xxx를 올림한 [4]가 가능한 최소 '정수' 속도 k가 된다.
// 이를 더 쉽게 하려면... 우선 h - piles.length'칸만큼' 앞 인덱스로 이동한다. ...아니다.

// 1. piles를 내림차순 정렬한다.
// 2. h - piles.length 값을 '여유시간'으로 삼는다.
// 3. 1등 무더기의 반절 '미만'이 되는 수를 찾는다. (그 직전까지의 무더기 수) x 1 만큼 '여유시간'에서 뺀다.
// 4. 1등 무더기의 1/3 미만이 되는 수를 찾는다. 3에서 찾은 무더기부터 이 직전까지의 무더기 수 x 2 만큼 '여유시간'에서 뺀다.
// 5. 1등 무더기의 1/4 미만이 되는 수를 찾는다. 4에서 찾은 무더기부터 이 직전까지의 무더기 수 x 3 만큼 '여유시간'에서 뺀다.
// 6. '여유시간'이 0보다 작아지는 시점까지 이를 계속한다.
// 7. 1등 무더기에서 1/n 미만이 되는 수를 찾아 빼는 과정에서 '여유시간'이 0보다 작아지면 1/n (미만이) 되는 구간에게는 여유시간을 충분히 나눠줄 수 없다는 뜻이다. 이 때 1등 무더기를 남은 여유시간+1로 나눈 수를 올림한 값을 기준 속도 k로 삼으면 된다. 
// 8. => 실패...
function solution(piles, h) {
	if (piles.length === 1) return Math.ceil(piles[0] / h);
	if (piles.length === h) return Math.max(...piles);

	// 1. 내림차순 정렬
	piles.sort((a, b) => b - a);
	console.log(piles)

	// 2. 한 무더기에 최소 한 시간씩을 배분한다고 치고 남은 '여유시간' spareTime 계산. 
	let spareTime = h - piles.length;

	// 3~6. piles 앞에서부터 차례대로 1등 무더기와 차이나는 배수대로 여유시간에서 삭감한다: 
	// ex) [12, 7]이라면 12/7을 올림한 값인 2(배)에서 -1을 한 1시간을 여유시간에서 삭감한다.
	const maxPile = piles[0]
	for (let i = 1; i < piles.length; i++) {
		const times = Math.ceil(maxPile / piles[i]);
		// 7. 만약 여유시간이 0 미만으로 줄면, 이 단계(n배수인)가 전부 부적절하다는 얘기. 그러면 곧바로 1등 무더기 / (남은 여유시간+1)을 올림한 값을 반환하도록 한다. 
		// console.log('pile: ', piles[i], 'times ', times, 'leftover: ', spareTime);
		if (spareTime === times - 1) return piles[i]
		if (spareTime - (times - 1) < 0) {
			return Math.ceil(maxPile / (spareTime + 1));
		}
		spareTime -= times - 1;
	}

	return maxPile;
}

module.exports = { solution }

// 다른 해법: 최소와 최대의 양 극단이 주어지고 그 사이의 최적해를 찾는 형태의 문제이므로 이진 탐색 기법을 이용할 수 있다.  
// Time complexity: O(N logM) (N: 무더기 개수, M: 1등 무더기의 바나나 수)
// Space complexity: O(1) 
function binarySolution(piles, h) {
	// 코코가 먹을 수 있는 속도 범위: 1 ~ max(piles)
	let startk = 1;
	let endk = Math.max(...piles);

	while (startk <= endk) { // O(logM)
		// 코코가 시간당 먹을 수 있는 바나나 수를 임시로 midk로 두고,
		let midk = Math.floor(startk + (endk - startk) / 2);
		// 이 속도로 먹었을 때 걸리는 총 시간을 계산: 
		let hrs = 0; 
		for (let pile of piles) { // O(N)
			hrs += Math.ceil(pile / midk);
		}

		// 그래서 만일 총 걸리는 시간이 주어진 시간 h보다 크다면 이 속도로는 안 된다는 의미이므로, (먹는 속도를 찾는) 범위를 '올린다'
		if (hrs > h) {
			startk = midk + 1;
		// 그렇지 않으면 범위를 '내린' 후 계산을 반복한다. 
		} else {
			endk = midk - 1;
		}
	}

	return startk;
}