/* 점의 위치 구하기
https://school.programmers.co.kr/learn/courses/30/lessons/120821

사분면은 한 평면을 x축과 y축을 기준으로 나눈 네 부분입니다. 사분면은 아래와 같이 1부터 4까지 번호를매깁니다.
https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/b58d4788-42fa-44fa-af50-481907e65473/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-07-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.27.04%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1%E1%84%87%E1%85%A9%E1%86%AB.png
스크린샷 2022-07-07 오후 3.27.04 복사본.png

x 좌표와 y 좌표가 모두 양수이면 제1사분면에 속합니다.
x 좌표가 음수, y 좌표가 양수이면 제2사분면에 속합니다.
x 좌표와 y 좌표가 모두 음수이면 제3사분면에 속합니다.
x 좌표가 양수, y 좌표가 음수이면 제4사분면에 속합니다.
x 좌표 (x, y)를 차례대로 담은 정수 배열 dot이 매개변수로 주어집니다. 좌표 dot이 사분면 중 어디에 속하는지 1, 2, 3, 4 중 하나를 return 하도록 solution 함수를 완성해주세요.

제한사항
dot의 길이 = 2
dot[0]은 x좌표를, dot[1]은 y좌표를 나타냅니다
-500 ≤ dot의 원소 ≤ 500
dot의 원소는 0이 아닙니다.

입출력 예
dot	result
[2, 4]	1
[-7, 9]	2

*/

function solution1(dot) {
    if (dot[0] < 0) {
        if (dot[1] < 0) {
            return 3
        }
        return 2;
    }
    if (dot[1] <0) {
        return 4;
    }
    return 1;
}

// function solution2(dot) {
//     const quadrant = {
//         [true, true]: 1,
//         [false, true]: 2,
//         [false, false]: 3,
//         [true, false]: 4,
//     }
// } // => 포기...

module.exports.solution = solution5;

function solution4(dot) {
    const [dot1, dot2] = dot;
    const check = dot1 * dot2;
    if (dot1 < 0) {
        if (check < 0) {
            return 2;
        } else {
            return 3;
        }
    } else {
        if (check > 0) {
            return 1;
        } else {
            return 4;
        }
    }
}

function solution5(dot) {
    const [num, num2] = dot;
    const check = num * num2 > 0;
    return num > 0 ? (check ? 1 : 4) : check ? 3 : 2;
}

function solution3(dot) {
    const [x, y] = dot;
    const isProductPositive = x * y > 0;
    if (isProductPositive) {
        if (x > 0) {
            return 1
        } else {
            return 3
        }
    }
    if (x > 0) {
        return 4
    } else {
        return 2
    }
    return isProductPositive ? (x > 0 ? 1 : 3) : (x > 0 ? 4 : 2);
}

