/*
 * @lc app=leetcode id=198 lang=typescript
 *
 * [198] House Robber
 *
 * https://leetcode.com/problems/house-robber/description/
 *
 * algorithms
 * Medium (50.17%)
 * Total Accepted:    2M
 * Total Submissions: 4M
 * Testcase Example:  '[1,2,3,1]'
 *
 * You are a professional robber planning to rob houses along a street. Each
 * house has a certain amount of money stashed, the only constraint stopping
 * you from robbing each of them is that adjacent houses have security systems
 * connected and it will automatically contact the police if two adjacent
 * houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the
 * police.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house
 * 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 400
 * 
 * 
 */

// => 일직선 상의 거리에 있는 집들을 두 집 연속되지 않게 털 때
// 		집마다 보관된 돈 nums[]를 참고해 최대로 털 수 있는 양 구하기

/* 그냥 일단 한 집 걸러 한 집 터는 게 가장 많이 털 수 있어 뵈는데...

방법1: 
왼쪽 끝부터 시작해서 처음엔 한 채 걸러 하나씩 선택, 오른 끝에 닿으면
직전 분기로 돌아가 그 집 말고 다음 집을 선택(다음 집이 있다면).
그 집이 

방법2: 불가능
100개짜리 집을 인덱스와 함께 내림차순 정렬.
왼쪽부터 선택 후 다음 '부자'의 인덱스 차가 1인지 검사.
차 절대값이 1이면 통과, 1이 아니면 선택
다음 '부자'도 똑같이 한다면... 다음과 같은 반례가 생긴다:
제2, 제3 부자 합이 제1부자보다 큰데, 제1,2,3 부자 순으로 
집이 연이어 있는 경우 '제 2+3 부자가 제1 부자보다 부하므로
제1 말고 제2와 제3을 선택해야 한다'고 판단할 도리가 없다. 

방법3: 시도
반으로 나눈다. 또 반으로 나눈다. 한 집만 존재하기까지 나눠서,
그 집들로 만들 수 있는 조합 합계를 모두 저장한다. 두 그룹을
합쳐서 만들 수 있는 조합 합계를 계산한다. 
문제: 각 그룹의 가장자리 집이 포함된 합계라서 그 두 합계끼리는
'더하면 안되는지'를 판단하기가 어렵다. 아니, 해볼까? 
그룹의 합계마다 플래그 '왼 가장자리 포함', '오른 가장자리 포함'을
함께 저장한다. 두 그룹으로 조합할 수 있는 합계를 새로 계산할 때,
'오른 가장자리'+'왼 가장자리' 연결 조합은 배제한다. 새롭게 만들어진
그룹의 합계마다 새로이 '왼','오른' 플래그를 달아준다. 그렇게 그룹을
합치고 합쳐 만들 수 있는 가장 큰 조합 합계를 반환한다.

*/

// 방법 3으로 시도:
function rob2(nums: number[]): number {

	// 현재 그룹의 '왼 가장자리 포함' 합계와 '오른 가장자리 포함' 합계
	// 각각의 최대 합계를 계산해 반환하는 함수
	function calculate2Max(start: number, end: number) { // start포함, end미포함
		// 세 집일 때:
		if (end - start === 3) {
			return []
		}
		// 한 집뿐이면 => 한 집까지 분해되면 안됨
		if (end - start <= 1) {
			return [nums[start], nums[start]];
		} 
		// 두 집 이상이면
		// 왼쪽 그룹과 오른쪽 그룹을 나누어 최대 조합 합계 계산
		const leftGroupMaxes = calculate2Max(start, start + Math.floor((end-start) / 2));
		const rightGroupMaxes = calculate2Max(start + Math.floor((end-start) / 2), end);

		// 가장자리 집을 포함하는 최대 합계 조합 계산하기
		const leftLeft = leftGroupMaxes[0] + rightGroupMaxes[0];
		const rightRight = leftGroupMaxes[1] + rightGroupMaxes[1];
		const leftRight = leftGroupMaxes[0] + rightGroupMaxes[1]
		const leftIncludedMax = Math.max(leftLeft, leftRight);
		const rightIncludedMax = Math.max(rightRight, leftRight);
		
		// [왼 가장자리 포함 최대 합계, 오른 가장자리 포함 최대 합계] 반환
		return [leftIncludedMax, rightIncludedMax]
	}


	return Math.max(...calculate2Max(0, nums.length));

	// 두 그룹을 합치는 가능한 조합:
	// left[오른 미포함] + right[왼 미포함]
	// left[오른 미포함] + right[오른 미포함]
	// left[오른 미포함] + right[왼 미포함]
	// left[왼 미포함] + right[왼 미포함]
	// 두 그룹을 합치는 불가능한 조합:
	// left[오른 포함] + right[왼 포함]
	// 
}


function rob(nums: number[]): number {
	if (nums.length === 1)
		return nums[0];
	if (nums.length === 2)
		return Math.max(...nums);
	if (nums.length === 3) {
		// 양 끝 둘의 합과 가운데 하나의 합 중 더 큰 것을 고름
		return Math.max(nums[0] + nums[2], nums[1]);
	}
	if (nums.length === 4) {
		// 왼 끝부터 한 채 걸러, 오른 끝부터 한 채 걸러,
		// 그리고 양 끝의 합 중 더 큰 것을 고름
		return Math.max(nums[0] + nums[2], nums[1] + nums[3], nums[0] + nums[3]);
	}
	// 배열의 길이가 4보다 클 때
	let dp = Array(nums.length).fill(0);
	dp[0] = nums[0];
	dp[1] = Math.max(nums[0], nums[1]);
	for (let i = 2; i < nums.length; i++) {
		dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
	}

	return dp[nums.length - 1];
	/* 3번째 집을 선택하느냐 마느냐는 그 전 집을 선택했느냐 아니냐와 관련있다. 즉, 2번째 집을 포함한 조합을 선택하고 3번째 집을 포기하느냐, 2번째 집을 포함한 조합을 버리고 3번째 집을 선택하느냐의 이중 택일 문제가 되는 것이다. 
	
	예를 들어 3번째 집을 포함하는 선택을 한다면, dp의 셋째칸에 들어가는 수는 '3번 집 포함, 2번 집 미포함'이 된다. 3번째 집을 포기하는 선택을 한다면, dp의 셋째칸에 들어가는 수는 '3번 집 미포함, 2번 집 포함'이 된다. 어느쪽이건 더 큰 수가 되는 쪽을 넣는다. 
	이후 4번째 집을 선택하느냐의 양자택일 기로에서는 dp의 셋째 칸을 보고 '4번 집을 버리고 얻을 수 있는 최대 합계는 3번 집까지 선택했을 수도 있고 안 했을 수도 있는 최대 합계'를 알게 되고, dp의 둘째 칸을 보고 '그 전에 2번 집을 선택했는지는 모르지만 확실히 3번 집은 안 선택했어서 이번에 4번 집을 선택할 수 있는 경우의 합계', 즉 '3번 집을 빼고 4번집을 넣어서 얻을 수 있는 최대 합계'를 알게 된다. dp의 넷째 칸에 들어가는 수는 이렇게 얻어진 두 수 중 큰 수가 된다. 
	
	- dp의 n번째 칸에 저장되는 수의 의미는 "'n번째 집을 포기하고 얻을 수 있는 1번 부터 지금까지의 최대 합계'와 'n번째 집을 포함하여 얻을 수 있는 1번 부터 지금까지의 최대 합계' 중 더 큰 수" 이다. 
	- 'n번째 집을 포함하여 얻을 수 있는 최대 합계'를 계산할 때 dp의 n-1번 칸을 제외하고 n-2번째 칸을 고려하는 이유는, n-1번 칸에 든 수는 'n-1번 집을 포함했을 수도 있고 안 했을 수도 있는' 가능성을 가지고 있기 때문이다. n-2번째 칸은 n-2번 집을 포함했거나 안 했거나 확실하게 지금 고려하는 n번째 집과는 한 칸 떨어져 있기 때문에 n번 집의 예산과 더하면 된다. 
	*/
};

function rob3(nums: number[]): number {
    const memo: Record<string, number> = {}; // 메모이제이션을 위한 객체

    // 도우미 함수: start부터 end까지의 최대 조합 합계를 반환
    function maxCombination(start: number, end: number, includeLeft: boolean, includeRight: boolean): number {
        const key = `${start}-${end}-${includeLeft ? 'L' : 'N'}-${includeRight ? 'R' : 'N'}`;

        if (key in memo) {
            return memo[key];
        }

        let result = 0;

        // 기저 사례: 배열의 길이가 1일 때
        if (start === end) {
            result = nums[start];
        } else {
            // 현재 집을 털 때와 건너뛸 때의 경우를 고려하여 최대값 계산
            const takeCurrent = nums[start] + maxCombination(start + 2, end, includeLeft, false);
            const skipCurrent = maxCombination(start + 1, end, includeLeft, false);
            result = Math.max(takeCurrent, skipCurrent);
        }

        // 메모이제이션
        memo[key] = result;
        return result;
    }

    // 배열이 비어있는 경우 처리
    if (nums.length === 0) {
        return 0;
    }

    // 왼쪽 그룹과 오른쪽 그룹을 나누어 최대 조합 합계 계산
    const leftGroup = maxCombination(0, nums.length - 2, true, false);
    const rightGroup = maxCombination(1, nums.length - 1, false, true);

    // 두 그룹을 합쳐서 최종 결과 반환
    return Math.max(leftGroup, rightGroup);
}


export default {
	solution: rob,
}