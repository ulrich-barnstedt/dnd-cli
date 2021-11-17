const amount = 5;

module.exports = class DiceHistory {
    constructor () {
        this.history = [];
    }

    push (roll) {
        this.history.push(roll);
        if (this.history.length > amount) this.history.shift();
    }
}