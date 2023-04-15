/* 개미 군단
https://school.programmers.co.kr/learn/courses/30/lessons/120837

개미 군단이 사냥을 나가려고 합니다. 개미군단은 사냥감의 체력에 딱 맞는 병력을 데리고 나가려고 합니다. 장군개미는 5의 공격력을, 병정개미는 3의 공격력을 일개미는 1의 공격력을 가지고 있습니다. 예를 들어 체력 23의 여치를 사냥하려고 할 때, 일개미 23마리를 데리고 가도 되지만, 장군개미 네 마리와 병정개미 한 마리를 데리고 간다면 더 적은 병력으로 사냥할 수 있습니다. 사냥감의 체력 hp가 매개변수로 주어질 때, 사냥감의 체력에 딱 맞게 최소한의 병력을 구성하려면 몇 마리의 개미가 필요한지를 return하도록 solution 함수를 완성해주세요.

제한사항
hp는 자연수입니다.
0 ≤ hp ≤ 1000

입출력 예
hp	result
23	5
24	6
999	201

*/

function solution1(hp) {
	const soldiersPower = [5, 3, 1];
	return soldiersPower.reduce((armyNum, power) => {
		addedNum = Math.floor(hp / power);
		// addedNum = ~~(hp / power);
		hp %= power; 
		return armyNum + addedNum;
	}, 0)
	
	let 장군Num = Math.floor(hp / 5);
	hp %= 5;
	let 병정Num = Math.floor(hp / 3);
	hp %= 3;
	let 일Num = hp; 
	return 장군Num + 병정Num + 일Num;

	if (hp < 3) {
		return hp;
	} else if (hp < 5) {
		return hp % 3 + 1;
	} else if (hp < 8) {
		return hp % 5 + 1;
	}
	return 1;
}

// while문으로 풀어보기 = 수학적 계산을 배제할 수 있다.
// 면접관도 쉽게 이해할 수 있는 코드라면 더 좋을 것이다. reduce보다는 while. 
// (while을 쓰면 잘 안 쓰지만 괜찮은 기법을 사용했네? 하는 인식이 있다고 한다...)
function solution(hp) {
	let count = 0;

	while (hp > 0) {
		count++;

		if (hp >= 5) {
			hp -= 5;
			continue;
		};

		if (hp >= 3) {
			hp -= 3;
			continue;
		};
		// else if를 썼다면 이부분을 아예 if 밖으로 빼도 됐을 것이다.
		// if를 다 분리시켜놨을 경우엔, 마지막 조건까지도 if로 싸줘야 한다는 특징이 생기네.
		// 아, 아니어도 되네. 
		// if (hp >= 1) {
		// 	hp -= 1;
		// 	continue;
		// };
		
		// 이 단순화가 '안 예쁘다'고 생각할 사람들은 50:50정도로 될 거라고 한다. 
		// 튜터님은 괜찮다고 하심. 
		hp -= 1;
	}

	return count;
}

console.log(solution(24)); // 6
console.log(solution(999)); // 201

// function으로 선언하지 않은 함수는 호이스팅되지 않는다.
// => 이 solution4를 47줄 아래에 넣으면 '그런 함수 없다'고 에러가 뜸.
// const solution4 = (h) => a=~~(h/5)+~~(h%5/3)+h%5%3

module.exports.solution = solution;

/* 다른 풀이 */
function solution2(hp) {
    return Math.floor(hp/5)+Math.floor((hp%5)/3)+(hp%5)%3;
}

// ~~ 또 나왔다
function solution3(hp) {
    let ant = [5,3,1];
    let ans = [];

    for (let v of ant) {
        ans.push(~~(hp/v));
        hp%=v;
    }

    return ans.reduce((a,v)=>a+v,0);
}

// 여기도 ~~
function solution4(h) {
	return a = ~~(h / 5) + ~~(h % 5 / 3) + h % 5 % 3
}
