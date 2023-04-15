
function solve1(n) {
    if (n % 2 === 0 && n % 3 === 0) {
        return "fizz buzz";
    } else if (n % 2 === 0) {
        return "fizz";
    } else if (n % 3 === 0) {
        return "buzz";
    }
    return "";
}

function solve(n) {
    var words = new Array()
    if (n % 2 === 0) {
        words.push("fizz")
    }
    if (n % 3 === 0) {
        words.push("buzz");
    }
    return words.join(' ');
}

module.exports = { solve1, solve }; 