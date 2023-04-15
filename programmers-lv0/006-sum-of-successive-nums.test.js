const {solution} = require('./006-sum-of-successive-nums');

describe('Sum of Successive Nums', () => {
    [
        { num: 1, total: 0, result: [0] },
        { num: 1, total: 1, result: [1] },

        { num: 2, total: 1, result: [0, 1] },
        { num: 2, total: -23, result: [-12, -11] },

        { num: 3, total: 0, result: [-1, 0, 1] },
        { num: 3, total: 12, result: [3, 4, 5] },
        { num: 3, total: -330, result: [-111, -110, -109] },
        
        { num: 4, total: 14, result: [2, 3, 4, 5] },

        { num: 5, total: 15, result: [1, 2, 3, 4, 5] },
        { num: 5, total: 5, result: [-1, 0, 1, 2, 3] },
    ]
    .forEach(({ num, total, result }) => {
        it(`should return [${result.join(', ')}] for the given value: num = ${num}, total = ${total}`, () => {
            expect(solution(num, total)).toEqual(result);
        });
    })
    // 연속된 num개의 수를 더해서 무조건 total이 되려면 total이 반드시 홀수여야 하는 규칙이 있네.
})