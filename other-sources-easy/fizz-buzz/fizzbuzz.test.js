var task = require('./fizzbuzz')

describe('task solver', () => {
    it('sould return "" if n is not divisible by 2 or 3', () => {
        expect(task.solve(7)).toEqual("");
        expect(task.solve(5)).toEqual("");
        expect(task.solve(11)).toEqual("");
        expect(task.solve(13)).toEqual("");
    });

    it('sould return "fizz" if n is divisible by 2 but not 3', () => {
        expect(task.solve(2)).toEqual("fizz");
        expect(task.solve(4)).toEqual("fizz");
        expect(task.solve(10)).toEqual("fizz");
    });

    it('sould return "buzz" if n is divisible by 3 but not 2', () => {
        expect(task.solve(3)).toEqual("buzz");
        expect(task.solve(9)).toEqual("buzz");
        expect(task.solve(15)).toEqual("buzz");
    });

    it('sould return "fizz buzz" if n is divisible by 2 and 3', () => {
        expect(task.solve(2 * 3)).toEqual("fizz buzz");
        expect(task.solve(2 * 2 * 3)).toEqual("fizz buzz");
        expect(task.solve(2 * 3 * 3 * 3)).toEqual("fizz buzz");
    });
})