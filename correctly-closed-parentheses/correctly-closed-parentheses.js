// examples:
// areCorrectlyClosed('()()()') returns true
// areCorrectlyClosed('(())') returns true
// areCorrectlyClosed('()(()') returns false

function areCorrectlyClosedMy(s) {
    // // s 길이가 홀수면 무조건 false 겠음.
    // if (s.length % 2 === 1) {
    //     return false;
    // }
    
    // '('와 ')'의 개수가 똑같지 않으면 일단 false임.
    const numOfOpening = s.split('(').length - 1;
    const numOfClosing = s.split(')').length - 1;
    if (numOfOpening !== numOfClosing) {
        return false;
    }

    // 전체 길이가 짝수이고 '('와 ')'의 개수가 똑같아도, 
    // '('로 끝나면 false임.
    if (s[s.length - 1] === '(') {
        return false;
    } 
    return true;
}

function areCorrectlyClosed(s) {
    const chars = s.split('')
    let numOfClosing = 0, numOfOpening = 0;
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === '(') {
            numOfOpening++;
        } else {
            numOfClosing++;
            // 처음부터 괄호를 세나간다고 할 때, 명시적으로 
            // '('보다 ')'가 더 많아지는 '순간'이 오면 바로 false라고 판단할 수 있다.
            if (numOfOpening < numOfClosing) {
                return false;
            }
        }
    }
    return numOfOpening === numOfClosing;


}

module.exports.areCorrectlyClosed = areCorrectlyClosed;