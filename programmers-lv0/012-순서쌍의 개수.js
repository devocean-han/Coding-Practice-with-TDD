/* 순서쌍의 개수
https://school.programmers.co.kr/learn/courses/30/lessons/120836

순서쌍이란 두 개의 숫자를 순서를 정하여 짝지어 나타낸 쌍으로 (a, b)로 표기합니다. 자연수 n이 매개변수로 주어질 때 두 숫자의 곱이 n인 자연수 순서쌍의 개수를 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ n ≤ 1,000,000

입출력 예
n	result
20	6
100	9

입출력 예 설명

입출력 예 #1
n이 20 이므로 곱이 20인 순서쌍은 (1, 20), (2, 10), (4, 5), (5, 4), (10, 2), (20, 1) 이므로 6을 return합니다.

입출력 예 #2
n이 100 이므로 곱이 100인 순서쌍은 (1, 100), (2, 50), (4, 25), (5, 20), (10, 10), (20, 5), (25, 4), (50, 2), (100, 1) 이므로 9를 return합니다.

*/

const solution1 = (n) => {
	// 인수를 구해서... 그게 총 수 / 2 + 올림 하면 되겠다.

	// 그게 아니라 일단 1부터 n까지 죽 돌면서 나누어 떨어지면 그걸 카운트 하면 되겠다. 그리고 마지막에 /2 + 올림. 
	let count = 0;
	for (let i = 1; i <= n; i++) {
		if (n % i === 0) {
			count++
		}
	}
	return count;
}

// 루프를 반절만 돌도록 수정.
// => 반절만 돌더라도 사실 (안타깝게도) 전부 도는 것과 시간 복잡도는 O(N)으로 같다. 
// 그러므로 '시간 복잡도는 같지만 조금 다른 방식으로 접근해 풀어보았습니다'라고 어필하면 완벽하겠다. 
const solution2 = (n) => {
	let count = 0;
	for (let i = 1; i < Math.sqrt(n); i++) {
		if (n % i === 0) {
			count++;
		}
	}
	const addOne = n % Math.sqrt(n) === 0;
	return count * 2 + addOne;
}

module.exports.solution = solution5;

/* 다른 풀이 */

// 제곱근이 정수인지를 검사하는 다른 방법: Number.isInteger()
function solution3(n) {
    let ans = 0;
    for (let i = 1; i < Math.sqrt(n); i++)
        if (n%i === 0) ans+=2;

    return Number.isInteger(Math.sqrt(n)) ? ans+1 : ans;
}

// 이것도 sliding window 기법이라고 볼 수 있을까
function solution4(n) {
    let count = 0;
    let left = 1, right = n;
    while(right > 0){
        if(left * right === n) {
            count++;
            left++;
			right--;
			continue;
		}
		
		if (left * right > n) {
			right--;
			continue;
		}
		
		left++
    }
    return count;
}

// chatGPT 발 + 내가 else-if를 지운 버전. 
function solution5(n) {
	let count = 0;
	let left = 1, right = n;

	while (left <= right) {
		if (left * right === n) {
			if (left !== right) {
				count += 2;
			} else {
				count++;
			}
			left++;
			right--;
			continue;
		}
		
		if (left * right > n) {
			right--;
			continue;
		}

		if (left * right < n) {
			left++;
			continue;
		}
	}

	return count;
}