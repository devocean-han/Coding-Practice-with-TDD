/* 모음 제거
https://school.programmers.co.kr/learn/courses/30/lessons/120849

영어에선 a, e, i, o, u 다섯 가지 알파벳을 모음으로 분류합니다. 문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

제한사항
my_string은 소문자와 공백으로 이루어져 있습니다.
1 ≤ my_string의 길이 ≤ 1,000

입출력 예
my_string	result
"bus"	"bs"
"nice to meet you"	"nc t mt y
"
*/

function solution1(my_string) {
	let newStr = ''
	for (let char of my_string) {
		if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
			continue;
		};
		newStr += char;
	}
	return newStr;
}

function solution2(my_string) { // 'hello'
	let newStr = '';
	const regex = /a|e|i|o|u/; // 통과
	// const regex = /(a|e|i|o|u)/; // 통과
	// const regex = /a|e|i|o|u+/; // 통과
	// const regex = /(a|e|i|o|u)+/; // 통과
	// const regex = /(a|e|i|o|u)+/g; // X (meet => met)
	for (const char in my_string) { // const char 자체가 매 루프마다 새롭게 '선언'되는 원리. 재할당 아님. 
		// for (let i = 0; i < my_string.length; i++) => 여기서 let i는 루프마다 '재할당'되는 게 맞음. 
		console.log('현재 char:', char)
		// char += 3 // => let char라고 반복 변수를 설정했더라면 char += 3이 컴파일 에러는 안 난다. 이 때도 0, 1, 2, 3, 4...의 예정된 char를 변형시키지는 못한다. => 그럼 왜 let char라서 char += 3에 컴파일 에러를 안 내는 거지? 어차피 변화를 주지 못한다면. 
		if (!regex.test(char)) { // .test는 내부적으로 전체 for문을 한 번 도는 걸까? 
			newStr += char;
		}
	}
	return newStr
}

function solution3(my_string) {
	// const regex = /a|e|i|o|u/; // -> TypeError: String.prototype.replaceAll called with a non-global RegExp argument
	const regex = /a|e|i|o|u/g; // => replace, replaceAll 모두 '전부 교체'한다! 
	return my_string.replace(regex, '');
}

function solution4(my_string) {
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	// while문 안에서 문자열의 길이를 줄인다면, 조건식은 매번 새롭게 업데이트된 길이로 검사할까 아니면 처음에 받은 문자열 길이 그대로 검사할까
}

module.exports.solution = solution2;

/* 다른 해답 */

// 정규식 캡처링 활용
function solution5(my_string) {
    return my_string.replace(/[aeiou]/g, '');
}

// case문 활용
function solution6(my_string) {
    var answer = my_string.split('');
    for(let i = 0; i < answer.length; i++){
        switch(answer[i]){
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                answer.splice(i, 1);
                i--;
                break;
        }
    }

    return answer.join('');
}

// 문자열 indexOf()로 존재 유무 검사하기 기법.
// => includes()와 마찬가지로 처음부터 끝까지 돌아야 한 번의 검사가 끝나므로 비효율 적인 것은 똑같다.
function solution7(my_string) {
    let answer = ""
    let eng = ['a','e','i','o','u'];
    my_string.split('').forEach((v)=>{
        if(eng.indexOf(v) === -1)
            answer+=v;
    });
    return answer;
}