class BowlingGame2 {
    constructor() {
        this.pins = [];
    }

    roll(pins) {
        this.pins.push(pins);
    }

    isSpare(frameScore) {
        return frameScore === 10;
    }

    isStrike(rollIndex) {
        return this.pins[rollIndex] === 10;
    }

    spareScore(rollIndex) {
        return 10 + this.pins[rollIndex + 2];
    }

    strikeScore(rollIndex) {
        return 10 + this.pins[rollIndex + 1] + this.pins[rollIndex + 2];
    }

    printPins() {
        console.log(this.pins);
    }

    get score() {
        // strike 케이스일 때
        let rollIndex = 0;
        let totalScore = 0;
        for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
            if (this.isStrike(rollIndex)) {
                totalScore += this.strikeScore(rollIndex);
                rollIndex++;
                continue;
            }
            let frameScore = this.pins[rollIndex] + this.pins[rollIndex + 1];
            if (this.isSpare(frameScore)) {
                // spare 케이스로 점수 계산
                totalScore += this.spareScore(rollIndex);
            } else {
                totalScore += frameScore;
            }
            rollIndex += 2;
        }
        return totalScore;
    }
}

module.exports = BowlingGame2;