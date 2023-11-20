/*
 * @lc app=leetcode id=746 lang=typescript
 *
 * [746] Min Cost Climbing Stairs
 *
 * https://leetcode.com/problems/min-cost-climbing-stairs/description/
 *
 * algorithms
 * Easy (65.05%)
 * Total Accepted:    1M
 * Total Submissions: 1.6M
 * Testcase Example:  '[10,15,20]'
 *
 * You are given an integer array cost where cost[i] is the cost of i^th step
 * on a staircase. Once you pay the cost, you can either climb one or two
 * steps.
 * 
 * You can either start from the step with index 0, or the step with index 1.
 * 
 * Return the minimum cost to reach the top of the floor.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: cost = [10,15,20]
 * Output: 15
 * Explanation: You will start at index 1.
 * - Pay 15 and climb two steps to reach the top.
 * The total cost is 15.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: cost = [1,100,1,1,1,100,1,1,100,1]
 * Output: 6
 * Explanation: You will start at index 0.
 * - Pay 1 and climb two steps to reach index 2.
 * - Pay 1 and climb two steps to reach index 4.
 * - Pay 1 and climb two steps to reach index 6.
 * - Pay 1 and climb one step to reach index 7.
 * - Pay 1 and climb two steps to reach index 9.
 * - Pay 1 and climb one step to reach the top.
 * The total cost is 6.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 2 <= cost.length <= 1000
 * 0 <= cost[i] <= 999
 * 
 * 
 */

/*
지금 계단에 오를 수 있는 경우: 
1. 이전 한 계단까지의 조합(최소 가격)에 한 계단 더 오르기
2. 이전 두 계단까지의 조합(최소 가격)에 두 계단 더 오르기
1과 2 중 더 최소가 되는 가격이 바로 지금 계단까지 오르는 최소 가격이다.

계단 꼭대기 층은 3계단~1001계단이 될 수 있다. 
첫 번째 계단으로 오르는 최소 가격은 0이다.
두 번째 계단으로 오르는 최소 가격은 0이다. 

세 번째 계단을 오르는 최소 가격은
1. 두 번째 계단에서 시작하여 한 계단을 더 오르는 가격인 cost[1]과,
2. 첫 번째 계단에서 시작하여 두 계단을 한 번에 오르는 가격인 cost[0] 
둘 중 더 작은 값이 최소 가격이다. 

네 번째 계단을 오르는 최소 가격은
1. 세 번째 계단에서 한 계단을 더 오르든지(min(cost[0],cost[1]) + cost[2])
2. 두 번째 계단에서 두 계단을 한꺼번에 오르는(cost[1])
값 중 더 작은 값이 최소 가격이다. 

*/ 
// Dynamic Programming
function minCostClimbingStairs(cost: number[]): number {
    // let oneStepBeforeMin = 0;
    // let twoStepsBeforeMin = 0;
    // let minCost = 0;
    let dp = [cost[0], cost[1]];
    for (let i = 2; i < cost.length; i++) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }

    return Math.min(dp[cost.length-1], dp[cost.length - 2]);
};