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

// 아이디어2: 새롭게 배열을 만든다. 통합된 시작점 전의 점까지를 넣고, 통합된 시작점을 넣고, 이후 점들은 건너뜀. 이후 통합된 끝점와 그 이후의 점들을 넣고서 두 짝씩 묶는다. 틀림없이 두 짝이 맞게 되며, 반환한다. 
function insert3(intervals: number[][], newInterval: number[]): number[][] {
	// 0. 
	if (!intervals.length) return [newInterval];
	// // newInterval이 마지막에 위치해야 하는 경우, 바로 넣어서 반환
	// if (intervals[intervals.length - 1][1] < newInterval[0])
	// 	return [...intervals, newInterval];

	// 편하게 하기 위해 intervals를 평면화시킴([[1,3],[6,9]] => [1,3,6,9])
	const dots = intervals.flatMap((interval) => interval);
	// console.log(dots);

	const result = [];
	const [newStart, newEnd] = newInterval;
	let newStartFound = false, newEndFound = false;
	let i = 0; 
	
	// newStart이 나타나는 지점 찾기
	for (; i < dots.length; i++) {
		if (dots[i] >= newStart) {
			if (dots[i] !== newStart && i % 2 === 0) { // 간격 '외'임
				result.push(newStart);
			} else { // 간격 '내'임. 지금 i 이전 점을 '시작점'으로 삼는다.
				// i부터 이후 나타나는 점들을 건너뜀. 
				if (dots[i] === newStart && i % 2 === 0) { // 지금 i를 '시작점'으로 삼는다. 
					result.push(dots[i]);
				} else { // i 이전 점을 '시작점'으로 삼는다
					// = i부터는 건너뜀	
				}
			}
			newStartFound = true;
			break;
		}
		// newStart이 나타나기 전까지는 점들을 다 넣어준다. 
		else {
			result.push(dots[i]);
		}
	}

	// newEnd가 나타나는 지점 찾기
	for (; i < dots.length; i++) {
		if (dots[i] >= newEnd) {
			if (dots[i] !== newEnd && i % 2 === 0) { // 간격 '외'임
				result.push(newEnd);
			} else {
				if (dots[i] === newEnd && i % 2 === 0) { // i 다음 점을 '끝점'으로 삼는다 = i까지 건너뛴다
					i++;
				} else { // i를 '끝점'으로 삼는다 = 점 i는 추가한다.
					// result.push(dots[i]);
				}
			}
			newEndFound = true;
			break; // FIXME: 하기 전에 점이 겹치지 않았으면 i--를 해줘야 함. 
		}
		// newEnd가 나타나기 전까지는 점들을 다 건너뛴다.
	}

	// newEnd 이후 점들을 다 넣어주기
	result.push(...dots.slice(i));
	
	// dots의 끝점에 도달할때까지 newStart이나 newEnd를 찾을 수 없는 경우
	if (!newStartFound)
		// 제일 마지막에 newIntervals의 두 점을 넣어준다
		result.push(newStart, newEnd);
	else if (!newEndFound)
		// 끝점 newEnd만 추가해준다. 
		result.push(newEnd);
	
	// 최종 점들을 두 짝씩 묶어서 반환하기
	const newIntervals = []
	for (let i = 0; i < result.length; i += 2) {
		newIntervals.push([result[i], result[i + 1]]);
	}
	return newIntervals;
}

// 다른 해법: 
function insert4(intervals: number[][], newInterval: number[]): number[][] {
	const newIntervals = [];
	const m = intervals.length;
	let i = 0;

	while (i < m && intervals[i][1] < newInterval[0]) {
		newIntervals.push(intervals[i]);
		i++;
	}

	while (i < m && intervals[i][0] <= newInterval[1]) {
		newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
		newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
		i++;
	}

	newIntervals.push(newInterval);

	while (i < m) {
		newIntervals.push(intervals[i]);
		i++;
	}

	return newIntervals;
}
// 아이디어3: 어차피 기존 intervals의 모든 숫자 중 같은 인터벌의 처음-끝 외에는 겹치는 숫자가 없이 오름차순으로 정렬되어있을 것이므로.... 새롭게 들어가는 애의 숫자 두 개를 그 사이에 자연스럽게 끼워넣는다... 그 사이의 숫자들을 전부 지워준다... 만약 새로 들어간 '시작'점 직전의 점이 어떤 인터벌의 끝점이면 괜찮다. 그렇지만 어떤 인터벌의 시작점이라면, 새로 들어간 '시작'점을 지워준다. 끝점도 마찬가지로 새로 들어간 '끝'점 직후의 점이 어떤 인터벌의 끝점이면, 새로 들어간 '끝'점을 지워주고 그렇지 않으면 가만 냅둔다. 
// => 뭔가 오름차순이 필요하고 숫자를 하나하나 체크해야 하니까 힙을 이용할 수 있을 것 같다... 아니면 트리? 그러니까 끝점에 대해서는 최대 힙을 이용하는 것이다. ... 시점에 대해서는 최소 힙을...

export default {
	solution: insert4,
}