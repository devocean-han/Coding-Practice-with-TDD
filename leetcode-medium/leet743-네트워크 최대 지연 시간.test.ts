import source from './leet743-네트워크 최대 지연 시간'
const { solution } = source;

describe('Network Delay Time', () => {
    describe('Example 2: n=2, k=1, times=[[1,2,1]]', () => {
        const n: number = 2;
        const k: number = 1;
        const times: number[][] = [[1, 2, 1]]
        it(`should return 1`, () => {
            expect(solution(times, n, k)).toBe(1);
        });
    });
    describe('Example 3: n=2, k=2, times=[[1,2,1]]', () => {
        const n: number = 2;
        const k: number = 2;
        const times: number[][] = [[1, 2, 1]]
        it(`should return 1`, () => {
            expect(solution(times, n, k)).toBe(-1);
        });
    });
    describe('1 Edge Case: n=10, k=2, times=[[1,2,1]]', () => {
        const n: number = 10;
        const k: number = 2;
        const times: number[][] = [[1, 2, 1]]
        it(`should return -1`, () => {
            expect(solution(times, n, k)).toBe(-1);
        });
    });
    describe('1 Edge Case: n=10, k=1, times=[[1,2,1]]', () => {
        const n: number = 10;
        const k: number = 1;
        const times: number[][] = [[1, 2, 1]]
        it(`should return -1`, () => {
            expect(solution(times, n, k)).toBe(-1);
        });
    });
    describe('2 Edges Case: n=10, k=2, times=[[1,2,1],[2,1,2]]', () => {
        const n: number = 10;
        const k: number = 2;
        const times: number[][] = [[1, 2, 1], [2, 1, 2]];
        it(`should return -1`, () => {
            expect(solution(times, n, k)).toBe(-1);
        });
    });
    describe('Rule 1: If "total number of edges" are less than "total number of nodes - 1", it is impossible to reach every node whatsoever: All below cases should return -1', () => {
        it('n = 10, k = 2, times = [[1, 2, 1], [2, 1, 2]]', () => {
            const n: number = 10;
            const k: number = 2;
            const times: number[][] = [[1, 2, 1], [2, 1, 2]];
            expect(solution(times, n, k)).toBe(-1);
        });
        it('n = 4, k = 2, times = [[1, 2, 1], [2, 1, 2]]', () => {
            const n: number = 4;
            const k: number = 2;
            const times: number[][] = [[1, 2, 1], [2, 1, 2]];
            expect(solution(times, n, k)).toBe(-1);
        });
        it('n = 3, k = 2, times = [[2, 1, 2]]', () => {
            const n: number = 3;
            const k: number = 2;
            const times: number[][] = [[2, 1, 2]];
            expect(solution(times, n, k)).toBe(-1);
        });
    });
    describe('2 Edges Case: n=3, k=2, times=[[1,2,1],[2,1,2]]', () => {
        const n: number = 3;
        const k: number = 2;
        const times: number[][] = [[1, 2, 1], [2, 1, 2]];
        it(`should return -1`, () => {
            expect(solution(times, n, k)).toBe(-1);
        });
    });
});