/* 연습문제 규칙 및 자바 풀이 참조: 
http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata 
자바스크립트 버전 풀이 참조: 
https://www.youtube.com/watch?v=brahHchaegc 
*/

class BowlingGame {
    constructor() {
        this.rolls = [];
        this.runningScore = 0;
    }

    roll(pins) {
        this.rolls.push(pins);
    }

    get score() {
        let score = 0;
        let rollIndex = 0;
        for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
            if (this.isStrike(rollIndex)) {
                score += this.strikeBonus(rollIndex);
                rollIndex++;
                continue;
            }
            const frameScore = this.rolls[rollIndex] + this.rolls[rollIndex + 1];

            if (this.isSpare(frameScore)) {
                // spare 케이스로 계산
                score += this.spareBonus(rollIndex);
            } else {
                score += frameScore;
            }

            rollIndex += 2;
        }
        return score;
    }

    isSpare(frameScore) {
        return frameScore === 10;
    }

    spareBonus(rollIndex) {
        return 10 + this.rolls[rollIndex + 2];
    }

    isStrike(rollIndex) {
        return this.rolls[rollIndex] === 10;
    }

    strikeBonus(rollIndex) {
        return 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
    }

}

module.exports = BowlingGame;