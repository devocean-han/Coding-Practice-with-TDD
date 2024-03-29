/*
 * @lc app=leetcode id=435 lang=typescript
 *
 * [435] Non-overlapping Intervals
 *
 * https://leetcode.com/problems/non-overlapping-intervals/description/
 *
 * algorithms
 * Medium (52.35%)
 * Total Accepted:    480.4K
 * Total Submissions: 917.6K
 * Testcase Example:  '[[1,2],[2,3],[3,4],[1,3]]'
 *
 * Given an array of intervals intervals where intervals[i] = [starti, endi],
 * return the minimum number of intervals you need to remove to make the rest
 * of the intervals non-overlapping.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1
 * Explanation: [1,3] can be removed and the rest of the intervals are
 * non-overlapping.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: intervals = [[1,2],[1,2],[1,2]]
 * Output: 2
 * Explanation: You need to remove two [1,2] to make the rest of the intervals
 * non-overlapping.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: intervals = [[1,2],[2,3]]
 * Output: 0
 * Explanation: You don't need to remove any of the intervals since they're
 * already non-overlapping.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= intervals.length <= 10^5
 * intervals[i].length == 2
 * -5 * 10^4 <= starti < endi <= 5 * 10^4
 * 
 * 
 */

// => 주어진 인터벌 목록 중 겹치지 않는 것들만 남겨두기 위해 제거해야 하는 인터벌의 최소 개수를 반환하기.
// [start, end]에서 항상 start < end가 보장되게 주어지며, 다른 인터벌 간에 end와 start가 겹칠 수 있다.

/* 
 '겹치는 인터벌들을 합치기'에서 했던 것을 반대로 하면 되지 않을까?
start 오름차순으로 늘어놓고, 
[1,2][1,3][2,3],[3,4] 가 되면, 합치기 위해서는 [1,2][1,3]의 끝과 시작을 비교해서 합칠지 말지를 결정했었다. 그래서 합치고, 다음으로 [1,3][2,3]의 끝과 시작을 비교해서 또 합치고. 다음으로 [1,3],[3,4]는 원랜 합쳐야했지만 이번엔 그냥 둔다. 이렇게 해서 [1,2][2,3]이 삭제되고 [1,3]이 남게 된 것을 반대로... '합쳐야 할 두 인터벌' ㅈ우에서 끝이 더 긴 쪽을 삭제해야 할 대상으로 두는 것이다... 아니다. 

방법1: 
각 인터벌 당 다른 인터벌과 겹치는 수를 센다. 겹치는 다른 인터벌의 인덱스를 set으로 가지고 있도록 해도 좋겠다. 
가장 큰 수를 가지는 인터벌을 지우고, 그 인터벌과 연결된 '겹치는' 다른 인터벌들에서 그 인터벌의 인덱스를 삭제한다. 
그 다음으로 큰 수를 가지는 인터벌을 지우고, 다른 겹치는 인터벌들에서 저장하고 있던 이 인터벌 인덱스를 삭제한다. 
반복하여 모든 인터벌에서 가지는 '겹치는' 수가 0이 될 때까지 반복한다. 

문제: 만약 가장 큰 수를 가지는 인터벌이 2개라면? 그리고 3인 인터벌을 지웠지만 사실 다른 2와 2인 인터벌 두 개를 지우는 게 더 나았던 거라면? 

 */
// (실패)방법2
function eraseOverlapIntervals1(intervals: number[][]): number {
	// 0. 
	if (intervals.length === 1) return 0;

	// 1. 정렬
	intervals.sort((a, b) => a[0] - b[0]);
	console.log('-----------sorted-----------')
	console.log(intervals);

	// 2. 순회
	const result = [intervals[0]];
	for (let i = 1; i < intervals.length; i++) {
		let pre = result[result.length - 1];
		let post = intervals[i];

		if (pre[1] > post[0]) { // 두 인터벌이 겹침
			// pre가 변경되어야 하는 경우: pre 간격이 더 길 때
			// (post가 '빠져야' 하는 경우라면 그냥 result에 안 넣으면 되므로 아무 조치 x)
			if (pre[1] - pre[0] > post[1] - post[0]) {
				// pre를 삭제하고 post를 넣는다. 
				result.pop();
				result.push(post);
			}	
		}
		else { // 두 인터벌이 겹치지 않음
			// 지금 post 넣기
			result.push(post);
		}
	}
	console.log('-------------result--------------')
	console.log(result)

	// 3. 반환
	return intervals.length - result.length;
};

// (성공)방법3: 끝점 기준으로 오름차순 정렬하고 첫 인터벌을 선택한 후, 그 다음부터 '이전 인터벌의 끝'과 겹치지 않는 가장 가까운 인터벌을 찾아 선택하기를 반복. 마지막에는 총 인터벌 개수에서 선택한 인터벌 수를 뺀 값을 반환하면 된다. 
// Time Complexity: O(n log n)
// Space Complexity: O(log n) 
function eraseOverlapIntervals(intervals: number[][]): number {
	if (intervals.length <= 1) return 0;

	intervals.sort((a, b) => a[1] - b[1]);
	let end = intervals[0][1]; // 정렬 후 첫 인터벌은 선택하고 시작
	let count = 1; // result[]에 넣는 대신 숫자로 셈(=제거하지 않는 인터벌의 수 = '선택'한 인터벌의 수)

	for (let i = 1; i < intervals.length; i++) {
		const currentStart = intervals[i][0];

		// 현재 인터벌이 이전 인터벌과 겹치지 안으면 현재 인터벌을 (제거하지 않는 것으로) '선택'한다. 
		if (currentStart >= end) {
			// '선택': count를 1 늘이고 end를 업데이트함
			count++;
			end = intervals[i][1]; 
		}
	}

	// 전체 인터벌에서 제거하지 않는 총 인터벌 수를 빼 반환한다. 
	return intervals.length - count;
}

// 시작점 기준 정렬로 가능한 경우: 
function eraseOverlapIntervals2(intervals: number[][]): number {
	if (intervals.length <= 1) return 0;

	intervals.sort((a, b) => a[0] - b[0]);

	let end = intervals[0][1]; // 첫 인터벌의 끝점을 기억하고 시작
	let count = 0; // 제거하는 인터벌 수

	for (let i = 1; i < intervals.length; i++) {
		const curInterval = intervals[i];

		// 기억하고 있는 끝점과 현재 인터벌이 겹치면 현재 인터벌을 제거하는 것으로 선택한다.
		if (curInterval[0] < end) {
			// 선택: count를 1 올리고, 현재 인터벌의 끝점과 기억하고 있는 끝점 중 더 작은 값을 새 '기억하고 있는 끝점'으로 삼는다. 
			count++;
			end = Math.min(end, curInterval[1])
		}
		// 겹치지 않으면 현재 인터벌을 (제거하지 않고)통과한다.  
		else {
			// 통과: '기억하고 있는 끝점'을 현재 인터벌의 것으로 업데이트
			end = curInterval[1];
		}
	}

	// 제거한 인터벌 수를 그대로 반환
	return count;
}

export default {
	solution: eraseOverlapIntervals2,
}