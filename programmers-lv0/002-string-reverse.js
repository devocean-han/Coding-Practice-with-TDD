/* 문자열 뒤집기

문자열 my_string이 매개변수로 주어집니다. my_string을 거꾸로 뒤집은 문자열을 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ my_string의 길이 ≤ 1,000

입출력 예
my_string	return
"jaron"	"noraj"
"bread"	"daerb"

*/ 

module.exports = function solution(my_string) {
    if (my_string.length <= 1) {
        return my_string;
    }
    return my_string.split('') // [e, d, c, b, a]
        .map((value, index, array) => {
            return array[array.length - 1 - index]
        })
        .join('');
}


/* 다른 풀이
// 힌트! ^ exclusive or (XOR)를 이용하면 메모리를 매우 적게 사용할 수 있다.고 한다.
function solution(my_string) {
    // a = a ^ b; b = b ^ a; a = a ^ b;
    console.log("before: ", my_string)
    for (let i = 0; i < my_string.length / 2; i++) {
        my_string[i] ^ my_string[my_string.legnth - 1 - i]
        my_string[my_string.legnth - 1 - i] ^ my_string[i]
        // my_string[i] ^ my_string[my_string.legnth - 1 - i]
    }
    console.log("after: ", my_string)
    return my_string;
}
// 반 잘라서 [] = [] 방법. ✔️
function solution(str) {
    str = str.split('');
    for (let i = 0; i < str.length / 2; i++) {
        console.log(i);
        [str[i], str[str.length - i - 1]] = [str[str.length - i - 1], str[i]]
    }
    return str.join('');
}

// 재귀 방법 ✔️
function solution(my_string) {
    if (my_string === '') {
        return ''
    } // hello -> ello -> llo -> lo -> o -> '' => '' + o + l + l + e + h 
    return solution(my_string.substr(1)) + my_string[0];
}

// 추천하지 않는 풀이 방법 
function solution(my_string) {
    return my_string.split('').reverse().join('');
}
// 추천하지 않는 풀이 방법 
function solution(my_string) {
    var answer = [...my_string].reverse().join("");
    // const newObject = {...my_string}
    return answer;
}

*/