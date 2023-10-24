/*
 * @lc app=leetcode id=57 lang=typescript
 *
 * [57] Insert Interval
 *
 * https://leetcode.com/problems/insert-interval/description/
 *
 * algorithms
 * Medium (39.43%)
 * Total Accepted:    864K
 * Total Submissions: 2.2M
 * Testcase Example:  '[[1,3],[6,9]]\n[2,5]'
 *
 * You are given an array of non-overlapping intervals intervals where
 * intervals[i] = [starti, endi] represent the start and the end of the i^th
 * interval and intervals is sorted in ascending order by starti. You are also
 * given an interval newInterval = [start, end] that represents the start and
 * end of another interval.
 * 
 * Insert newInterval into intervals such that intervals is still sorted in
 * ascending order by starti and intervals still does not have any overlapping
 * intervals (merge overlapping intervals if necessary).
 * 
 * Return intervals after the insertion.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * Output: [[1,2],[3,10],[12,16]]
 * Explanation: Because the new interval [4,8] overlaps with
 * [3,5],[6,7],[8,10].
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 0 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^5
 * intervals is sorted by starti in ascending order.
 * newInterval.length == 2
 * 0 <= start <= end <= 10^5
 * 
 * 
 */
function insert(intervals: number[][], newInterval: number[]): number[][] {
	console.log('----original intervals-----')
	console.log(intervals)
	if (intervals.length === 0) return [newInterval];
	/*
	^ 1. 새로 들어오는 인터벌의 시작과 끝을 재정립하기
		1) 새 인터벌의 시점: 
			만약 기존의 인터벌의 간격 이내라면(시작과 끝 포함), 그 인터벌의 시작지점으로 새 인터벌의 시작을 옮긴다. 새 인터벌의 시점이 어떤 인터벌에도 속하지 않는다면 그대로 둔다. 
		2) 새 인터벌의 종점: 
			만약 어떤 인터벌의 중간 지점이거나 시작지점과 만난다면 그 인터벌의 끝을 새로운 종점으로 설정한다. 만약 어떤 인터벌의 끝과 만나거나 어떤 인터벌과도 접하지 않는다면, 그대로 둔다. 
	^ 2. 수정한 '새 인터벌'의 시점과 종점을 기존 목록과 비교하기
		1) 기존 목록 중 (첫 발견이)시작 지점이 새것과 동일한 것 발견 시: 
			그 끝이 새 것의 끝 이내(포함x)라면 계속해서 다음 목록 확인.
			끝이 새 것의 끝과 같은 인터벌을 발견할 때까지 계속 찾는다.
		2) 기존 목록 중 (첫 발견이)시작 지점이 새것의 시점 이후인 것 발견 시: 
			새 것의 끝 이내라면 계속해서 다음 목록 확인. 
			끝이 새것의 끝과 같은 인터벌을 발견할 때까지.
			새 것의 끝 초과라면, 기존 목록 중 어느것도 삭제 대상이 아니다. 
		3(통합) 기존 목록의 종점이 새 것의 종점보다 작은 동안 루프를 돈다:
			시점이 새 것의 시점과 같거나 큰 경우 그 인터벌을 삭제 대상으로 포함.
	^ 3. 찾은 '삭제 대상' 지우기 및 수정한 '새 인터벌' 삽입
		어떻게 하면 더 효과적으로 처리할 수 있을까
	*/
	
	console.log('original newInterval: ');
	console.log(newInterval);
	// 1-1. 새 인터벌의 시점 수정하기
	let [newStart, newEnd] = newInterval;
	let i = 0;
	for (; i < intervals.length; i++) {
		// 시점 수정:
		let [start, end] = intervals[i];
		if (newStart >= start && newStart <= end) { // 기존 인터벌의 간격 이내일 때
			newStart = start;
			break;
		}
	}
	// 1-2. 새 인터벌의 종점 수정하기
	for (; i < intervals.length; i++) { // 새 인터벌이 '시작'한 부분부터 검사 시작
		let [start, end] = intervals[i];
		if (newEnd >= start && newEnd <= end) { // 기존 인터벌의 시점과 같거나 간격 내일 때(종점 미포함)(종점 포함해도 상관없음)
			newEnd = end;
			break;
		}
	}
	// 1-3. 새 인터벌의 시작점은 기존 인터벌에 포함되지 않지만 종점은 포함되어 있을 때: 새 인터벌의 시점은 그대로 두고 종점만 그 지점으로 옮긴다
	for (let i = 0; i < intervals.length; i++) {
		let [start, end] = intervals[i];
		if (newEnd >= start && newEnd <= end) {
			newEnd = end;
			break;
		}
	}
	console.log('renewed newInterval: ')
	console.log([newStart, newEnd])

	// 2.
	let j = 0; 
	let [start, end] = intervals[j];
	let hasReplaced = false;
	if (end > newEnd) { // 첫 인터벌보다 앞선 위치라면

	}
	while (end <= newEnd && j < intervals.length) { // 기존 인터벌의 종점이 새것과 같은 것을 발견할 때까지
		if (start >= newStart) {
			// 처음 '삭제 대상'을 발견한 자리에 수정한 '새 인터벌'을 덮어씌운다.
			if (!hasReplaced) {
				intervals[j] = [newStart, newEnd];
				hasReplaced = true;
			} 
			// 이후 발견하는 '삭제 대상'들은 그냥 삭제한다.
			else 
				delete intervals[j];
			// 이후 .filter(x=>true)로 반환
		}
		[start, end] = intervals[++j] ?? [null, null];
	}

	intervals = intervals.filter(x => true)

	// 3. '대체할' 기존 인터벌을 찾지 못했어도 넣어야 한다.
	if (!hasReplaced) {
		for (let j = 0; j < intervals.length; j++) {
			if (newStart < intervals[j][0]) {
				intervals = [...intervals.slice(0, j), [newStart, newEnd], ...intervals.slice(j)];
				hasReplaced = true;
				break;
			}
		}
	}
	if (!hasReplaced)
		intervals.push([newStart, newEnd]);

	console.log('finalized intervals:')
	console.log(intervals);
	return intervals;
};

function insert2(intervals: number[][], newInterval: number[]): number[][] {
	if (intervals.length === 0) return [newInterval];
	
	// 1-1. 새 인터벌의 시점 수정하기
	let [newStart, newEnd] = newInterval;
	let i = 0;
	for (; i < intervals.length; i++) {
		let [start, end] = intervals[i];
		if (newStart >= start && newStart <= end) {
			// 기존 인터벌의 간격 이내일 때, 시점 수정
			newStart = start;
			break;
		}
	}
	// 1-2. 새 인터벌의 종점 수정하기
	for (; i < intervals.length; i++) { // 새 인터벌이 '시작'한 부분부터 검사 시작
		let [start, end] = intervals[i];
		if (newEnd >= start && newEnd <= end) {
		// 기존 인터벌의 시점과 같거나 간격 내일 때(종점 미포함)(종점 포함해도 상관없음)
			newEnd = end;
			break;
		}
	}
	// 1-3. 새 인터벌의 시작점은 기존 인터벌에 포함되지 않지만 종점은 포함되어 있을 때: 새 인터벌의 시점은 그대로 두고 종점만 그 지점으로 옮긴다
	for (let i = 0; i < intervals.length; i++) {
		let [start, end] = intervals[i];
		if (newEnd >= start && newEnd <= end) {
			newEnd = end;
			break;
		}
	}
	// 2. 수정한 '새 인터벌'의 시점과 종점을 기존 목록과 비교하기
	let j = 0; 
	let [start, end] = intervals[j];
	let hasReplaced = false;

	// 기존 인터벌의 종점이 새것과 같은 것을 발견할 때까지
	while (end <= newEnd && j < intervals.length) {
		if (start >= newStart) {
			// 처음 '삭제 대상'을 발견한 자리에 수정한 '새 인터벌'을 덮어씌운다.
			if (!hasReplaced) {
				intervals[j] = [newStart, newEnd];
				hasReplaced = true;
			} 
			// 이후 발견하는 '삭제 대상'들은 그냥 삭제한다.
			else 
				delete intervals[j];
			// 이후 .filter(x=>true)로 반환
		}
		[start, end] = intervals[++j] ?? [null, null];
	}

	intervals = intervals.filter(x => true)

	// 3. '대체할' 기존 인터벌을 찾지 못했어도 넣어야 한다.
	if (!hasReplaced) {
		for (let j = 0; j < intervals.length; j++) {
			if (newStart < intervals[j][0]) {
				intervals = [...intervals.slice(0, j), [newStart, newEnd], ...intervals.slice(j)];
				hasReplaced = true;
				break;
			}
		}
	}
	if (!hasReplaced)
		intervals.push([newStart, newEnd]);

	return intervals;
};

// 아이디어3: 어차피 기존 intervals의 모든 숫자 중 같은 인터벌의 처음-끝 외에는 겹치는 숫자가 없이 오름차순으로 정렬되어있을 것이므로.... 새롭게 들어가는 애의 숫자 두 개를 그 사이에 자연스럽게 끼워넣는다... 그 사이의 숫자들을 전부 지워준다... 만약 새로 들어간 '시작'점 직전의 점이 어떤 인터벌의 끝점이면 괜찮다. 그렇지만 어떤 인터벌의 시작점이라면, 새로 들어간 '시작'점을 지워준다. 끝점도 마찬가지로 새로 들어간 '끝'점 직후의 점이 어떤 인터벌의 끝점이면, 새로 들어간 '끝'점을 지워주고 그렇지 않으면 가만 냅둔다. 
// => 뭔가 오름차순이 필요하고 숫자를 하나하나 체크해야 하니까 힙을 이용할 수 있을 것 같다... 아니면 트리? 그러니까 끝점에 대해서는 최대 힙을 이용하는 것이다. ... 시점에 대해서는 최소 힙을...

export default {
	solution: insert2,
}