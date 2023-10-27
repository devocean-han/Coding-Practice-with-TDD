/*
 * @lc app=leetcode id=56 lang=typescript
 *
 * [56] Merge Intervals
 *
 * https://leetcode.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (46.58%)
 * Total Accepted:    2.1M
 * Total Submissions: 4.5M
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * Given an array of intervals where intervals[i] = [starti, endi], merge all
 * overlapping intervals, and return an array of the non-overlapping intervals
 * that cover all the intervals in the input.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into
 * [1,6].
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 * 
 * 
 */

// => 주어진 이터벌 목록에서 겹치는 인터벌이 있으면 합쳐서 반환하기

// 1. 먼저 start를 기준으로 오름차순 정렬한다. 그러면 언제 병합해야 하는지 규칙을 간단히 정할 수 있다.
// 2. [1,4],[3,5] 와 같이 앞의 end가 뒤의 start보다 크거나 같으면(4 >= 3) 병합한다.
// 		=> 병합: 앞의 start와 뒤의 end를 새 인터벌로 삼는다.
// 3. 전체 인터벌을 처음부터 끝까지 이렇게 검사한다.

// Time Complexity: O(n log n)
// Space Complexity: O(n) 
function merge1(intervals: number[][]): number[][] {
	if (intervals.length === 1) return intervals;
	
	// 1. start 기준으로 오름차순 정렬하기: O(N logN)
	intervals.sort((a, b) => a[0] - b[0]);
	const result = [intervals[0]];

	// 2. 어느 두 연이은 인터벌 중 앞의 end가 뒤의 start보다 크거나 같으면 병합한다: O(N)
	for (let i = 1; i < intervals.length; i++) {
		const pre = result[result.length - 1];
		const post = intervals[i];
		if (pre[1] >= post[0]) { // 병합하기
			pre[1] = Math.max(pre[1], post[1]);
		} else { // 새 인터벌 등장. result에 넣기
			result.push(post);
		}
	}

	return result;
};

// 새 result 배열 없이 해보기:
// Time Complexity: O(n log n)
// Space Complexity: O(log n) (in-place sorting을 하므로)
function merge(intervals: number[][]): number[][] {
	if (intervals.length === 1) return intervals;	
	
	// 1. start 기준으로 오름차순 정렬하기: O(N logN)
	intervals.sort((a, b) => a[0] - b[0]);

	// 2. 어느 두 연이은 인터벌 중 앞의 end가 뒤의 start보다 크거나 같으면 병합한다: O(N)
	let pre = intervals[0];
	for (let i = 1; i < intervals.length; i++) {
		const post = intervals[i];
		if (pre[1] >= post[0]) { // 병합하기
			pre[1] = Math.max(pre[1], post[1]);
			delete intervals[i]; // delete post;는 안 됨 주의
		} else { // 새 인터벌 등장. pre를 새 인터벌로 옮긴다.
			pre = post;			
		}
	}

	return intervals.filter(x => true);
};

export default {
	solution: merge,
}