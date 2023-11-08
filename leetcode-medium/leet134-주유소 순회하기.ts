/*
 * @lc app=leetcode id=134 lang=typescript
 *
 * [134] Gas Station
 *
 * https://leetcode.com/problems/gas-station/description/
 *
 * algorithms
 * Medium (45.77%)
 * Total Accepted:    685.5K
 * Total Submissions: 1.5M
 * Testcase Example:  '[1,2,3,4,5]\n[3,4,5,1,2]'
 *
 * There are n gas stations along a circular route, where the amount of gas at
 * the i^th station is gas[i].
 * 
 * You have a car with an unlimited gas tank and it costs cost[i] of gas to
 * travel from the i^th station to its next (i + 1)^th station. You begin the
 * journey with an empty tank at one of the gas stations.
 * 
 * Given two integer arrays gas and cost, return the starting gas station's
 * index if you can travel around the circuit once in the clockwise direction,
 * otherwise return -1. If there exists a solution, it is guaranteed to be
 * unique
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * Output: 3
 * Explanation:
 * Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 +
 * 4 = 4
 * Travel to station 4. Your tank = 4 - 1 + 5 = 8
 * Travel to station 0. Your tank = 8 - 2 + 1 = 7
 * Travel to station 1. Your tank = 7 - 3 + 2 = 6
 * Travel to station 2. Your tank = 6 - 4 + 3 = 5
 * Travel to station 3. The cost is 5. Your gas is just enough to travel back
 * to station 3.
 * Therefore, return 3 as the starting index.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: gas = [2,3,4], cost = [3,4,3]
 * Output: -1
 * Explanation:
 * You can't start at station 0 or 1, as there is not enough gas to travel to
 * the next station.
 * Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 =
 * 4
 * Travel to station 0. Your tank = 4 - 3 + 2 = 3
 * Travel to station 1. Your tank = 3 - 3 + 3 = 3
 * You cannot travel back to station 2, as it requires 4 unit of gas but you
 * only have 3.
 * Therefore, you can't travel around the circuit once no matter where you
 * start.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * n == gas.length == cost.length
 * 1 <= n <= 10^5
 * 0 <= gas[i], cost[i] <= 10^4
 * 
 * 
 */

// => 각 주유소에서 채울 수 있는 기름 양과 다음 주유소로 가는 필요량이 주어졌을 때 전체 주유소들을 한 바퀴 순회하는 게 가능한지 판단하여 가능하다면 (유일한)출발점을, 가능하지 않다면 -1 반환하기.

//  gas[1,2,3,4,5]
// cost[3,4,5,1,2]
// 일단 0번 주유소에서처럼 다음 주유소로 가는 데 필요한 기름 양(3)이 지금 자리에서 충전 가능한 양(1)보다 많은 자리라면 무조건 출발지점이 될 수 없다.
// 계속되는 패턴: (출발, 0에)5를 더하고 2를 빼면 0 이상이 될 수 있나(=3)? 다시 1을 더하고 3을 빼면 0 이상이 될 수 있나(=1)? 다시 2를 더하고 4를 빼면 0 이상이 될 수 있나(여기서 -1이 되어, 불가능 판정)? ...
// 그 다음 가능성을 탐색할 때, 다시 처음부터 계산할 게 아니라 앞 자리의 "5더하고 2 뺐던 것"만 삭제하면 계속해나갈 수 있을 것 같다. 

// (성공) 방법1: Two Pointer를 이용.
function canCompleteCircuit(gas: number[], cost: number[]): number {
	// => gas - cost 값인 net을 구하여, 각 주유소의 net + 들이 충분히 쌓여서 이후 등장하는 net - 들을 견딜 수 있으면 통과.Two Pointer를 이용해서 하나는 시작점을 기록하고, 하나는 진행 주유소(net[i])를 가리키도록 한다.net들을 더해나가다가, 어느 시점에서 < 0이 되면 그 주유소에는 도착할 수 없다는 얘기, 시작점을 한 칸 전진시킨다. 
	const net = gas.map((num, i) => num - cost[i]);

	// let zeroToStartSum = 0;
	let sum = 0;
	let startP = 0;
	const n = net.length;
	for (let i = 0; i < n * 2 - 1; i++) {
		// 시작점을 옮겨야 하는 조건:
		if (sum < -net[i % n]) {
			do {
				if (startP === i) {
					// 두 포인터를 동시에 민다
					// zeroToStartSum += net[startP];
					startP++;
					i++;
				} else {
					// 시작점이 아직 i와 멀리 떨어져있음 -> 시작점만 옮긴다
					// zeroToStartSum += net[startP];
					sum -= net[startP];
					startP++;
				}

				// 실패 조건: 
				if (startP === n)
					return -1;

			} while (net[startP] < 0 || sum < -net[i % n]);
		}

		// 시작점을 옮기든 옮기지 않든, 현재 net은 더해줘야 한다:
		sum += net[i % n];

		// 성공 조건: 
		if ((i + 1) % n === startP)
			return startP;
	}
	
	return -100; // 여기엔 절대 도달하면 안된다(도달할 일 없음).
};

// (성공)(Copilot이 리팩토링해준)방법 2: One Pointer로, net[]을 따로 계산하지 않고 순회도 한 번만 하도록 바꿈. 시간과 공간 복잡도 모두가 향상됐다. 
function canCompleteCircuit2(gas: number[], cost: number[]): number {
	const n = gas.length;
	let startP = 0;
	let sum = 0;
	let totalSum = 0;

	for (let i = 0; i < n; i++) {
		const net = gas[i] - cost[i];
		sum += net;
		totalSum += net;

		if (sum < 0) { 
			// 지금 이 순간 sum에 빵구가 났다는 것은 현재 net 값이 반드시 음수(-)라는 얘기이고, 그러면 이 음수값이 압도적으로 크다는 의미이므로 앞의 모든 양수와 음수 더하기 조합을 무시하고 이 다음 수를 startP 지점으로 삼는 것이 최선이게 된다. 
			startP = i + 1;
			sum = 0;
		}
	}

	return totalSum >= 0 ? startP : -1;
}

export default {
	solution: canCompleteCircuit2,
}