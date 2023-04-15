/* 연속된 수의 합
https://school.programmers.co.kr/learn/courses/30/lessons/120923

연속된 세 개의 정수를 더해 12가 되는 경우는 3, 4, 5입니다. 두 정수 num과 total이 주어집니다. 연속된 수 num개를 더한 값이 total이 될 때, 정수 배열을 오름차순으로 담아 return하도록 solution함수를 완성해보세요.

제한사항
1 ≤ num ≤ 100
0 ≤ total ≤ 1000
num개의 연속된 수를 더하여 total이 될 수 없는 테스트 케이스는 없습니다.
입출력 예
num	total	result
3	12	[3, 4, 5]
5	15	[1, 2, 3, 4, 5]
4	14	[2, 3, 4, 5]
5	5	[-1, 0, 1, 2, 3]

*/

function solution1(num, total) {
    // if (num === 1) {
    //     return [total];
    // } else if (num === 2) { 
    //     return [Math.floor(total / 2), Math.ceil(total / 2)]
    // } else if (num === 3) {
    //     const median = total / 3; // 반드시 정수가 되게 된다.
    //     return [median - 1, median, median + 1]
    // }
    
    let median = total / num // num이 짝수면 소수점 있는 실수, num이 홀수면 정수가 되게 된다.
    const result = []
    // num이 홀수라 정수로 나누어 떨어진 medium의 경우에는 
    if ((median * 10) % 10 === 0) {
        // num / 2 내림 개만큼 median 값의 앞뒤로 붙인 배열 반환하기. 
        for (let i = (median - Math.floor(num / 2)); i <= median + Math.floor(num / 2); i++) {
            result.push(i);
        }
    }
    // num이 짝수라 .5로 나뉜 mudium의 경우에는
    else {
        // num / 2 내림 개만큼 median 내림값의 앞뒤로 붙여서 반환하기. 
        median = Math.floor(median); // [2, 3, 4, 5] 중 3이 됨. 
        for (let i = median - (num / 2 - 1); i <= median + (num / 2); i++) {
            result.push(i);
        }
    }
    return result;
};

function solution2(num, total) {
    const result = [];
    let median = Math.floor(total / num);
    for (let i = 0; i < num; i++) {
        if (median === total / num) { // 혹은 'num이 홀수일 때'
            result.push(median - Math.floor(num / 2) + i);
        } else {
            result.push(median - Math.floor(num / 2) + 1 + i)
        }
    }
    return result;
}

module.exports.solution = solution2;

function solution7(num, total) {
    const result = [];
    const median = total / num;
    const start = Math.ceil(median - num / 2);

    for (let i = start; i < start + num; i++) {
        result.push(i);
    }
    return result;
}


/* 다른 풀이 -----------------------------------------------------*/
function solution3(num, total) {
    var min = Math.ceil(total/num - Math.floor(num/2));
    var max = Math.floor(total/num + Math.floor(num/2));

    return new Array(num).fill(0).map((el,i)=>{return i+min;});
}

// 이건 가우스 공식??
function solution4(num, total) {
    const a = (2 * total / num + 1 - num) / 2
    return Array(num).fill().map((_, i) => i + a)
}

// ~~는 뭐지
function solution5(num, total) {
    let arr = [~~(total/num)]; // Math.floor 대용 (bit-wise operator)
    if (num%2===0) arr.push(arr[0]+1);
    while (arr.length !== num) {
        arr.unshift(arr[0]-1)
        arr.push(arr.slice(-1)[0]+1);
    }
    return arr;
}