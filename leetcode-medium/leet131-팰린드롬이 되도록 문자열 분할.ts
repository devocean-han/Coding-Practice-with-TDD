/*
 * @lc app=leetcode id=131 lang=typescript
 *
 * [131] Palindrome Partitioning
 *
 * https://leetcode.com/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (66.67%)
 * Total Accepted:    749K
 * Total Submissions: 1.1M
 * Testcase Example:  '"aab"'
 *
 * Given a string s, partition s such that every substring of the partition is
 * a palindrome. Return all possible palindrome partitioning of s.
 * 
 * 
 * Example 1:
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 * Example 2:
 * Input: s = "a"
 * Output: [["a"]]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= s.length <= 16
 * s contains only lowercase English letters.
 * 
 * 
 */

// => 주어진 문자열 s를, 모든 조각이 팰린드롬 문자열이 되도록
// 	  분할하는 모든 방법(조합) 반환하기

// (작성중 분할)
function partition(s: string): string[][] {
	const results: string[][] = [];
	// 일단 한 글자씩으로 자른 조합 하나 넣기
	let curPartition: string[] = [];
	for (let letter of s) {
		curPartition.push(letter);
	}
	results.push([...curPartition]);
	curPartition = [];

	// "aab" : "aa","b" | "a","ab" || "aab"
	// 앞에서 두 글자, 나머지는 한 글자씩으로 잘라보기
	
	/*
	그냥 길이 n개 짜리 문자를 자를 수 있는 방법:
	1 	1 	1	1	1	1
	2	1	1	1	1 => 1 넷과 2 하나로 만들 수 있는 순열 개수 = 5가지
	2	2	1	1	  => 1 둘과 2 둘로 만들 수 있는 순열 개수 = 6가지
	2	2	2		  => 2 셋으로 만들 수 있는 순열 개수 = 1가지
	3	1	1	1     => 4가지
	3	2	1		=> 6가지
	3	3			=> 1가지
	4	1	1		=> 3가지
	4	2			=> 2가지
	5	1			=> 2가지
	6				=> 1가지

	즉, 길이 n개짜리 문자를 자를 수 있는 방법은
		"합해서 n을 이룰 수 있는 모든 자연수의 조합"
			X "각 조합의 경우마다 '같은 것이 있는 순열' 가짓수"
	과 같다. 

	그런데 이렇게 많은 조합을 일일이 살펴야 할 것 같지는 않다. 
	처음부터 살피면서 "지금 지나가며 만드는 부분 문자열이 팰린드롬인가"
	를 검사하고, 펠린드롬이 아니게 되는 순간 끊는다.
	중요한 건 끊어진 나머지 조각도 팰린드롬이 되어야 한다는 것. 

	aaaab => 첫 aaaa로 끊기도 하고, a | aaa로 끊기도 해야 함. 

	일단 지금 팰린드롬이다? 끊고 다음 문자열부터 팰린드롬 검사하기
	팰린드롬 되자마자 끊고 다음 문자열부터 팰린드롬 검사하기
	끊을 때마다 분기가 생긴다. 다음 문자열에서 팰린드롬을 못 만들었거나
	만들고 끝에 도달했다면 어쨌든 다시 이전 분기로 돌아와 '더 긴' 팰린
	드롬을 만들 수 있는지 계속 검사해야 한다. 

	aaaab: 
	a | a | a | a | b (o) => 마지막 '끊기' 전으로 돌아가 더 길게 검사
	a | a | a | ab (x) => 또 마지막 '끊기' 전으로 돌아가 더 길게 검사
	a | a | aa | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	a | a | aab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	a | aa | a | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	a | a (a | abx) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	a | aaa | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	a | aaab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aa | a | a | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aa | a | ab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aa | aa | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aa | aab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aaa | a | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aaa | ab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aaaa | b (o) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	aaaab (x) => 또 마지막 '끊기' 전으로 돌아가 더 긴 문자로
	
	모든 경우에 동일한 규칙이 적용된다: 
	1. 지금 시작한 부분 문자열이 팰린드롬이 되자마자 끊고 다음 부분
		문자열을 검사한다.
	2. 검사 중 전체 문자열의 끝에 도달한 경우: 
		2-1. 현재(=마지막) 부분 문자열이 팰린드롬이면 전체 조합을 
			결과에 저장하고 '마지막 끊기' 전으로 돌아간다.
		2-2. 현재(=마지막) 부분 문자열이 팰린드롬이 아니면 '마지막
			끊기' 전으로 돌아간다.
		2-3. 현재까지 만든 부분 문자열이 1개 뿐인 경우, 전체 루프를 
			종료한다. 
	3. 되돌아온 곳의 (팰린드롬이었던)부분 문자열을 더 길게 늘이며 
		팰린드롬이 되는지 확인한다. 
	4. (2-3)에 이르러 루프가 종결되기까지 1~3 과정을 반복한다. 
	5. 전체 결과를 반환한다.
	*/
	let curPartitions: [string, number][] = [];
	// => [Partition['팰린드롬인_부분문자열', 부분문자열_끝인덱스]]
	let i: number = 0;
	let curSubstring: string = '';
	while (true) {
		i++;
		curSubstring += s[i];
		if (isPalindrome(curSubstring)) {
			curPartitions.push([curSubstring, i]);
			curSubstring = '';
		}
		// 전체 문자열 s의 끝에 도달한 경우:
		if (i === s.length - 1) {
			// 마지막 부분문자열이 팰린드롬이었던 경우
			if (isPalindrome(curSubstring)) {
				curPartitions.push([curSubstring, i]);
				results.push(curPartitions.map((partition) => partition[0]));
			}
			if (curPartitions[curPartitions.length - 1][1] === i) {
				results.push(curPartitions.map((partition) => partition[0]));
				if (curPartitions.length === 1)
					curPartitions.pop();
			}
			// 첫 부분문자열에 전체 문자를 검사한 경우
			if (curPartitions.length === 0) {
				break;
			}
			// backToLastPartition 
			[curSubstring, i] = curPartitions[curPartitions.length - 1];
			// i += 1;	
			// curPartitions.pop();
		}

	}

	function isPalindrome(str: string) {
		// 짝수 길이인 경우: 길이 8이면 i=0,1,2,3까지만 
		// 홀수 길이인 경우: 길이 9이면 i=0,1,2,3,4까지
		for (let i = 0; i < str.length / 2; i++) {
			if (str[i] !== str[str.length - i - 1])
				return false;
		}
		return true;
	}
	console.dir(results);
	return results;
};

function partition1(s: string): string[][] {
	const results: string[][] = [];
	let curPartitions: [string, number][] = [];
	// => [Partition['팰린드롬인_부분문자열', 부분문자열_끝인덱스]]
	let i: number = -1;
	let curSubstring: string = '';

	// 문자열의 끝까지 반복
    while (i < s.length - 1) {
        // 현재 부분 문자열을 확장
        i++;
        curSubstring += s[i];

        // 팰린드롬인 경우 현재 부분 문자열을 기록
        if (isPalindrome(curSubstring)) {
            curPartitions.push([curSubstring, i]);
            curSubstring = '';
        }

        // 문자열의 끝에 도달한 경우
        if (i === s.length - 1) {
            // 마지막 부분문자열이 비어있지 않으면 기록
            if (curSubstring !== '') {
                curPartitions.push([curSubstring, i]);
            }

            // 마지막 부분문자열이 팰린드롬이면 결과에 추가
            let [lastSubstring, lastIndex] = curPartitions[curPartitions.length - 1];
            if (isPalindrome(lastSubstring)) {
                results.push(curPartitions.map((partition) => partition[0]));
            }

            // 마지막 부분문자열 처리 후 현재 부분문자열을 마지막 팰린드롬으로 돌리기
            curPartitions.pop();
            if (curPartitions.length > 0) {
                [curSubstring, i] = curPartitions[curPartitions.length - 1];
                curPartitions.pop();
            }
        }
	}

	function isPalindrome(str: string) {
		// 짝수 길이인 경우: 길이 8이면 i=0,1,2,3까지만 
		// 홀수 길이인 경우: 길이 9이면 i=0,1,2,3,4까지
		for (let i = 0; i < str.length / 2; i++) {
			if (str[i] !== str[str.length - i - 1])
				return false;
		}
		return true;
	}

	console.dir(results);
	return results;
};

export default {
	solution: partition1,
}