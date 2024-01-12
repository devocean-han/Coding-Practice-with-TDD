/*
 * @lc app=leetcode id=40 lang=typescript
 *
 * [40] Combination Sum II
 *
 * https://leetcode.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (53.97%)
 * Total Accepted:    884.4K
 * Total Submissions: 1.6M
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * Given a collection of candidate numbers (candidates) and a target number
 * (target), find all unique combinations in candidates where the candidate
 * numbers sum to target.
 * 
 * Each number in candidates may only be used once in the combination.
 * 
 * Note: The solution set must not contain duplicate combinations.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output: 
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: candidates = [2,5,2,1,2], target = 5
 * Output: 
 * [
 * [1,2,2],
 * [5]
 * ]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 * 
 * 
 */

// => 주어진 수 목록 candidates에는 중복된 수가 있을 수 있으나 
//    각 수를 두 번 이상 사용하지 않는 조합 찾기

function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b); // 오름차순 정렬
    const results: number[][] = [];
    const path: number[] = [];
    backtrackingDfs(0);
    return results;

    // 재귀 함수:
    function backtrackingDfs(index: number) {
        // 현재까지 부분 조합의 합계 계산
        const sum = path.reduce((acc, curr) => acc + curr, 0)
		
        // 부분 조합 합계가 target을 넘으면: 탐색 종료
        if (sum > target) {
            return;
        }
        // 부분 조합 합계가 target과 같으면: results에 추가하고 탐색 종료
        if (sum === target) {
            results.push([...path]);
            return;
        }

        // 현재 레벨(같은 자리)에 들어가는 수 후보를 교체하며 탐색
        for (let i = index; i < candidates.length; i++) {
			// 같은 자리에 이미 넣어봤던 수를 다시 넣는 것은
			// 의미가 없으므로 패스, 다음 후보로 진행
			if (i > index && candidates[i] === candidates[i - 1])
				continue;
            // 후보를 넣고
            path.push(candidates[i]);
            // 넣은 조건인 채로 다음 '자리' 탐색에 넘겨주고
            backtrackingDfs(i + 1);
			// 다시 후보를 뺌 
			// (= 다음 후보가 같은 자리에 들어올 수 있도록)
            path.pop();
        }
    }
};

export default {
	solution: combinationSum2,
}