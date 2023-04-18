describe('PrimeFactors', function() {
    it('calculates the prime factors of an integer', () => {
        const PrimeFactors = require('./prime-factors-kata')
        let primeFactors = new PrimeFactors();
        // console.log(primeFactors);
        // console.log(primeFactors.prototype);
        // console.log(primeFactors['of']);
        // for (let key of primeFactors) {
        //     console.log(key);
        // }
        expect(primeFactors.of(1)).toEqual([]);
        expect(primeFactors.of(2)).toEqual([2]);
        expect(primeFactors.of(3)).toEqual([3]);
        expect(primeFactors.of(4)).toEqual([2, 2]);
        expect(primeFactors.of(5)).toEqual([5]);
        expect(primeFactors.of(6)).toEqual([2, 3]);
        expect(primeFactors.of(7)).toEqual([7]);
        expect(primeFactors.of(8)).toEqual([2, 2, 2]);
        expect(primeFactors.of(9)).toEqual([3, 3]);
        expect(primeFactors.of(2 * 2 * 3 * 7 * 13)).toEqual([2, 2, 3, 7, 13]);
    });
})