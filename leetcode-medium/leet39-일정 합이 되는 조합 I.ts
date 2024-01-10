/*
 * @lc app=leetcode id=39 lang=typescript
 *
 * [39] Combination Sum
 *
 * https://leetcode.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (70.49%)
 * Total Accepted:    1.8M
 * Total Submissions: 2.5M
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen
 * numbers sum to target. You may return the combinations in any order.
 * 
 * The same number may be chosen from candidates an unlimited number of times.
 * Two combinations are unique if the frequency of at least one of the chosen
 * numbers is different.
 * 
 * The test cases are generated such that the number of unique combinations
 * that sum up to target is less than 150 combinations for the given input.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * Explanation:
 * 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple
 * times.
 * 7 is a candidate, and 7 = 7.
 * These are the only two combinations.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: candidates = [2,3,5], target = 8
 * Output: [[2,2,2,2],[2,3,3],[3,5]]
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: candidates = [2], target = 1
 * Output: []
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= candidates.length <= 30
 * 2 <= candidates[i] <= 40
 * All elements of candidates are distinct.
 * 1 <= target <= 40
 * 
 * 
 */

// => 유니크한 숫자 set인 candidates[]이 주어질 때, 합이 target이 되는 수 조합 찾기 (중복 사용 가능)

function combinationSum(candidates: number[], target: number): number[][] {
    // 내림차순 정렬
    candidates.sort((a,b) => b-a);
    const result = [];

    let partialSum = 0;
    let partialCombi = [];
    let pointer = 0;
    outer: while (partialSum <= target && pointer <= candidates.length) {
        while (pointer >= candidates.length) {
            // 가장 작은 수까지 조합을 마쳤는데 더 이상 partialCombi에서 뺄 것도 없는 경우, 전체 탐색 종료
            if (partialCombi.length === 0)
                break outer;
            let popNum = partialCombi.pop();
            pointer = candidates.indexOf(popNum) + 1;
            partialSum -= popNum
        }  
        const num = candidates[pointer];
        if (partialSum + num > target) {
            // 이 숫자는 더하면 안됨. 다음으로 작은 수 검사 
            pointer++;
            // 하려고 하는데 이미 제일 작은 수까지 검사한 경우:
            // 현재 combination에서 마지막 수를 빼고 '그 수의 다음 자리'로 포인터 옮겨서 계속 진행
            // ex. [6]을 넣고 3,2를 모두 검사했는데 전부 도합 7을 넘으므로, partialCombi=[6]에서 6을 빼고 '6의 다음 자리'인 3의 인덱스 자리로 포인터를 옮겨 계속 진행함.
            // ex. [5,2]에서 2를 다시 뽑는 경우처럼, 뽑은 자리도 마지막 자리인 경우 '뽑은 자리가 마지막 자리가 아니게 되거나 더이상 뽑을 게 없어질 때까지' partialCombi에서 뽑도록 한다.  
            // if (pointer >= candidates.length) {
            //     let popNum = partialCombi.pop();
            //     pointer = candidates.indexOf(popNum) + 1;
            //     partialSum -= popNum
            // } 
        }
        else {
            // 이 숫자는 더해도 됨
            partialSum += num;
            partialCombi.push(num);

            // 더한 결과가 정확히 target과 같으면: 
            if (partialSum === target) {
                result.push([...partialCombi]);
                partialCombi.pop();
                partialSum -= num;
                pointer++;
            }
        }
    }

    return result;
};

// 백트래킹 재귀 DFS를 이용한 풀이:
function combinationSum2(candidates: number[], target: number): number[][] {
	// 1. 수 후보를 오름차순으로 정렬 
	candidates.sort((a, b) => a - b);
	// 2. 필요 자료구조 초기화
	const result: number[][] = []; // 결과 조합들을 담을 배열
	const path: number[] = [];	   // 생성중인 임시 조합 배열
	// 3. 수 후보를 작은 수부터 path에 담았다 빼며 가능한 조합 
	// 	  탐색, '유효한 조합' 발견 시 결과 배열 result에 저장
	dfsSearch(0, target);
	// 4. 결과 배열 반환
	return result;

	// '남은 후보'를 결정할 idx 넘버와 '남은 합계' residue를 받아 
	// 백트래킹을 이용한 재귀 탐색을 진행하는 보조 함수: 
	function dfsSearch(idx: number, sum: number) {
		// 처우 결정 1: '남은 합계'가 딱 0이 되어 유효한 조합으로 판정
		if (sum === target) {
			result.push(Array.from(path));
			return;
		}

		// 재귀 호출의 '단계(레벨)'은 조합의 '자리수'를 결정하고,
		// 재귀 호출 내의 for문은 '같은 자리'에 들어가는 수를 교체함 
		for (let i = idx; i < candidates.length; i++) {
			// 처우 결정 2: '남은 합계'가 '현재 자리'에 들어갈 수보다 작음 -> '현재 자리'에 들어올 남은 후보들은 이보다 큰 수 뿐이므로 '현재 자리'에 대한 수 교체 및 탐색을 중단 
			if (target - sum < candidates[i])
				break;
			path.push(candidates[i]);
			dfsSearch(i, sum + candidates[i]); // '다음 자리'로 탐색 이동
			path.pop(); 
		}
	}
}
/* 
?Q. 어떻게 같은 수의 중복 사용(중복 조합)을 구현하였나? 
	^A. 무조건 현재 단계에서 추가한 숫자를 한 번 더 방문하도록 하여, 
		다음 레벨의 재귀 호출에서 처우를 결정하도록 함므로써.
		(= "2가 한 번 더해질 수 있으면, 다음 단계에서도 2부터 살펴라")
	
?Q. 오름차순을 했기 떄문에 얻은 이득:
	^A. 한 번 '남은 합계'보다 큰 수를 만나면, 그 이후 수들을 한 번에
		탐색에서 제해버릴 수 있었음.
*/

export default {
	solution: combinationSum2,
}