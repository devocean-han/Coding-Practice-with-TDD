/*
 * @lc app=leetcode id=90 lang=typescript
 *
 * [90] Subsets II
 *
 * https://leetcode.com/problems/subsets-ii/description/
 *
 * algorithms
 * Medium (56.76%)
 * Total Accepted:    842K
 * Total Submissions: 1.5M
 * Testcase Example:  '[1,2,2]'
 *
 * Given an integer array nums that may contain duplicates, return all possible
 * subsets (the power set).
 * 
 * The solution set must not contain duplicate subsets. Return the solution in
 * any order.
 * 
 * 
 * Example 1:
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * Example 2:
 * Input: nums = [0]
 * Output: [[],[0]]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * 
 * 
 */

/*
[1,2,2]
[]
1       2       2
1,2     1,2     2,2
1,2,2
이렇게 총 8가지 중 2 두 개와 1,2 두 개가 겹침. 
따라서 제외하고 6개를 결과로 반환. 

[1,2,2,2]
[]
1       2       2       2
1,2     1,2     1,2     2,2     2,2     2,2
1,2,2   1,2,2   1,2,2   2,2,2
1,2,2,2
*/

// => 숫자 하나를 추가로 넣을 때마다 results에 넣기.
//      숫자 하나를 넣을 때 '이 자리에 넣었던 이전 수'와 같지 않은 것만 넣기
//      그리고 백트래킹으로 구현할 때 '시작 자리'를 제한해주면 되겠다. 
// (성공)
function subsetsWithDup(nums: number[]): number[][] {
    const results: number[][] = [];
    const path: number[] = [];
    nums.sort((a,b) => a - b); // 오름차순 정렬 필수
    backtrackingDFS(0);
    return results;

    function backtrackingDFS(startIndex: number) {
        results.push([...path]);
        for (let i = startIndex; i < nums.length; i++) {
            // '아까 넣었다 뺀 것'을 어떻게 기억하지? 
            // '아까 넣었다 뺀 것'과 같으면 패스
            if (i > startIndex && nums[i] === nums[i-1]) {
                continue;
            }
            path.push(nums[i]);
            backtrackingDFS(i + 1);
            path.pop();
        }
    }
};

export default {
	solution: subsetsWithDup,
}