/* 최빈값 구하기
https://school.programmers.co.kr/learn/courses/30/lessons/120812

최빈값은 주어진 값 중에서 가장 자주 나오는 값을 의미합니다. 정수 배열 array가 매개변수로 주어질 때, 최빈값을 return 하도록 solution 함수를 완성해보세요. 최빈값이 여러 개면 -1을 return 합니다.

제한사항
0 < array의 길이 < 100
0 ≤ array의 원소 < 1000

입출력 예
array	result
[1, 2, 3, 3, 3, 4]	3
[1, 1, 2, 2]	-1
[1]	1

*/

function solution1(array) {
	// 요소가 하나뿐이라면 그냥 그대로 반환하기
	if (array.length === 1) {
		return array[0]
	}

	const countEachNum = {};
	for (let i = 0; i < array.length; i++) {
		if (array[i] in countEachNum) {
			countEachNum[array[i]]++;
		} else {
			countEachNum[array[i]] = 1;
		}
	}
	console.log('Before sort: ', countEachNum);
	
	// console.log('keys: ', Object.keys(countEachNum))
	let mode = Object.keys(countEachNum)[0];

	// for (let i = 1; i < Object.keys(countEachNum).length; i++) {
		// let num = Object.keys(countEachNum)[i];
		// console.log('num:', num, countEachNum[num]);
		// console.log('mode:', mode, countEachNum[mode]); 
		// 동점이 있을 때
		// if (countEachNum[num] === countEachNum[mode]) {
		// 	return -1;
		// }
		// if (countEachNum[num] > countEachNum[mode]) {
		// 	mode = num;
		// }
	// }
	
	// 그냥 '값' 기준으로 내림차 정렬하자
	const entries = Object.entries(countEachNum).sort((a, b) => b[1] - a[1])
	console.log('After sort: ', entries);
	if (entries[0][1] === entries[1][1]) {
		return -1;
	}
	return +entries[0][0];

	// return +mode;
}

// solution1을 깔끔히 정리한 버전:
function solution2(array) {
	// 길이가 1이면 일단 반환
	if (array.length === 1) { // 0 < array의 길이 라고 했으므로. 
		return array[0];
	}

	// 나타나는 숫자마다 카운팅한 맵핑 객체 만들기
	const countEachNum = {};
	for (let value of array) {
		if (value in countEachNum) { 
			countEachNum[value]++;
		} else {
			countEachNum[value] = 1;
		}
	}
	// // => 이걸 더 단순하게 나타내면:
	// for (const value of array) {
    //     countEachNum[value] = (countEachNum[value] || 0) + 1; // wow
    // }

	// 나타나는 숫자 종류가 한 개 뿐이면 그대로 반환
	if (Object.keys(countEachNum).length === 1) {
		return array[0];
	}

	// 카운트한 '개수'(=countEachNum의 '값'들) 기준으로 내림차 정렬 후
	const entries = Object.entries(countEachNum);
	entries.sort((a, b) => b[1] - a[1])

	// 최빈값이 둘이면 tie로, -1 반환. 아니면 최빈값 반환
	if (entries[0][1] === entries[1][1]) { // 더블 인덱싱 같이 복잡해지는 경우는 의미있는 변수명에 담아서, 읽는 사람이 이해하기 쉽도록 해주는 게 좋다. 
		return -1;
	}
	return +entries[0][0];	// 여기도, 더블 인덱싱이므로 의미있는 변수에 담고 그걸 반환시켜주면 좋다. 
}

// 처음부터 array 자체를 정렬하고 들어가기
function solution3(array) {
	if (array.length === 1) {
		return array[0];
	}

	array.sort((a, b) => a - b);

	let currentCount = 0, maxCountRecord = 0, maxIndexRecord = 0;
	for (let i = 1; i < array.length; i++) {
		if (array[i - 1] === array[i]) {
			currentCount++;
		} else {
			if (maxCountRecord < currentCount) {
				maxCountRecord = currentCount;
				maxIndexRecord = i - 1;
			}
			currentCount = 1;
		}
	}
	// 포기 ^^!
	return array[maxIndexRecord]
}

function solution7(arr) {
	const countObj = {};

	arr.forEach((value) => {
		countObj[value] = countObj[value] ? ++countObj[value] : 1;
	})

	const max = Math.max(...Object.values(countObj));
	const result = Object.entries(countObj).filter(([_, count]) => {
		return count === max;
	});
	// const result = Object.entries(countObj).map((value) => {
	// 	if (count === max) {
	// 		return value;
	// 	}
	// 	// else return undefined; 
	// }).filter(Boolean);

	const [key] = result[0];
	return result.length > 1 ? -1 : key;
}

module.exports.solution = solution2;
// Brute force 풀이법? -> 생각 정리가 잘 된 brute force 풀이법은 점수가 깎이지는 않는다. 


/* 다른 풀이 -----------------------------------------------------*/
function solution4(array) {
	// good -> reduce로 카운팅하기
    const counter = array.reduce((acc, cur) => ({
        ...acc,
        [cur]: (acc[cur] || 0) + 1
    }), {})

	// soso -> keys와 map보다 entries 곧바로가 더 낫겠다.
    const items = Object.keys(counter).map((key) => [
        Number(key), counter[key]
    ]).sort((a, b) => b[1] - a[1])

	// 엥? -> ?가 뭐지 
    if (items[0][1] === items?.[1]?.[1]) { // optional chaining. "?" 앞 부분이 falsy라면 undefined를 early return 해준다. 
        return -1
    }

    return items[0][0];
}


// 위와 비슷하나 훨씬 깔끔한
// => 여긴 왜 [1, 1, 1] => 1 검사가 안 걸리지? 나는 entries[0][1]같이 두 번 체인해서 없는 속성을 불러서 걸린 건가. 여기선 그냥 key값만 다룸으로써 undefined의 속성을 호출하는 에러를 피해간 것이고.   
function solution5(array) {
    const freq = {};

    for (const n of array) {
        freq[n] = (freq[n] || 0) + 1; // wow
    }

    const keys = Object.keys(freq);

    keys.sort((a,b) => freq[b] - freq[a]);

    const max = keys[0];

    return freq[keys[0]] === freq[keys[1]] ? -1 : +max;
}
