/* 옹알이 (1)
문제 설명
머쓱이는 태어난 지 6개월 된 조카를 돌보고 있습니다. 조카는 아직 "aya", "ye", "woo", "ma" 네 가지 발음을 최대 한 번씩 사용해 조합한(이어 붙인) 발음밖에 하지 못합니다. 문자열 배열 babbling이 매개변수로 주어질 때, 머쓱이의 조카가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ babbling의 길이 ≤ 100
1 ≤ babbling[i]의 길이 ≤ 15
babbling의 각 문자열에서 "aya", "ye", "woo", "ma"는 각각 최대 한 번씩만 등장합니다.
즉, 각 문자열의 가능한 모든 부분 문자열 중에서 "aya", "ye", "woo", "ma"가 한 번씩만 등장합니다.
문자열은 알파벳 소문자로만 이루어져 있습니다.

입출력 예
babbling	result
["aya", "yee", "u", "maa", "wyeoo"]	1
["ayaye", "uuuma", "ye", "yemawoo", "ayaa"]	3

*/

function solution1(babblingArray) {
    const possibles = ["aya", "ye", "woo", "ma"]; // sliding window 전략. while문 추천.
    let count = 0;
    for (let i = 0; i < babblingArray.length; i++) {
        let word = babblingArray[i];
        word = word.replace("aya", " ")
                .replace("ye", " ")
                .replace("woo", " ")
                .replace("ma", " ")
                .trim();
                if (word === "") {
                    count++;
                }
            }
    return count;
}

// sliding window 기법 => i와 j 쌍인덱스로.
// -> 이건 코테용. 중상 정도의 풀이기법으로 취급될 것임. 

const POSSIBLES = ["aya", "ye", "woo", "ma"]; 
function solution(arr) {
    let count = 0;

    arr.forEach((word) => { 
        let j = 0;
        let k = 0;

        while (k !== word.length) { // woomask의 경우
            const subString = word.slice(j, k + 1);

            if (POSSIBLES.includes(subString)) {
                // console.log(subString, " is a valid babble");
                j = k + 1;
                k = k + 1;
            } else {
                k++;
            }
        }

        if (j === k) {
            count++;
        }
    });
    
    return count;
}

module.exports.solution = solution;
// 문자열 찾을 때. 검색 기능 구현할 때. 
// needle haystack search algorithm => KMP algorithm


/* 다른 풀이 */
function solution2(babbling) {
    var answer = 0;
    const regex = /^(aya|ye|woo|ma)+$/;

    babbling.forEach((word) => {
        if (regex.test(word)) answer++;  
    })

    return answer;
}

