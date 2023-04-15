const { solution } = require('./004-array-reverse')

describe('Array Reverse', () => {
    // it('should return [] for an empty array', () => {
    //     expect(solution([])).toEqual([]);
    // });
    [
        { num_list: [1], result: [1] },
        { num_list: [1, 2], result: [2, 1] },
        { num_list: [1, 2, 3, 4, 5], result: [5, 4, 3, 2, 1] },
        { num_list: [1, 1, 1, 1, 1, 2], result: [2, 1, 1, 1, 1, 1] },
        { num_list: [1, 0, 1, 1, 1, 3, 5], result: [5, 3, 1, 1, 1, 0, 1] },
    ].forEach(({num_list, result}) => {
        it(`should return ${JSON.stringify(result)} for given array [${num_list.join(', ')}]`, () => {
            expect(solution(num_list)).toEqual(result);
        });
    })

    // it('should return [2, 1] for a given array [1, 2]', () => {
    //     expect(solution([1, 2])).toEqual([2, 1]);
    // });

    // it('should return [5, 4, 3, 2, 1] for a given array [1, 2, 3, 4, 5]', () => {
    //     expect(solution([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
    // });

    // it('should return [2, 1, 1, 1, 1, 1] for a given array [1, 1, 1, 1, 1, 2]', () => {
    //     expect(solution([1, 1, 1, 1, 1, 2])).toEqual([2, 1, 1, 1, 1, 1]);
    // });

    // it('should return [5, 3, 1, 1, 1, 0, 1] for a given array [1, 0, 1, 1, 1, 3, 5]', () => {
    //     expect(solution([1, 0, 1, 1, 1, 3, 5])).toEqual([5, 3, 1, 1, 1, 0, 1]);
    // });

    // // edge cases
    // it('should return [] for a given array [1, 0, 1, 1, 1, 3, 5]', () => {
    //     expect(solution([1, 0, 1, 1, 1, 3, 5])).toEqual([5, 3, 1, 1, 1, 0, 1]);
    // });
})
