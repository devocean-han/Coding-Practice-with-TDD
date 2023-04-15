const BowlingGame2 = require('./bowling-game-practice2')

let game;

beforeEach(() => {
    game = new BowlingGame2();
})

function rollMany(howManyRolls, pins) {
    for (let i = 0; i < howManyRolls; i++) {
        game.roll(pins);
    }
}

it('should return 0 for a game of all zeroes', () => {
    rollMany(20, 0);
    expect(game.score).toEqual(0);
})

it('should return 20 for a game of all ones', () => {
    rollMany(20, 1);
    expect(game.score).toEqual(20);
})

it('should return proper score for a game with a spare', () => {
    game.roll(5);
    game.roll(5);
    game.roll(4);
    rollMany(17, 0);
    expect(game.score).toEqual(18);
})

it('should return proper score for a game with spare in last frame', () => {
    rollMany(18, 0);
    game.roll(5)
    game.roll(5)
    game.roll(7)
    expect(game.score).toEqual(17)
})

it('should return proper score for a game with a strike', () => {
    game.roll(10);
    game.roll(3);
    game.roll(3);
    rollMany(16, 0);
    expect(game.score).toEqual(22);
})

it('should return proper score for a game with stirke in the last frame', () => {
    rollMany(18, 0);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    // game.printPins();
    expect(game.score).toEqual(30);
})

it('should return proper score for a game which has a stirke and a spare independantly', () => {
    game.roll(5)
    game.roll(5)
    game.roll(9)
    game.roll(0)
    rollMany(4, 0);
    game.roll(10)
    game.roll(1)
    game.roll(5);
    rollMany(8, 0);
    expect(game.score).toEqual(50)
})

it('should return proepr score for a game with any combination of strikes and spares #1: alternating', () => {
    game.roll(5)
    game.roll(5) // spare 20
    game.roll(10) // strike 20
    game.roll(9)
    game.roll(1) // spare 20
    game.roll(10) // strike 19
    game.roll(8)
    game.roll(1) // 9
    rollMany(10, 0) // 0
    expect(game.score).toEqual(88)
})

it('should return proepr score for a game with any combination of strikes and spares #2: sequencial', () => {
    game.roll(5)
    game.roll(5) // spare 19
    game.roll(9)
    game.roll(1) // spare 20
    game.roll(10) // strike 30
    game.roll(10) // strike 28
    game.roll(10) // strike 20
    game.roll(8)
    game.roll(2) // spare 20
    game.roll(10) // strike 29
    game.roll(10) // strike 20
    game.roll(9)
    game.roll(1) // spare 10
    rollMany(2, 0)
    expect(game.score).toEqual(196)
})

it('should return proepr score for a game with any combination of strikes and spares #3: perfect', () => {
    rollMany(12, 10)
    expect(game.score).toEqual(300)
})