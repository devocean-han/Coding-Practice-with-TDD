// var PrimeFactors = function() {};

// PrimeFactors.prototype.of = function(n) {
//     if (2 === n) {
//         return [2];
//     }
//     return [];
// };

// module.exports = PrimeFactors;

class PrimeFactors {

    of(n) {
        let result = [];
        // while (n > 1) {
        //     if (n % 2 === 0) {
        //         result.push(2);
        //         n /= 2;
        //     } else {
        //         result.push(n);
        //         break;
        //     }
        // }
        // return result;

        for (let divisor = 2; divisor <= n; divisor++) {
            for (; n % divisor === 0; n /= divisor) {
                result.push(divisor);
            }
        }
        return result;
    }
}

module.exports = PrimeFactors;