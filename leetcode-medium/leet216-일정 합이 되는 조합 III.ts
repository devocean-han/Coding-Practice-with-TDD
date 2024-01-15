/*
 * @lc app=leetcode id=216 lang=typescript
 *
 * [216] Combination Sum III
 *
 * https://leetcode.com/problems/combination-sum-iii/description/
 *
 * algorithms
 * Medium (68.93%)
 * Total Accepted:    471.5K
 * Total Submissions: 682.3K
 * Testcase Example:  '3\n7'
 *
 * Find all valid combinations of k numbers that sum up to n such that the
 * following conditions are true:
 * 
 * 
 * Only numbers 1 through 9 are used.
 * Each number is used at most once.
 * 
 * 
 * Return a list of all possible valid combinations. The list must not contain
 * the same combination twice, and the combinations may be returned in any
 * order.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: k = 3, n = 7
 * Output: [[1,2,4]]
 * Explanation:
 * 1 + 2 + 4 = 7
 * There are no other valid combinations.
 * 
 * Example 2:
 * 
 * 
 * Input: k = 3, n = 9
 * Output: [[1,2,6],[1,3,5],[2,3,4]]
 * Explanation:
 * 1 + 2 + 6 = 9
 * 1 + 3 + 5 = 9
 * 2 + 3 + 4 = 9
 * There are no other valid combinations.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: k = 4, n = 1
 * Output: []
 * Explanation: There are no valid combinations.
 * Using 4 different numbers in the range [1,9], the smallest sum we can get is
 * 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 2 <= k <= 9
 * 1 <= n <= 60
 * 
 * 
 */
// Backtracking recursive DFS를 이용한 풀이:
function combinationSum3(k: number, n: number): number[][] {
    const results: number[][] = []; // 결과 배열
    const path: number[] = [];      // 임시 조합 배열
    backtrackingDFS(1, 0);
    return results;

    // 1~9 중 탐색을 시작할 수 index와 현재까지의 부분 합계 sum을 받아
    // k개 이하의 숫자로 만들 수 있는 모든 조합을 탐색하는 DFS 재귀함수
    function backtrackingDFS(index: number, sum: number) {
        // 조합 요소 수가 k개를 넘거나 현재 부분 합계가 타겟 n보다 크면:
        // 이 루트 탐색 중지
        if (path.length > k || sum > n) 
            return;
        // 현재 부분 합계가 n이고 사용된 숫자 개수도 k면:
        // 결과 배열에 현재 조합을 깊은 복사하여 넣고 루트 탐색 중지 
        if (sum === n && path.length === k) {
            results.push([...path]);
            return;
        }
        // '같은 자리'에 후보 숫자를 넣었다 빼면서(backtracking) 탐색 진행
        for (let i = index; i <= 9; i++) {
            path.push(i);
            backtrackingDFS(i + 1, sum + i); // '다음 자리'로 조합 넘김
            path.pop();
        }
    }
};